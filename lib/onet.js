// Curated occupation data sourced from the U.S. Bureau of Labor Statistics
// Occupational Outlook Handbook / O*NET (public domain). Median annual wage
// and 2022–2032 projected growth. Figures are approximate national medians.
// Ordered so more specific keywords match before generic ones.
const OCC = [
  { label: "Software Developers", median: 132270, growth: "+25% · much faster than average", kw: ["software", "systems architect", "machine learning", "ml engineer", "developer", "technical architect"] },
  { label: "Data Scientists", median: 108020, growth: "+35% · much faster than average", kw: ["data scientist", "data / analytics", "analytics", "data"] },
  { label: "Management Consultants", median: 99410, growth: "+10% · faster than average", kw: ["consultant", "strategist", "strategy", "corporate strategist"] },
  { label: "Financial Managers", median: 156100, growth: "+16% · much faster than average", kw: ["investment banker", "financial officer", "financial manager", "venture", "banker"] },
  { label: "Financial & Investment Analysts", median: 99890, growth: "+8% · faster than average", kw: ["investment analyst", "financial analyst", "analyst"] },
  { label: "Chief Executives", median: 206680, growth: "+3% · slower than average", kw: ["ceo", "executive", "chief", "director of"] },
  { label: "Lawyers & Judges", median: 145760, growth: "+8% · faster than average", kw: ["lawyer", "judge", "attorney", "legal"] },
  { label: "Marketing Managers", median: 157620, growth: "+6% · faster than average", kw: ["marketing", "brand"] },
  { label: "Public Relations Specialists", median: 67440, growth: "+6% · faster than average", kw: ["public relations", "communications", "pr "] },
  { label: "Art & Creative Directors", median: 105180, growth: "+6% · faster than average", kw: ["creative director", "art director"] },
  { label: "Mathematicians & Statisticians", median: 104860, growth: "+30% · much faster than average", kw: ["mathematician", "statistician"] },
  { label: "Natural-Sciences Researchers", median: 103810, growth: "+7% · faster than average", kw: ["research scientist", "scientist", "research"] },
  { label: "Postsecondary Teachers (Professors)", median: 84380, growth: "+8% · faster than average", kw: ["professor", "postsecondary"] },
  { label: "Project / Product Managers", median: 98580, growth: "+7% · faster than average", kw: ["product manager", "project manager", "project director", "product"] },
  { label: "Substance-Abuse & Mental-Health Counselors", median: 53710, growth: "+18% · much faster than average", kw: ["counselor", "therapist"] },
  { label: "Writers & Authors", median: 73690, growth: "+4% · average", kw: ["writer", "author", "content creator", "content", "copywriter"] },
  { label: "K–12 Teachers", median: 63670, growth: "+1% · little change", kw: ["teacher", "educator", "trainer"] },
  { label: "Social Workers", median: 58380, growth: "+7% · faster than average", kw: ["social worker"] },
  { label: "Human-Resources Specialists", median: 67650, growth: "+6% · faster than average", kw: ["hr", "human resources", "people specialist", "people manager", "customer success"] },
  { label: "Web & Digital / UX Designers", median: 92750, growth: "+16% · much faster than average", kw: ["ux", "design researcher", "designer", "design"] },
  { label: "Registered Nurses", median: 86070, growth: "+6% · faster than average", kw: ["nurse", "nursing", "healthcare"] },
  { label: "Librarians & Archivists", median: 64370, growth: "+3% · average", kw: ["librarian", "archivist"] },
  { label: "Accountants & Auditors", median: 79880, growth: "+4% · average", kw: ["accountant", "auditor"] },
  { label: "General & Operations Managers", median: 101280, growth: "+6% · faster than average", kw: ["operations", "general manager", "office manager"] },
  { label: "Engineers", median: 99510, growth: "+10% · faster than average", kw: ["engineer", "mechanic", "technician", "electrician"] },
  { label: "Administrative-Services Managers", median: 106470, growth: "+5% · faster than average", kw: ["administrator", "administration", "coordinator"] },
  { label: "Sales Managers", median: 135160, growth: "+4% · average", kw: ["sales", "business development", "account manager"] },
  { label: "Meeting & Event Planners", median: 56920, growth: "+8% · faster than average", kw: ["event", "hospitality"] },
  { label: "Social & Community Service Managers", median: 77030, growth: "+9% · faster than average", kw: ["community", "nonprofit", "advocacy"] },
  { label: "Airline Pilots", median: 171210, growth: "+4% · average", kw: ["pilot"] },
  { label: "Paramedics & EMTs", median: 49090, growth: "+5% · faster than average", kw: ["paramedic", "first responder", "emt"] },
  { label: "Forensic Science Technicians", median: 64940, growth: "+13% · much faster than average", kw: ["forensic"] },
  { label: "Chefs & Head Cooks", median: 58920, growth: "+5% · faster than average", kw: ["chef", "culinary", "cook"] },
  { label: "Photographers", median: 40760, growth: "+4% · average", kw: ["photographer"] },
  { label: "Veterinarians", median: 119100, growth: "+20% · much faster than average", kw: ["veterinarian", "vet "] },
  { label: "Fitness Trainers & Wellness Coaches", median: 46480, growth: "+14% · much faster than average", kw: ["fitness", "wellness", "coach"] },
  { label: "Real-Estate Agents", median: 52030, growth: "+3% · average", kw: ["real estate"] },
  { label: "Securities & Financial Sales Agents", median: 76900, growth: "+7% · faster than average", kw: ["stockbroker", "trader"] },
  { label: "Flight Attendants", median: 68370, growth: "+11% · much faster than average", kw: ["flight attendant"] },
  { label: "Preschool / Early-Childhood Teachers", median: 37130, growth: "+3% · average", kw: ["early childhood", "preschool"] },
  { label: "Artists & Fine Artists", median: 58910, growth: "+3% · average", kw: ["artist", "painter"] },
  { label: "Musicians & Singers", medianText: "$39/hr (varies widely)", growth: "+1% · little change", kw: ["musician", "singer"] },
  { label: "Actors & Entertainers", medianText: "$20.50/hr (varies widely)", growth: "+4% · average", kw: ["performer", "entertainer", "actor"] },
  { label: "Social-Media & Digital Creators", medianText: "emerging role · income varies", growth: "growing demand", kw: ["social media", "creator", "media"] },
  { label: "Entrepreneurs / Founders", medianText: "self-employed · income varies", growth: "you set the ceiling", kw: ["entrepreneur", "founder", "startup"] },
];

export function fmtMoney(n) {
  return "$" + n.toLocaleString("en-US");
}

// Match a free-text role string to the best occupation record.
export function lookupCareer(role) {
  const r = role.toLowerCase();
  for (const o of OCC) {
    if (o.kw.some((k) => r.includes(k.trim()))) return o;
  }
  return null;
}
