# Personova — Build & Analysis Report

**Live site:** https://persona-atlas-dusky-s-shrine.vercel.app
**Source repo:** https://github.com/aravindb75-web/persona-atlas
**Stack:** Next.js 14 (App Router) · React 18 · **react-three-fiber + three.js (3D)** · **framer-motion** · **Supabase Auth (email OTP)** · deployed on Vercel (production)

## v4 highlights — science, careers & compatibility
- **Scientifically-validated item bank** — the test now uses the **public-domain IPIP Big-Five Factor Markers** (Goldberg, 1992; 50 items, 10 per factor). Answers score **both** the 16-type sliders and a real **Big Five (OCEAN)** profile, shown as its own panel in the report. This makes the assessment psychometrically defensible.
- **O*NET / BLS career data** — the Careers section now shows a **"Career outlook" table**: each fitting role → its BLS occupation, **median annual pay**, and **2022–2032 job-growth outlook** (public-domain U.S. Bureau of Labor Statistics / O*NET figures).
- **Interactive 16×16 compatibility matrix** — a new **/compatibility** page: a color-coded heatmap of how every type pairs with every other (love / friendship / teamwork), with hover detail and a plain-English explanation per pairing. Each report also gets a **"Best matches"** panel linking into it.
- All three also flow into the **downloadable PDF** (Big Five bars, career-outlook lines, best-matches list).

## v3 highlights — premium pass
- **Premium UI redesign** — display typography (**Sora** headings + **Inter** body via `next/font`), **glassmorphism** surfaces, an animated **aurora** background, refined spectrum palette, gradient buttons with a shine sweep, and richer hover/motion throughout.
- **Radar chart** — a custom, dependency-free SVG pentagon radar visualises your 5 dimensions inside the report.
- **Real one-click PDF** — `@react-pdf/renderer` generates a branded multi-page PDF (cover + overview + dimensions + strengths + education + careers + finance + relationships + growth) and downloads it; the library is lazy-loaded on click so it never bloats the page. (Verified generating in-browser.)

## v2 highlights (what changed)
- **Rebranded** to **Personova** with a cosmic/crystal theme.
- **Live 3D hero** — an interactive react-three-fiber scene: a faceted core with 16 orbiting, family-coloured low-poly shards, sparkles, and mouse-reactive camera.
- **New low-poly faceted CHARACTERS** (not blobs) — each of the 16 types is a distinct geometric figure with its own hair, skin, outfit colour, accessory (glasses/shades), and floating prop, styled after the 16personalities low-poly art.
- **Interactive 3D-tilt gallery** — the character cards tilt toward your cursor (framer-motion).
- **Email + OTP gate before the report** — the full life report is locked until the visitor verifies their email with a 6-digit one-time code (Supabase Auth). Verified emails + result type are stored in a `personova_leads` table.

### ⚠️ One 30-second setup step for the OTP email
Supabase Auth is fully wired (the `/auth/v1/otp` endpoint returns 200 and `verifyOtp` is implemented). For the **6-digit code to appear in the email**, add the token to the templates once:
- Supabase dashboard → **Authentication → Email Templates** → open **"Magic Link"** and **"Confirm signup"** → add a line like `Your Personova code is: {{ .Token }}` → Save.
Until then, the email contains a magic link instead of a visible code. (Free-tier email is rate-limited to a few sends/hour and may land in spam — add a custom SMTP/Resend sender for production volume.)

---

---

## 1. Analysis of the 16Personalities test

I studied the structure of the official 16personalities.com assessment (the **NERIS Type Explorer®**) and replicated its logic.

### 1.1 Number & type of questions
- **60 statements**, presented **one at a time** with a progress bar.
- Each is a **first-person self-description** (e.g. *"You regularly make new friends and enjoy meeting strangers."*) — never a forced either/or question. This is what makes it feel gentle and quick.
- Answered on a **7-point Agree ↔ Disagree scale** (a graduated row of dots: 3 green "agree" dots of decreasing size, 1 neutral center dot, 3 red "disagree" dots). Internally scored **+3 … 0 … −3**.
- Statements are **balanced/reverse-keyed**: roughly half of each trait's items are worded toward each pole, so agreeing with everything doesn't bias the result.

### 1.2 The scoring model — 5 dimensions
16personalities blends Jungian/Myers-Briggs letters with a Big-Five-style **Identity** axis. Every person is scored on **5 sliding scales**:

| Dimension | Poles | What it measures |
|-----------|-------|------------------|
| **Mind** | Extraverted (E) / Introverted (I) | How you engage with the outer world & recharge |
| **Energy** | Intuitive (N) / Observant (S) | How you process information (abstract vs. concrete) |
| **Nature** | Thinking (T) / Feeling (F) | How you make decisions (logic vs. values) |
| **Tactics** | Judging (J) / Prospecting (P) | How you plan (structure vs. flexibility) |
| **Identity** | Assertive (A) / Turbulent (T) | Your confidence & sensitivity to stress (modifies all the others) |

The first four letters give one of **16 types** (e.g. `INTJ`); the Identity axis appends `-A` or `-T`, giving 32 variants and codes like **`INTJ-A`**.

### 1.3 The 16 types, grouped into 4 families
- **Analysts (NT):** Architect (INTJ), Logician (INTP), Commander (ENTJ), Debater (ENTP)
- **Diplomats (NF):** Advocate (INFJ), Mediator (INFP), Protagonist (ENFJ), Campaigner (ENFP)
- **Sentinels (SJ):** Logistician (ISTJ), Defender (ISFJ), Executive (ESTJ), Consul (ESFJ)
- **Explorers (SP):** Virtuoso (ISTP), Adventurer (ISFP), Entrepreneur (ESTP), Entertainer (ESFP)

