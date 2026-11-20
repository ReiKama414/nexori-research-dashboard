import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEPTHS,
  ELEMENTS,
  ENVS,
  LAYERS,
  LEVELS,
  LOGPOOL,
  MODES,
  PEAK_MAP,
  SPEC_KEYS,
  TVIEWS,
} from './constants.js';
import { buildSpectra, spark } from './math.js';
import { TICK_MS } from './config.js';

const DEFAULT_OPTS = {
  initialStability: 38.4,
  criticalThreshold: 30,
  simulate: true,
  autoRotate: true,
  stageMode: 'surface',
};

function btnStyle(on) {
  return {
    bg: on ? 'rgba(54,124,255,.20)' : 'rgba(5,10,22,.62)',
    bc: on ? '#8CCBFF' : 'rgba(140,203,255,.18)',
    fg: on ? '#E7F2FF' : '#7D96B5',
  };
}

function levelFor(stability, crit) {
  if (stability >= 60) return { i: 0, ...LEVELS[0] };
  if (stability >= 45) return { i: 1, ...LEVELS[1] };
  if (stability >= crit) return { i: 2, ...LEVELS[2] };
  return { i: 3, ...LEVELS[3] };
}

function makeInitialSeries(st) {
  const seed = (i, b) => (Math.sin(i * 0.7) + Math.sin(i * 0.23)) * b;
  return {
    energy: Array.from({ length: 76 }, (_, i) => 140 + seed(i, 22)),
    ghost: Array.from({ length: 76 }, (_, i) => 118 + seed(i * 1.3, 16)),
    base: Array.from({ length: 76 }, (_, i) => 132 + Math.sin(i * 0.12) * 26),
    si: Array.from({ length: 52 }, (_, i) => st + seed(i, 4)),
    ef: Array.from({ length: 52 }, (_, i) => 160 + seed(i * 1.7, 18)),
    cp: Array.from({ length: 52 }, (_, i) => 62 + seed(i * 0.9, 6)),
    fd: Array.from({ length: 52 }, (_, i) => 82 + seed(i * 2.1, 9)),
    alertHist: Array.from({ length: 56 }, (_, i) => 30 + seed(i * 2.6, 14)),
  };
}

