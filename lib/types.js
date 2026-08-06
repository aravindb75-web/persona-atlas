// Full profile data for all 16 types. Drives the dynamic report.
// Role groups: Analysts (NT), Diplomats (NF), Sentinels (SJ), Explorers (SP)

export const ROLES = {
  Analyst: { color: "#88619a", soft: "#efe6f4", label: "Analyst", emoji: "🔮" },
  Diplomat: { color: "#33a474", soft: "#e2f4ec", label: "Diplomat", emoji: "🌿" },
  Sentinel: { color: "#4298b4", soft: "#e0f0f5", label: "Sentinel", emoji: "🛡️" },
  Explorer: { color: "#e4ae3a", soft: "#faf0d7", label: "Explorer", emoji: "🎭" },
};

export const IDENTITY = {
  A: {
    label: "Assertive",
    blurb:
      "Assertive individuals are self-assured, even-tempered, and resistant to stress. They refuse to worry too much and do not push themselves too hard.",
  },
  T: {
    label: "Turbulent",
    blurb:
      "Turbulent individuals are self-conscious and sensitive to stress. They are success-driven, perfectionistic, and eager to improve.",
  },
};

export const TYPES = {
  // ============================ ANALYSTS ============================
  INTJ: {
    code: "INTJ", name: "Architect", role: "Analyst",
    tagline: "Imaginative and strategic thinkers, with a plan for everything.",
    overview:
      "Architects are strategic masterminds who combine bold vision with the discipline to make it real. They live in a world of ideas and long-range plans, constantly refining their internal model of how everything works. Independent and decisive, they set high standards and expect competence — first of all from themselves.",
    strengths: ["Strategic long-range thinking", "Independent and decisive", "Hard-working and determined", "Open-minded to new evidence", "Curious and endlessly self-improving"],
    weaknesses: ["Can be arrogant or dismissive of emotions", "Overly critical of others", "Impatient with inefficiency", "Struggle with romantic/social nuance"],
    education: {
      style: "Self-directed, depth-first learners who prefer to master systems rather than memorize facts.",
      environments: ["Research-heavy universities", "Independent study & honors tracks", "STEM, philosophy, economics, and strategy programs"],
      tips: ["Choose fields with intellectual rigor and autonomy", "Seek mentors who challenge you, not just praise you", "Balance solo mastery with at least one team project to build collaboration muscles"],
    },
    fields: ["Science & research", "Engineering & systems design", "Strategy & consulting", "Law", "Technology & software architecture", "Finance & quantitative analysis"],
    careers: ["Software/Systems Architect", "Strategy Consultant", "Investment Analyst", "Research Scientist", "Startup Founder", "Corporate Strategist", "Data Scientist"],
    workStyle: "Thrives with autonomy, clear objectives, and freedom from micromanagement. Excels at designing systems and long-term plans; less patient with repetitive execution.",
    finance: {
      style: "Disciplined, research-driven, and long-horizon. Architects treat money as a system to optimize.",
      strengths: ["Excellent at long-term planning and compounding", "Rational, unemotional decisions", "Naturally frugal and goal-oriented"],
      pitfalls: ["Overconfidence in their own models", "May over-optimize and miss simple wins", "Can neglect insurance/liquidity as 'inefficient'"],
      tips: ["Automate savings and index investing to remove ego from the process", "Keep a cash buffer even if it feels 'suboptimal'", "Revisit assumptions annually — markets humble models"],
    },
    relationships: {
      asPartner: "Loyal, direct, and deeply committed once they choose you. They show love through problem-solving, planning, and steadfast reliability rather than constant emotional display.",
      idealPartner: "Someone intellectually confident and emotionally secure — Diplomats (ENFP, ENTP) often balance their reserve, while fellow Analysts share their depth.",
      watchOut: ["Remember that not every problem needs fixing — sometimes a partner just wants to be heard", "Verbalize appreciation; don't assume it's obvious", "Guard against emotional distance under stress"],
    },
    growth: ["Practice expressing feelings, not just conclusions", "Accept 'good enough' where perfection adds no value", "Invest in relationships as deliberately as you invest in goals"],
    famous: ["Elon Musk", "Michelle Obama", "Friedrich Nietzsche", "Isaac Newton"],
  },

  INTP: {
    code: "INTP", name: "Logician", role: "Analyst",
    tagline: "Innovative inventors with an unquenchable thirst for knowledge.",
    overview:
      "Logicians are the great theorists and puzzle-solvers, driven by a bottomless curiosity about how things work. They prize logical consistency above almost everything and can lose themselves for hours untangling an idea. Flexible and original, they generate more ideas than they could ever execute.",
    strengths: ["Original, inventive thinking", "Open-minded and objective", "Enthusiastic about ideas they love", "Honest and straightforward", "Comfortable with complexity and ambiguity"],
    weaknesses: ["Can be absent-minded about practical life", "Difficulty with routine follow-through", "May over-analyze and delay decisions", "Insensitive to others' emotional needs"],
    education: {
      style: "Curiosity-driven explorers who learn best when free to chase tangents and question assumptions.",
      environments: ["Flexible, theory-rich programs", "Mathematics, physics, computer science, philosophy", "Environments that reward original thought over rote work"],
      tips: ["Build systems (deadlines, accountability partners) to convert ideas into finished work", "Pick projects you can finish, not just start", "Pair with detail-oriented collaborators"],
    },
    fields: ["Computer science & AI", "Mathematics & physics", "Philosophy & logic", "Research & academia", "Engineering", "Data & analytics"],
    careers: ["Software Developer", "Research Scientist", "Mathematician", "Systems Analyst", "Professor", "Product/Technical Architect", "Machine Learning Engineer"],
    workStyle: "Best in roles with intellectual freedom and few rigid routines. Brilliant at analysis and invention; needs support with logistics, follow-through, and deadlines.",
    finance: {
      style: "Analytical but easily distracted — Logicians understand money intellectually yet may neglect day-to-day admin.",
      strengths: ["Grasp complex financial concepts quickly", "Skeptical of hype and fads", "Comfortable researching before committing"],
      pitfalls: ["Procrastination on paperwork, taxes, and bills", "Analysis paralysis; never quite 'ready' to start", "Inconsistent budgeting"],
      tips: ["Automate everything possible — bills, savings, investing", "Set a simple, boring default plan and stick with it", "Use reminders/apps to handle admin you find dull"],
    },
    relationships: {
      asPartner: "Easygoing, honest, and intellectually engaging. They value a partner who respects their independence and enjoys exploring ideas together.",
      idealPartner: "Someone warm and grounding who appreciates their mind — ENTJ or ENFJ types often complement them by adding structure and emotional expressiveness.",
      watchOut: ["Make space for feelings, not just logic, in conflicts", "Follow through on small promises — reliability builds trust", "Don't retreat into your head when a partner needs presence"],
    },
    growth: ["Turn ideas into finished projects", "Build practical routines to anchor your life", "Practice reading and responding to emotions"],
    famous: ["Albert Einstein", "Bill Gates", "Marie Curie", "Blaise Pascal"],
  },

  ENTJ: {
    code: "ENTJ", name: "Commander", role: "Analyst",
    tagline: "Bold, imaginative and strong-willed leaders, always finding a way — or making one.",
    overview:
      "Commanders are natural-born leaders who radiate confidence, drive, and strategic vision. They see inefficiency as a challenge to be conquered and are quick to organize people and resources toward a goal. Decisive and charismatic, they thrive on responsibility and results.",
    strengths: ["Efficient and organized", "Confident and inspiring leaders", "Strong-willed and strategic", "Charismatic and persuasive", "Energetic and results-driven"],
    weaknesses: ["Can be domineering or impatient", "Intolerant of perceived incompetence", "Struggle to show vulnerability", "May steamroll others' feelings"],
    education: {
      style: "Goal-oriented achievers who want to see how learning translates into real-world power and results.",
      environments: ["Competitive, ambitious programs", "Business, law, economics, engineering leadership", "Leadership roles in clubs, teams, and student government"],
      tips: ["Seek leadership experience early", "Practice listening as hard as you direct", "Choose fields where ambition is an asset, not a liability"],
    },
    fields: ["Business & management", "Law", "Entrepreneurship", "Finance & investment", "Politics & policy", "Consulting"],
    careers: ["CEO / Executive", "Management Consultant", "Entrepreneur", "Lawyer", "Investment Banker", "Project Director", "Sales/Business Leader"],
    workStyle: "Excels in leadership and high-stakes decision-making. Wants clear goals, authority, and measurable outcomes. Can dominate meetings — must consciously empower others.",
    finance: {
      style: "Ambitious, strategic wealth-builders who set aggressive goals and pursue them relentlessly.",
      strengths: ["Excellent long-term planners", "Comfortable taking calculated risks", "Focused on building assets and income"],
      pitfalls: ["Overconfidence can lead to over-leverage", "May chase status spending", "Impatience with slow, steady strategies"],
      tips: ["Balance aggressive bets with a stable core portfolio", "Delegate to trusted advisors — you can't optimize everything", "Distinguish wealth-building from status signaling"],
    },
    relationships: {
      asPartner: "Committed, protective, and driven to build a shared future. They pursue relationships with the same intentionality as their careers.",
      idealPartner: "Someone confident and independent who won't be steamrolled — Diplomats like INFP or INTP add warmth and perspective.",
      watchOut: ["Soften your directness at home", "Value emotional connection as much as achievement", "Let your partner win sometimes — it's not a negotiation"],
    },
    growth: ["Cultivate patience and empathy", "Make room for others' input and feelings", "Accept that not everything can be controlled"],
    famous: ["Steve Jobs", "Margaret Thatcher", "Franklin D. Roosevelt", "Gordon Ramsay"],
  },

  ENTP: {
    code: "ENTP", name: "Debater", role: "Analyst",
    tagline: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    overview:
      "Debaters are quick-witted, bold, and endlessly curious idea-generators who love nothing more than a good intellectual sparring match. They challenge assumptions for sport, spot connections others miss, and thrive on novelty. Charismatic and adaptable, they resist routine and authority alike.",
    strengths: ["Quick, knowledgeable, and inventive", "Excellent brainstormers", "Charismatic and energetic", "Bold and adaptable", "Skilled at reframing problems"],
    weaknesses: ["Argue for the sake of it", "Struggle with follow-through", "Can be insensitive when debating", "Dislike routine and rules"],
    education: {
      style: "Debate-loving explorers who learn through argument, experimentation, and connecting disparate fields.",
      environments: ["Interdisciplinary, discussion-based programs", "Entrepreneurship, marketing, law, innovation", "Environments that reward challenging the status quo"],
      tips: ["Channel restless energy into finishing projects", "Pick fields that reward novelty and persuasion", "Find accountability structures to counter procrastination"],
    },
    fields: ["Entrepreneurship & startups", "Marketing & creative strategy", "Law & advocacy", "Consulting", "Product & innovation", "Media & content"],
    careers: ["Entrepreneur", "Product Manager", "Marketing Strategist", "Lawyer", "Management Consultant", "Creative Director", "Venture Investor"],
    workStyle: "Thrives on variety, brainstorming, and problem-solving. Best when paired with detail-oriented finishers; can lose interest once the exciting part is over.",
    finance: {
      style: "Opportunistic and entrepreneurial — Debaters chase upside and can spot promising ventures early.",
      strengths: ["Spot opportunities and trends early", "Comfortable with risk and reinvention", "Persuasive at raising money and negotiating"],
      pitfalls: ["Chasing shiny new opportunities; poor follow-through", "Inconsistent saving habits", "Overconfidence in speculative bets"],
      tips: ["Automate a boring, steady core of savings/investing", "Cap 'fun money' for speculative ideas", "Finish and monetize before starting the next venture"],
    },
    relationships: {
      asPartner: "Exciting, playful, and intellectually stimulating. They keep relationships fresh but need a partner who enjoys spirited debate and gives them freedom.",
      idealPartner: "A grounded, secure counterpart — INFJ and INTJ types often anchor their energy while matching their depth.",
      watchOut: ["Know when to stop debating and just listen", "Follow through on commitments to your partner", "Don't mistake conflict for connection"],
    },
    growth: ["Develop follow-through and consistency", "Read the room before launching into debate", "Build routines that support your big ideas"],
    famous: ["Leonardo da Vinci", "Thomas Edison", "Mark Twain", "Sarah Silverman"],
  },

  // ============================ DIPLOMATS ============================
  INFJ: {
    code: "INFJ", name: "Advocate", role: "Diplomat",
    tagline: "Quiet and mystical, yet very inspiring and tireless idealists.",
    overview:
      "Advocates are rare, principled idealists who combine deep empathy with a drive to make the world better. They see meaning and patterns everywhere, and pursue their convictions quietly but relentlessly. Warm yet private, they crave authentic connection and a sense of purpose in everything they do.",
    strengths: ["Insightful and empathetic", "Principled and purpose-driven", "Creative and imaginative", "Inspiring communicators", "Determined toward meaningful goals"],
    weaknesses: ["Prone to burnout from over-giving", "Sensitive to criticism", "Reluctant to open up", "Perfectionistic and self-critical"],
    education: {
      style: "Meaning-driven learners who excel when the material connects to values, people, and purpose.",
      environments: ["Humanities, psychology, counseling, the arts", "Small, values-driven programs", "Mentorship-rich settings"],
      tips: ["Choose fields aligned with your sense of purpose", "Protect your energy — build in recovery time", "Don't let perfectionism stall your work"],
    },
    fields: ["Psychology & counseling", "Writing & the arts", "Education", "Healthcare & social work", "Nonprofit & advocacy", "Human-centered design"],
    careers: ["Counselor / Therapist", "Writer", "Teacher", "Nonprofit Leader", "HR / People Specialist", "UX Researcher", "Healthcare Professional"],
    workStyle: "Excels in mission-driven, human-focused roles with autonomy and quiet. Needs work that aligns with values; suffers in cutthroat or purely transactional environments.",
    finance: {
      style: "Values-driven and cautious — Advocates want money to serve their purpose, not the other way around.",
      strengths: ["Thoughtful, non-impulsive spending", "Motivated by security and giving", "Willing to sacrifice for meaningful goals"],
      pitfalls: ["Avoiding money 'because it feels unspiritual'", "Undercharging for their work", "Over-giving/lending to others"],
      tips: ["Reframe money as a tool for your mission", "Charge what you're worth — it funds your impact", "Automate savings so you don't have to think about it"],
    },
    relationships: {
      asPartner: "Deeply devoted, intuitive, and nurturing. They seek soul-deep connection and are loyal to a fault once they trust you.",
      idealPartner: "Someone genuine and emotionally open — ENFP and ENTP types often draw them out and share their idealism.",
      watchOut: ["Voice your needs instead of silently over-giving", "Don't idealize a partner, then feel let down", "Protect against burnout in caretaking roles"],
    },
    growth: ["Set boundaries to prevent burnout", "Accept imperfection in yourself and others", "Open up sooner instead of withdrawing"],
    famous: ["Nelson Mandela", "Mother Teresa", "Martin Luther King Jr.", "Carl Jung"],
  },

  INFP: {
    code: "INFP", name: "Mediator", role: "Diplomat",
    tagline: "Poetic, kind and altruistic people, always eager to help a good cause.",
    overview:
      "Mediators are gentle idealists guided by an inner compass of deeply held values. Imaginative and empathetic, they see the good in people and long to make life more beautiful and meaningful. Quietly passionate, they can be reserved on the surface while burning with conviction underneath.",
    strengths: ["Empathetic and caring", "Creative and imaginative", "Open-minded and flexible", "Idealistic and principled", "Passionate about their values"],
    weaknesses: ["Overly idealistic and self-critical", "Impractical about details", "Take things personally", "Difficulty with conflict and follow-through"],
    education: {
      style: "Imaginative, self-paced learners who thrive when work connects to personal meaning and creativity.",
      environments: ["Creative writing, arts, humanities, psychology", "Flexible, expressive programs", "Supportive, low-pressure settings"],
      tips: ["Pursue fields that let you express your values", "Build practical skills to ground your ideals", "Guard against self-criticism sabotaging your work"],
    },
    fields: ["Writing & the arts", "Counseling & psychology", "Education", "Nonprofit & humanitarian work", "Design & storytelling", "Healthcare support"],
    careers: ["Writer / Author", "Counselor", "Artist / Designer", "Teacher", "Social Worker", "Content Creator", "Librarian / Archivist"],
    workStyle: "Best in meaningful, creative, autonomous roles. Struggles with rigid corporate structures, harsh competition, and purely metric-driven work.",
    finance: {
      style: "Idealistic and sometimes avoidant — Mediators would rather not think about money, which can create stress.",
      strengths: ["Modest, non-materialistic needs", "Generous and value-aligned giving", "Thoughtful about ethical spending"],
      pitfalls: ["Avoiding budgets and financial planning", "Undervaluing their creative work", "Impulsive 'feel-good' or charitable spending"],
      tips: ["Use simple, automated systems to reduce money anxiety", "Price your work fairly — you deserve it", "Keep an emergency fund to protect your peace of mind"],
    },
    relationships: {
      asPartner: "Warm, devoted, and deeply romantic. They seek a soulmate connection and offer unwavering emotional support.",
      idealPartner: "Someone who values depth and authenticity — ENFJ and ENTJ types add structure and initiative to complement their dreaminess.",
      watchOut: ["Address conflict instead of avoiding it", "Don't lose yourself in your partner's needs", "Share your inner world — partners can't read minds"],
    },
    growth: ["Turn ideals into concrete action", "Practice healthy conflict", "Balance giving with self-care"],
    famous: ["William Shakespeare", "J.R.R. Tolkien", "Audrey Hepburn", "Vincent van Gogh"],
  },

  ENFJ: {
    code: "ENFJ", name: "Protagonist", role: "Diplomat",
    tagline: "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    overview:
      "Protagonists are warm, charismatic leaders who genuinely believe in people's potential and can't help but inspire them toward it. Deeply attuned to others' emotions, they build community, rally causes, and mentor naturally. Their energy is contagious, and their sense of responsibility for others runs deep.",
    strengths: ["Charismatic and inspiring", "Empathetic and altruistic", "Natural leaders and mentors", "Reliable and passionate", "Excellent communicators"],
    weaknesses: ["Overly idealistic", "Too selfless — neglect their own needs", "Sensitive to criticism", "Struggle with tough decisions that hurt people"],
    education: {
      style: "People-centered learners who thrive in collaborative, discussion-rich, purpose-driven settings.",
      environments: ["Education, communication, psychology, leadership", "Team-based and service-oriented programs", "Mentorship and community roles"],
      tips: ["Seek leadership and mentoring opportunities", "Choose people-focused fields", "Protect against overcommitting to everyone else"],
    },
    fields: ["Education & training", "Human resources & coaching", "Nonprofit & community leadership", "Communications & PR", "Healthcare & counseling", "Politics & advocacy"],
    careers: ["Teacher / Professor", "HR Director / Coach", "Nonprofit Leader", "Communications Manager", "Counselor", "Politician", "Team/People Manager"],
    workStyle: "Shines in leadership, mentoring, and team-building roles. Motivated by helping others grow; needs to guard against burnout and taking on too much.",
    finance: {
      style: "Generous and future-oriented, but sometimes over-give at their own expense.",
      strengths: ["Disciplined and goal-oriented", "Motivated to provide for loved ones", "Good at long-term planning"],
      pitfalls: ["Over-giving and lending to others", "Neglecting their own financial needs", "Emotional spending to please people"],
      tips: ["Pay yourself first before helping others", "Set giving limits you can sustain", "Keep your own goals visible and funded"],
    },
    relationships: {
      asPartner: "Devoted, attentive, and nurturing. They pour energy into their partner's growth and happiness, often anticipating needs before they're spoken.",
      idealPartner: "Someone appreciative and independent — INFP and ISFP types respond warmly to their care while giving them room to lead.",
      watchOut: ["Let your partner support you too", "Don't take on responsibility for others' feelings", "Address your own needs before they build up"],
    },
    growth: ["Learn to say no and set boundaries", "Accept that you can't please everyone", "Care for yourself as well as you care for others"],
    famous: ["Barack Obama", "Oprah Winfrey", "Nelson Mandela", "Maya Angelou"],
  },

  ENFP: {
    code: "ENFP", name: "Campaigner", role: "Diplomat",
    tagline: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    overview:
      "Campaigners are free-spirited enthusiasts who light up a room with warmth, curiosity, and imagination. They see life as full of possibility and connection, and can find common ground with almost anyone. Independent and expressive, they need meaning, freedom, and genuine relationships to thrive.",
    strengths: ["Enthusiastic and curious", "Excellent people skills", "Creative and imaginative", "Warm and energetic", "Great at seeing potential in others"],
    weaknesses: ["Unfocused; struggle to follow through", "Overthink and people-please", "Get bored with routine", "Highly sensitive to stress and criticism"],
    education: {
      style: "Enthusiastic explorers who learn through connection, novelty, and hands-on creativity.",
      environments: ["Broad, flexible, interdisciplinary programs", "Communication, arts, psychology, marketing", "Collaborative and expressive settings"],
      tips: ["Build structure to channel your many interests", "Choose fields with variety and people contact", "Finish what you start before chasing the next idea"],
    },
    fields: ["Marketing & communications", "Creative arts & media", "Psychology & counseling", "Entrepreneurship", "Education & training", "Human-centered design"],
    careers: ["Marketing / Brand Manager", "Content Creator", "Counselor", "Entrepreneur", "Public Relations", "Teacher / Trainer", "UX / Design Researcher"],
    workStyle: "Thrives on variety, creativity, and human connection. Needs freedom and meaning; struggles with rigid routine, isolation, and repetitive detail work.",
    finance: {
      style: "Spontaneous and experience-driven — Campaigners value living fully over meticulous budgeting.",
      strengths: ["Resourceful and optimistic", "Willing to invest in experiences and growth", "Adaptable when circumstances change"],
      pitfalls: ["Impulsive, mood-based spending", "Inconsistent saving and budgeting", "Avoiding boring financial admin"],
      tips: ["Automate savings so willpower isn't required", "Give yourself a guilt-free 'fun budget'", "Use apps to make money management feel playful"],
    },
    relationships: {
      asPartner: "Passionate, attentive, and endlessly affectionate. They bring excitement and emotional depth, seeking a partner who shares their zest and values.",
      idealPartner: "A grounded, thoughtful counterpart — INTJ and INFJ types provide depth and stability that balances their spontaneity.",
      watchOut: ["Follow through on promises", "Don't lose yourself trying to please your partner", "Face problems directly instead of avoiding them"],
    },
    growth: ["Develop focus and follow-through", "Build steady routines to support your dreams", "Manage stress and self-criticism"],
    famous: ["Robert Downey Jr.", "Robin Williams", "Ellen DeGeneres", "Mark Twain"],
  },

  // ============================ SENTINELS ============================
  ISTJ: {
    code: "ISTJ", name: "Logistician", role: "Sentinel",
    tagline: "Practical and fact-minded individuals, whose reliability cannot be doubted.",
    overview:
      "Logisticians are the dependable backbone of any organization — practical, thorough, and deeply committed to doing things right. They honor traditions, keep their word, and value order, facts, and hard work. Quietly responsible, they take pride in their reliability and see follow-through as a matter of integrity.",
    strengths: ["Honest and dependable", "Responsible and thorough", "Calm and practical", "Strong sense of duty", "Organized and detail-oriented"],
    weaknesses: ["Stubborn and resistant to change", "Insensitive at times", "By-the-book to a fault", "Judgmental of different approaches"],
    education: {
      style: "Methodical, disciplined learners who excel with clear structure, facts, and step-by-step mastery.",
      environments: ["Structured programs with clear standards", "Accounting, law, engineering, sciences", "Traditional, well-defined curricula"],
      tips: ["Play to your discipline and reliability", "Stretch yourself to embrace some flexibility", "Choose fields that reward accuracy and diligence"],
    },
    fields: ["Accounting & finance", "Law & compliance", "Engineering & operations", "Administration & logistics", "Healthcare & sciences", "Military & public service"],
    careers: ["Accountant / Auditor", "Operations Manager", "Lawyer", "Engineer", "Financial Analyst", "Administrator", "Project Manager"],
    workStyle: "Excels with clear expectations, structure, and standards. Reliable and precise; may resist ambiguity, rapid change, or unproven methods.",
    finance: {
      style: "Prudent, disciplined, and security-focused — the natural savers of the 16 types.",
      strengths: ["Consistent saving and budgeting", "Debt-averse and risk-aware", "Excellent record-keeping"],
      pitfalls: ["Overly conservative — may under-invest", "Resistant to new financial tools/strategies", "Anxiety around any financial uncertainty"],
      tips: ["Let some money take sensible long-term risk (e.g., index funds)", "Update strategies as the world changes", "Trust your strong foundation — you can afford to invest for growth"],
    },
    relationships: {
      asPartner: "Loyal, steadfast, and dependable. They show love through consistency, responsibility, and keeping their commitments without fail.",
      idealPartner: "Someone who values stability and honesty — ESFP and ESTP types add spontaneity that balances their steadiness.",
      watchOut: ["Express affection in words, not just actions", "Be open to your partner's spontaneity", "Don't equate 'different' with 'wrong'"],
    },
    growth: ["Embrace change and new ideas", "Show emotions more openly", "Consider others' feelings alongside the facts"],
    famous: ["George Washington", "Warren Buffett", "Queen Elizabeth II", "Natalie Portman"],
  },

  ISFJ: {
    code: "ISFJ", name: "Defender", role: "Sentinel",
    tagline: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    overview:
      "Defenders are warm, conscientious protectors who quietly hold families, teams, and communities together. They pair a practical, detail-oriented mind with genuine kindness, remembering the little things that make people feel cared for. Humble and dependable, they give generously and ask for little in return.",
    strengths: ["Supportive and reliable", "Patient and hard-working", "Observant and detail-oriented", "Warm and loyal", "Practical and down-to-earth"],
    weaknesses: ["Overly humble; take too little credit", "Reluctant to change", "Take on too much", "Repress their own needs"],
    education: {
      style: "Diligent, supportive learners who thrive in nurturing, structured environments with clear guidance.",
      environments: ["Nursing, education, social sciences", "Supportive, cooperative programs", "Hands-on, service-oriented tracks"],
      tips: ["Pursue caring, people-focused fields", "Advocate for yourself and your achievements", "Build confidence to take on leadership when ready"],
    },
    fields: ["Healthcare & nursing", "Education", "Social work & counseling", "Administration & HR", "Hospitality & service", "Nonprofit work"],
    careers: ["Nurse / Healthcare Worker", "Teacher", "Social Worker", "HR Specialist", "Administrator", "Counselor", "Customer Success Manager"],
    workStyle: "Thrives in supportive, stable, people-serving roles. Dependable and thorough; needs recognition and protection from being overloaded or taken for granted.",
    finance: {
      style: "Careful, security-minded savers who plan responsibly for their family's future.",
      strengths: ["Consistent and cautious", "Excellent at budgeting for the household", "Debt-averse and prepared"],
      pitfalls: ["Over-giving to family and friends", "Under-investing out of caution", "Neglecting their own financial goals"],
      tips: ["Fund your own goals before helping others", "Take measured investment risk for long-term growth", "Recognize your worth and negotiate fair pay"],
    },
    relationships: {
      asPartner: "Nurturing, devoted, and endlessly considerate. They express love through acts of service and remembering what matters to you.",
      idealPartner: "Someone appreciative and expressive — ESTP and ESFP types add energy while valuing their steadiness.",
      watchOut: ["Voice your own needs — don't just serve", "Accept help and affection in return", "Don't let resentment build from over-giving"],
    },
    growth: ["Advocate for yourself", "Embrace change gradually", "Balance caring for others with self-care"],
    famous: ["Mother Teresa", "Kate Middleton", "Beyoncé", "Vin Diesel"],
  },

  ESTJ: {
    code: "ESTJ", name: "Executive", role: "Sentinel",
    tagline: "Excellent administrators, unsurpassed at managing things — or people.",
    overview:
      "Executives are natural organizers who bring order, structure, and accountability wherever they go. They value tradition, clear rules, and hard work, and they lead by example with unwavering dependability. Direct and decisive, they take charge of projects and communities with confidence and a strong sense of duty.",
    strengths: ["Dedicated and dependable", "Strong-willed and organized", "Excellent administrators", "Direct and honest", "Loyal and hard-working"],
    weaknesses: ["Inflexible and stubborn", "Judgmental of others", "Difficulty relaxing", "Struggle to express emotion"],
    education: {
      style: "Structured, goal-driven learners who excel with clear standards, deadlines, and measurable results.",
      environments: ["Business, law, engineering, administration", "Structured, competitive programs", "Leadership and organizational roles"],
      tips: ["Seek leadership and management experience", "Practice flexibility and empathy", "Choose fields that reward organization and drive"],
    },
    fields: ["Business & management", "Law & government", "Finance & accounting", "Operations & logistics", "Military & public service", "Sales & administration"],
    careers: ["Operations / General Manager", "Business Administrator", "Lawyer / Judge", "Financial Officer", "Project Manager", "Sales Director", "Military / Police Officer"],
    workStyle: "Excels at organizing people and processes toward clear goals. Direct and results-driven; must guard against rigidity and steamrolling quieter voices.",
    finance: {
      style: "Organized, disciplined, and goal-driven — Executives run their finances like a well-managed operation.",
      strengths: ["Excellent budgeting and planning", "Consistent saving and investing", "Practical, results-oriented decisions"],
      pitfalls: ["Status-driven spending", "Inflexibility about new strategies", "Overconfidence in their own approach"],
      tips: ["Stay open to modern investment tools", "Separate genuine needs from status signaling", "Delegate to advisors for areas outside your expertise"],
    },
    relationships: {
      asPartner: "Loyal, committed, and dependable providers. They take relationship responsibilities seriously and build a stable, structured life together.",
      idealPartner: "Someone who values reliability and honesty — ISFP and INFP types bring warmth and flexibility that balances them.",
      watchOut: ["Soften your directness at home", "Make space for emotions, not just logistics", "Be flexible with your partner's different style"],
    },
    growth: ["Cultivate flexibility and patience", "Express appreciation and emotion", "Value others' perspectives and methods"],
    famous: ["Sonia Sotomayor", "John D. Rockefeller", "Frank Sinatra", "Judge Judy"],
  },

  ESFJ: {
    code: "ESFJ", name: "Consul", role: "Sentinel",
    tagline: "Extraordinarily caring, social and popular people, always eager to help.",
    overview:
      "Consuls are warm, sociable connectors who thrive on caring for others and keeping their communities harmonious. Attentive and practical, they remember birthdays, organize the group, and make everyone feel included. They value loyalty, tradition, and belonging, and take genuine joy in being helpful.",
    strengths: ["Warm and caring", "Strong practical skills", "Loyal and dependable", "Sensitive to others' needs", "Great at building community"],
    weaknesses: ["Worried about social status", "Sensitive to criticism", "Reluctant to innovate", "Vulnerable to over-giving and burnout"],
    education: {
      style: "Cooperative, people-focused learners who thrive in warm, structured, socially connected settings.",
      environments: ["Education, nursing, hospitality, social sciences", "Collaborative, supportive programs", "Community and service-oriented roles"],
      tips: ["Pursue people-serving fields", "Build resilience to criticism", "Balance helping others with your own goals"],
    },
    fields: ["Healthcare & nursing", "Education", "Hospitality & events", "Human resources", "Sales & customer service", "Community & nonprofit work"],
    careers: ["Nurse / Healthcare Worker", "Teacher", "Event / Hospitality Manager", "HR Coordinator", "Sales / Account Manager", "Office Manager", "Community Organizer"],
    workStyle: "Thrives in warm, collaborative, people-facing roles. Excellent at organizing and supporting others; needs appreciation and a harmonious environment.",
    finance: {
      style: "Practical and family-focused, but generous — Consuls plan for security while caring for loved ones.",
      strengths: ["Consistent, responsible budgeting", "Motivated to provide for family", "Good at practical household management"],
      pitfalls: ["Status/social spending to fit in", "Over-giving to loved ones", "Emotional spending under stress"],
      tips: ["Set sustainable limits on giving", "Distinguish social pressure from real needs", "Prioritize your own long-term security too"],
    },
    relationships: {
      asPartner: "Devoted, attentive, and nurturing. They invest deeply in their partner's happiness and create a warm, welcoming home life.",
      idealPartner: "Someone appreciative and steady — ISFP and ISTP types complement their warmth with calm independence.",
      watchOut: ["Don't tie your worth to others' approval", "Voice your needs directly", "Guard against burnout from over-giving"],
    },
    growth: ["Build resilience to criticism", "Value your own needs", "Embrace new ideas and change"],
    famous: ["Taylor Swift", "Jennifer Garner", "Bill Clinton", "Ariana Grande"],
  },

  // ============================ EXPLORERS ============================
  ISTP: {
    code: "ISTP", name: "Virtuoso", role: "Explorer",
    tagline: "Bold and practical experimenters, masters of all kinds of tools.",
    overview:
      "Virtuosos are hands-on problem-solvers who love to take things apart, understand how they work, and build something better. Practical and curious, they stay cool under pressure and prefer action to theory. Independent and spontaneous, they thrive when free to experiment and follow their own path.",
    strengths: ["Practical and hands-on", "Great in a crisis — calm and rational", "Spontaneous and creative", "Curious and versatile", "Relaxed and easygoing"],
    weaknesses: ["Easily bored; dislike commitment", "Private and hard to read", "Risk-prone", "Insensitive to others' emotions at times"],
    education: {
      style: "Hands-on, experiential learners who need to build, tinker, and see practical results.",
      environments: ["Technical, trade, and applied programs", "Engineering, mechanics, computing, sciences", "Lab- and project-based learning"],
      tips: ["Choose applied, hands-on fields", "Build follow-through for long projects", "Seek variety to stay engaged"],
    },
    fields: ["Engineering & mechanics", "Technology & IT", "Trades & construction", "Emergency & field work", "Sports & athletics", "Forensics & applied science"],
    careers: ["Engineer / Mechanic", "Software Developer", "Pilot / First Responder", "Electrician / Technician", "Data / Systems Analyst", "Forensic Specialist", "Athlete / Trainer"],
    workStyle: "Thrives on hands-on problem-solving, autonomy, and variety. Excellent troubleshooters; dislike rigid rules, endless meetings, and abstract theorizing.",
    finance: {
      style: "Practical and independent — Virtuosos spend on tools and experiences but can be inconsistent planners.",
      strengths: ["Pragmatic and resourceful", "Good at fixing/DIY to save money", "Comfortable making quick decisions"],
      pitfalls: ["Impulsive purchases on gear/hobbies", "Inconsistent long-term planning", "Risk-taking without a safety net"],
      tips: ["Automate long-term savings", "Keep an emergency buffer for spontaneity", "Set spending limits on gadgets/hobbies"],
    },
    relationships: {
      asPartner: "Easygoing, fun, and low-drama. They value independence and show affection through shared activities and practical help rather than words.",
      idealPartner: "Someone who respects their freedom — ESFJ and ESTJ types offer warmth and structure that grounds them.",
      watchOut: ["Communicate feelings instead of withdrawing", "Follow through on commitments", "Don't mistake independence for distance"],
    },
    growth: ["Develop commitment and follow-through", "Share your inner world", "Consider others' feelings in decisions"],
    famous: ["Clint Eastwood", "Michael Jordan", "Bear Grylls", "Scarlett Johansson"],
  },

  ISFP: {
    code: "ISFP", name: "Adventurer", role: "Explorer",
    tagline: "Flexible and charming artists, always ready to explore and experience something new.",
    overview:
      "Adventurers are gentle, artistic free spirits who experience the world through their senses and values. They live in the present, seeking beauty, authenticity, and new experiences. Warm but independent, they express themselves through action and creativity rather than words, and dislike being boxed in by rules or expectations.",
    strengths: ["Charming and warm", "Artistic and creative", "Sensitive and empathetic", "Curious and adventurous", "Flexible and easygoing"],
    weaknesses: ["Unpredictable and easily stressed", "Fiercely independent — dislike structure", "Struggle with long-term planning", "Take criticism personally"],
    education: {
      style: "Experiential, sensory learners who thrive with creative freedom and hands-on, real-world work.",
      environments: ["Arts, design, culinary, healthcare support", "Flexible, expressive, hands-on programs", "Low-pressure, supportive settings"],
      tips: ["Pursue creative, hands-on fields", "Build structure to support long-term goals", "Protect your sensitivity from harsh environments"],
    },
    fields: ["Arts & design", "Music & performance", "Culinary & hospitality", "Healthcare support & wellness", "Fashion & crafts", "Nature & outdoor work"],
    careers: ["Artist / Designer", "Musician", "Chef", "Nurse / Caregiver", "Photographer", "Veterinarian / Vet Tech", "Fitness / Wellness Coach"],
    workStyle: "Thrives in creative, flexible, hands-on roles with autonomy. Struggles with rigid structure, heavy theory, and cutthroat competition.",
    finance: {
      style: "Present-focused and experience-driven — Adventurers spend on what feels meaningful now, sometimes at the expense of planning.",
      strengths: ["Value experiences over status", "Generous and warm-hearted", "Adaptable to changing circumstances"],
      pitfalls: ["Impulsive, mood-driven spending", "Avoidance of budgeting and planning", "Difficulty saving for the future"],
      tips: ["Automate savings so the future is handled", "Give yourself a guilt-free spending allowance", "Keep a simple emergency fund for peace of mind"],
    },
    relationships: {
      asPartner: "Affectionate, attentive, and deeply present. They show love through thoughtful gestures and shared experiences, valuing harmony and freedom.",
      idealPartner: "Someone warm and steady — ESFJ and ESTJ types add structure and reassurance to their spontaneous style.",
      watchOut: ["Express needs and feelings directly", "Address conflict rather than fleeing it", "Don't take criticism as rejection"],
    },
    growth: ["Build long-term planning habits", "Face conflict calmly", "Develop resilience to criticism"],
    famous: ["Frida Kahlo", "Michael Jackson", "David Bowie", "Britney Spears"],
  },

  ESTP: {
    code: "ESTP", name: "Entrepreneur", role: "Explorer",
    tagline: "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
    overview:
      "Entrepreneurs are bold, energetic realists who dive headfirst into life and thrive on action, risk, and immediate results. Perceptive and quick-thinking, they read people and situations fast and adapt on the fly. Charismatic and fun, they love the spotlight and learn best by doing rather than theorizing.",
    strengths: ["Bold and action-oriented", "Perceptive and quick-thinking", "Sociable and charismatic", "Practical problem-solvers", "Adaptable under pressure"],
    weaknesses: ["Impatient and risk-prone", "Struggle with theory and long-term focus", "Can be blunt or insensitive", "Dislike rules and structure"],
    education: {
      style: "Action-oriented learners who need hands-on, real-world, fast-paced engagement to stay interested.",
      environments: ["Applied, hands-on, competitive programs", "Business, sales, sports, trades, emergency work", "Experiential and internship-heavy tracks"],
      tips: ["Choose active, real-world fields", "Build patience for long-term goals", "Channel energy into ventures you can finish"],
    },
    fields: ["Sales & business development", "Entrepreneurship", "Sports & athletics", "Emergency & field services", "Trades & real estate", "Marketing & events"],
    careers: ["Sales Executive", "Entrepreneur", "Real Estate Agent", "Paramedic / First Responder", "Athlete / Coach", "Marketing Manager", "Stockbroker / Trader"],
    workStyle: "Thrives on fast-paced, hands-on, high-energy work with tangible results. Excellent in crises and negotiations; bored by routine and abstract planning.",
    finance: {
      style: "Bold and opportunistic — Entrepreneurs are comfortable with risk and chasing quick returns.",
      strengths: ["Comfortable taking calculated risks", "Quick, decisive money moves", "Resourceful at generating income"],
      pitfalls: ["Impulsive spending and speculation", "Poor long-term planning", "Overconfidence in risky bets"],
      tips: ["Automate a steady, boring savings core", "Cap high-risk 'play money'", "Build a safety net before chasing upside"],
    },
    relationships: {
      asPartner: "Exciting, spontaneous, and fun. They keep the relationship lively and show affection through action and shared adventures, valuing freedom and directness.",
      idealPartner: "Someone grounded and patient — ISFJ and ISTJ types provide the stability that balances their spontaneity.",
      watchOut: ["Slow down and consider your partner's feelings", "Follow through on long-term commitments", "Balance excitement with reliability"],
    },
    growth: ["Develop patience and long-term focus", "Consider consequences before acting", "Attend to others' emotions"],
    famous: ["Ernest Hemingway", "Madonna", "Donald Trump", "Eddie Murphy"],
  },

  ESFP: {
    code: "ESFP", name: "Entertainer", role: "Explorer",
    tagline: "Spontaneous, energetic and enthusiastic people — life is never boring around them.",
    overview:
      "Entertainers are vibrant, spontaneous people who love life, people, and the spotlight. Warm and generous, they bring energy and joy wherever they go and have a gift for making the moment special. Living fully in the present, they follow their passions, connect easily with others, and dislike being tied down by rules or long-term worry.",
    strengths: ["Bold and enthusiastic", "Warm and generous", "Excellent people skills", "Practical and observant", "Fun-loving and spontaneous"],
    weaknesses: ["Easily bored; avoid conflict", "Struggle with long-term planning", "Sensitive to criticism", "Prone to impulsive decisions"],
    education: {
      style: "Social, hands-on learners who thrive with interaction, variety, and real-world relevance.",
      environments: ["Performing arts, hospitality, communication", "Interactive, collaborative programs", "Experiential and people-focused tracks"],
      tips: ["Pursue lively, people-focused fields", "Build structure for long-term goals", "Balance fun with follow-through"],
    },
    fields: ["Performing arts & entertainment", "Hospitality & events", "Sales & marketing", "Healthcare & wellness", "Education (early years)", "Tourism & recreation"],
    careers: ["Performer / Entertainer", "Event Planner", "Sales / Account Manager", "Flight Attendant / Hospitality", "Fitness / Wellness Coach", "Early Childhood Educator", "Social Media Creator"],
    workStyle: "Thrives in energetic, social, hands-on roles with variety. Struggles with isolation, rigid routine, and heavy abstract or solitary work.",
    finance: {
      style: "Generous and present-focused — Entertainers love to enjoy life and share with others, sometimes over-spending.",
      strengths: ["Optimistic and resourceful", "Generous with loved ones", "Adaptable to change"],
      pitfalls: ["Impulsive, in-the-moment spending", "Difficulty saving for the future", "Avoiding financial planning"],
      tips: ["Automate savings before you can spend it", "Set a fun budget you can enjoy guilt-free", "Keep an emergency fund for stability"],
    },
    relationships: {
      asPartner: "Affectionate, playful, and generous. They fill the relationship with warmth and spontaneity, showering their partner with attention and shared fun.",
      idealPartner: "Someone grounded and reassuring — ISTJ and ISFJ types provide the stability that complements their spontaneity.",
      watchOut: ["Face conflict instead of avoiding it", "Follow through on long-term plans", "Balance living for now with planning ahead"],
    },
    growth: ["Develop long-term planning", "Face conflicts directly", "Build resilience to criticism"],
    famous: ["Adele", "Jamie Oliver", "Marilyn Monroe", "Will Smith"],
  },
};

export function getType(code) {
  return TYPES[code];
}
