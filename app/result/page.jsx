import Link from "next/link";
import { TYPES, ROLES, IDENTITY } from "@/lib/types";
import Character from "@/components/Character";
import ReportGate from "@/components/ReportGate";

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
    title: `${t.name} (${code}-${identity}) — Personova`,
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
      <div className="result-hero" style={{ background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)` }}>
        <div className="result-hero__grid">
          <Character code={code} size={240} />
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

      <div className="no-print" style={{ display: "flex", gap: 12, margin: "20px 0", flexWrap: "wrap" }}>
        <Link href="/test" className="btn btn--ghost">↻ Retake the test</Link>
        <Link href="/#types" className="btn btn--ghost">Compare other types</Link>
      </div>

      {/* Email + OTP gate → reveals the full report */}
      <ReportGate code={code} identity={identity} />
    </main>
  );
}
