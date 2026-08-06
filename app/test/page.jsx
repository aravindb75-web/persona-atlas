"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS } from "@/lib/questions";
import { scoreTest, SCALE } from "@/lib/scoring";
import { getSupabase } from "@/lib/supabase";
import { downloadReportPdf } from "@/lib/generatePdf";
import { TYPES, ROLES } from "@/lib/types";
import { COUNTRIES, flag } from "@/lib/countries";
import Character from "@/components/Character";

export default function TestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState("loading"); // loading|blocked|test|form|done
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [i, setI] = useState(0);
  const [result, setResult] = useState(null);

  // ---- gate: must be logged in; one test per email ----
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) { router.replace("/login?next=/test"); return; }
      setEmail(user.email || "");
      const { data: rows } = await supabase.from("personova_results").select("id").eq("email", user.email).limit(1);
      if (rows && rows.length > 0) setPhase("blocked");
      else setPhase("test");
    });
  }, [router]);

  function choose(v) {
    const next = [...answers]; next[i] = v; setAnswers(next);
  }
  function goNext() {
    if (i < QUESTIONS.length - 1) setI(i + 1);
    else { setResult(scoreTest(answers.map((a) => (a === null ? 0 : a)))); setPhase("form"); }
  }

  if (phase === "loading") return <main className="test-wrap"><p style={{ textAlign: "center", color: "var(--muted)" }}>Loading…</p></main>;

  if (phase === "blocked") {
    return (
      <main className="test-wrap" style={{ textAlign: "center" }}>
        <div className="q-card">
          <div style={{ fontSize: 44 }}>✅</div>
          <h2 style={{ fontFamily: "var(--font-display)" }}>You've already taken the test</h2>
          <p style={{ color: "var(--muted)" }}>
            Each email can take the Personova test once. You signed in as <strong>{email}</strong>.
          </p>
          <Link href="/" className="btn btn--ghost" style={{ marginTop: 12 }}>← Back to home</Link>
        </div>
      </main>
    );
  }

  if (phase === "form") return <CompletionForm email={email} result={result} onDone={() => setPhase("done")} />;

  if (phase === "done") {
    const t = TYPES[result.code];
    return (
      <main className="test-wrap" style={{ textAlign: "center" }}>
        <div className="q-card">
          <Character code={result.code} size={190} />
          <div className="result-hero__grid" style={{ display: "block" }}>
            <div className="code" style={{ color: ROLES[t.role].color }}>{result.code}-{result.identity}</div>
            <h2 style={{ fontFamily: "var(--font-display)", margin: "4px 0" }}>You're The {t.name}!</h2>
          </div>
          <p style={{ color: "var(--muted)" }}>Your full report has downloaded to your device. 🎉</p>
          <button className="btn btn--ghost" style={{ marginTop: 10 }}
            onClick={() => downloadReportPdf(result.code, result.identity)}>⬇ Download again</button>
        </div>
      </main>
    );
  }

  // ---- test ----
  const q = QUESTIONS[i];
  const answered = answers.filter((a) => a !== null).length;
  const pct = Math.round(((i) / QUESTIONS.length) * 100);
  const isLast = i === QUESTIONS.length - 1;
  return (
    <main className="test-wrap">
      <div className="progress"><div className="progress__bar" style={{ width: `${pct}%` }} /></div>
      <div className="progress__label">
        <span>Question {i + 1} of {QUESTIONS.length}</span>
        <span>{answered} answered</span>
      </div>

      <div className="q-card" key={i}>
        <div className="q-text">{q.text}</div>
        <div className="likert">
          <span className="likert__end likert__end--agree">Agree</span>
          {SCALE.map((sc) => {
            const cls = sc.side === "agree" ? "dot--agree" : sc.side === "disagree" ? "dot--dis" : "dot--neutral";
            const active = answers[i] === sc.value;
            return (
              <button key={sc.value} className={`dot ${sc.size} ${cls} ${active ? "is-active" : ""}`}
                aria-label={sc.label || `Rating ${sc.value}`} onClick={() => choose(sc.value)} />
            );
          })}
          <span className="likert__end likert__end--dis">Disagree</span>
        </div>
      </div>

      <div className="q-nav" style={{ justifyContent: "flex-end" }}>
        <button className="btn btn--primary" disabled={answers[i] === null} onClick={goNext}>
          {isLast ? "Submit ✓" : "Next →"}
        </button>
      </div>
      <p className="no-print" style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, marginTop: 18 }}>
        Pick the dot closest to how you feel, then press {isLast ? "Submit" : "Next"}. There's no going back — answer honestly.
      </p>
    </main>
  );
}

