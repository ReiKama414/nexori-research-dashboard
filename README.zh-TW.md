# NEXORI Research Dashboard

> **科幻研究控制台** — 含模擬遙測與程序生成 3D 礦物檢視的互動儀表板

[English](./README.md) · **繁體中文**

[ReiKama414](https://github.com/ReiKama414) · [個人網站](https://reikama414.vercel.app/) · [線上預覽](https://reikama414.github.io/nexori-research-dashboard/) · [快速開始](#快速開始) · [授權](./LICENSE)

---

## 亮點

- **即時面板** — 安定度、光譜、熱影像切片、環境區塊與研究日誌依固定節拍更新
- **程序 3D** — `mineral-core` 主舞台支援拖曳、縮放與掃描模式，底層為 Three.js
- **Vite + React** — 元件化 UI、Hook 驅動模擬，不再依賴 Design Component runtime

---

## 技術棧

| 層級 | 技術 |
| --- | --- |
| UI | React 18 |
| 建置 | Vite 5 |
| 3D | Three.js 0.150（`src/lib/nexori-3d.js` 自訂元素） |
| 字型 | Google Fonts（Orbitron、Chakra Petch、JetBrains Mono、Noto Sans JP） |

---

## 快速開始

```bash
npm install
npm run dev
```

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 開發伺服器（Vite 預設埠，通常為 **5173**） |
| `npm run build` | 產出 `dist/` |
| `npm run preview` | 本機預覽正式版 |

---

## 目錄結構

```
nexori-research-dashboard/
├── public/                 網站圖示
├── src/
│   ├── main.jsx            掛載 Three 與 React
│   ├── App.jsx
│   ├── components/         mineral-core / mineral-view 包裝
│   ├── dashboard/
│   │   ├── useDashboard.js 模擬與畫面資料
│   │   ├── Dashboard.jsx
│   │   └── DashboardBody.jsx 版面標記
│   ├── lib/nexori-3d.js
│   └── styles/dashboard.css
├── index.html
└── vite.config.js
```

> **說明：** `scripts/` 為自舊版單檔 HTML 遷移時的一次性轉換腳本，若只手改 JSX 可刪除

---

## 正確性聲明

所有數值、圖表與試料資訊皆為**虛構／模擬展示**，不可用於真實研究或安全判斷

---

## 第三方

| 項目 | 授權／來源 |
| --- | --- |
| [Three.js](https://github.com/mrdoob/three.js) | MIT |
| Google Fonts | [Google Fonts 條款](https://developers.google.com/fonts/faq) |

---

## 授權

MIT — 見 [LICENSE](./LICENSE)，Copyright (c) 2026 [ReiKama414](https://github.com/ReiKama414)