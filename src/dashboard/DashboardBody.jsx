import React from 'react';
import { MineralCore } from '../components/MineralCore.jsx';
import { MineralView } from '../components/MineralView.jsx';
import { TICK_MS } from './config.js';

export function DashboardBody({ v }) {
  return (
    <>
      <div data-nx="root" style={{ display: "grid", gridTemplateColumns: "356px minmax(0,1fr) 400px", gap: "11px", padding: "12px 14px 10px", boxSizing: "border-box", background: "radial-gradient(1200px 700px at 50% 32%,rgba(54,124,255,.11),rgba(5,10,22,0) 72%),radial-gradient(700px 500px at 88% 88%,rgba(217,92,255,.05),rgba(5,10,22,0) 70%),linear-gradient(rgba(140,203,255,.026) 1px,transparent 1px) 0 0/52px 52px,linear-gradient(90deg,rgba(140,203,255,.026) 1px,transparent 1px) 0 0/52px 52px,#050A16", color: "#E7F2FF", fontFamily: "'Chakra Petch',sans-serif" }}>
      
        {/*===== HEADER =====*/}
        <header data-nx="span" data-hdr="1" style={{ gridColumn: "1/4", display: "grid", gridTemplateColumns: "auto minmax(0,1fr) auto", alignItems: "center", gap: "22px", padding: "2px 2px 9px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.10),rgba(5,10,22,0) 45%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
            <svg width="34" height="38" viewBox="0 0 34 38" aria-hidden="true">
              <path d="M17 1.5 L32.5 10.2 L32.5 27.8 L17 36.5 L1.5 27.8 L1.5 10.2 Z" fill="none" stroke="#8CCBFF" strokeWidth="1.1"></path>
              <path d="M17 6.4 L28.2 12.7 L28.2 25.3 L17 31.6 L5.8 25.3 L5.8 12.7 Z" fill="rgba(54,124,255,.10)" stroke="rgba(140,203,255,.45)" strokeWidth="0.7"></path>
              <path d="M17 6.4 L17 31.6 M5.8 12.7 L28.2 25.3 M28.2 12.7 L5.8 25.3" stroke="rgba(140,203,255,.28)" strokeWidth="0.6"></path>
              <path d="M17 13.2 L21.6 15.8 L21.6 21 L17 23.6 L12.4 21 L12.4 15.8 Z" fill="rgba(217,92,255,.30)" stroke="#D95CFF" strokeWidth="0.9"></path>
              <path d="M1.5 10.2 L1.5 5.5 M32.5 27.8 L32.5 32.5" stroke="#D95CFF" strokeWidth="1.1"></path>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ font: "700 21px 'Orbitron',sans-serif", letterSpacing: ".30em", color: "#E7F2FF", lineHeight: "1" }}>NEXORI</span>
              <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".36em", color: "#7D96B5" }}>UNKNOWN MATTER RESEARCH</span>
            </div>
            <span style={{ width: "1px", height: "34px", background: "linear-gradient(180deg,rgba(140,203,255,0),rgba(140,203,255,.35),rgba(140,203,255,0))", margin: "0 6px" }}></span>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ font: "400 11px 'Noto Sans JP',sans-serif", letterSpacing: ".26em", color: "rgba(231,242,255,.80)" }}>未知を、識る。</span>
              <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".28em", color: "#7D96B5" }}>WHAT LIES BEYOND, WE OBSERVE.</span>
            </div>
          </div>
      
          <div style={{ display: "flex", alignItems: "center", gap: "12px", justifySelf: "center" }}>
            <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".26em", color: "#7D96B5" }}>SPECIMEN</span>
            <span style={{ font: "600 16px 'JetBrains Mono',monospace", letterSpacing: ".14em", color: "#E7F2FF" }}>AX-77B</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "4px 11px", border: `1px solid ${v.lvColorSoft}`, background: v.lvWash, clipPath: "polygon(0 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%)" }}>
              <span style={{ width: "6px", height: "6px", background: v.lvColor, animation: "nxBlink 1.7s steps(1,end) infinite" }}></span>
              <span style={{ font: "600 9.5px 'Chakra Petch',sans-serif", letterSpacing: ".22em", color: v.lvColor }}>{v.lvName}</span>
            </span>
          </div>
      
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
              <span style={{ font: "500 12px 'JetBrains Mono',monospace", color: "rgba(231,242,255,.85)", letterSpacing: ".04em" }}>{v.clock}</span>
              <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".24em", color: "#7D96B5" }}>SESSION NX-4417 · LINK STABLE</span>
            </div>
            <span style={{ padding: "5px 10px", border: "1px solid rgba(217,92,255,.38)", background: "rgba(217,92,255,.07)", font: "600 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".22em", color: "#D95CFF", clipPath: "polygon(7px 0,100% 0,100% 100%,0 100%,0 7px)" }}>模擬資料 SIMULATED</span>
          </div>
        </header>
      
        {/*===== LEFT COLUMN =====*/}
        <div data-nx="col" style={{ display: "flex", flexDirection: "column", gap: "11px", minHeight: "0", overflowY: "auto", overflowX: "hidden", paddingRight: "2px" }}>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", background: "linear-gradient(150deg,rgba(140,203,255,.42),rgba(54,124,255,.10) 42%,rgba(140,203,255,.24))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 13px 8px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#E7F2FF" }}>SPECIMEN RECORD</span>
                <span style={{ font: "500 10px 'Chakra Petch',sans-serif", color: "rgba(140,203,255,.28)" }}>//</span>
                <span style={{ font: "400 9.5px 'Noto Sans JP',sans-serif", letterSpacing: ".14em", color: "rgba(140,203,255,.52)" }}>試料情報</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", font: "500 8.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>REC.0001</span>
              </div>
              <div style={{ padding: "12px 13px 13px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".26em", color: "#7D96B5" }}>SAMPLE ID</div>
                    <div style={{ font: "700 31px 'Orbitron',sans-serif", letterSpacing: ".06em", color: "#E7F2FF", lineHeight: "1.2", marginTop: "2px" }}>AX-77B</div>
                    <div style={{ font: "500 10px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "rgba(140,203,255,.62)", marginTop: "2px" }}>UNKNOWN MATERIAL</div>
                  </div>
                  <div style={{ width: "66px", height: "66px", flex: "none", position: "relative", border: "1px solid rgba(140,203,255,.22)", background: "rgba(5,10,22,.7)", clipPath: "polygon(0 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%)" }}>
                    <MineralView mode="surface" yaw="0.6" pitch="0.15" fill="0.82" />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "11px 0 10px" }}>
                  <span style={{ font: "600 9px 'Chakra Petch',sans-serif", letterSpacing: ".22em", color: "#7D96B5" }}>HAZARD LEVEL</span>
                  <span style={{ flex: "1", height: "1px", background: `linear-gradient(90deg,${v.lvColorSoft},rgba(140,203,255,0))` }}></span>
                  <span style={{ font: "700 11px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: v.lvColor }}>{v.riskWord}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", gap: "6px 12px", alignItems: "baseline" }}>
                  <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>ORIGIN</span>
                  <span style={{ font: "500 11px 'JetBrains Mono',monospace", color: "#E7F2FF", textAlign: "right" }}>Deep Space · Sector K-9</span>
                  <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>DISCOVERY</span>
                  <span style={{ font: "500 11px 'JetBrains Mono',monospace", color: "#E7F2FF", textAlign: "right" }}>2026.08.28 03:14:21</span>
                  <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>LOCATION</span>
                  <span style={{ font: "500 11px 'JetBrains Mono',monospace", color: "#E7F2FF", textAlign: "right" }}>Abyssal Trench · 7,842 m</span>
                  <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>CLASS</span>
                  <span style={{ font: "500 11px 'JetBrains Mono',monospace", color: "#E7F2FF", textAlign: "right" }}>Non-terrestrial</span>
                  <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>STATE</span>
                  <span style={{ font: "500 11px 'JetBrains Mono',monospace", color: v.lvColor, textAlign: "right" }}>{v.stateWord}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "1px", marginTop: "11px", background: "rgba(140,203,255,.14)" }}>
                  <div style={{ background: "rgba(5,10,22,.85)", padding: "7px 9px" }}>
                    <div style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#7D96B5" }}>MASS</div>
                    <div style={{ font: "500 13px 'JetBrains Mono',monospace", color: "#E7F2FF" }}>1.248<span style={{ fontSize: "9px", color: "#7D96B5" }}> kg</span></div>
                  </div>
                  <div style={{ background: "rgba(5,10,22,.85)", padding: "7px 9px" }}>
                    <div style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#7D96B5" }}>DENSITY</div>
                    <div style={{ font: "500 13px 'JetBrains Mono',monospace", color: "#E7F2FF" }}>5.72<span style={{ fontSize: "9px", color: "#7D96B5" }}> g/cm³</span></div>
                  </div>
                  <div style={{ background: "rgba(5,10,22,.85)", padding: "7px 9px" }}>
                    <div style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#7D96B5" }}>HARDNESS</div>
                    <div style={{ font: "500 13px 'JetBrains Mono',monospace", color: "#E7F2FF" }}>4.5<span style={{ fontSize: "9px", color: "#7D96B5" }}> Mohs</span></div>
                  </div>
                </div>
                <div style={{ marginTop: "12px", paddingTop: "11px", borderTop: "1px solid rgba(140,203,255,.12)" }}>
                  <div style={{ font: "300 11px 'Noto Sans JP',sans-serif", lineHeight: "1.85", letterSpacing: ".1em", color: "rgba(231,242,255,.62)" }}>「これは、ただの鉱物ではない。<br />まだ、何かが眠っている。」</div>
                  <div style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".24em", color: "#7D96B5", marginTop: "6px" }}>MORE THAN A MINERAL. SOMETHING STILL SLEEPS WITHIN.</div>
                </div>
              </div>
            </div>
          </section>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 13px 8px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#E7F2FF" }}>ELEMENTAL COMPOSITION</span>
                <span style={{ font: "500 10px 'Chakra Petch',sans-serif", color: "rgba(140,203,255,.28)" }}>//</span>
                <span style={{ font: "400 9.5px 'Noto Sans JP',sans-serif", letterSpacing: ".14em", color: "rgba(140,203,255,.52)" }}>元素組成</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", font: "500 8.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>XRF</span>
              </div>
              <div style={{ padding: "10px 13px 12px" }}>
                {v.elements.map((el, i) => (
            <React.Fragment key={el.name ?? el.label ?? el.tag ?? el.time ?? el.k}>
              <div className="nx-el-row" style={{ display: "grid", gridTemplateColumns: "74px minmax(0,1fr) 44px", alignItems: "center", gap: "10px", padding: "4px 0" }}>
                    <span style={{ font: "500 10.5px 'JetBrains Mono',monospace", color: "rgba(231,242,255,.72)" }}>{el.name}</span>
                    <span style={{ position: "relative", display: "block", height: "6px", background: "linear-gradient(90deg,rgba(140,203,255,.10),rgba(140,203,255,.04))", borderLeft: "1px solid rgba(140,203,255,.25)" }}>
                      <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", background: el.bar, width: el.w, transition: "width .7s cubic-bezier(.2,.8,.2,1)" }}></span>
                      <span style={{ position: "absolute", top: "-2px", bottom: "-2px", width: "1px", background: el.tip, left: el.w }}></span>
                    </span>
                    <span style={{ font: "600 10.5px 'JetBrains Mono',monospace", color: "#E7F2FF", textAlign: "right" }}>{el.pct}</span>
                  </div>
            </React.Fragment>
          ))}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "9px", paddingTop: "9px", borderTop: "1px solid rgba(140,203,255,.12)" }}>
                  <span style={{ font: "400 9.5px 'Noto Sans JP',sans-serif", letterSpacing: ".08em", color: "#7D96B5" }}>同定率 · IDENTIFIED</span>
                  <span style={{ font: "600 11px 'JetBrains Mono',monospace", color: "#8CCBFF" }}>58.8 %</span>
                </div>
              </div>
            </div>
          </section>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", flex: "1", minHeight: "186px", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", minHeight: "0", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 13px 8px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#E7F2FF" }}>SPECTRAL ANALYSIS</span>
                <span style={{ font: "500 10px 'Chakra Petch',sans-serif", color: "rgba(140,203,255,.28)" }}>//</span>
                <span style={{ font: "400 9.5px 'Noto Sans JP',sans-serif", letterSpacing: ".14em", color: "rgba(140,203,255,.52)" }}>分光分析</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", font: "500 8.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>λ 200–2000</span>
              </div>
              <div style={{ display: "flex", gap: "4px", padding: "9px 13px 5px" }}>
                {v.specTabs.map((tab, i) => (
            <React.Fragment key={tab.name}>
              <button type="button" onClick={tab.onClick} style={{ flex: "1", padding: "5px 0", background: tab.bg, border: `1px solid ${tab.bc}`, color: tab.fg, font: "600 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".14em", cursor: "pointer", clipPath: "polygon(0 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%)" }} >{tab.name}</button>
            </React.Fragment>
          ))}
              </div>
              <div style={{ flex: "1", minHeight: "96px", position: "relative", margin: "4px 13px 2px", border: "1px solid rgba(140,203,255,.12)", background: "linear-gradient(rgba(140,203,255,.03) 1px,transparent 1px) 0 0/100% 25%,linear-gradient(90deg,rgba(140,203,255,.03) 1px,transparent 1px) 0 0/12.5% 100%,rgba(5,10,22,.6)" }}>
                <svg viewBox="0 0 260 110" preserveAspectRatio="none" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
                  {v.spectra.map((sp, si) => (
            <React.Fragment key={si}>
              <path d={sp.d} fill="none" stroke={sp.c} strokeWidth={sp.w} strokeOpacity={sp.o} vectorEffect="non-scaling-stroke"></path>
            </React.Fragment>
          ))}
                  <line x1={v.scanX} y1="0" x2={v.scanX} y2="110" stroke="#D95CFF" strokeWidth="1" strokeOpacity="0.45" vectorEffect="non-scaling-stroke"></line>
                </svg>
                <div style={{ position: "absolute", left: "7px", top: "6px", padding: "2px 7px", background: "rgba(5,10,22,.85)", borderLeft: "2px solid #D95CFF", font: "500 8.5px 'JetBrains Mono',monospace", color: "#D95CFF" }}>PEAK λ {v.peakLambda} nm</div>
                {v.anomaly && (<><div style={{ position: "absolute", right: "7px", top: "6px", padding: "2px 7px", background: "rgba(255,65,108,.12)", border: "1px solid rgba(255,65,108,.45)", font: "600 8px 'Chakra Petch',sans-serif", letterSpacing: ".14em", color: "#FF416C" }}>ANOMALOUS PEAK</div></>)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 13px 10px", font: "500 8px 'JetBrains Mono',monospace", color: "#7D96B5" }}>
                <span>200</span><span>600</span><span>1,000</span><span>1,400</span><span>1,800</span><span>(nm)</span>
              </div>
            </div>
          </section>
        </div>
      
        {/*===== CENTER STAGE =====*/}
        <div data-nx="stage" style={{ position: "relative", minHeight: "0", display: "flex", padding: "1px", background: "linear-gradient(160deg,rgba(140,203,255,.34),rgba(54,124,255,.08) 45%,rgba(217,92,255,.18))", clipPath: "polygon(0 22px,22px 0,100% 0,100% calc(100% - 22px),calc(100% - 22px) 100%,0 100%)" }}>
          <div style={{ flex: "1", position: "relative", overflow: "hidden", background: "radial-gradient(58% 52% at 50% 46%,rgba(54,124,255,.15),rgba(5,10,22,0) 74%),linear-gradient(180deg,rgba(8,18,37,.55),rgba(5,10,22,.86))", clipPath: "polygon(0 21px,21px 0,100% 0,100% calc(100% - 21px),calc(100% - 21px) 100%,0 100%)" }}>
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(rgba(140,203,255,.024) 1px,transparent 1px) 0 0/38px 38px,linear-gradient(90deg,rgba(140,203,255,.024) 1px,transparent 1px) 0 0/38px 38px", pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", left: "8%", right: "8%", top: "12%", bottom: "12%", border: "1px solid rgba(140,203,255,.055)", pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", left: "50%", top: "0", bottom: "0", width: "1px", background: "linear-gradient(180deg,rgba(140,203,255,0),rgba(140,203,255,.10),rgba(140,203,255,0))", pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", left: "0", right: "0", top: "50%", height: "1px", background: "linear-gradient(90deg,rgba(140,203,255,0),rgba(140,203,255,.08),rgba(140,203,255,0))", pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", left: "0", right: "0", top: "0", height: "1px", background: "linear-gradient(90deg,transparent,rgba(140,203,255,.55),transparent)", animation: "nxSweep 11s linear infinite", pointerEvents: "none" }}></div>
      
            <MineralCore mode={v.mode} slice={v.sliceVal} autorotate={v.autoAttr} alert={v.alertAmt} />
      
            <div style={{ position: "absolute", left: "16px", top: "13px", display: "flex", alignItems: "center", gap: "9px", pointerEvents: "none" }}>
              <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
              <span style={{ font: "600 12px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#E7F2FF" }}>3D ANALYSIS</span>
              <span style={{ font: "500 10px 'Chakra Petch',sans-serif", color: "rgba(140,203,255,.28)" }}>//</span>
              <span style={{ font: "400 9.5px 'Noto Sans JP',sans-serif", letterSpacing: ".14em", color: "rgba(140,203,255,.5)" }}>立体解析 · REAL-TIME SCAN</span>
            </div>
      
            <div style={{ position: "absolute", right: "16px", top: "11px", display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ font: "400 10px 'Noto Sans JP',sans-serif", letterSpacing: ".18em", color: "rgba(140,203,255,.55)", animation: "nxPulse 2.8s ease-in-out infinite" }}>観測中…</span>
              <button type="button" onClick={v.toggleAuto} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 12px", background: v.autoBg, border: `1px solid ${v.autoBc}`, color: v.autoFg, font: "600 9px 'Chakra Petch',sans-serif", letterSpacing: ".2em", cursor: "pointer", clipPath: "polygon(0 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%)" }} >
                <span style={{ width: "5px", height: "5px", background: v.autoFg }}></span>AUTO SCAN
              </button>
            </div>
      
            <div data-nx="stagerail" className="nx-stagerail" style={{ position: "absolute", left: "16px", top: "54px" }}>
              <span className="nx-stagerail-label">SCAN LAYERS</span>
              {v.modes.map((m, i) => (
            <React.Fragment key={m.name ?? m.label ?? m.tag ?? m.time ?? m.k}>
              <button type="button" className="nx-stage-mode-btn" onClick={m.onClick} style={{ background: m.bg, border: `1px solid ${m.bc}`, color: m.fg }}>
                  <span style={{ width: "7px", height: "7px", transform: "rotate(45deg)", border: `1px solid ${m.fg}`, background: m.dot, flexShrink: 0 }}></span>
                  <span className="nx-stage-mode-name">{m.name}</span>
                </button>
            </React.Fragment>
          ))}
              {v.sliceOpen && (
                <div className="nx-stage-depth">
                  <div className="nx-stage-depth-title">SECTION DEPTH</div>
                  <div className="nx-stage-depth-row">
                    {v.depths.map((d) => (
                      <button
                        key={d.label}
                        type="button"
                        className="nx-stage-depth-btn"
                        onClick={d.onClick}
                        style={{
                          background: d.bg,
                          border: `1px solid ${d.bc}`,
                          color: d.fg,
                        }}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
      
            <div style={{ position: "absolute", left: "16px", bottom: "16px", display: "flex", flexDirection: "column", gap: "8px", pointerEvents: "none" }}>
              {v.dims.map((dm, i) => (
            <React.Fragment key={dm.name ?? dm.label ?? dm.tag ?? dm.time ?? dm.k}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ font: "600 17px 'JetBrains Mono',monospace", color: "#E7F2FF" }}>{dm.v}</span>
                  <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>{dm.k}</span>
                </div>
            </React.Fragment>
          ))}
            </div>
      
            <div style={{ position: "absolute", right: "16px", top: "58px", display: "flex", flexDirection: "column", gap: "9px", width: "176px", pointerEvents: "none" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end" }}>
                <span style={{ font: "600 12px 'JetBrains Mono',monospace", letterSpacing: ".12em", color: "#D95CFF" }}>AX-77B</span>
                <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>REAL-TIME SCAN · 3D MODEL</span>
              </div>
              <div style={{ padding: "9px 11px", background: "rgba(5,10,22,.72)", border: "1px solid rgba(140,203,255,.18)", clipPath: "polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>ENERGY FLUX</span>
                  <span style={{ font: "400 8.5px 'Noto Sans JP',sans-serif", color: "rgba(140,203,255,.4)" }}>能量</span>
                </div>
                <div style={{ font: "600 21px 'JetBrains Mono',monospace", color: "#8CCBFF", lineHeight: "1.35" }}>+{v.energyNow}<span style={{ fontSize: "11px" }}>%</span></div>
                <svg viewBox="0 0 150 30" preserveAspectRatio="none" style={{ width: "100%", height: "26px", display: "block" }}>
                  <path d={v.energyMini} fill="none" stroke="#8CCBFF" strokeWidth="1" strokeOpacity=".85" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </div>
              <div style={{ padding: "9px 11px", background: "rgba(5,10,22,.72)", border: `1px solid ${v.lvColorSoft}`, clipPath: "polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>STABILITY</span>
                  <span style={{ font: "400 8.5px 'Noto Sans JP',sans-serif", color: "rgba(140,203,255,.4)" }}>安定度</span>
                </div>
                <div style={{ font: "600 21px 'JetBrains Mono',monospace", color: v.lvColor, lineHeight: "1.35" }}>{v.stabilityStr}<span style={{ fontSize: "11px" }}>%</span></div>
                <div style={{ height: "4px", background: "rgba(140,203,255,.12)", marginTop: "4px" }}><span style={{ display: "block", height: "100%", background: v.lvColor, width: v.stabilityW, transition: "width .4s linear" }}></span></div>
              </div>
              <div style={{ padding: "9px 11px", background: "rgba(5,10,22,.72)", border: "1px solid rgba(140,203,255,.14)", clipPath: "polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)" }}>
                <div style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5", marginBottom: "5px" }}>TELEMETRY</div>
                {v.telemetry.map((tl, i) => (
            <React.Fragment key={tl.name ?? tl.label ?? tl.tag ?? tl.time ?? tl.k}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px", padding: "1.5px 0" }}>
                    <span style={{ font: "500 9px 'Chakra Petch',sans-serif", letterSpacing: ".14em", color: "#7D96B5" }}>{tl.k}</span>
                    <span style={{ font: "500 10px 'JetBrains Mono',monospace", color: "rgba(231,242,255,.82)" }}>{tl.v}</span>
                  </div>
            </React.Fragment>
          ))}
              </div>
            </div>
      
            <div style={{ position: "absolute", left: "0", right: "0", bottom: "15px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", pointerEvents: "none" }}>
              <span style={{ font: "500 15px 'Orbitron',sans-serif", letterSpacing: ".34em", color: "rgba(231,242,255,.75)" }}>360°</span>
              <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".28em", color: "rgba(140,203,255,.5)" }}>DRAG TO ROTATE · SCROLL TO ZOOM</span>
            </div>
          </div>
        </div>
      
        {/*===== RIGHT COLUMN =====*/}
        <div data-nx="col" style={{ display: "flex", flexDirection: "column", gap: "11px", minHeight: "0", overflowY: "auto", overflowX: "hidden", paddingRight: "2px" }}>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", background: "linear-gradient(150deg,rgba(255,65,108,.55),rgba(217,92,255,.18) 55%,rgba(255,65,108,.35))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)", animation: "nxDanger 3.4s ease-in-out infinite" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", background: "linear-gradient(168deg,rgba(34,9,24,.94),rgba(9,6,18,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 13px 8px", borderBottom: "1px solid rgba(255,65,108,.25)", background: "linear-gradient(90deg,rgba(255,65,108,.16),rgba(255,65,108,0) 70%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#FF416C,#D95CFF)" }}></span>
                <span style={{ font: "700 14px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: v.lvColor }}>{v.lvName}</span>
                <span style={{ font: "400 10px 'Noto Sans JP',sans-serif", letterSpacing: ".14em", color: v.lvColor, opacity: ".75" }}>{v.lvJp}</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{ width: "8px", height: "8px", background: v.lvColor, animation: "nxBlink 1.5s steps(1,end) infinite" }}></span>
                  <button type="button" onClick={v.cycleSim} style={{ padding: "3px 8px", background: "rgba(5,10,22,.6)", border: "1px solid rgba(140,203,255,.22)", color: "#7D96B5", font: "600 8px 'Chakra Petch',sans-serif", letterSpacing: ".14em", cursor: "pointer" }} >SIM {v.simTag}</button>
                </span>
              </div>
              <div style={{ padding: "11px 13px 13px" }}>
                <div style={{ font: "600 11.5px 'Chakra Petch',sans-serif", letterSpacing: ".13em", color: "rgba(231,242,255,.9)" }}>{v.lvMsg}</div>
                <div style={{ font: "400 10px 'Noto Sans JP',sans-serif", letterSpacing: ".05em", color: "rgba(231,242,255,.5)", marginTop: "3px" }}>{v.lvMsgJp}</div>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "10px", alignItems: "end", marginTop: "11px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>RISK</span>
                      <span style={{ display: "flex", gap: "3px", flex: "1" }}>
                        {v.riskCells.map((rc, i) => (
            <React.Fragment key={rc.name ?? rc.label ?? rc.tag ?? rc.time ?? rc.k}>
              <span style={{ flex: "1", height: "7px", background: rc.bg, transform: "skewX(-18deg)" }}></span>
            </React.Fragment>
          ))}
                      </span>
                      <span style={{ font: "600 10px 'JetBrains Mono',monospace", color: v.lvColor }}>{v.riskWord}</span>
                    </div>
                    <svg viewBox="0 0 160 34" preserveAspectRatio="none" style={{ width: "100%", height: "34px", display: "block", marginTop: "8px" }}>
                      <path d={v.alertArea} fill="rgba(255,65,108,.14)"></path>
                      <path d={v.alertPath} fill="none" stroke="#FF416C" strokeWidth="1" vectorEffect="non-scaling-stroke"></path>
                    </svg>
                  </div>
                  <div style={{ textAlign: "right", paddingLeft: "10px", borderLeft: "1px solid rgba(255,65,108,.22)" }}>
                    <div style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#7D96B5" }}>EST. TIME TO CRITICAL</div>
                    <div style={{ font: "700 26px 'Orbitron',sans-serif", letterSpacing: ".06em", color: v.lvColor, lineHeight: "1.35" }}>{v.eta}</div>
                    <div style={{ font: "500 8.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>{v.stabilityStr} % STABILITY</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", flex: "1.05", minHeight: "210px", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", minHeight: "0", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 13px 8px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#E7F2FF" }}>THERMAL IMAGING</span>
                <span style={{ font: "500 10px 'Chakra Petch',sans-serif", color: "rgba(140,203,255,.28)" }}>//</span>
                <span style={{ font: "400 9.5px 'Noto Sans JP',sans-serif", letterSpacing: ".14em", color: "rgba(140,203,255,.52)" }}>熱解析</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", font: "500 8.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>{v.thermalLabel}</span>
              </div>
              <div style={{ flex: "1", minHeight: "0", display: "grid", gridTemplateColumns: "minmax(0,1fr) 30px 108px", gap: "9px", padding: "10px 13px 12px" }}>
                <div style={{ position: "relative", border: "1px solid rgba(140,203,255,.16)", background: "rgba(5,10,22,.72)", minHeight: "120px" }}>
                  <MineralView priority mode="thermal" yaw={v.thermalYaw} pitch={v.thermalPitch} heat={v.heatBias} fill="0.82" />
                  <div style={{ position: "absolute", left: "7px", bottom: "6px", font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".14em", color: "rgba(231,242,255,.45)" }}>SURFACE TEMP DISTRIBUTION</div>
                  <div style={{ position: "absolute", left: "0", right: "0", top: "0", height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,65,108,.5),transparent)", animation: "nxTrack 6s linear infinite" }}></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <span style={{ font: "500 7.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>320</span>
                  <span style={{ flex: "1", width: "8px", background: "linear-gradient(180deg,#FFC2B4,#FF416C,#E8D46A,#4FC3F5,#1E5FD6,#050A16)" }}></span>
                  <span style={{ font: "500 7.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>-20</span>
                  <span style={{ font: "500 7px 'Chakra Petch',sans-serif", color: "#7D96B5" }}>°C</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gridTemplateRows: "repeat(3,minmax(0,1fr))", gap: "5px", minHeight: "0" }}>
                  {v.thermalViews.map((tv, i) => (
            <React.Fragment key={tv.name ?? tv.label ?? tv.tag ?? tv.time ?? tv.k}>
              <button type="button" onClick={tv.onClick} style={{ position: "relative", minHeight: "0", border: `1px solid ${tv.bc}`, background: "rgba(5,10,22,.72)", cursor: "pointer", padding: "0" }} >
                      <MineralView mode="thermal" yaw={tv.yaw} pitch={tv.pitch} heat={v.heatBias} fill="0.7" />
                      <span style={{ position: "absolute", left: "3px", bottom: "2px", font: "600 7px 'Chakra Petch',sans-serif", letterSpacing: ".14em", color: tv.fg }}>{tv.name}</span>
                    </button>
            </React.Fragment>
          ))}
                </div>
              </div>
            </div>
          </section>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", flex: "1", minHeight: "190px", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div className="nx-panel-card" style={{ flex: "1", display: "flex", flexDirection: "column", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 13px 8px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#E7F2FF" }}>INTERNAL STRUCTURE</span>
                <span style={{ font: "500 10px 'Chakra Petch',sans-serif", color: "rgba(140,203,255,.28)" }}>//</span>
                <span style={{ font: "400 9.5px 'Noto Sans JP',sans-serif", letterSpacing: ".14em", color: "rgba(140,203,255,.52)" }}>内部構造</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", font: "500 8.5px 'JetBrains Mono',monospace", color: "#7D96B5" }}>TOMOGRAPHY</span>
              </div>
              <div className="nx-internal-body" style={{ flex: "1", display: "grid", gridTemplateColumns: "minmax(0,1fr) 132px", gap: "9px", padding: "10px 13px 12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "6px", minHeight: "0" }}>
                  {v.slices.map((s, i) => (
            <React.Fragment key={s.name ?? s.label ?? s.tag ?? s.time ?? s.k}>
              <div style={{ position: "relative", border: "1px solid rgba(140,203,255,.14)", background: "rgba(5,10,22,.68)", minHeight: "70px" }}>
                      <MineralView mode="internal" yaw={s.yaw} pitch="0.1" slice={s.slice} fill="0.74" />
                      <span style={{ position: "absolute", left: "5px", bottom: "4px", font: "500 7.5px 'JetBrains Mono',monospace", color: "rgba(231,242,255,.5)" }}>{s.label}</span>
                    </div>
            </React.Fragment>
          ))}
                </div>
                <div className="nx-layer-panel" style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                  <span style={{ font: "600 8px 'Chakra Petch',sans-serif", letterSpacing: ".2em", color: "#7D96B5" }}>LAYER ANALYSIS</span>
                  {v.layers.map((ly, i) => (
            <React.Fragment key={ly.name ?? ly.label ?? ly.tag ?? ly.time ?? ly.k}>
              <button type="button" className="nx-layer-btn" onClick={ly.onClick} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", background: ly.bg, border: `1px solid ${ly.bc}`, cursor: "pointer", textAlign: "left", clipPath: "polygon(0 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%)" }} >
                      <span style={{ font: "600 8.5px 'JetBrains Mono',monospace", color: ly.fg, flexShrink: 0 }}>{ly.tag}</span>
                      <span className="nx-layer-name" style={{ font: "500 9px 'Chakra Petch',sans-serif", letterSpacing: ".06em", color: ly.fg }}>{ly.name}</span>
                    </button>
            </React.Fragment>
          ))}
                  <div className="nx-layer-note" style={{ marginTop: "auto", paddingTop: "6px", borderTop: "1px solid rgba(140,203,255,.12)", font: "500 8px 'JetBrains Mono',monospace", color: "#7D96B5", lineHeight: "1.6" }}>{v.layerNote}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      
        {/*===== BOTTOM ROW =====*/}
        <div data-nx="bottom" style={{ gridColumn: "1/4", gridRow: "3", display: "grid", gridTemplateColumns: "1.22fr 1fr 1.05fr 1fr", gap: "11px" }}>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", minWidth: "0", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", minWidth: "0", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 13px 7px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11px 'Chakra Petch',sans-serif", letterSpacing: ".17em", color: "#E7F2FF" }}>STABILITY MONITORING</span>
                <span style={{ font: "400 9px 'Noto Sans JP',sans-serif", letterSpacing: ".12em", color: "rgba(140,203,255,.5)" }}>安定性監視</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", font: "500 8px 'JetBrains Mono',monospace", color: "#7D96B5" }}>{TICK_MS} ms</span>
              </div>
              <div className="nx-bottom-body nx-metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "1px", background: "rgba(140,203,255,.1)", alignContent: "stretch" }}>
                {v.metrics.map((mt, i) => (
            <React.Fragment key={mt.name ?? mt.label ?? mt.tag ?? mt.time ?? mt.k}>
              <div className="nx-metric-cell" style={{ background: "rgba(5,10,22,.85)", padding: "8px 9px 6px", minWidth: "0" }}>
                    <span className="nx-metric-label">{mt.name}</span>
                    <span style={{ font: "600 18px 'JetBrains Mono',monospace", color: mt.c, lineHeight: "1.3", flexShrink: 0 }}>{mt.v}<span style={{ fontSize: "10px" }}>%</span></span>
                    <svg viewBox="0 0 120 40" preserveAspectRatio="none" style={{ marginTop: "4px", display: "block" }}>
                      <path d={mt.area} fill={mt.fill}></path>
                      <line x1="0" y1={mt.thrY} x2="120" y2={mt.thrY} stroke="rgba(255,65,108,.45)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke"></line>
                      <path d={mt.d} fill="none" stroke={mt.c} strokeWidth="1" vectorEffect="non-scaling-stroke"></path>
                    </svg>
                  </div>
            </React.Fragment>
          ))}
              </div>
            </div>
          </section>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", minWidth: "0", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", minWidth: "0", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 13px 7px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11px 'Chakra Petch',sans-serif", letterSpacing: ".17em", color: "#E7F2FF" }}>ENERGY FLUCTUATION</span>
                <span style={{ font: "400 9px 'Noto Sans JP',sans-serif", letterSpacing: ".12em", color: "rgba(140,203,255,.5)" }}>能量変動</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px" }}><span style={{ width: "5px", height: "5px", background: "#D95CFF", animation: "nxPulse 1.8s ease-in-out infinite" }}></span><span style={{ font: "500 8px 'JetBrains Mono',monospace", color: "#D95CFF" }}>LIVE</span></span>
              </div>
              <div className="nx-bottom-body nx-energy-body" style={{ padding: "9px 13px 10px", gap: "8px" }}>
                <div className="nx-energy-chart" style={{ border: "1px solid rgba(140,203,255,.1)", background: "linear-gradient(rgba(140,203,255,.03) 1px,transparent 1px) 0 0/100% 25%,rgba(5,10,22,.6)" }}>
                  <svg viewBox="0 0 240 90" preserveAspectRatio="none" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
                    <path d={v.energyArea} fill="rgba(54,124,255,.16)"></path>
                    <path d={v.energyBase} fill="none" stroke="rgba(140,203,255,.35)" strokeWidth="1" vectorEffect="non-scaling-stroke"></path>
                    <path d={v.energyPath} fill="none" stroke="#8CCBFF" strokeWidth="1.2" vectorEffect="non-scaling-stroke"></path>
                    <path d={v.energyGhost} fill="none" stroke="#FF416C" strokeWidth="1" strokeOpacity=".7" vectorEffect="non-scaling-stroke"></path>
                    <circle cx={v.peakX} cy={v.peakY} r="2.4" fill="#D95CFF"></circle>
                  </svg>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px", flexShrink: 0 }}>
                  <div>
                    <div style={{ font: "600 15px 'JetBrains Mono',monospace", color: "#8CCBFF" }}>+{v.energyNow}<span style={{ fontSize: "9px" }}>%</span></div>
                    <div style={{ font: "500 7.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#7D96B5" }}>ENERGY FLUX</div>
                  </div>
                  <div>
                    <div style={{ font: "600 15px 'JetBrains Mono',monospace", color: "#E7F2FF" }}>{v.resonance}<span style={{ fontSize: "9px" }}> Hz</span></div>
                    <div style={{ font: "500 7.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#7D96B5" }}>RESONANCE</div>
                  </div>
                  <div>
                    <div style={{ font: "600 15px 'JetBrains Mono',monospace", color: "#FF416C" }}>{v.peakVal}<span style={{ fontSize: "9px" }}>%</span></div>
                    <div style={{ font: "500 7.5px 'Chakra Petch',sans-serif", letterSpacing: ".18em", color: "#7D96B5" }}>PEAK</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <section style={{ position: "relative", display: "flex", padding: "1px", minWidth: "0", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", minWidth: "0", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 13px 7px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11px 'Chakra Petch',sans-serif", letterSpacing: ".17em", color: "#E7F2FF" }}>ENVIRONMENTAL RESPONSE</span>
                <span style={{ font: "400 9px 'Noto Sans JP',sans-serif", letterSpacing: ".12em", color: "rgba(140,203,255,.5)" }}>環境反応</span>
              </div>
              <div className="nx-bottom-body nx-env-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px", padding: "9px 13px 11px" }}>
                {v.envs.map((ev, i) => (
            <React.Fragment key={ev.name ?? ev.label ?? ev.tag ?? ev.time ?? ev.k}>
              <button type="button" className="nx-env-btn" onClick={ev.onClick} style={{ gap: "5px", padding: "6px", background: ev.bg, border: `1px solid ${ev.bc}`, cursor: "pointer", minWidth: "0", textAlign: "left", clipPath: "polygon(0 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%)" }} >
                    <span className="nx-env-preview" style={{ border: "1px solid rgba(140,203,255,.1)", background: "rgba(5,10,22,.65)", display: "block" }}>
                      <MineralView mode={ev.mode} yaw={ev.yaw} pitch="0.12" fill="0.72" />
                    </span>
                    <span style={{ font: "500 8px 'Chakra Petch',sans-serif", letterSpacing: ".16em", color: "#7D96B5" }}>{ev.label}</span>
                    <span className="nx-env-stat">
                      <span style={{ font: "600 12px 'JetBrains Mono',monospace", color: "#E7F2FF" }}>{ev.temp}</span>
                      <span style={{ font: "600 8px 'Chakra Petch',sans-serif", letterSpacing: ".08em", color: ev.fg }}>{ev.state}</span>
                    </span>
                  </button>
            </React.Fragment>
          ))}
              </div>
            </div>
          </section>
      
          <section className="nx-bottom-log-panel" style={{ position: "relative", display: "flex", padding: "1px", minWidth: "0", background: "linear-gradient(150deg,rgba(140,203,255,.36),rgba(54,124,255,.10) 45%,rgba(140,203,255,.22))", clipPath: "polygon(0 15px,15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%)" }}>
            <div style={{ flex: "1", display: "flex", flexDirection: "column", minWidth: "0", background: "linear-gradient(168deg,rgba(8,18,37,.95),rgba(5,10,22,.97))", clipPath: "polygon(0 14px,14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)" }}>
              <div className="nx-panel-hdr" style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 13px 7px", borderBottom: "1px solid rgba(140,203,255,.16)", background: "linear-gradient(90deg,rgba(54,124,255,.16),rgba(54,124,255,0) 62%)" }}>
                <span style={{ width: "3px", height: "13px", background: "linear-gradient(180deg,#8CCBFF,#367CFF)" }}></span>
                <span style={{ font: "600 11px 'Chakra Petch',sans-serif", letterSpacing: ".17em", color: "#E7F2FF" }}>RESEARCH LOG</span>
                <span style={{ font: "400 9px 'Noto Sans JP',sans-serif", letterSpacing: ".12em", color: "rgba(140,203,255,.5)" }}>研究記録</span>
                <span className="nx-hdr-meta" style={{ marginLeft: "auto", font: "500 8px 'JetBrains Mono',monospace", color: "#7D96B5" }}>{v.logCount}</span>
              </div>
              <div className="nx-bottom-body nx-bottom-log" style={{ padding: "5px 13px 10px" }}>
                {v.log.map((lg, i) => (
            <React.Fragment key={`${lg.time}-${i}`}>
              <div style={{ display: "grid", gridTemplateColumns: "48px minmax(0,1fr)", gap: "9px", padding: "4px 0", borderBottom: "1px solid rgba(140,203,255,.06)" }}>
                    <span style={{ font: "500 9px 'JetBrains Mono',monospace", color: lg.c }}>{lg.time}</span>
                    <span style={{ font: "400 9.5px 'Chakra Petch',sans-serif", letterSpacing: ".03em", color: "rgba(231,242,255,.64)", lineHeight: "1.45" }}>{lg.msg}</span>
                  </div>
            </React.Fragment>
          ))}
              </div>
            </div>
          </section>
        </div>
      
        <footer data-nx="span" style={{ gridColumn: "1/4", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "5px 2px 0", borderTop: "1px solid rgba(140,203,255,.12)", minWidth: "0" }}>
          <span style={{ font: "600 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".26em", color: "#7D96B5" }}>NEXORI RESEARCH · V2.0 · MATTER · CONSCIOUSNESS · POSSIBILITIES</span>
          <span style={{ font: "500 8.5px 'Chakra Petch',sans-serif", letterSpacing: ".24em", color: "rgba(140,203,255,.45)" }}>ALL FIGURES SIMULATED 模擬資料 · まだ見ぬ世界が、ここにある。</span>
        </footer>
      </div>
    </>
  );
}
