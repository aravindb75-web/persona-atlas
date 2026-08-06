import Link from "next/link";
import { TYPES, ROLES, IDENTITY } from "@/lib/types";
import Doodle from "@/components/Doodle";
import Report from "@/components/Report";
import PrintButton from "@/components/PrintButton";

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
  return {
    title: `${t.name} (${code}-${identity}) — Your Persona Atlas Report`,
    description: t.tagline,
  };
}

export default function ResultPage({ searchParams }) {
  const { code, identity } = parse(searchParams?.type);
  const t = TYPES[code];
  const role = ROLES[t.role];
  const id = IDENTITY[identity];

  return (
    <main className="container container--narrow" style={{ padding: "34px 22px 60px" }}>
      {/* Result hero */}
      <div
        className="result-hero"
        style={{ background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)` }}
      >
        <div className="result-hero__grid">
          <Doodle code={code} size={230} />
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

      {/* Actions */}
      <div className="no-print" style={{ display: "flex", gap: 12, margin: "20px 0", flexWrap: "wrap" }}>
        <Link href="/test" className="btn btn--primary">↻ Retake the test</Link>
        <PrintButton />
        <Link href="/#types" className="btn btn--ghost">Compare other types</Link>
      </div>

      {/* Full dynamic report */}
      <Report code={code} identity={identity} />

      {/* Explore other identity variant */}
      <div className="panel no-print" style={{ textAlign: "center", marginTop: 20 }}>
        <p style={{ margin: "0 0 12px", color: "var(--muted)" }}>
          Curious how the other Identity variant differs?
        </p>
        <Link href={`/result?type=${code}-${identity === "A" ? "T" : "A"}`} className="btn btn--ghost">
          View the {code}-{identity === "A" ? "T (Turbulent)" : "A (Assertive)"} version
        </Link>
      </div>
    </main>
  );
}
