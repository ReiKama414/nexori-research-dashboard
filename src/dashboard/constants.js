export const LEVELS = [
  { k: 'NORMAL', jp: '正常', c: '#8CCBFF', msg: 'ALL PARAMETERS WITHIN NOMINAL RANGE', jpm: '全パラメータは正常範囲内です', risk: 'LOW', cells: 2 },
  { k: 'CAUTION', jp: '注意', c: '#D95CFF', msg: 'MINOR RESONANCE DRIFT OBSERVED', jpm: '軽微な共鳴のずれを観測しています', risk: 'MEDIUM', cells: 3 },
  { k: 'WARNING', jp: '警告', c: '#FF416C', msg: 'STRUCTURAL INSTABILITY DETECTED', jpm: '構造の不安定化を検出しました', risk: 'HIGH', cells: 5 },
  { k: 'CRITICAL', jp: '危険', c: '#FF416C', msg: 'STABILITY BELOW SAFE THRESHOLD · CONTAINMENT REQUIRED', jpm: '安定性が安全閾値を下回っています', risk: 'EXTREME', cells: 6 },
];

export const ELEMENTS = [
  { name: 'Unknown (X)', pct: 41.2, pink: true },
  { name: 'Si', pct: 18.4 },
  { name: 'O', pct: 12.1 },
  { name: 'Fe', pct: 8.7 },
  { name: 'C', pct: 6.3 },
  { name: 'Ti', pct: 3.1 },
  { name: 'Others', pct: 10.2 },
];

export const LAYERS = [
  { tag: 'L1', name: 'Crystalline Shell', slice: 1.0, note: 'L1 結晶外殻 / 4.2 mm · refractive anomaly 0.31' },
  { tag: 'L2', name: 'Unknown Matrix', slice: 0.5, note: 'L2 未知母材 / amorphous lattice · no match' },
  { tag: 'L3', name: 'Energy Core', slice: 0.0, note: 'L3 能量核 / sustained emission · unidentified' },
  { tag: 'L4', name: 'Fracture Zone', slice: -0.5, note: 'L4 破断領域 / propagating micro-fractures' },
];

export const TVIEWS = [
  { name: 'TOP', yaw: 0.2, pitch: 1.2 },
  { name: 'FRONT', yaw: 0, pitch: 0.1 },
  { name: 'BACK', yaw: 3.14, pitch: 0.1 },
  { name: 'LEFT', yaw: 1.57, pitch: 0.1 },
  { name: 'RIGHT', yaw: -1.57, pitch: 0.1 },
  { name: 'BOTTOM', yaw: 0.2, pitch: -1.2 },
];

export const ENVS = [
  { label: 'LOW TEMP', temp: '-200°C', state: 'STABLE', mode: 'cold', yaw: 0.4, fg: '#8CCBFF' },
  { label: 'NORMAL', temp: '25°C', state: 'DORMANT', mode: 'surface', yaw: 1.2, fg: '#7D96B5' },
  { label: 'HIGH TEMP', temp: '300°C', state: 'REACTIVE', mode: 'hot', yaw: 2.2, fg: '#FF416C' },
];

export const MODES = [
  { key: 'surface', name: 'SURFACE' },
  { key: 'thermal', name: 'THERMAL' },
  { key: 'internal', name: 'INTERNAL' },
  { key: 'energy', name: 'ENERGY' },
  { key: 'section', name: 'SECTION' },
];

export const LOGPOOL = [
  'Spectral scan completed (XRF)',
  'Unusual energy fluctuation recorded',
  'Containment field adjustment applied',
  'Micro-fracture propagation observed',
  'Sample entered low-temperature chamber',
  'Self-repair behaviour registered',
  'Unknown radiation signature logged',
  'Thermal gradient re-mapped',
  'Resonance spike above baseline',
  'Layer L3 emission re-measured',
];

export const SPEC_KEYS = ['RAMAN', 'IR', 'UV-VIS', 'XRF'];
export const PEAK_MAP = { RAMAN: '532.1', IR: '1,128.4', 'UV-VIS': '398.7', XRF: '1,672.0' };
export const DEPTHS = [1.1, 0.6, 0.1, -0.4, -0.9];