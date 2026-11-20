export function spark(arr, w, h, lo, hi, close) {
  if (!arr?.length) return '';
  let d = '';
  for (let i = 0; i < arr.length; i++) {
    const x = (i / (arr.length - 1)) * w;
    const y = Math.max(1, Math.min(h - 1, h - ((arr[i] - lo) / (hi - lo)) * h));
    d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return close ? d + 'L' + w + ' ' + h + 'L0 ' + h + 'Z' : d;
}

export function buildSpectra() {
  const defs = {
    RAMAN: { c: '#8CCBFF', peaks: [[0.10, 1.0, 0.016], [0.17, 0.42, 0.012], [0.31, 0.78, 0.014], [0.44, 0.35, 0.02], [0.58, 0.62, 0.011], [0.71, 0.28, 0.018], [0.86, 0.45, 0.013]] },
    IR: { c: '#D95CFF', peaks: [[0.14, 0.55, 0.02], [0.27, 0.9, 0.013], [0.39, 0.3, 0.025], [0.52, 0.75, 0.012], [0.66, 0.5, 0.017], [0.79, 0.85, 0.011], [0.92, 0.33, 0.02]] },
    'UV-VIS': { c: '#367CFF', peaks: [[0.06, 0.85, 0.022], [0.19, 0.6, 0.018], [0.33, 0.44, 0.026], [0.47, 0.92, 0.014], [0.62, 0.38, 0.02], [0.77, 0.55, 0.016]] },
    XRF: { c: '#FF416C', peaks: [[0.22, 0.7, 0.009], [0.36, 0.5, 0.008], [0.5, 1.0, 0.007], [0.64, 0.42, 0.009], [0.83, 0.66, 0.008]] },
  };
  const out = {};
  Object.keys(defs).forEach((k) => {
    let d = '';
    const N = 300;
    for (let i = 0; i <= N; i++) {
      const x = i / N;
      let y = 0.03 + Math.abs(Math.sin(x * 41 + k.length)) * 0.018;
      defs[k].peaks.forEach((p) => {
        y += p[1] * Math.exp(-((x - p[0]) * (x - p[0])) / (2 * p[2] * p[2]));
      });
      d += (i ? 'L' : 'M') + (x * 260).toFixed(1) + ' ' + (104 - Math.min(1.05, y) * 96).toFixed(1);
    }
    out[k] = { d, c: defs[k].c };
  });
  return out;
}