export function useDashboard(options = {}) {
  const opts = { ...DEFAULT_OPTS, ...options };
  const spectraRef = useRef(null);
  if (!spectraRef.current) spectraRef.current = buildSpectra();

  const st0 = Number(opts.initialStability);
  const series = makeInitialSeries(st0);

  const [s, setS] = useState({
    t: 0,
    stability: st0,
    mode: opts.stageMode || 'surface',
    auto: opts.autoRotate !== false,
    spectrum: 'RAMAN',
    tv: 1,
    layer: 2,
    env: 1,
    sim: -1,
    depth: 2,
    ...series,
    clock: '',
    log: [
      { time: '14:12', msg: 'Completed spectral scan (XRF)' },
      { time: '13:47', msg: 'Unusual energy resonance pattern' },
      { time: '12:32', msg: 'Containment field adjustment applied' },
      { time: '11:09', msg: 'Sample entered low-temperature chamber' },
      { time: '09:42', msg: 'Initial scan completed' },
    ],
    ready: true,
  });

  const tick = useCallback(() => {
    setS((state) => {
      if (!state.ready) return state;
      const t = state.t + 1;
      let st = state.stability;
      if (state.sim >= 0) {
        st += ([72, 52, 37, 17][state.sim] - st) * 0.1 + (Math.random() - 0.5) * 0.3;
      } else if (opts.simulate !== false) {
        st += Math.sin(t * 0.045) * 0.28 + (Math.random() - 0.5) * 0.75;
      }
      st = Math.max(8, Math.min(94, st));
      const push = (a, v) => a.concat(v).slice(-a.length);
      const inv = 100 - st;
      const now = new Date();
      const p2 = (n) => String(n).padStart(2, '0');
      const clockStr = `${now.getFullYear()}.${p2(now.getMonth() + 1)}.${p2(now.getDate())}  ${p2(now.getHours())}:${p2(now.getMinutes())}:${p2(now.getSeconds())}`;
      const next = {
        ...state,
        t,
        stability: st,
        ...(clockStr !== state.clock ? { clock: clockStr } : {}),
        energy: push(state.energy, 120 + inv * 0.55 + Math.sin(t * 0.31) * 26 + (Math.random() - 0.5) * 16),
        ghost: push(state.ghost, 108 + inv * 0.34 + Math.sin(t * 0.17 + 1.2) * 20 + (Math.random() - 0.5) * 9),
        base: push(state.base, 130 + Math.sin(t * 0.035) * 30),
        si: push(state.si, st + (Math.random() - 0.5) * 1.6),
        ef: push(state.ef, 120 + inv * 1.1 + Math.sin(t * 0.4) * 14 + (Math.random() - 0.5) * 12),
        cp: push(state.cp, 45 + inv * 0.42 + Math.sin(t * 0.13) * 5 + (Math.random() - 0.5) * 3),
        fd: push(state.fd, 40 + inv * 0.85 + Math.sin(t * 0.23) * 8 + (Math.random() - 0.5) * 6),
        alertHist: push(state.alertHist, inv * 0.5 + Math.abs(Math.sin(t * 0.7)) * 22 + (Math.random() - 0.5) * 8),
      };
      if (t % 62 === 0) {
        next.log = [
          {
            time: `${p2(now.getHours())}:${p2(now.getMinutes())}`,
            msg: LOGPOOL[Math.floor(Math.random() * LOGPOOL.length)],
          },
          ...state.log,
        ].slice(0, 16);
      }
      return next;
    });
  }, [opts.simulate]);

  useEffect(() => {
    let id = 0;
    const run = () => {
      id = window.setInterval(() => {
        if (typeof document !== 'undefined' && document.hidden) return;
        tick();
      }, TICK_MS);
    };
    const onVis = () => {
      if (document.hidden) return;
      tick();
    };
    run();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [tick]);

  const set = useCallback((patch) => setS((prev) => ({ ...prev, ...patch })), []);

  const toggleAuto = useCallback(() => setS((p) => ({ ...p, auto: !p.auto })), []);
  const cycleSim = useCallback(() => setS((p) => ({ ...p, sim: p.sim >= 3 ? -1 : p.sim + 1 })), []);
  const setField = useCallback((key, value) => setS((p) => ({ ...p, [key]: value })), []);

  const v = useMemo(() => {
    const crit = Number(opts.criticalThreshold);
    const lv = levelFor(s.stability, crit);
    const wash = lv.i >= 2 ? 'rgba(255,65,108,.12)' : lv.i === 1 ? 'rgba(217,92,255,.10)' : 'rgba(54,124,255,.10)';
    const soft = lv.i >= 2 ? 'rgba(255,65,108,.45)' : lv.i === 1 ? 'rgba(217,92,255,.40)' : 'rgba(140,203,255,.30)';
    const last = (a) => (a?.length ? a[a.length - 1] : 0);
    const secs = Math.max(0, Math.round((s.stability - 4) * 9.5));
    const peakIdx = s.energy.length ? s.energy.indexOf(Math.max(...s.energy)) : 0;
    const spectra = spectraRef.current;

    return {
      clock: s.clock || '—',
      lvName: lv.k,
      lvJp: lv.jp,
      lvColor: lv.c,
      lvWash: wash,
      lvColorSoft: soft,
      lvMsg: lv.msg,
      lvMsgJp: lv.jpm,
      riskWord: lv.risk,
      stateWord: lv.i >= 2 ? 'Unstable' : lv.i === 1 ? 'Fluctuating' : 'Contained',
      alertAmt: String((lv.i / 3).toFixed(2)),
      anomaly: lv.i >= 2,
      riskCells: Array.from({ length: 6 }, (_, i) => ({ bg: i < lv.cells ? lv.c : 'rgba(140,203,255,.12)' })),
      eta: lv.i >= 2 ? `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}` : '--:--',
      simTag: s.sim < 0 ? 'AUTO' : ['NORM', 'CAUT', 'WARN', 'CRIT'][s.sim],
      cycleSim,
      alertPath: spark(s.alertHist, 160, 34, 0, 90),
      alertArea: spark(s.alertHist, 160, 34, 0, 90, true),
      elements: ELEMENTS.map((e) => ({
        name: e.name,
        pct: e.pct.toFixed(1) + '%',
        w: e.pct + '%',
        bar: e.pink
          ? 'linear-gradient(90deg,rgba(217,92,255,.35),#D95CFF)'
          : 'linear-gradient(90deg,rgba(54,124,255,.35),#8CCBFF)',
        tip: e.pink ? '#FF416C' : '#E7F2FF',
      })),
      specTabs: SPEC_KEYS.map((k) => ({
        name: k,
        onClick: () => setField('spectrum', k),
        ...btnStyle(s.spectrum === k),
      })),
      spectra: SPEC_KEYS.map((k) => ({
        d: spectra?.[k]?.d ?? '',
        c: spectra?.[k]?.c ?? '#8CCBFF',
        o: s.spectrum === k ? 0.95 : 0.2,
        w: s.spectrum === k ? 1.4 : 0.8,
      })),
      scanX: String((s.t * 1.6) % 260),
      peakLambda: PEAK_MAP[s.spectrum],
      mode: s.mode,
      sliceVal: String(DEPTHS[s.depth]),
      sliceOpen: s.mode === 'section',
      autoAttr: s.auto ? 'true' : 'false',
      autoBg: s.auto ? 'rgba(54,124,255,.20)' : 'rgba(5,10,22,.62)',
      autoBc: s.auto ? '#8CCBFF' : 'rgba(140,203,255,.2)',
      autoFg: s.auto ? '#8CCBFF' : '#7D96B5',
      toggleAuto,
      modes: MODES.map((m) => ({
        name: m.name,
        onClick: () => setField('mode', m.key),
        dot: s.mode === m.key ? '#8CCBFF' : 'transparent',
        ...btnStyle(s.mode === m.key),
      })),
      depths: DEPTHS.map((_, i) => ({
        label: 'D' + (i + 1),
        onClick: () => setField('depth', i),
        ...btnStyle(s.depth === i),
      })),
      dims: [
        { v: '12.8', k: 'LENGTH cm' },
        { v: '7.4', k: 'WIDTH cm' },
        { v: '5.1', k: 'HEIGHT cm' },
        { v: '1.248', k: 'MASS kg' },
      ],
      telemetry: [
        { k: 'X', v: (-221.4 + Math.sin(s.t * 0.05) * 0.6).toFixed(1) },
        { k: 'Y', v: (438.7 + Math.cos(s.t * 0.04) * 0.5).toFixed(1) },
        { k: 'Z', v: (-112.9 + Math.sin(s.t * 0.03) * 0.4).toFixed(1) },
        { k: 'ROT', v: ((s.t * 0.11) % 360).toFixed(1) + '°' },
        { k: 'TEMP', v: (-200 + (100 - s.stability) * 0.4).toFixed(1) + ' °C' },
        { k: 'PRES', v: '1,024 atm' },
      ],
      energyNow: (last(s.energy) - 60).toFixed(1),
      energyMini: spark(s.energy.slice(-42), 150, 30, 60, 270),
      energyPath: spark(s.energy, 240, 90, 50, 280),
      energyArea: spark(s.energy, 240, 90, 50, 280, true),
      energyGhost: spark(s.ghost, 240, 90, 50, 280),
      energyBase: spark(s.base, 240, 90, 50, 280),
      peakX: String(s.energy.length ? ((peakIdx / (s.energy.length - 1)) * 240).toFixed(1) : 0),
      peakY: String(s.energy.length ? Math.max(2, 90 - ((s.energy[peakIdx] - 50) / 230) * 90).toFixed(1) : 0),
      peakVal: (Math.max(...(s.energy.length ? s.energy : [0])) - 60).toFixed(1),
      resonance: (3.2 + Math.sin(s.t * 0.06) * 0.4).toFixed(1),
      stabilityStr: s.stability.toFixed(1),
      stabilityW: s.stability.toFixed(1) + '%',
      thermalYaw: String(TVIEWS[s.tv].yaw),
      thermalPitch: String(TVIEWS[s.tv].pitch),
      thermalLabel: TVIEWS[s.tv].name + ' VIEW',
      heatBias: ((100 - s.stability) / 400).toFixed(2),
      thermalViews: TVIEWS.map((tv, i) => ({
        name: tv.name,
        yaw: String(tv.yaw),
        pitch: String(tv.pitch),
        onClick: () => setField('tv', i),
        bc: s.tv === i ? '#8CCBFF' : 'rgba(140,203,255,.16)',
        fg: s.tv === i ? '#E7F2FF' : '#7D96B5',
      })),
      slices: [
        { label: 'A · 0.0', yaw: '0.3', slice: String(LAYERS[s.layer].slice + 0.45) },
        { label: 'B · 21.4', yaw: '1.1', slice: String(LAYERS[s.layer].slice) },
        { label: 'C · 42.8', yaw: '2.0', slice: String(LAYERS[s.layer].slice - 0.45) },
      ],
      layers: LAYERS.map((l, i) => ({
        tag: l.tag,
        name: l.name,
        onClick: () => setField('layer', i),
        bg: s.layer === i ? 'rgba(255,65,108,.12)' : 'rgba(5,10,22,.62)',
        bc: s.layer === i ? 'rgba(255,65,108,.45)' : 'rgba(140,203,255,.14)',
        fg: s.layer === i ? '#FF416C' : '#7D96B5',
      })),
      layerNote: LAYERS[s.layer].note,
      metrics: [
        { name: 'STRUCTURAL INTEGRITY', a: s.si, lo: 0, hi: 100, v: s.stability.toFixed(1), c: lv.c, thr: crit },
        { name: 'ENERGY FLUCTUATION', a: s.ef, lo: 60, hi: 260, v: last(s.ef).toFixed(1), c: '#D95CFF', thr: 210 },
        { name: 'CONTAINMENT PRESSURE', a: s.cp, lo: 20, hi: 110, v: last(s.cp).toFixed(1), c: '#8CCBFF', thr: 95 },
        { name: 'FIELD DISTORTION', a: s.fd, lo: 10, hi: 130, v: last(s.fd).toFixed(1), c: lv.i >= 2 ? '#FF416C' : '#367CFF', thr: 110 },
      ].map((m) => ({
        name: m.name,
        v: m.v,
        c: m.c,
        d: spark(m.a, 120, 40, m.lo, m.hi),
        area: spark(m.a, 120, 40, m.lo, m.hi, true),
        thrY: String(Math.max(1, Math.min(39, 40 - ((m.thr - m.lo) / (m.hi - m.lo)) * 40)).toFixed(1)),
        fill: m.c === '#D95CFF' ? 'rgba(217,92,255,.12)' : m.c === '#FF416C' ? 'rgba(255,65,108,.12)' : 'rgba(54,124,255,.12)',
      })),
      envs: ENVS.map((e, i) => ({
        label: e.label,
        temp: e.temp,
        state: e.state,
        mode: e.mode,
        yaw: String(e.yaw),
        fg: e.fg,
        onClick: () => setField('env', i),
        bg: s.env === i ? 'rgba(54,124,255,.12)' : 'rgba(5,10,22,.55)',
        bc: s.env === i ? 'rgba(140,203,255,.45)' : 'rgba(140,203,255,.12)',
      })),
      log: s.log.map((l, i) => ({
        time: l.time,
        msg: l.msg,
        c: i === 0 ? '#D95CFF' : 'rgba(140,203,255,.6)',
      })),
      logCount: s.log.length + ' ENTRIES',
    };
  }, [opts.criticalThreshold, s, setField, cycleSim, toggleAuto]);

  return v;
}