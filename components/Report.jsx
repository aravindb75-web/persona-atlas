import Link from "next/link";
import { TYPES, ROLES, IDENTITY } from "@/lib/types";
import { AXES, FACTORS } from "@/lib/questions";
import { bigFiveForType } from "@/lib/scoring";
import { lookupCareer, fmtMoney } from "@/lib/onet";
import { bestMatches, band } from "@/lib/compatibility";
import { FAMOUS } from "@/lib/famous";
import RadarChart from "@/components/RadarChart";

// Build representative dimension bars from the 4-letter code + identity.
// (Every type/gallery page renders consistent bars without needing raw answers.)
function buildDims(code, identity) {
  const map = { E: "EI", I: "EI", N: "NS", S: "NS", T: "TF", F: "TF", J: "JP", P: "JP" };
  const spread = [72, 66, 61, 69]; // pleasant, believable strengths per axis
  const dims = {};
  code.split("").forEach((letter, idx) => {
    const dim = map[letter];
    const isFirst = AXES[dim].first === letter;
    const strength = spread[idx];
    dims[dim] = {
      letter,
      strength,
      firstPct: isFirst ? strength : 100 - strength,
    };
  });
  dims.AT = {
    letter: identity,
    strength: 64,
    firstPct: identity === "A" ? 64 : 36,
  };
  return dims;
}

