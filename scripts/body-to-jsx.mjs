import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
let h = fs.readFileSync(path.join(root, 'scripts', '_body.html'), 'utf8');

function camelProp(cssProp) {
  return cssProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function styleToJsx(styleStr) {
  const parts = styleStr.split(';').filter((p) => p.trim());
  const entries = parts.map((part) => {
    const colon = part.indexOf(':');
    if (colon === -1) return null;
    const prop = part.slice(0, colon).trim();
    let val = part.slice(colon + 1).trim();
    const jsxProp = camelProp(prop);
    let jsxVal;
    const brace = val.match(/^\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}$/) || val.match(/^\{([a-zA-Z0-9_.]+)\}$/);
    if (brace) {
      const e = brace[1];
      jsxVal = e.includes('.') ? e : `v.${e}`;
    } else if (val.includes('{{')) {
      const inner = val.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, '${$1}');
      jsxVal = '`' + inner + '`';
    } else {
      jsxVal = JSON.stringify(val);
    }
    return `${jsxProp}: ${jsxVal}`;
  }).filter(Boolean);
  return `style={{ ${entries.join(', ')} }}`;
}

function attrsToJsx(s) {
  s = s
    .replace(/\bclass=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/vector-effect=/g, 'vectorEffect=')
    .replace(/preserve-aspect-ratio=/g, 'preserveAspectRatio=')
    .replace(/view-box=/g, 'viewBox=')
    .replace(/style-hover="[^"]*"/g, '')
    .replace(/hint-[^=]*="[^"]*"/g, '');

  s = s.replace(/style="([^"]*)"/g, (_, inner) => {
    if (inner.includes('{{') || /\{[a-z]/.test(inner)) return styleToJsx(inner.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, '{$1}'));
    return `style={{ ${inner.split(';').filter(Boolean).map((p) => {
      const colon = p.indexOf(':');
      const prop = camelProp(p.slice(0, colon).trim());
      return `${prop}: ${JSON.stringify(p.slice(colon + 1).trim())}`;
    }).join(', ')} }}`;
  });

  return s;
}

function convertBindings(s) {
  s = s.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (_, e) => {
    if (e.includes('.')) return `{${e}}`;
    return `{v.${e}}`;
  });
  s = s.replace(/onClick="\{\{\s*([a-zA-Z0-9_.]+)\.pick\s*\}\}"/g, 'onClick={$1.onClick}');
  s = s.replace(/onClick="\{\{\s*([a-zA-Z0-9_]+)\s*\}\}"/g, 'onClick={v.$1}');
  return s;
}

function convertInner(s) {
  s = attrsToJsx(s);
  s = convertBindings(s);
  return s.trim();
}

// mineral components
h = h.replace(
  /<x-import component-from-global-scope="mineral-core"[^>]*><\/x-import>/g,
  '<MineralCore mode="{v.mode}" slice="{v.sliceVal}" autorotate="{v.autoAttr}" alert="{v.alertAmt}" />',
);
h = h.replace(
  /<x-import component-from-global-scope="mineral-view" from="\.\/nexori-3d\.js" mode="surface" yaw="0\.6" pitch="0\.15" fill="0\.82"[^>]*><\/x-import>/g,
  '<MineralView mode="surface" yaw="0.6" pitch="0.15" fill="0.82" />',
);
h = h.replace(
  /<x-import[^>]*priority="1"[^>]*mode="thermal"[^>]*><\/x-import>/g,
  '<MineralView priority mode="thermal" yaw="{{ thermalYaw }}" pitch="{{ thermalPitch }}" heat="{{ heatBias }}" fill="0.82" />',
);
h = h.replace(
  /<x-import[^>]*mode="thermal" yaw="\{\{ tv\.yaw \}\}"[^>]*fill="0\.7"[^>]*><\/x-import>/g,
  '<MineralView mode="thermal" yaw="{{ tv.yaw }}" pitch="{{ tv.pitch }}" heat="{{ heatBias }}" fill="0.7" />',
);
h = h.replace(
  /<x-import[^>]*mode="internal" yaw="\{\{ s\.yaw \}\}"[^>]*><\/x-import>/g,
  '<MineralView mode="internal" yaw="{{ s.yaw }}" pitch="0.1" slice="{{ s.slice }}" fill="0.74" />',
);
h = h.replace(
  /<x-import[^>]*mode="\{\{ ev\.mode \}\}"[^>]*><\/x-import>/g,
  '<MineralView mode="{{ ev.mode }}" yaw="{{ ev.yaw }}" pitch="0.12" fill="0.72" />',
);

h = h.replace(
  /<x-import component-from-global-scope="mineral-core"[^>]*><\/x-import>/g,
  '<MineralCore />',
);
// fix mineral-core with template attrs
h = h.replace(
  /<x-import component-from-global-scope="mineral-core" from="\.\/nexori-3d\.js" mode="\{\{ mode \}\}" slice="\{\{ sliceVal \}\}" autorotate="\{\{ autoAttr \}\}" alert="\{\{ alertAmt \}\}"[^>]*><\/x-import>/g,
  '<MineralCore mode="{{ mode }}" slice="{{ sliceVal }}" autorotate="{{ autoAttr }}" alert="{{ alertAmt }}" />',
);

h = h.replace(/<sc-if value="\{\{ anomaly \}\}"[^>]*>([\s\S]*?)<\/sc-if>/g, (_, i) => `{v.anomaly && (<>${convertInner(i)}</>)}`);
h = h.replace(/<sc-if value="\{\{ sliceOpen \}\}"[^>]*>([\s\S]*?)<\/sc-if>/g, (_, i) => `{v.sliceOpen && (<>${convertInner(i)}</>)}`);

let prev;
do {
  prev = h;
  h = h.replace(/<sc-for list="\{\{ (\w+) \}\}" as="(\w+)"[^>]*>([\s\S]*?)<\/sc-for>/, (_, list, as, inner) => {
    const body = convertInner(inner);
    const key = as === 'tab' ? `${as}.name` : as === 'd' ? `${as}.label` : `${as}.name ?? ${as}.label ?? ${as}.tag ?? ${as}.time ?? ${as}.k`;
    return `{v.${list}.map((${as}, i) => (
      <React.Fragment key={${key}}>
        ${body}
      </React.Fragment>
    ))}`;
  });
} while (h !== prev);

h = convertInner(h);

// MineralCore props as JSX
h = h.replace(
  /<MineralCore mode="\{\{ mode \}\}" slice="\{\{ sliceVal \}\}" autorotate="\{\{ autoAttr \}\}" alert="\{\{ alertAmt \}\}" \/>/g,
  '<MineralCore mode={v.mode} slice={v.sliceVal} autorotate={v.autoAttr} alert={v.alertAmt} />',
);
h = h.replace(/<MineralView priority mode="thermal" yaw="\{\{ thermalYaw \}\}" pitch="\{\{ thermalPitch \}\}" heat="\{\{ heatBias \}\}" fill="0\.82" \/>/g,
  '<MineralView priority mode="thermal" yaw={v.thermalYaw} pitch={v.thermalPitch} heat={v.heatBias} fill="0.82" />');

const out = `import React from 'react';
import { MineralCore } from '../components/MineralCore.jsx';
import { MineralView } from '../components/MineralView.jsx';

export function DashboardBody({ v }) {
  return (
    <>
${h.split('\n').map((l) => '      ' + l).join('\n')}
    </>
  );
}
`;
fs.writeFileSync(path.join(root, 'src', 'dashboard', 'DashboardBody.jsx'), out);
console.log('wrote DashboardBody.jsx');