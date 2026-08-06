"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import { scoreTest, SCALE } from "@/lib/scoring";

export default function TestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [i, setI] = useState(0);

  const q = QUESTIONS[i];
  const answered = answers.filter((a) => a !== null).length;
  const pct = Math.round((answered / QUESTIONS.length) * 100);

  function choose(value) {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
    // auto-advance, or finish
    setTimeout(() => {
      if (i < QUESTIONS.length - 1) {
        setI(i + 1);
      } else {
        finish(next);
      }
    }, 180);
  }

  function finish(all) {
    const filled = all.map((a) => (a === null ? 0 : a));
    const res = scoreTest(filled);
    router.push(`/result?type=${res.full}`);
  }

  return (
    <main className="test-wrap">
      <div className="progress">
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress__label">
        <span>Question {i + 1} of {QUESTIONS.length}</span>
        <span>{pct}% complete</span>
      </div>

      <div className="q-card" key={i}>
        <div className="q-text">{q.text}</div>
        <div className="likert">
          <span className="likert__end likert__end--agree">Agree</span>
          {SCALE.map((s) => {
            const cls =
              s.side === "agree" ? "dot--agree" : s.side === "disagree" ? "dot--dis" : "dot--neutral";
            const active = answers[i] === s.value;
            return (
              <button
                key={s.value}
                className={`dot ${s.size} ${cls} ${active ? "is-active" : ""}`}
                aria-label={s.label || `Rating ${s.value}`}
                onClick={() => choose(s.value)}
              />
            );
          })}
          <span className="likert__end likert__end--dis">Disagree</span>
        </div>
      </div>

      <div className="q-nav">
        <button
          className="btn btn--ghost"
          onClick={() => setI(Math.max(0, i - 1))}
          disabled={i === 0}
        >
          ← Back
        </button>
        <button
          className="btn btn--ghost"
          onClick={() => (i < QUESTIONS.length - 1 ? setI(i + 1) : finish(answers))}
        >
          {i < QUESTIONS.length - 1 ? "Skip →" : "See results →"}
        </button>
      </div>

      <p className="no-print" style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, marginTop: 20 }}>
        Closest dot to a side = strongest feeling. The center dot is neutral.
      </p>
    </main>
  );
}
