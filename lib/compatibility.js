import { TYPES } from "./types";

// Heuristic pairing model. Indices of the 4-letter code:
// 0 = Mind E/I, 1 = Energy N/S, 2 = Nature T/F, 3 = Tactics J/P.
// Grounded in the common typology view that partners do best sharing a
// world-view (Energy) while complementing each other on Mind and Tactics.
export function score(a, b) {
  const same = (i) => a[i] === b[i];
  let v = 0;
  v += same(1) ? 40 : 0;      // Energy (N/S) — shared perception of reality
  v += same(0) ? 8 : 16;      // Mind (E/I) — complementary energy
  v += same(2) ? 8 : 12;      // Nature (T/F) — a little contrast helps
  v += same(3) ? 8 : 16;      // Tactics (J/P) — planner + adapter balance
  if (a[1] === "N" && b[1] === "N") v += 8; // intuitive rapport
  if (a[1] === "S" && b[1] === "S") v += 6; // grounded rapport
  if (a === b) v = Math.max(v, 64);          // mirror: deep mutual understanding
  return Math.min(100, Math.round(v * 1.05));
}

export function band(v) {
  if (v >= 82) return { label: "Excellent", color: "#10b981" };
  if (v >= 66) return { label: "Strong", color: "#22c55e" };
  if (v >= 50) return { label: "Good", color: "#0ea5e9" };
  if (v >= 36) return { label: "Fair", color: "#f59e0b" };
  return { label: "Challenging", color: "#ef4444" };
}

export function note(a, b) {
  const same = (i) => a[i] === b[i];
  if (a === b) return "Two of a kind — effortless understanding, but you may amplify each other's blind spots.";
  const bits = [];
  bits.push(same(1) ? "You share a way of seeing the world, which makes communication feel natural." :
    "You perceive reality differently (abstract vs. concrete) — the biggest thing to bridge.");
  bits.push(same(0) ? "You both recharge the same way." : "One draws energy from people, the other from solitude — a nice balance.");
  bits.push(same(3) ? "You approach plans similarly." : "One brings structure, the other flexibility — complementary if respected.");
  return bits.join(" ");
}

export const CODES = Object.keys(TYPES);

export function bestMatches(code, n = 5) {
  return CODES.filter((c) => c !== code)
    .map((c) => ({ code: c, name: TYPES[c].name, v: score(code, c) }))
    .sort((x, y) => y.v - x.v)
    .slice(0, n);
}
