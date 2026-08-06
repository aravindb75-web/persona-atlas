import Link from "next/link";
import { TYPES, ROLES, IDENTITY } from "@/lib/types";
import Character from "@/components/Character";

function parse(raw) {
  const val = (raw || "INTJ-A").toUpperCase();
  const [code, id] = val.split("-");
  const validCode = TYPES[code] ? code : "INTJ";
  const identity = id === "T" ? "T" : "A";
  return { code: validCode, identity };
}

export function generateMetadata({ searchParams }) {
  const { code, identity } = parse(searchParams?.type);
  const t = TYPES[code];
  return { title: `${t.name} (${code}-${identity}) — Personova`, description: t.tagline };
}

export default function ResultPage({ searchParams }) {
  const { code, identity } = parse(searchParams?.type);
  const t = TYPES[code];
  const role = ROLES[t.role];
  const id = IDENTITY[identity];

  return (
    <main className="container container--narrow" style={{ padding: "34px 22px 60px" }}>
      <div className="result-hero" style={{ background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)` }}>
        <div className="result-hero__grid">
          <Character code={code} size={230} />
          <div>
            <div className="code">{code}-{identity}</div>
            <h1>The {t.name}</h1>
            <p className="tagline">{t.tagline}</p>
            <div className="badge-row">
              <span className="badge">{role.emoji} {role.label}</span>
              <span className="badge">{id.label} Identity</span>
            </div>
          </div>
        </div>
      </div>

      <section className="panel" style={{ marginTop: 22 }}>
        <h3><span className="ic">🧭</span> A glimpse of the {t.name}</h3>
        <p>{t.overview}</p>
        <h4>Signature strengths</h4>
        <div className="tags">{t.strengths.slice(0, 4).map((s) => <span className="tag" key={s}>{s}</span>)}</div>
        <h4>Shines in</h4>
        <div className="tags">{t.fields.slice(0, 5).map((s) => <span className="tag" key={s}>{s}</span>)}</div>
      </section>

      <div className="panel" style={{ textAlign: "center", marginTop: 20, background: "linear-gradient(135deg, rgba(109,59,245,0.1), rgba(236,72,153,0.08))" }}>
        <h2 style={{ fontSize: 26, margin: "0 0 8px", fontFamily: "var(--font-display)" }}>Want your own full report?</h2>
        <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 18px" }}>
          Take the free test to get your personalised {t.name}-style report — Big Five profile, India career & salary
          outlook, finances, and best matches — auto-downloaded as a PDF.
        </p>
        <Link href="/test" className="btn btn--primary btn--lg">Take the free test →</Link>
      </div>

      <div style={{ textAlign: "center", marginTop: 18 }}>
        <Link href="/#types" className="btn btn--ghost">← Explore other characters</Link>
      </div>
    </main>
  );
}
