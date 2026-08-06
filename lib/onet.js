// India-focused occupation data. Median annual salary in INR and demand
// outlook for the Indian job market. Figures are approximate national medians
// compiled from public Indian salary sources (AmbitionBox / Glassdoor India /
// PayScale India, 2024) — indicative, not exact.
const OCC = [
  { label: "Software Developer", median: 900000, growth: "Very high demand in India", kw: ["software", "systems architect", "machine learning", "ml engineer", "developer", "technical architect"] },
  { label: "Data Scientist", median: 1200000, growth: "Very high demand · fast-growing", kw: ["data scientist", "data / analytics", "analytics", "data"] },
  { label: "Management Consultant", median: 1400000, growth: "High demand · premium field", kw: ["consultant", "strategist", "strategy", "corporate strategist"] },
  { label: "Finance / Investment Manager", median: 1600000, growth: "High demand", kw: ["investment banker", "financial officer", "financial manager", "venture", "banker"] },
  { label: "Financial / Investment Analyst", median: 850000, growth: "Steady, strong demand", kw: ["investment analyst", "financial analyst", "analyst"] },
  { label: "CEO / Business Head", median: 4000000, growth: "Top-tier · varies widely", kw: ["ceo", "executive", "chief", "director of"] },
  { label: "Lawyer / Advocate", median: 700000, growth: "Steady demand", kw: ["lawyer", "judge", "attorney", "legal"] },
  { label: "Marketing Manager", median: 1200000, growth: "High demand · digital-led", kw: ["marketing", "brand"] },
  { label: "PR / Communications Specialist", median: 600000, growth: "Steady demand", kw: ["public relations", "communications", "pr "] },
  { label: "Art / Creative Director", median: 1100000, growth: "Growing · media & D2C", kw: ["creative director", "art director"] },
  { label: "Mathematician / Statistician", median: 900000, growth: "Growing · analytics-driven", kw: ["mathematician", "statistician"] },
  { label: "Research Scientist", median: 800000, growth: "Niche · strong in R&D hubs", kw: ["research scientist", "scientist", "research"] },
  { label: "Professor / Lecturer", median: 900000, growth: "Steady demand", kw: ["professor", "postsecondary"] },
  { label: "Product / Project Manager", median: 1800000, growth: "Very high demand · premium", kw: ["product manager", "project manager", "project director", "product"] },
  { label: "Counsellor / Therapist", median: 500000, growth: "Fast-growing awareness", kw: ["counselor", "therapist"] },
  { label: "Writer / Content Professional", median: 550000, growth: "Growing · content economy", kw: ["writer", "author", "content creator", "content", "copywriter"] },
  { label: "School Teacher", median: 400000, growth: "Steady, wide demand", kw: ["teacher", "educator", "trainer"] },
  { label: "Social Worker", median: 400000, growth: "Steady · NGO/CSR growth", kw: ["social worker"] },
  { label: "HR Specialist", median: 650000, growth: "Steady demand", kw: ["hr", "human resources", "people specialist", "people manager", "customer success"] },
  { label: "UX / Product Designer", median: 900000, growth: "High demand · fast-growing", kw: ["ux", "design researcher", "designer", "design"] },
  { label: "Registered Nurse", median: 400000, growth: "High demand · healthcare boom", kw: ["nurse", "nursing", "healthcare"] },
  { label: "Librarian / Archivist", median: 420000, growth: "Steady · niche", kw: ["librarian", "archivist"] },
  { label: "Accountant / Auditor (CA track)", median: 800000, growth: "Strong, stable demand", kw: ["accountant", "auditor"] },
  { label: "Operations Manager", median: 1000000, growth: "High demand", kw: ["operations", "general manager", "office manager"] },
  { label: "Engineer", median: 700000, growth: "Broad demand", kw: ["engineer", "mechanic", "technician", "electrician"] },
  { label: "Administrator", median: 600000, growth: "Steady demand", kw: ["administrator", "administration", "coordinator"] },
  { label: "Sales Manager", median: 900000, growth: "High demand · incentive-led", kw: ["sales", "business development", "account manager"] },
  { label: "Event Planner", median: 500000, growth: "Growing · events rebound", kw: ["event", "hospitality"] },
  { label: "NGO / Community Program Manager", median: 650000, growth: "Growing · CSR-funded", kw: ["community", "nonprofit", "advocacy"] },
  { label: "Commercial Pilot", median: 2500000, growth: "High demand · aviation growth", kw: ["pilot"] },
  { label: "Paramedic / EMT", median: 300000, growth: "Growing · emergency care", kw: ["paramedic", "first responder", "emt"] },
  { label: "Forensic Analyst", median: 500000, growth: "Niche · growing", kw: ["forensic"] },
  { label: "Chef / Culinary Professional", median: 500000, growth: "Growing · hospitality", kw: ["chef", "culinary", "cook"] },
  { label: "Photographer", median: 420000, growth: "Freelance-led · variable", kw: ["photographer"] },
  { label: "Veterinarian", median: 600000, growth: "Growing · pet-care boom", kw: ["veterinarian", "vet "] },
  { label: "Fitness / Wellness Coach", median: 420000, growth: "Fast-growing", kw: ["fitness", "wellness", "coach"] },
  { label: "Real-Estate Consultant", median: 500000, growth: "Commission-led · variable", kw: ["real estate"] },
  { label: "Stock Trader / Sub-broker", median: 800000, growth: "Growing · retail investing", kw: ["stockbroker", "trader"] },
  { label: "Cabin Crew / Flight Attendant", median: 600000, growth: "Growing · aviation", kw: ["flight attendant"] },
  { label: "Preschool Educator", median: 300000, growth: "Steady demand", kw: ["early childhood", "preschool"] },
  { label: "Artist", median: 400000, growth: "Passion-led · variable", kw: ["artist", "painter"] },
  { label: "Musician", medianText: "varies widely (gig + royalties)", growth: "Passion-led", kw: ["musician", "singer"] },
  { label: "Actor / Entertainer", medianText: "varies widely", growth: "Competitive · high upside", kw: ["performer", "entertainer", "actor"] },
  { label: "Social-Media / Digital Creator", medianText: "creator economy · income varies", growth: "Booming in India", kw: ["social media", "creator", "media"] },
  { label: "Entrepreneur / Founder", medianText: "self-employed · you set the ceiling", growth: "India startup boom", kw: ["entrepreneur", "founder", "startup"] },
];

// Format INR with Indian digit grouping (lakhs) + an LPA hint.
export function fmtMoney(n) {
  const s = Math.round(n).toString();
  let last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest) last3 = "," + last3;
  rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const lpa = (n / 100000).toFixed(n % 100000 === 0 ? 0 : 1);
  return `₹${rest}${last3}/yr (~₹${lpa} LPA)`;
}

export function lookupCareer(role) {
  const r = role.toLowerCase();
  for (const o of OCC) {
    if (o.kw.some((k) => r.includes(k.trim()))) return o;
  }
  return null;
}
