// Scientifically-grounded item bank: the public-domain IPIP Big-Five Factor
// Markers (Goldberg, 1992). 50 items, 10 per factor, in plain, easy English.
//
//   dim/dir  -> the 5 Personova sliders that yield the 16 types
//   factor/fk-> the Big-Five (OCEAN) factor, fk=+1 toward the HIGH end, -1 reverse.

export const AXES = {
  EI: { first: "E", second: "I", label: "Mind", poles: ["Extraverted", "Introverted"] },
  NS: { first: "N", second: "S", label: "Energy", poles: ["Intuitive", "Observant"] },
  TF: { first: "T", second: "F", label: "Nature", poles: ["Thinking", "Feeling"] },
  JP: { first: "J", second: "P", label: "Tactics", poles: ["Judging", "Prospecting"] },
  AT: { first: "A", second: "T", label: "Identity", poles: ["Assertive", "Turbulent"] },
};

export const FACTORS = {
  O: { key: "O", name: "Openness", full: "Openness to Experience", axis: "NS", high: "Imaginative, curious, open to ideas", low: "Practical, concrete, conventional" },
  C: { key: "C", name: "Conscientiousness", full: "Conscientiousness", axis: "JP", high: "Organized, dependable, disciplined", low: "Flexible, spontaneous, easygoing" },
  E: { key: "E", name: "Extraversion", full: "Extraversion", axis: "EI", high: "Outgoing, energetic, sociable", low: "Reserved, reflective, independent" },
  A: { key: "A", name: "Agreeableness", full: "Agreeableness", axis: "TF", high: "Warm, empathetic, cooperative", low: "Analytical, frank, competitive" },
  S: { key: "S", name: "Emotional Stability", full: "Emotional Stability", axis: "AT", high: "Calm, resilient, even-tempered", low: "Sensitive, self-critical, reactive" },
};

const AXIS_OF = { E: "EI", O: "NS", C: "JP", A: "TF", S: "AT" };
const HIGH_DIR = { E: 1, O: 1, C: 1, A: -1, S: 1 };

// [factorKey, keyedDirection(+1 high / -1 reverse), plain-English text]
const RAW = [
  // Extraversion
  ["E", 1, "You are the life of the party."],
  ["E", -1, "You don't talk much."],
  ["E", 1, "You feel comfortable around people."],
  ["E", -1, "You stay in the background."],
  ["E", 1, "You start conversations."],
  ["E", -1, "You don't have much to say."],
  ["E", 1, "You talk to lots of different people at parties."],
  ["E", -1, "You don't like drawing attention to yourself."],
  ["E", 1, "You don't mind being the centre of attention."],
  ["E", -1, "You are quiet around strangers."],
  // Openness / Intellect
  ["O", 1, "You have a strong imagination."],
  ["O", -1, "You find deep or theoretical ideas hard to understand."],
  ["O", 1, "You often come up with great ideas."],
  ["O", -1, "You aren't interested in deep or theoretical ideas."],
  ["O", 1, "You understand things quickly."],
  ["O", -1, "You don't think you have a strong imagination."],
  ["O", 1, "You like to spend time thinking things over."],
  ["O", 1, "You are full of ideas."],
  ["O", 1, "You know and use a wide range of words."],
  ["O", 1, "You often use big or difficult words."],
  // Conscientiousness
  ["C", 1, "You are always prepared."],
  ["C", -1, "You leave your things lying around."],
  ["C", 1, "You pay attention to small details."],
  ["C", -1, "You often make a mess of things."],
  ["C", 1, "You finish your tasks right away."],
  ["C", -1, "You often forget to put things back where they belong."],
  ["C", 1, "You like to keep things neat and organised."],
  ["C", -1, "You avoid doing your duties."],
  ["C", 1, "You stick to a schedule."],
  ["C", 1, "You are careful and precise in your work."],
  // Agreeableness
  ["A", -1, "You don't feel much concern for other people."],
  ["A", 1, "You are interested in people."],
  ["A", -1, "You sometimes insult people."],
  ["A", 1, "You understand and share other people's feelings."],
  ["A", -1, "You aren't interested in other people's problems."],
  ["A", 1, "You have a kind heart."],
  ["A", -1, "You aren't really interested in others."],
  ["A", 1, "You make time for other people."],
  ["A", 1, "You can sense what others are feeling."],
  ["A", 1, "You make people feel relaxed and comfortable."],
  // Emotional Stability (reverse of Neuroticism)
  ["S", -1, "You get stressed easily."],
  ["S", 1, "You feel relaxed most of the time."],
  ["S", -1, "You worry about things a lot."],
  ["S", 1, "You rarely feel sad or low."],
  ["S", -1, "Small things can easily bother you."],
  ["S", -1, "You get upset easily."],
  ["S", -1, "Your mood changes a lot."],
  ["S", -1, "Your moods go up and down often."],
  ["S", -1, "You get annoyed easily."],
  ["S", -1, "You often feel sad or low."],
];

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
