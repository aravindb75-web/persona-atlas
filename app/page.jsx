import Link from "next/link";
import { TYPES, ROLES } from "@/lib/types";
import Character from "@/components/Character";
import Hero3DClient from "@/components/Hero3DClient";
import TiltGallery from "@/components/TiltGallery";

const GROUPS = {
  Analyst: ["INTJ", "INTP", "ENTJ", "ENTP"],
  Diplomat: ["INFJ", "INFP", "ENFJ", "ENFP"],
  Sentinel: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  Explorer: ["ISTP", "ISFP", "ESTP", "ESFP"],
};
const GROUP_BLURB = {
  Analyst: "Rational and impartial — masters of strategy and intellectual debate.",
  Diplomat: "Cooperative and imaginative — driven by empathy, harmony, and meaning.",
  Sentinel: "Practical and dependable — bringing order, stability, and follow-through.",
  Explorer: "Spontaneous and hands-on — thriving on action, flair, and the moment.",
};

export default function Home() {
  return (
    <main>
      {/* HERO with live 3D scene */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="pill">✨ Free · 60 questions · ~10 minutes · 3D</span>
            <h1>Discover the <span>universe</span> inside you.</h1>
            <p className="lead">
              Personova maps your personality across five dimensions into one of 16 vivid
              characters — then unlocks a complete life report on your career, education,
              money, and relationships.
            </p>
            <div className="hero__cta">
              <Link href="/test" className="btn btn--primary btn--lg">Take the Test →</Link>
              <Link href="#types" className="btn btn--ghost btn--lg">Meet the 16 characters</Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat"><b>16</b><span>characters</span></div>
              <div className="hero__stat"><b>5</b><span>dimensions</span></div>
              <div className="hero__stat"><b>∞</b><span>self-insight</span></div>
            </div>
          </div>
          <div className="hero__art">
            <Hero3DClient />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="section" id="how">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps to your portrait</h2>
          </div>
          <div className="features">
            <div className="feature"><div className="ic">📝</div><h4>1 · Answer honestly</h4>
              <p>Rate 60 statements on a 7-point Agree–Disagree scale. No right answers — only yours.</p></div>
            <div className="feature"><div className="ic">🧬</div><h4>2 · Meet your character</h4>
              <p>Five dimensions resolve into one of 16 low-poly personalities, each with its own vibe.</p></div>
            <div className="feature"><div className="ic">🔐</div><h4>3 · Unlock your report</h4>
              <p>Verify your email with a one-time code to reveal your full career, money & love report.</p></div>
          </div>
        </div>
      </section>

      {/* FAMILIES */}
      <section className="section" id="types">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Four families</span>
            <h2>The 16 personality characters</h2>
            <p>Grouped into four temperaments. Hover a character to feel it move — tap to open its report.</p>
          </div>
          <div className="roles">
            {Object.keys(GROUPS).map((g) => {
              const role = ROLES[g];
              return (
                <div className="role-card" key={g} style={{ borderTop: `4px solid ${role.color}` }}>
                  <div className="role-emoji">{role.emoji}</div>
                  <h3 style={{ color: role.color }}>{role.label}s</h3>
                  <p>{GROUP_BLURB[g]}</p>
                  <div className="type-list">
                    {GROUPS[g].map((code) => (
                      <Link href={`/result?type=${code}-A`} className="type-chip" key={code}>
                        <span>{TYPES[code].name}</span><small>{code}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE TILT GALLERY */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Low-poly cast</span>
            <h2>Every type, its own character</h2>
            <p>Faceted, animated, and interactive — move your cursor across the cast.</p>
          </div>
          <TiltGallery />
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container container--narrow">
          <div className="panel cta-panel">
            <h2 style={{ fontSize: 30, margin: "0 0 8px" }}>Ready to meet your character?</h2>
            <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 20px" }}>
              Ten minutes, completely free. Your answers stay in your browser until you choose to unlock the report.
            </p>
            <Link href="/test" className="btn btn--primary btn--lg">Start the free test →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
