import { QUESTIONS, AXES } from "./questions";

// answers: array aligned to QUESTIONS, each an integer -3..+3
// (-3 = strongly disagree ... 0 = neutral ... +3 = strongly agree)
export function scoreTest(answers) {
  const raw = { EI: 0, NS: 0, TF: 0, JP: 0, AT: 0 };
  const max = { EI: 0, NS: 0, TF: 0, JP: 0, AT: 0 };

  QUESTIONS.forEach((q, i) => {
    const a = typeof answers[i] === "number" ? answers[i] : 0;
    raw[q.dim] += a * q.dir;
    max[q.dim] += 3;
  });

  const result = {};
  for (const dim of Object.keys(AXES)) {
    // normalize raw (-max..+max) to a 0..100 percentage toward the FIRST pole
    const pct = Math.round(((raw[dim] + max[dim]) / (2 * max[dim])) * 100);
    const towardFirst = raw[dim] >= 0;
    result[dim] = {
      letter: towardFirst ? AXES[dim].first : AXES[dim].second,
      // percentage strength of the chosen pole (50..100)
      strength: towardFirst ? pct : 100 - pct,
      firstPct: pct, // % toward first pole (for the bar)
    };
  }

  const code =
    result.EI.letter + result.NS.letter + result.TF.letter + result.JP.letter;
  const identity = result.AT.letter; // A or T
  return { code, identity, full: `${code}-${identity}`, dims: result };
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
