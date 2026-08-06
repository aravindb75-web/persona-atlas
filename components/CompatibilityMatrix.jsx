"use client";

import { useState } from "react";
import Link from "next/link";
import { TYPES, ROLES } from "@/lib/types";
import { CODES, score, band, note } from "@/lib/compatibility";

export default function CompatibilityMatrix() {
  const [hover, setHover] = useState(null); // {a, b}
  const sel = hover ? { a: hover.a, b: hover.b, v: score(hover.a, hover.b) } : null;

  return (
    <div>
      <div className="matrix-scroll">
        <div className="matrix" style={{ gridTemplateColumns: `56px repeat(${CODES.length}, 1fr)` }}>
          {/* corner */}
          <div className="matrix__corner">You ↓ / Them →</div>
          {/* column headers */}
          {CODES.map((c) => (
            <div key={"h" + c} className="matrix__colh" style={{ color: ROLES[TYPES[c].role].color }}>{c}</div>
          ))}
          {/* rows */}
          {CODES.map((a) => (
            <div key={"row" + a} style={{ display: "contents" }}>
              <div className="matrix__rowh" style={{ color: ROLES[TYPES[a].role].color }}>{a}</div>
              {CODES.map((b) => {
                const v = score(a, b);
                const bd = band(v);
                const active = hover && hover.a === a && hover.b === b;
                return (
                  <div
                    key={a + b}
                    className={`matrix__cell${active ? " is-active" : ""}`}
                    style={{ background: bd.color, opacity: active ? 1 : 0.2 + 0.8 * (v / 100) }}
                    onMouseEnter={() => setHover({ a, b })}
                    title={`${a} × ${b}: ${v} (${bd.label})`}
                  >
                    <span>{v}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="matrix-legend">
        {["Excellent", "Strong", "Good", "Fair", "Challenging"].map((l) => {
          const c = { Excellent: "#10b981", Strong: "#22c55e", Good: "#0ea5e9", Fair: "#f59e0b", Challenging: "#ef4444" }[l];
          return <span key={l} className="matrix-legend__item"><i style={{ background: c }} />{l}</span>;
        })}
      </div>

      {/* detail */}
      {sel && (
        <div className="panel matrix-detail">
          <div className="matrix-detail__head">
            <Link href={`/result?type=${sel.a}-A`} style={{ color: ROLES[TYPES[sel.a].role].color, fontWeight: 800 }}>{sel.a} · {TYPES[sel.a].name}</Link>
            <span style={{ margin: "0 10px", color: "var(--muted)" }}>×</span>
            <Link href={`/result?type=${sel.b}-A`} style={{ color: ROLES[TYPES[sel.b].role].color, fontWeight: 800 }}>{sel.b} · {TYPES[sel.b].name}</Link>
            <span className="matrix-detail__score" style={{ background: band(sel.v).color }}>{sel.v} · {band(sel.v).label}</span>
          </div>
          <p style={{ margin: "10px 0 0", color: "#3f3a58" }}>{note(sel.a, sel.b)}</p>
        </div>
      )}
      {!sel && <p style={{ textAlign: "center", color: "var(--muted)", marginTop: 16 }}>Hover any cell to see how those two types pair up.</p>}
    </div>
  );
}