// ---------------- Completion form (mandatory details) ----------------
function CompletionForm({ email, result, onDone }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [full, setFull] = useState("");
  const [fullTouched, setFullTouched] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [countryIdx, setCountryIdx] = useState(0); // default India
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const country = COUNTRIES[countryIdx];
  const digits = contact.replace(/\D/g, "");
  const ageNum = parseInt(age, 10);
  const fullName = fullTouched ? full : `${first} ${last}`.trim();
  const canSubmit =
    first.trim() && last.trim() && fullName.trim() &&
    (gender === "Male" || gender === "Female") &&
    ageNum >= 5 && ageNum <= 120 &&
    digits.length >= 6;

  async function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setBusy(true); setErr("");
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("personova_results").insert({
        email,
        first_name: first.trim(),
        last_name: last.trim(),
        full_name: fullName.trim(),
        gender,
        age: ageNum,
        country: country.n,
        dial_code: "+" + country.d,
        contact_number: `+${country.d} ${digits}`,
        type_code: result.code,
        identity: result.identity,
        phone_verified: false,
      });
      if (error) {
        if (error.code === "23505") { setErr("This email has already completed the test."); setBusy(false); return; }
        throw error;
      }
      await downloadReportPdf(result.code, result.identity, { fullName: fullName.trim() });
      onDone();
    } catch (e2) {
      setErr(e2.message || "Something went wrong saving your details. Please try again.");
      setBusy(false);
    }
  }

  return (
    <main className="test-wrap">
      <div className="q-card" style={{ textAlign: "left", padding: "34px 30px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", textAlign: "center", marginTop: 0 }}>Almost there — a few details</h2>
        <p style={{ color: "var(--muted)", textAlign: "center", marginTop: 0 }}>
          Fill in your details and your full report downloads instantly. All fields are required.
        </p>
        <form onSubmit={submit} className="form-grid">
          <label className="fld"><span>First name *</span>
            <input className="gate__input" required value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" /></label>
          <label className="fld"><span>Last name *</span>
            <input className="gate__input" required value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" /></label>
          <label className="fld fld--full"><span>Full name *</span>
            <input className="gate__input" required value={fullName}
              onChange={(e) => { setFullTouched(true); setFull(e.target.value); }} placeholder="Full name" /></label>

          <label className="fld"><span>Gender *</span>
            <select className="gate__input" required value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select></label>
          <label className="fld"><span>Age *</span>
            <input className="gate__input" type="number" min="5" max="120" required value={age}
              onChange={(e) => setAge(e.target.value)} placeholder="Age" /></label>

          <label className="fld fld--full"><span>Email *</span>
            <input className="gate__input" value={email} readOnly style={{ opacity: 0.7 }} /></label>

          <label className="fld fld--full"><span>Contact number *</span>
            <div style={{ display: "flex", gap: 8 }}>
              <select className="gate__input country-sel" value={countryIdx}
                onChange={(e) => setCountryIdx(parseInt(e.target.value, 10))} aria-label="Country code">
                {COUNTRIES.map((c, idx) => (
                  <option key={c.c} value={idx}>{flag(c.c)} {c.n} (+{c.d})</option>
                ))}
              </select>
              <input className="gate__input" required inputMode="tel" value={contact}
                onChange={(e) => setContact(e.target.value)} placeholder="Mobile number" style={{ flex: 1 }} />
            </div>
          </label>

          <div className="fld--full" style={{ marginTop: 6 }}>
            <button className="btn btn--primary btn--lg" style={{ width: "100%" }} disabled={!canSubmit || busy}>
              {busy ? "Preparing your report…" : "Submit & download my report ⬇"}
            </button>
            {!canSubmit && <p style={{ fontSize: 12.5, color: "var(--muted)", textAlign: "center", marginTop: 8 }}>
              Fill every field to continue.</p>}
            {err && <p className="gate__err" style={{ textAlign: "center" }}>⚠ {err}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
