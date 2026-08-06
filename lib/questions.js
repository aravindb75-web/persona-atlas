// 60 statements, 12 per dimension.
// dim: which axis the statement loads on.
// dir: +1 means "Agree" pushes toward the FIRST pole below, -1 toward the second.
//   EI -> E (Extraverted) / I (Introverted)      [Mind]
//   NS -> N (Intuitive)   / S (Observant)        [Energy]
//   TF -> T (Thinking)    / F (Feeling)          [Nature]
//   JP -> J (Judging)     / P (Prospecting)      [Tactics]
//   AT -> A (Assertive)   / T (Turbulent)        [Identity]

export const AXES = {
  EI: { first: "E", second: "I", label: "Mind", poles: ["Extraverted", "Introverted"] },
  NS: { first: "N", second: "S", label: "Energy", poles: ["Intuitive", "Observant"] },
  TF: { first: "T", second: "F", label: "Nature", poles: ["Thinking", "Feeling"] },
  JP: { first: "J", second: "P", label: "Tactics", poles: ["Judging", "Prospecting"] },
  AT: { first: "A", second: "T", label: "Identity", poles: ["Assertive", "Turbulent"] },
};

export const QUESTIONS = [
  // ---- Mind: Extraversion / Introversion ----
  { dim: "EI", dir: 1, text: "You regularly make new friends and enjoy meeting strangers." },
  { dim: "EI", dir: -1, text: "After a long, busy day you prefer quiet time alone to recharge." },
  { dim: "EI", dir: 1, text: "At social events you feel energized and often introduce people to each other." },
  { dim: "EI", dir: -1, text: "You often prefer to observe a group before joining the conversation." },
  { dim: "EI", dir: 1, text: "You find it easy to strike up a conversation with almost anyone." },
  { dim: "EI", dir: -1, text: "You need time by yourself to think through your feelings." },
  { dim: "EI", dir: 1, text: "You tend to think out loud and process ideas by talking them through." },
  { dim: "EI", dir: -1, text: "Being in a large, lively crowd for hours leaves you drained." },
  { dim: "EI", dir: 1, text: "You are usually the one who keeps a gathering going." },
  { dim: "EI", dir: -1, text: "You prefer a few deep friendships over a wide circle of acquaintances." },
  { dim: "EI", dir: 1, text: "You rarely feel self-conscious speaking up in a group." },
  { dim: "EI", dir: -1, text: "You often let others take the spotlight while you stay in the background." },

  // ---- Energy: Intuition / Observation ----
  { dim: "NS", dir: 1, text: "You are fascinated by abstract ideas and 'what if' possibilities." },
  { dim: "NS", dir: -1, text: "You trust concrete facts and hands-on experience over theory." },
  { dim: "NS", dir: 1, text: "You often think about the deeper meaning behind everyday events." },
  { dim: "NS", dir: -1, text: "You focus on practical details rather than the big picture." },
  { dim: "NS", dir: 1, text: "You enjoy imagining how things could be radically different in the future." },
  { dim: "NS", dir: -1, text: "You prefer proven, step-by-step methods to novel, untested ones." },
  { dim: "NS", dir: 1, text: "Your mind frequently wanders to unusual, inventive connections." },
  { dim: "NS", dir: -1, text: "You would rather perfect an existing approach than invent a new one." },
  { dim: "NS", dir: 1, text: "You are drawn to metaphors, symbols, and theories." },
  { dim: "NS", dir: -1, text: "You notice small, concrete changes in your immediate surroundings." },
  { dim: "NS", dir: 1, text: "You spend a lot of time exploring interests unrelated to daily life." },
  { dim: "NS", dir: -1, text: "You value realism and are skeptical of speculation without evidence." },

  // ---- Nature: Thinking / Feeling ----
  { dim: "TF", dir: 1, text: "You base decisions more on logic than on how people will feel." },
  { dim: "TF", dir: -1, text: "You are quick to empathize with someone who is upset." },
  { dim: "TF", dir: 1, text: "In a debate you prioritize being correct over sparing feelings." },
  { dim: "TF", dir: -1, text: "Maintaining harmony in a group matters more to you than winning a point." },
  { dim: "TF", dir: 1, text: "You can stay detached and objective when others are emotional." },
  { dim: "TF", dir: -1, text: "You often make choices based on your personal values and compassion." },
  { dim: "TF", dir: 1, text: "You find it easy to give critical feedback when it is warranted." },
  { dim: "TF", dir: -1, text: "You are deeply moved by stories of other people's struggles." },
  { dim: "TF", dir: 1, text: "You judge situations by fairness and consistency more than mercy." },
  { dim: "TF", dir: -1, text: "You go out of your way to make sure no one feels left out." },
  { dim: "TF", dir: 1, text: "You trust your head over your heart when they conflict." },
  { dim: "TF", dir: -1, text: "You take criticism of your work personally more than you'd like." },

  // ---- Tactics: Judging / Prospecting ----
  { dim: "JP", dir: 1, text: "You like to have a clear plan before you begin anything." },
  { dim: "JP", dir: -1, text: "You happily keep your options open and decide as you go." },
  { dim: "JP", dir: 1, text: "You feel uneasy when your schedule is loose and undefined." },
  { dim: "JP", dir: -1, text: "You often work in bursts of inspiration rather than a steady routine." },
  { dim: "JP", dir: 1, text: "You finish tasks well before the deadline whenever you can." },
  { dim: "JP", dir: -1, text: "You tend to leave things until the last minute and still pull them off." },
  { dim: "JP", dir: 1, text: "You keep your workspace and belongings orderly." },
  { dim: "JP", dir: -1, text: "You adapt easily when plans change at the last moment." },
  { dim: "JP", dir: 1, text: "You make lists and enjoy checking items off." },
  { dim: "JP", dir: -1, text: "You find strict routines stifling rather than reassuring." },
  { dim: "JP", dir: 1, text: "You prefer to settle matters rather than leave them open-ended." },
  { dim: "JP", dir: -1, text: "You like to explore several paths before committing to one." },

  // ---- Identity: Assertive / Turbulent ----
  { dim: "AT", dir: 1, text: "You rarely second-guess the choices you have made." },
  { dim: "AT", dir: -1, text: "You often worry that you could have done something better." },
  { dim: "AT", dir: 1, text: "You stay calm and confident under pressure." },
  { dim: "AT", dir: -1, text: "Small mistakes can bother you for a long time afterward." },
  { dim: "AT", dir: 1, text: "You are generally satisfied with who you are." },
  { dim: "AT", dir: -1, text: "You compare yourself to others and often come up short in your mind." },
  { dim: "AT", dir: 1, text: "Stressful situations rarely shake your sense of self." },
  { dim: "AT", dir: -1, text: "You feel a strong drive to prove yourself again and again." },
  { dim: "AT", dir: 1, text: "You bounce back quickly after a setback." },
  { dim: "AT", dir: -1, text: "You are your own harshest critic." },
  { dim: "AT", dir: 1, text: "You trust your ability to handle whatever comes your way." },
  { dim: "AT", dir: -1, text: "Uncertainty about the future makes you anxious." },
];