---

## 2. What I built (Persona Atlas)

A completely dynamic replica + expansion of the concept.

### 2.1 Faithful test experience
- 60 balanced statements (12 per dimension) in `lib/questions.js`.
- The exact **graduated 7-dot Agree/Disagree UI**, one-at-a-time, with progress bar, Back & Skip.
- Client-side scoring (`lib/scoring.js`) → normalizes each axis to a percentage → resolves the 4-letter type + Identity → routes to a shareable result URL (`/result?type=INTJ-A`).

### 2.2 Animated doodle "action figures"
- Every one of the 16 types gets a **friendly animated SVG character** (`components/Doodle.jsx`) that **bobs, waves, blinks**, and floats a **type-specific prop** (♟️ for the Architect, 💡 for the Logician, 👑 for the Commander, 🎤 for the Entertainer, etc.).
- Colored by its family (Analyst purple, Diplomat green, Sentinel blue, Explorer amber).
- Respects `prefers-reduced-motion` for accessibility.

### 2.3 The dynamic life report (the "40-page report")
Each result page generates a full, tailored report (`components/Report.jsx` + `lib/types.js`) with these sections for the specific type:
1. **Overview** + your Assertive/Turbulent variant
2. **Your 5 dimensions** — animated strength bars
3. **Strengths & blind spots**
4. **Education** — how you learn, environments where you thrive, study/choice tips
5. **Careers & likely fields of success** — fields, specific roles, work style
6. **Financial style** — money strengths, pitfalls, tailored advice (with a not-financial-advice disclaimer)
7. **Relationships & life partner** — as a partner, who complements you, what to watch for
8. **Growth path** + famous people who share your type
- One-click **"Save / Print report (PDF)"** (print-optimized CSS) turns it into a downloadable document.

### 2.4 Fully dynamic & responsive
- Landing page, 4 family cards, a 16-doodle gallery (each links to its report), how-it-works, CTA.
- Mobile/tablet/desktop responsive; theme-consistent design system in `app/globals.css`.

---

## 3. Free GitHub repos & datasets you can integrate to make it better

These are all free/open-source and slot naturally into the current architecture.

### Personality data & questionnaires
- **rubynor/sixteen-personalities** and community **MBTI question banks** — expand beyond 60 items or add validated item pools.
- **jarnaver/16-Personalities** / various **"16-personalities-api"** repos — reference JSON of type descriptions to enrich `lib/types.js`.
- **Open-Source-Psychometrics / IPIP-NEO** (International Personality Item Pool) — *public-domain* Big-Five item banks; the psychometrically sound way to make the test scientifically defensible.

### Charts & result visualisation
- **recharts** or **nivo** (`@nivo/radar`) — swap the CSS bars for an interactive **radar/spider chart** of the 5 dimensions.
- **chart.js** + **react-chartjs-2** — lightweight alternative for the dimension breakdown.

### Doodles / animated characters (upgrade the figures)
- **DiceBear (`@dicebear/core` + collections)** — MIT avatar library; generate deterministic, richly-varied characters per type.
- **open-peeps** / **Blush "Open Peeps"** and **undraw illustrations** (openly licensed) — hand-drawn people & scenes to theme each family.
- **lottie-react** + **LottieFiles** free packs — drop in professionally animated character loops instead of hand-built SVG.
- **react-spring** / **framer-motion** — richer, physics-based entrance and hover animations.

### PDF export (make the "40-page report" a true file)
- **react-pdf (`@react-pdf/renderer`)** — render a real, paginated PDF server-side instead of relying on the browser print dialog.
- **puppeteer** on a Vercel serverless function — pixel-perfect PDF of the exact styled page.

### Persistence, accounts & sharing
- **Supabase** (free tier; already available in your toolchain) — store results, let users track changes over time, compare with friends.
- **NextAuth.js** — optional login so reports are saved to an account.
- **@vercel/og** — auto-generate a shareable social preview image per type ("I'm an INTJ-A").

### Content depth (career/finance/relationship guidance)
- **O*NET / onetcenter data** (public domain, US Dept. of Labor) — map each type to real occupations, salaries, and skill demands for the careers section.
- **Open Trivia / Wikidata "notable people by MBTI"** community lists — expand the "famous people who share your type" set.

---

## 4. Suggested roadmap (highest value first)
1. **Radar chart** for the 5 dimensions (`@nivo/radar`) — biggest visual upgrade for least effort.
2. **Real PDF export** (`@react-pdf/renderer`) — delivers the literal downloadable 40-page report.
3. **Supabase persistence + accounts** — turn one-off tests into a product with retention.
4. **DiceBear or Lottie characters** — level up the doodles into a signature brand.
5. **O*NET-backed careers** — make the guidance data-driven and credible.
6. **Type-compatibility matrix** — an interactive "who you match with" grid across all 16 types.

---

## 5. Important note on the framework
This is an **educational, entertainment-oriented** tool built on Jungian/MBTI-style typology plus a Big-Five-adjacent Identity axis. MBTI-style type indicators are popular and insightful for self-reflection but are **not clinically validated**; the financial, career, and relationship sections are **general guidance, not professional advice**. For real decisions about money, career, or relationships, consult a qualified professional. (The IPIP/Big-Five integration in §3 is the path to a more scientifically grounded version.)
