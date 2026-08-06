// Scientifically-grounded item bank: the public-domain IPIP Big-Five Factor
// Markers (Goldberg, 1992; International Personality Item Pool, ipip.ori.org).
// 50 items, 10 per factor, presented in the second person.
//
// Each item carries TWO mappings:
//   • dim/dir  -> the 5 Personova sliders that yield the 16 types
//   • factor/fk-> the Big-Five (OCEAN) factor, fk=+1 if the item is keyed
//                 toward the HIGH end of that factor, -1 if reverse-scored.
//
// Axis mapping (16personalities' 5 dimensions are a Big-Five relabelling):
//   Extraversion       -> Mind      (E/I)
//   Intellect/Openness -> Energy     (N/S)
//   Agreeableness      -> Nature     (T/F)   [high Agreeableness -> Feeling]
//   Conscientiousness  -> Tactics    (J/P)   [high Conscientiousness -> Judging]
//   Emotional Stability-> Identity   (A/T)   [high Stability -> Assertive]

export const AXES = {
  EI: { first: "E", second: "I", label: "Mind", poles: ["Extraverted", "Introverted"] },
  NS: { first: "N", second: "S", label: "Energy", poles: ["Intuitive", "Observant"] },
  TF: { first: "T", second: "F", label: "Nature", poles: ["Thinking", "Feeling"] },
  JP: { first: "J", second: "P", label: "Tactics", poles: ["Judging", "Prospecting"] },
  AT: { first: "A", second: "T", label: "Identity", poles: ["Assertive", "Turbulent"] },
};

// Big-Five factor metadata (order O C E A S = "OCEAN"-ish; we display all five).
export const FACTORS = {
  O: { key: "O", name: "Openness", full: "Openness to Experience", axis: "NS", high: "Imaginative, curious, open to ideas", low: "Practical, concrete, conventional" },
  C: { key: "C", name: "Conscientiousness", full: "Conscientiousness", axis: "JP", high: "Organized, dependable, disciplined", low: "Flexible, spontaneous, easygoing" },
  E: { key: "E", name: "Extraversion", full: "Extraversion", axis: "EI", high: "Outgoing, energetic, sociable", low: "Reserved, reflective, independent" },
  A: { key: "A", name: "Agreeableness", full: "Agreeableness", axis: "TF", high: "Warm, empathetic, cooperative", low: "Analytical, frank, competitive" },
  S: { key: "S", name: "Emotional Stability", full: "Emotional Stability", axis: "AT", high: "Calm, resilient, even-tempered", low: "Sensitive, self-critical, reactive" },
};

// factor -> [dim, poleDirForHigh]  (dir that "high factor" pushes the slider)
const AXIS_OF = { E: "EI", O: "NS", C: "JP", A: "TF", S: "AT" };
// For E,O,C,S high factor -> FIRST pole (dir +1). For A high factor -> SECOND pole (F, dir -1).
const HIGH_DIR = { E: 1, O: 1, C: 1, A: -1, S: 1 };

// Raw IPIP items: [factorKey, keyedDirection(+1 high / -1 reverse), text]
const RAW = [
  // Extraversion
  ["E", 1, "You are the life of the party."],
  ["E", -1, "You don't talk a lot."],
  ["E", 1, "You feel comfortable around people."],
  ["E", -1, "You keep in the background."],
  ["E", 1, "You start conversations."],
  ["E", -1, "You have little to say."],
  ["E", 1, "You talk to a lot of different people at parties."],
  ["E", -1, "You don't like to draw attention to yourself."],
  ["E", 1, "You don't mind being the center of attention."],
  ["E", -1, "You are quiet around strangers."],
  // Openness / Intellect
  ["O", 1, "You have a vivid imagination."],
  ["O", -1, "You have difficulty understanding abstract ideas."],
  ["O", 1, "You have excellent ideas."],
  ["O", -1, "You are not interested in abstract ideas."],
  ["O", 1, "You are quick to understand things."],
  ["O", -1, "You do not have a good imagination."],
  ["O", 1, "You spend time reflecting on things."],
  ["O", 1, "You are full of ideas."],
  ["O", 1, "You have a rich vocabulary."],
  ["O", 1, "You use difficult words."],
  // Conscientiousness
  ["C", 1, "You are always prepared."],
  ["C", -1, "You leave your belongings around."],
  ["C", 1, "You pay attention to details."],
  ["C", -1, "You make a mess of things."],
  ["C", 1, "You get chores done right away."],
  ["C", -1, "You often forget to put things back in their proper place."],
  ["C", 1, "You like order."],
  ["C", -1, "You shirk your duties."],
  ["C", 1, "You follow a schedule."],
  ["C", 1, "You are exacting in your work."],
  // Agreeableness
  ["A", -1, "You feel little concern for others."],
  ["A", 1, "You are interested in people."],
  ["A", -1, "You insult people."],
  ["A", 1, "You sympathize with others' feelings."],
  ["A", -1, "You are not interested in other people's problems."],
  ["A", 1, "You have a soft heart."],
  ["A", -1, "You are not really interested in others."],
  ["A", 1, "You take time out for others."],
  ["A", 1, "You feel others' emotions."],
  ["A", 1, "You make people feel at ease."],
  // Emotional Stability (reverse of Neuroticism)
  ["S", -1, "You get stressed out easily."],
  ["S", 1, "You are relaxed most of the time."],
  ["S", -1, "You worry about things."],
  ["S", 1, "You seldom feel blue."],
  ["S", -1, "You are easily disturbed."],
  ["S", -1, "You get upset easily."],
  ["S", -1, "You change your mood a lot."],
  ["S", -1, "You have frequent mood swings."],
  ["S", -1, "You get irritated easily."],
  ["S", -1, "You often feel blue."],
];

// Build the item objects with both mappings, interleaved by factor for a
// varied test experience (E, O, C, A, S, E, O, …).
function build() {
  const byFactor = { E: [], O: [], C: [], A: [], S: [] };
  RAW.forEach(([factor, fk, text]) => {
    const dim = AXIS_OF[factor];
    const dir = fk === 1 ? HIGH_DIR[factor] : -HIGH_DIR[factor];
    byFactor[factor].push({ dim, dir, factor, fk, text });
  });
  const order = ["E", "O", "C", "A", "S"];
  const out = [];
  for (let i = 0; i < 10; i++) for (const f of order) if (byFactor[f][i]) out.push(byFactor[f][i]);
  return out;
}

export const QUESTIONS = build();
