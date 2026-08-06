import { QUESTIONS, AXES, FACTORS } from "./questions";

// answers: array aligned to QUESTIONS, each an integer -3..+3
export function scoreTest(answers) {
  const raw = { EI: 0, NS: 0, TF: 0, JP: 0, AT: 0 };
  const max = { EI: 0, NS: 0, TF: 0, JP: 0, AT: 0 };
  const fRaw = { O: 0, C: 0, E: 0, A: 0, S: 0 };
  const fMax = { O: 0, C: 0, E: 0, A: 0, S: 0 };

  QUESTIONS.forEach((q, i) => {
    const a = typeof answers[i] === "number" ? answers[i] : 0;
    raw[q.dim] += a * q.dir;
    max[q.dim] += 3;
    fRaw[q.factor] += a * q.fk;
    fMax[q.factor] += 3;
  });

  const dims = {};
  for (const dim of Object.keys(AXES)) {
    const pct = Math.round(((raw[dim] + max[dim]) / (2 * max[dim])) * 100);
    const towardFirst = raw[dim] >= 0;
    dims[dim] = {
      letter: towardFirst ? AXES[dim].first : AXES[dim].second,
      strength: towardFirst ? pct : 100 - pct,
      firstPct: pct,
    };
  }

  const bigFive = {};
  for (const f of Object.keys(fMax)) {
    bigFive[f] = Math.round(((fRaw[f] + fMax[f]) / (2 * fMax[f])) * 100);
  }

  const code = dims.EI.letter + dims.NS.letter + dims.TF.letter + dims.JP.letter;
  const identity = dims.AT.letter;
  return { code, identity, full: `${code}-${identity}`, dims, bigFive };
}

// Representative Big-Five profile for a type (when we only know the 4-letter
// code + identity, e.g. gallery links) — derived deterministically so every
// type/report page shows a consistent scientific profile.
export function bigFiveForType(code, identity) {
  const [ei, ns, tf, jp] = code.split("");
  return {
    E: ei === "E" ? 68 : 34,
    O: ns === "N" ? 70 : 33,
    A: tf === "F" ? 71 : 32,
    C: jp === "J" ? 69 : 34,
    S: identity === "A" ? 66 : 36,
  };
}

export const SCALE = [
  { value: 3, label: "Agree", size: "lg", side: "agree" },
  { value: 2, label: "", size: "md", side: "agree" },
  { value: 1, label: "", size: "sm", side: "agree" },
  { value: 0, label: "Neutral", size: "xs", side: "neutral" },
  { value: -1, label: "", size: "sm", side: "disagree" },
  { value: -2, label: "", size: "md", side: "disagree" },
  { value: -3, label: "Disagree", size: "lg", side: "disagree" },
];

export { FACTORS };
