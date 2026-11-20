# NEXORI Research Dashboard

> **Sci‑fi research console** — interactive specimen dashboard with simulated telemetry and procedural 3D mineral views

**English** · [繁體中文](./README.zh-TW.md)

[ReiKama414](https://github.com/ReiKama414) · [Portfolio](https://reikama414.vercel.app/) · [Live demo](https://reikama414.github.io/nexori-research-dashboard/) · [Quick start](#quick-start) · [License](./LICENSE)

---

## Highlights

- **Live panels** — stability, spectra, thermal slices, environment tiles, and research log update on a fixed tick
- **Procedural 3D** — `mineral-core` stage with drag, zoom, and scan modes backed by Three.js
- **Vite + React** — component tree, hooks-based simulation, no Design Component runtime

---

## Stack

| Layer | Tech |
| --- | --- |
| UI | React 18 |
| Build | Vite 5 |
| 3D | Three.js 0.150 (`src/lib/nexori-3d.js` web components) |
| Fonts | Google Fonts (Orbitron, Chakra Petch, JetBrains Mono, Noto Sans JP) |

---

## Quick start

```bash
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (port **5174**) |
| `npm run build` | Production bundle → `dist/` |
| `npm run preview` | Serve `dist/` locally |

---

## Layout

```
nexori-research-dashboard/
├── public/                 favicon
├── src/
│   ├── main.jsx            Three global + app mount
│   ├── App.jsx
│   ├── components/         mineral-core / mineral-view wrappers
│   ├── dashboard/
│   │   ├── useDashboard.js simulation + view model
│   │   ├── Dashboard.jsx   root dashboard
│   │   └── DashboardBody.jsx  layout markup
│   ├── lib/nexori-3d.js    WebGL custom elements
│   └── styles/dashboard.css
├── index.html
└── vite.config.js
```

> **Note:** `scripts/` contains one-off HTML→JSX helpers used when migrating off the legacy single-file page. Safe to delete if you only edit JSX by hand.

---

## Simulation disclaimer

All readings, graphs, and specimen metadata are **fictional / simulated** for presentation. Do not use for real research or safety decisions.

---

## Third-party

| Asset | License / source |
| --- | --- |
| [Three.js](https://github.com/mrdoob/three.js) | MIT |
| Google Fonts | [Google Fonts terms](https://developers.google.com/fonts/faq) |

---

## License

MIT — see [LICENSE](./LICENSE). Copyright (c) 2026 [ReiKama414](https://github.com/ReiKama414)