/* NEXORI RESEARCH — procedural mineral WebGL module (v2)
   <mineral-core>  main interactive specimen (own renderer, drag/zoom, auto-framed)
   <mineral-view>  analysis view (shared offscreen renderer -> 2D canvas)
   Requires window.THREE (UMD build, loaded in <helmet>). */
(function () {
  if (window.__NEXORI3D_V2__) return;
  window.__NEXORI3D_V2__ = true;

  const whenTHREE = new Promise(function (res) {
    if (window.THREE) return res(window.THREE);
    const t = setInterval(function () {
      if (window.THREE) { clearInterval(t); res(window.THREE); }
    }, 30);
  });

  /* ---------- CPU noise ---------- */
  function n3(x, y, z) {
    return (Math.sin(x * 1.7 + 2.1) * Math.cos(y * 1.3 - 1.1) +
      Math.sin(y * 2.1 + 0.7) * Math.cos(z * 1.9 + 2.3) +
      Math.sin(z * 1.5 - 0.4) * Math.cos(x * 2.3 + 1.7)) / 3;
  }
  function fbm3(x, y, z) {
    return n3(x, y, z) * 0.62 + n3(x * 2.1 + 5.3, y * 2.1 - 1.7, z * 2.1 + 3.1) * 0.27 +
      n3(x * 4.4 - 2.2, y * 4.4 + 1.3, z * 4.4) * 0.13;
  }

  /* crystal = intersection of random half-spaces, lightly roughened */
  function planeSet(seed, n) {
    const rnd = function (i, o) { const a = Math.sin(i * 127.1 + o * 311.7 + seed * 74.7) * 43758.5453; return a - Math.floor(a); };
    const out = [];
    for (let i = 0; i < n; i++) {
      const th = rnd(i, 1) * Math.PI * 2;
      const z = rnd(i, 2) * 1.9 - 0.95;
      const s = Math.sqrt(Math.max(0, 1 - z * z));
      out.push({ x: s * Math.cos(th), y: z, z: s * Math.sin(th), h: 0.64 + rnd(i, 3) * 0.44 });
    }
    return out;
  }

  function buildRock(T, seed, detail) {
    const g = new T.IcosahedronGeometry(1, detail);
    const p = g.attributes.position;
    const v = new T.Vector3();
    const planes = planeSet(seed, 16);
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).normalize();
      let r = 2.2;
      for (let k = 0; k < planes.length; k++) {
        const pl = planes[k];
        const d = v.x * pl.x + v.y * pl.y + v.z * pl.z;
        if (d > 0.12) r = Math.min(r, pl.h / d);
      }
      r = Math.min(r, 1.3) * (1 + fbm3(v.x * 5.2 + seed, v.y * 5.2, v.z * 5.2) * 0.045);
      v.multiplyScalar(r);
      v.y *= 1.42; v.x *= 0.94; v.z *= 0.88;
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.center();
    g.computeBoundingSphere();
    const norm = 1 / g.boundingSphere.radius;
    g.scale(norm, norm, norm);
    g.computeBoundingSphere();
    g.computeVertexNormals();
    return g;
  }

  /* ---------- shaders ---------- */
  const VERT = `
    #include <clipping_planes_pars_vertex>
    varying vec3 vPos; varying vec3 vN; varying vec3 vView;
    void main(){
      vPos = position;
      vN = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
      vView = mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
      #include <clipping_planes_vertex>
    }`;

  const FRAG = `
    #include <clipping_planes_pars_fragment>
    uniform float uTime; uniform int uMode; uniform float uPulse;
    uniform float uHeat; uniform float uAlert; uniform float uScan;
    varying vec3 vPos; varying vec3 vN; varying vec3 vView;

    float hash13(vec3 p){ p = fract(p*0.3183099 + vec3(0.11,0.27,0.43)); p *= 17.0;
      return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
    float vnoise(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
      return mix(mix(mix(hash13(i), hash13(i+vec3(1,0,0)), f.x),
                     mix(hash13(i+vec3(0,1,0)), hash13(i+vec3(1,1,0)), f.x), f.y),
                 mix(mix(hash13(i+vec3(0,0,1)), hash13(i+vec3(1,0,1)), f.x),
                     mix(hash13(i+vec3(0,1,1)), hash13(i+vec3(1,1,1)), f.x), f.y), f.z); }
    float fbm(vec3 p){ float a=0.5, s=0.0; for(int i=0;i<4;i++){ s += a*vnoise(p); p*=2.03; a*=0.5; } return s; }

    vec3 thermal(float t){
      t = clamp(t,0.0,1.0);
      vec3 c = mix(vec3(0.02,0.04,0.20), vec3(0.08,0.32,0.82), smoothstep(0.0,0.28,t));
      c = mix(c, vec3(0.28,0.72,0.94), smoothstep(0.24,0.46,t));
      c = mix(c, vec3(0.93,0.84,0.44), smoothstep(0.44,0.66,t));
      c = mix(c, vec3(1.00,0.33,0.30), smoothstep(0.60,0.84,t));
      c = mix(c, vec3(1.00,0.76,0.74), smoothstep(0.88,1.0,t));
      return c;
    }

    void main(){
      #include <clipping_planes_fragment>
      vec3 N = normalize(vN);
      vec3 V = normalize(-vView);
      float fres = pow(1.0 - max(dot(N,V),0.0), 3.2);
      vec3 key  = normalize(vec3(0.40,0.86,0.52));
      vec3 fill = normalize(vec3(-0.72,-0.12,0.42));
      float lam  = max(dot(N,key), 0.0);
      float lam2 = max(dot(N,fill), 0.0);
      float sheen = pow(max(dot(reflect(-V,N), key), 0.0), 34.0);

      vec3 ICE  = vec3(0.549,0.796,1.0);
      vec3 TECH = vec3(0.212,0.486,1.0);
      vec3 MYST = vec3(0.851,0.361,1.0);
      vec3 DANG = vec3(1.0,0.255,0.424);

      /* per-facet crystal tint: some faces read as ice-blue mineral */
      float facet = hash13(floor(vPos*7.0 + 0.5));
      float crystal = smoothstep(0.62, 0.95, facet);

      /* veins: thin bright line + soft halo */
      float vn = fbm(vPos*2.9 + vec3(0.0, uTime*0.015, 0.0));
      float line = smoothstep(0.020, 0.0, abs(vn - 0.5));
      float halo = smoothstep(0.085, 0.012, abs(vn - 0.5));
      float deep = smoothstep(0.16, 0.0, abs(fbm(vPos*1.4 + 4.0) - 0.47));
      float mixer = smoothstep(-0.7, 0.7, vPos.y*1.1 + (fbm(vPos*1.8)-0.5)*1.5);
      vec3 hotCol = mix(MYST, DANG, uAlert*0.75);
      vec3 veinCol = mix(ICE, hotCol, mixer);

      /* core glow bleeding through the body */
      float core = smoothstep(1.0, 0.1, length(vPos)) * (0.35 + 0.65*(1.0-fres));

      vec3 base = mix(vec3(0.012,0.022,0.047), vec3(0.055,0.105,0.205), pow(lam,1.3));
      base += lam2 * vec3(0.014,0.034,0.078);
      base = mix(base, base*0.7 + ICE*0.10*lam, crystal);
      base += sheen * ICE * (0.22 + crystal*0.5);

      float pulse = 0.55 + uPulse*0.45;
      vec3 col = base
        + veinCol * line * 0.78 * pulse
        + veinCol * halo * 0.20 * pulse
        + veinCol * deep * 0.07
        + hotCol * core * 0.16 * pulse
        + mix(ICE, TECH, 0.45) * fres * 0.42;

      /* travelling scan band */
      float band = smoothstep(0.045, 0.0, abs(vPos.y - uScan));
      col += ICE * band * 0.22;

      if (uMode == 1) {
        float h = fbm(vPos*2.0 + vec3(0.0, uTime*0.04, 0.0));
        h = clamp(h*1.3 - 0.14 + uHeat + line*0.30 + lam*0.14, 0.0, 1.0);
        col = thermal(h) * (0.74 + 0.36*lam) + vec3(0.55,0.78,1.0) * fres * 0.16;
      } else if (uMode == 2) {
        col = vec3(0.022,0.048,0.105) * (0.45 + lam*0.55)
            + veinCol * line * 1.7 + veinCol * halo * 0.42 + veinCol * deep * 0.30
            + ICE * fres * 0.9;
      } else if (uMode == 3) {
        col = base*0.82 + ICE * (line*0.55 + halo*0.16) + ICE * fres * 0.62;
      } else if (uMode == 4) {
        col = base*0.86 + mix(DANG, vec3(1.0,0.60,0.38), deep) * (line*1.5 + halo*0.32)
            + DANG * fres * 0.72;
      } else if (uMode == 5) {
        col = vec3(0.010,0.018,0.040)
            + veinCol * (line*2.1 + halo*0.7 + deep*0.35) * pulse
            + hotCol * core * 0.5 + mix(MYST, TECH, 0.5) * fres * 0.55;
      }

      col = col / (1.0 + col*0.32);   /* keep highlights coloured, never blown to white */
      gl_FragColor = vec4(col, 1.0);
    }`;

  function makeMaterial(T, mode, clipPlanes) {
    return new T.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 }, uMode: { value: mode }, uPulse: { value: 0 },
        uHeat: { value: 0 }, uAlert: { value: 0 }, uScan: { value: -2 }
      },
      vertexShader: VERT, fragmentShader: FRAG,
      clipping: !!clipPlanes, clippingPlanes: clipPlanes || []
    });
  }

  function circle(T, radius, color, opacity, gaps) {
    const pts = [];
    const segs = 160;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(new T.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const g = new T.BufferGeometry().setFromPoints(pts);
    const m = new T.LineBasicMaterial({ color: color, transparent: true, opacity: opacity });
    const line = gaps ? new T.LineSegments(g, m) : new T.Line(g, m);
    return line;
  }

  function tickArc(T, radius, color, opacity, count, len) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const c = Math.cos(a), s = Math.sin(a);
      const l = (i % 5 === 0) ? len * 2.1 : len;
      pts.push(new T.Vector3(c * radius, 0, s * radius));
      pts.push(new T.Vector3(c * (radius + l), 0, s * (radius + l)));
    }
    const g = new T.BufferGeometry().setFromPoints(pts);
    return new T.LineSegments(g, new T.LineBasicMaterial({ color: color, transparent: true, opacity: opacity }));
  }

  /* ================= main interactive specimen ================= */
  class MineralCore extends HTMLElement {
    static get observedAttributes() { return ['mode', 'autorotate', 'slice', 'alert']; }
    connectedCallback() {
      if (this._init) return;
      this._init = true;
      this.style.display = 'block';
      this.style.position = this.style.position || 'absolute';
      this.style.inset = '0';
      this.style.cursor = 'grab';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      this.appendChild(host);
      this._host = host;
      whenTHREE.then((T) => { try { this._start(T); } catch (e) { console.warn('[NEXORI] core failed:', e); } });
    }
    attributeChangedCallback() { if (this._three) this._apply(); else this._pending = true; }
    _apply() {
      const mode = this.getAttribute('mode') || 'surface';
      const map = { surface: 0, thermal: 1, internal: 2, section: 2, energy: 5 };
      this._mat.uniforms.uMode.value = map[mode] != null ? map[mode] : 0;
      this._wire.visible = (mode === 'internal' || mode === 'section' || mode === 'energy');
      this._plane.constant = mode === 'section' ? parseFloat(this.getAttribute('slice') || '0.1') : 10;
      this._alertTarget = parseFloat(this.getAttribute('alert') || '0');
      this._auto = this.getAttribute('autorotate') !== 'false';
    }
    _start(T) {
      this._three = T;
      const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setClearColor(0x000000, 0);
      renderer.localClippingEnabled = true;
      this._host.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';

      const scene = new T.Scene();
      const FOV = 32;
      const camera = new T.PerspectiveCamera(FOV, 1, 0.1, 100);

      const plane = new T.Plane(new T.Vector3(0, -1, 0), 10);
      this._plane = plane;
      const geo = buildRock(T, 1.7, 4);
      const R = geo.boundingSphere.radius;             // normalised to 1
      const mat = makeMaterial(T, 0, [plane]);
      this._mat = mat;

      const rock = new T.Mesh(geo, mat);
      const wire = new T.Mesh(geo, new T.MeshBasicMaterial({
        color: 0x8ccbff, wireframe: true, transparent: true, opacity: 0.14,
        blending: T.AdditiveBlending, depthWrite: false
      }));
      wire.scale.setScalar(1.008); wire.visible = false;
      this._wire = wire;
      const shell = new T.Mesh(geo, new T.MeshBasicMaterial({
        color: 0x367cff, transparent: true, opacity: 0.045, side: T.BackSide,
        blending: T.AdditiveBlending, depthWrite: false
      }));
      shell.scale.setScalar(1.10);

      const pivot = new T.Group();
      pivot.add(rock); pivot.add(wire); pivot.add(shell);

      /* floating debris shards */
      const shards = new T.Group();
      const shardGeo = new T.TetrahedronGeometry(0.075, 0);
      for (let i = 0; i < 7; i++) {
        const m = new T.Mesh(shardGeo, mat);
        const a = (i / 7) * Math.PI * 2;
        const rr = 1.5 + (i % 3) * 0.32;
        m.position.set(Math.cos(a) * rr, Math.sin(i * 1.9) * 0.9, Math.sin(a) * rr);
        m.scale.setScalar(0.6 + (i % 4) * 0.25);
        m.userData = { a: a, rr: rr, sp: 0.05 + (i % 3) * 0.02, ph: i };
        shards.add(m);
      }
      pivot.add(shards);
      scene.add(pivot);
      this._pivot = pivot; this._shards = shards;

      /* particle field */
      const count = 420;
      const pos = new Float32Array(count * 3), col = new Float32Array(count * 3), spd = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const r = 1.3 + Math.random() * 1.7, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.cos(ph) * 1.3;
        pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
        const v = Math.random();
        const c = v < 0.22 ? [0.851, 0.361, 1.0] : (v < 0.4 ? [0.212, 0.486, 1.0] : [0.549, 0.796, 1.0]);
        col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
        spd[i] = 0.1 + Math.random() * 0.4;
      }
      const pg = new T.BufferGeometry();
      pg.setAttribute('position', new T.BufferAttribute(pos, 3));
      pg.setAttribute('color', new T.BufferAttribute(col, 3));
      const pts = new T.Points(pg, new T.PointsMaterial({
        size: 0.018, vertexColors: true, transparent: true, opacity: 0.62,
        blending: T.AdditiveBlending, depthWrite: false
      }));
      scene.add(pts);

      /* instrument rig: base plate rings, tick arcs, orbits, scan beam */
      const rig = new T.Group();
      const base = new T.Group();
      [[1.45, 0.34], [1.78, 0.22], [2.3, 0.13], [2.95, 0.07]].forEach(function (r, i) {
        const l = circle(T, r[0], i === 2 ? 0xd95cff : 0x8ccbff, r[1]);
        base.add(l);
      });
      base.add(tickArc(T, 1.95, 0x8ccbff, 0.30, 60, 0.07));
      base.position.y = -1.75;
      rig.add(base);

      const top = new T.Group();
      top.add(circle(T, 1.15, 0x8ccbff, 0.20));
      top.add(tickArc(T, 1.3, 0x367cff, 0.22, 40, 0.06));
      top.position.y = 1.85;
      rig.add(top);

      const orbit = circle(T, 1.75, 0x367cff, 0.24); orbit.rotation.x = Math.PI * 0.44;
      const orbit2 = circle(T, 2.05, 0x8ccbff, 0.13); orbit2.rotation.x = Math.PI * 0.53; orbit2.rotation.z = 0.6;
      const orbit3 = circle(T, 2.4, 0xd95cff, 0.10); orbit3.rotation.x = Math.PI * 0.38; orbit3.rotation.z = -0.9;
      rig.add(orbit); rig.add(orbit2); rig.add(orbit3);

      const beam = new T.Mesh(
        new T.CylinderGeometry(0.16, 0.5, 4.2, 24, 1, true),
        new T.MeshBasicMaterial({ color: 0x8ccbff, transparent: true, opacity: 0.045, side: T.DoubleSide, blending: T.AdditiveBlending, depthWrite: false })
      );
      rig.add(beam);
      scene.add(rig);

      const el = this;
      const baseDist = R / (0.70 * Math.tan((FOV * Math.PI / 180) / 2));
      el._yaw = 0; el._pitch = 0; el._spin = 0; el._dist = baseDist;
      el._auto = true; el._alert = 0; el._alertTarget = 0;
      camera.position.set(0, 0, baseDist);

      /* interaction */
      let dragging = false, lx = 0, ly = 0;
      this.addEventListener('pointerdown', function (e) {
        dragging = true; lx = e.clientX; ly = e.clientY; el.style.cursor = 'grabbing';
        el.setPointerCapture(e.pointerId);
      });
      this.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        el._yaw += (e.clientX - lx) * 0.006;
        el._pitch += (e.clientY - ly) * 0.005;
        lx = e.clientX; ly = e.clientY;
      });
      const up = function () { dragging = false; el.style.cursor = 'grab'; };
      this.addEventListener('pointerup', up);
      this.addEventListener('pointercancel', up);
      this.addEventListener('wheel', function (e) {
        e.preventDefault();
        el._dist = Math.max(baseDist * 0.62, Math.min(baseDist * 1.7, el._dist + e.deltaY * 0.003));
      }, { passive: false });

      const fit = function () {
        const w = Math.max(1, el.clientWidth || 1), h = Math.max(1, el.clientHeight || 1);
        if (w === el._fw && h === el._fh) return;
        el._fw = w; el._fh = h;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        /* keep the specimen framed by whichever axis is tighter */
        const need = R / (0.70 * Math.tan((FOV * Math.PI / 180) / 2));
        const needW = R / (0.60 * Math.tan((FOV * Math.PI / 180) / 2) * camera.aspect);
        el._base = Math.max(need, needW);
        if (!el._touched) el._dist = el._base;
        camera.updateProjectionMatrix();
      };
      fit();
      this.addEventListener('wheel', function () { el._touched = true; }, { passive: true });
      let ro = null;
      try { ro = new ResizeObserver(fit); ro.observe(this); } catch (e) { /* noop */ }
      window.addEventListener('resize', fit);

      if (this._pending) this._apply();
      this._apply();

      const clock = new T.Clock();
      let frame = 0;
      const tick = function () {
        el._raf = requestAnimationFrame(tick);
        if (typeof document !== 'undefined' && document.hidden) return;
        fit();
        const t = clock.getElapsedTime();
        frame += 1;
        if (el._auto) el._spin += 0.0019;
        pivot.rotation.y = el._spin + el._yaw;
        pivot.rotation.x = el._pitch * 0.55;
        pivot.position.y = Math.sin(t * 0.5) * 0.045;
        el._alert += (el._alertTarget - el._alert) * 0.05;
        mat.uniforms.uTime.value = t;
        mat.uniforms.uAlert.value = el._alert;
        mat.uniforms.uPulse.value = 0.45 + Math.sin(t * 1.25) * 0.2 + el._alert * (0.35 + Math.sin(t * 5.0) * 0.25);
        mat.uniforms.uScan.value = ((t * 0.32) % 2.6) - 1.3;
        shards.children.forEach(function (m) {
          const u = m.userData;
          const a = u.a + t * u.sp;
          m.position.set(Math.cos(a) * u.rr, Math.sin(t * 0.4 + u.ph) * 0.75, Math.sin(a) * u.rr);
          m.rotation.x = t * 0.25 + u.ph; m.rotation.y = t * 0.18;
        });
        pts.rotation.y = -t * 0.03;
        if (frame % 2 === 0) {
          const pa = pg.attributes.position;
          for (let i = 0; i < count; i++) pa.array[i * 3 + 1] += Math.sin(t * spd[i] + i) * 0.0008;
          pa.needsUpdate = true;
        }
        base.rotation.y = t * 0.05;
        top.rotation.y = -t * 0.07;
        orbit.rotation.z = t * 0.10; orbit2.rotation.z = -t * 0.07 + 0.6; orbit3.rotation.z = t * 0.05 - 0.9;
        beam.material.opacity = 0.035 + Math.sin(t * 0.9) * 0.012;
        camera.position.z += (el._dist - camera.position.z) * 0.08;
        camera.lookAt(0, 0, 0);
        if (frame % 2 === 0) renderer.render(scene, camera);
      };
      tick();
      this._dispose = function () {
        cancelAnimationFrame(el._raf);
        window.removeEventListener('resize', fit);
        if (ro) ro.disconnect();
        renderer.dispose();
      };
    }
    disconnectedCallback() { if (this._dispose) this._dispose(); this._init = false; }
  }
  if (!customElements.get('mineral-core')) customElements.define('mineral-core', MineralCore);

  /* ================= shared analysis views ================= */
  const AUX = {
    views: [], idx: 0, ready: false, T: null,
    init: function (T) {
      if (this.ready) return;
      try { this._init(T); } catch (e) { console.warn('[NEXORI] analysis views unavailable:', e); }
    },
    _init: function (T) {
      this.ready = true; this.T = T;
      this.renderer = new T.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setPixelRatio(1);
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.localClippingEnabled = true;
      this.scene = new T.Scene();
      this.FOV = 32;
      this.camera = new T.PerspectiveCamera(this.FOV, 1, 0.1, 100);
      this.plane = new T.Plane(new T.Vector3(0, -1, 0), 10);
      this.geo = buildRock(T, 1.7, 3);
      this.R = this.geo.boundingSphere.radius;
      this.mat = makeMaterial(T, 1, [this.plane]);
      this.mesh = new T.Mesh(this.geo, this.mat);
      this.scene.add(this.mesh);
      this.wire = new T.Mesh(this.geo, new T.MeshBasicMaterial({
        color: 0x8ccbff, wireframe: true, transparent: true, opacity: 0.2,
        blending: T.AdditiveBlending, depthWrite: false
      }));
      this.wire.scale.setScalar(1.01);
      this.scene.add(this.wire);
      this.clock = new T.Clock();
      const self = this;
      const loop = function () {
        if (typeof document !== 'undefined' && document.hidden) return;
        const live = self.views.filter(function (v) { return v.isConnected && v.clientWidth > 0; });
        if (!live.length) return;
        const rest = [];
        for (let i = 0; i < live.length; i++) {
          if (live[i].hasAttribute('priority')) self.draw(live[i]); else rest.push(live[i]);
        }
        for (let k = 0; k < 1 && rest.length; k++) {
          self.idx = (self.idx + 1) % rest.length;
          self.draw(rest[self.idx]);
        }
      };
      this.timer = setInterval(loop, 140);
      loop();
    },
    kick: function (v) {
      const self = this;
      if (!self.ready) return;
      let n = 0;
      const go = function () { self.draw(v); if (++n < 4) setTimeout(go, 130); };
      setTimeout(go, 0);
    },
    draw: function (v) {
      try { this._draw(v); } catch (e) {
        if (!this._warned) { this._warned = true; console.warn('[NEXORI] view draw failed:', e); }
      }
    },
    _draw: function (v) {
      const bw = v.clientWidth, bh = v.clientHeight;
      if (bw < 4 || bh < 4) return;
      const k = Math.min(1, 420 / bw, 340 / bh);
      const w = Math.max(4, Math.round(bw * k)), h = Math.max(4, Math.round(bh * k));
      const t = this.clock.getElapsedTime();
      const mode = v.getAttribute('mode') || 'thermal';
      const modeMap = { thermal: 1, internal: 2, cold: 3, hot: 4, energy: 5, surface: 0 };
      const u = this.mat.uniforms;
      u.uMode.value = modeMap[mode] != null ? modeMap[mode] : 1;
      u.uTime.value = t;
      u.uHeat.value = parseFloat(v.getAttribute('heat') || '0');
      u.uAlert.value = parseFloat(v.getAttribute('alert') || '0');
      u.uPulse.value = 0.5;
      u.uScan.value = -2;
      this.wire.visible = mode === 'internal';
      const sl = v.getAttribute('slice');
      this.plane.constant = sl != null ? parseFloat(sl) : 10;
      const yaw = parseFloat(v.getAttribute('yaw') || '0') + (v.hasAttribute('spin') ? t * 0.12 : 0);
      const pitch = parseFloat(v.getAttribute('pitch') || '0.12');
      this.mesh.rotation.set(pitch, yaw, 0);
      this.wire.rotation.copy(this.mesh.rotation);
      const fill = parseFloat(v.getAttribute('fill') || '0.78');
      this.camera.aspect = w / h;
      const tan = Math.tan((this.FOV * Math.PI / 180) / 2);
      this.camera.position.set(0, 0, Math.max(this.R / (fill * tan), this.R / (fill * tan * this.camera.aspect)));
      this.camera.lookAt(0, 0, 0);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h, false);
      this.renderer.render(this.scene, this.camera);
      const c = v._canvas;
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(this.renderer.domElement, 0, 0, w, h);
    }
  };

  class MineralView extends HTMLElement {
    connectedCallback() {
      if (!this._canvas) {
        this.style.display = 'block';
        this.style.position = this.style.position || 'absolute';
        this.style.inset = '0';
        const c = document.createElement('canvas');
        c.style.cssText = 'width:100%;height:100%;display:block;';
        this.appendChild(c);
        this._canvas = c;
      }
      if (AUX.views.indexOf(this) < 0) AUX.views.push(this);
      const self = this;
      whenTHREE.then(function (T) { AUX.init(T); AUX.kick(self); });
    }
    disconnectedCallback() {
      const i = AUX.views.indexOf(this);
      if (i >= 0) AUX.views.splice(i, 1);
    }
  }
  if (!customElements.get('mineral-view')) customElements.define('mineral-view', MineralView);
})();
