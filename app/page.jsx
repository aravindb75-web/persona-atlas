import Link from "next/link";
import { TYPES, ROLES } from "@/lib/types";
import Doodle from "@/components/Doodle";

const GROUPS = {
  Analyst: ["INTJ", "INTP", "ENTJ", "ENTP"],
  Diplomat: ["INFJ", "INFP", "ENFJ", "ENFP"],
  Sentinel: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  Explorer: ["ISTP", "ISFP", "ESTP", "ESFP"],
};

const GROUP_BLURB = {
  Analyst: "Rational and impartial, they excel at intellectual debates and strategic problem-solving.",
  Diplomat: "Cooperative and imaginative, they value empathy, harmony, and meaning.",
  Sentinel: "Practical and dependable, they bring order, stability, and follow-through.",
  Explorer: "Spontaneous and hands-on, they thrive on action, flexibility, and the moment.",
};

export default function Home() {
  return (
    <main>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="pill">✨ Free · 60 questions · ~10 minutes</span>
            <h1>
              Meet the <span>real you</span> — one honest test away.
            </h1>
            <p className="lead">
              Answer 60 quick statements and unlock a vivid, animated portrait of
              your personality — plus a complete life report covering your career,
              education, money, and relationships.
            </p>
            <div className="hero__cta">
              <Link href="/test" className="btn btn--primary btn--lg">
                Take the Test →
              </Link>
              <Link href="#types" className="btn btn--ghost btn--lg">
                Explore the 16 Types
              </Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat"><b>16</b><span>personality types</span></div>
              <div className="hero__stat"><b>5</b><span>core dimensions</span></div>
              <div className="hero__stat"><b>40+</b><span>page life report</span></div>
            </div>
          </div>
          <div className="hero__art">
            <div className="blob" />
            <Doodle code="ENFP" size={300} />
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="section" id="how">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps to your full portrait</h2>
          </div>
          <div className="features">
            <div className="feature">
              <div className="ic">📝</div>
              <h4>1 · Answer honestly</h4>
              <p>Rate 60 statements on a 7-point Agree–Disagree scale. There are no right answers — only yours.</p>
            </div>
            <div className="feature">
              <div className="ic">🧮</div>
              <h4>2 · We map 5 dimensions</h4>
              <p>Mind, Energy, Nature, Tactics, and Identity combine into one of 16 types with its own animated doodle.</p>
            </div>
            <div className="feature">
              <div className="ic">📖</div>
              <h4>3 · Read your life report</h4>
              <p>Get tailored guidance on careers, education, finances, and love — printable to a full PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- THE 16 TYPES ---------------- */}
      <section className="section" id="types">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">The four families</span>
            <h2>The 16 personality types</h2>
            <p>Grouped into four temperaments. Tap any type to preview its animated character and report.</p>
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
                        <span>{TYPES[code].name}</span>
                        <small>{code}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY OF DOODLES ---------------- */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Animated action figures</span>
            <h2>Every type gets a character</h2>
            <p>Each personality is illustrated as a friendly, animated doodle that waves hello.</p>
          </div>
          <div className="type-grid">
            {Object.keys(TYPES).map((code) => (
              <Link href={`/result?type=${code}-A`} className="mini-card" key={code}>
                <Doodle code={code} size={150} />
                <div className="code" style={{ color: ROLES[TYPES[code].role].color }}>{code}</div>
                <div className="name">{TYPES[code].name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section">
        <div className="container container--narrow">
          <div className="panel" style={{ textAlign: "center", background: "linear-gradient(135deg,#efe6f7,#e2f4ec)" }}>
            <h2 style={{ fontSize: 30, margin: "0 0 8px" }}>Ready to meet yourself?</h2>
            <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 20px" }}>
              It takes about ten minutes and it's completely free. Your answers stay in your browser.
            </p>
            <Link href="/test" className="btn btn--primary btn--lg">Start the free test →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