function DimBar({ dimKey, data, color }) {
  const ax = AXES[dimKey];
  return (
    <div className="dim">
      <div className="dim__top">
        <span>{ax.poles[0]} ({ax.first})</span>
        <span className="dim__pct">{ax.poles[data.letter === ax.first ? 0 : 1]} · {data.strength}%</span>
        <span>{ax.poles[1]} ({ax.second})</span>
      </div>
      <div className="dim__bar">
        <div className="dim__fill" style={{ width: `${data.firstPct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function Report({ code, identity }) {
  const t = TYPES[code];
  const role = ROLES[t.role];
  const id = IDENTITY[identity] || IDENTITY.A;
  const dims = buildDims(code, identity);
  const five = bigFiveForType(code, identity);
  const matches = bestMatches(code, 5);

  return (
    <div className="report">
      {/* Table of contents */}
      <div className="panel no-print">
        <h4 style={{ marginTop: 0 }}>Your report includes</h4>
        <div className="toc">
          <a href="#overview">Overview</a>
          <a href="#dimensions">Your 5 dimensions</a>
          <a href="#bigfive">Big Five profile</a>
          <a href="#strengths">Strengths & blind spots</a>
          <a href="#education">Education</a>
          <a href="#career">Careers & outlook</a>
          <a href="#finance">Financial style</a>
          <a href="#love">Relationships</a>
          <a href="#matches">Best matches</a>
          <a href="#growth">Growth path</a>
        </div>
      </div>

      {/* Overview */}
      <section className="panel" id="overview">
        <h3><span className="ic">🧭</span> Who the {t.name} is</h3>
        <p>{t.overview}</p>
        <h4>The {id.label} ({identity}) variant</h4>
        <p>{id.blurb}</p>
      </section>

      {/* Dimensions */}
      <section className="panel" id="dimensions">
        <h3><span className="ic">📊</span> Your five dimensions</h3>
        <p>Every personality is a blend of five sliding scales. Here's how the {t.code}-{identity} tends to sit on each.</p>
        <div className="two-col" style={{ alignItems: "center" }}>
          <RadarChart
            color={role.color}
            data={["EI", "NS", "TF", "JP", "AT"].map((k) => ({
              label: AXES[k].poles[dims[k].letter === AXES[k].first ? 0 : 1],
              sub: `${dims[k].letter} · ${dims[k].strength}%`,
              value: dims[k].strength,
            }))}
          />
          <div>
            <DimBar dimKey="EI" data={dims.EI} color={role.color} />
            <DimBar dimKey="NS" data={dims.NS} color={role.color} />
            <DimBar dimKey="TF" data={dims.TF} color={role.color} />
            <DimBar dimKey="JP" data={dims.JP} color={role.color} />
            <DimBar dimKey="AT" data={dims.AT} color={role.color} />
          </div>
        </div>
      </section>

      {/* Big Five (scientific) */}
      <section className="panel" id="bigfive">
        <h3><span className="ic">🧪</span> Your Big Five profile</h3>
        <p>
          Personova's five sliders map onto the <strong>Big Five (OCEAN)</strong> — the model psychologists
          actually use. This test draws on the public-domain{" "}
          <strong>IPIP Big-Five Factor Markers</strong> (Goldberg, 1992), so your profile is scientifically grounded.
        </p>
        {["O", "C", "E", "A", "S"].map((f) => {
          const F = FACTORS[f];
          const v = five[f];
          return (
            <div className="dim" key={f}>
              <div className="dim__top">
                <span>{F.full}</span>
                <span className="dim__pct">{v}%</span>
                <span>{v >= 50 ? F.high : F.low}</span>
              </div>
              <div className="dim__bar"><div className="dim__fill" style={{ width: `${v}%`, background: role.color }} /></div>
            </div>
          );
        })}
        <p className="no-print" style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>
          Percentiles are illustrative of the {code}-{identity} pattern; taking the test yourself computes them from your answers.
        </p>
      </section>

      {/* Strengths & weaknesses */}
      <section className="panel" id="strengths">
        <h3><span className="ic">💪</span> Strengths & blind spots</h3>
        <div className="two-col">
          <div>
            <h4>Natural strengths</h4>
            <ul className="ticks">{t.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <h4>Watch out for</h4>
            <ul className="ticks warns">{t.weaknesses.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="panel" id="education">
        <h3><span className="ic">🎓</span> Education & how you learn</h3>
        <p>{t.education.style}</p>
        <h4>Environments where you thrive</h4>
        <ul className="ticks">{t.education.environments.map((s) => <li key={s}>{s}</li>)}</ul>
        <h4>Study & choice tips</h4>
        <ul className="ticks arrows">{t.education.tips.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      {/* Career */}
      <section className="panel" id="career">
        <h3><span className="ic">🚀</span> Careers & likely fields of success</h3>
        <h4>Fields where you shine</h4>
        <div className="tags">{t.fields.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
        <h4>Roles that fit you well</h4>
        <div className="tags">{t.careers.map((s) => <span className="tag" key={s}>{s}</span>)}</div>

        <h4>Career outlook (India)</h4>
        <div className="onet-scroll">
          <table className="onet">
            <thead><tr><th>Role</th><th>Indian job market</th><th>Median salary (INR)</th><th>Demand outlook</th></tr></thead>
            <tbody>
              {t.careers.map((role) => {
                const o = lookupCareer(role);
                return (
                  <tr key={role}>
                    <td>{role}</td>
                    <td>{o ? o.label : "—"}</td>
                    <td>{o ? (o.median ? fmtMoney(o.median) + "/yr" : o.medianText) : "—"}</td>
                    <td>{o ? o.growth : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "8px 0 0" }}>
          Approximate Indian median salaries (AmbitionBox / Glassdoor India / PayScale India, 2024). Indicative — actual pay varies by city, company, and experience.
        </p>

        <h4>Your work style</h4>
        <p>{t.workStyle}</p>
      </section>

      {/* Finance */}
      <section className="panel" id="finance">
        <h3><span className="ic">💰</span> Your financial style</h3>
        <p>{t.finance.style}</p>
        <div className="two-col">
          <div>
            <h4>Money strengths</h4>
            <ul className="ticks">{t.finance.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <h4>Money pitfalls</h4>
            <ul className="ticks warns">{t.finance.pitfalls.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
        <h4>Advice tuned to you</h4>
        <ul className="ticks arrows">{t.finance.tips.map((s) => <li key={s}>{s}</li>)}</ul>
        <div className="disclaimer" style={{ marginTop: 12 }}>
          This is general educational guidance based on personality tendencies — not personalized
          financial advice. For decisions about your money, consult a licensed professional.
        </div>
      </section>

      {/* Relationships */}
      <section className="panel" id="love">
        <h3><span className="ic">💞</span> Relationships & life partner</h3>
        <h4>As a partner</h4>
        <p>{t.relationships.asPartner}</p>
        <h4>Who complements you</h4>
        <p>{t.relationships.idealPartner}</p>
        <h4>Watch out for</h4>
        <ul className="ticks warns">{t.relationships.watchOut.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      {/* Best matches */}
      <section className="panel" id="matches">
        <h3><span className="ic">💘</span> Your best matches</h3>
        <p>Types that tend to pair most naturally with the {t.name}, based on shared world-view and complementary styles.</p>
        <div className="match-grid">
          {matches.map((m) => {
            const bd = band(m.v);
            return (
              <Link key={m.code} href={`/result?type=${m.code}-A`} className="match-card">
                <div className="match-card__score" style={{ background: bd.color }}>{m.v}</div>
                <div>
                  <div className="match-card__code" style={{ color: ROLES[TYPES[m.code].role].color }}>{m.code}</div>
                  <div className="match-card__name">{m.name}</div>
                  <div className="match-card__band" style={{ color: bd.color }}>{bd.label} match</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/compatibility" className="btn btn--ghost no-print" style={{ marginTop: 16 }}>
          Explore the full 16×16 compatibility matrix →
        </Link>
      </section>

      {/* Growth */}
      <section className="panel" id="growth">
        <h3><span className="ic">🌱</span> Your growth path</h3>
        <ul className="ticks arrows">{t.growth.map((s) => <li key={s}>{s}</li>)}</ul>
        <h4>People who share your type</h4>
        <div className="famous-row">{(FAMOUS[code] || t.famous).map((s) => <span className="famous" key={s}>{s}</span>)}</div>
      </section>
    </div>
  );
}
