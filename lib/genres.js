// Book genres (numbered in the brief) and their sub-genres.
export const GENRES = [
  { g: "Spirituality & Consciousness", subs: ["Spiritual Awakening", "Awareness & Conscious Living", "Mysticism & Esoteric Traditions", "Non-Duality / Advaita", "Spiritual Psychology", "Consciousness Studies"] },
  { g: "Religion & Philosophy", subs: ["Hinduism", "Buddhism", "Comparative Religion", "Eastern Philosophy", "Western Philosophy", "Metaphysics & Ethics"] },
  { g: "Yoga & Kundalini", subs: ["Yoga Traditions", "Kundalini & Energy"] },
  { g: "Meditation & Breathwork", subs: ["Meditation Types", "Breathwork"] },
  { g: "Self-Help & Personal Development", subs: ["Success & Motivation", "Habits & Discipline", "Emotional Intelligence", "Relationships & Communication", "Productivity & Life Skills"] },
  { g: "Health, Healing & Wellness", subs: ["Holistic Health", "Natural Healing", "Ayurveda"] },
  { g: "Psychology & Mind", subs: ["Human Behaviour", "Brain Science", "Positive Psychology", "Consciousness & Mind"] },
  { g: "Business & Leadership", subs: ["Entrepreneurship & Startups", "Leadership & Management", "Wealth & Finance", "Marketing & Branding", "Productivity & Career", "Business Case Studies"] },
  { g: "Biography & Inspiration", subs: ["Spiritual Masters", "Inspirational Lives", "Memoirs"] },
  { g: "Science & Popular Science", subs: ["Physics & Cosmos", "Brain Research", "Science & Spirituality", "Nature & Technology"] },
  { g: "History & Culture", subs: ["Indian History & Culture", "World History", "Ancient Civilizations"] },
  { g: "Children & Young Readers", subs: [] },
  { g: "Food & Lifestyle", subs: ["Cooking", "Conscious Living"] },
  { g: "Art & Architecture", subs: ["Art", "Design & Architecture"] },
  { g: "Education & Study Skills", subs: ["Learning", "Academic Success"] },
  { g: "Fiction & Literature", subs: ["Literary & Classics", "Romance & Contemporary", "Mystery, Thriller & Crime", "Fantasy & Sci-Fi", "Historical & Mythological Fiction", "Horror & Supernatural", "Graphic Novels & Manga", "Poetry & Short Reads"] },
  { g: "Indian Military & Patriotism", subs: [] },
  { g: "Magic", subs: ["Astrology", "Numerology", "Tarot", "Palmistry"] },
  { g: "Mind Games", subs: ["Puzzles", "Sudoku", "Brain Teaser", "Word Search", "Crosswords"] },
  { g: "Manga", subs: [] },
];

// Given the sets the user ticked, expand to the final { genres, subGenres } arrays
// per the rules:
//  - a ticked sub-genre includes its parent genre too
//  - a genre ticked with NO sub-genres ticked → include ALL of that genre's sub-genres
//  - a genre ticked with SOME sub-genres ticked → include only those ticked
export function expandSelection(genreSet, subSet) {
  const genres = [];
  const subGenres = [];
  for (const { g, subs } of GENRES) {
    const ticked = subs.filter((s) => subSet.has(s));
    const genreTicked = genreSet.has(g);
    if (!genreTicked && ticked.length === 0) continue;
    genres.push(g);
    if (ticked.length > 0) subGenres.push(...ticked);
    else if (genreTicked && subs.length > 0) subGenres.push(...subs);
  }
  return { genres, subGenres };
}
