// sessionStorage-backed game state for Alien First Contact

const KEY = "afc_state_v1";

export const DEFAULT_VARS = {
  leadership: 50,
  scientific_knowledge: 50,
  diplomacy: 50,
  communication: 50,
  mission_trust: 50,
  discovery_progress: 50,
  trust_ananya: 50,
  trust_vikram: 50,
  trust_ishaan: 50,
  trust_sara: 50,
};

export const STAT_LABELS = [
  ["leadership", "Leadership"],
  ["scientific_knowledge", "Scientific Knowledge"],
  ["diplomacy", "Diplomacy"],
  ["communication", "Communication"],
  ["mission_trust", "Mission Trust"],
  ["discovery_progress", "Discovery Progress"],
];

export const CHARACTER_TRUST = [
  ["trust_ananya", "Dr. Ananya Bose"],
  ["trust_vikram", "Commander Vikram Arora"],
  ["trust_ishaan", "Ishaan Kapoor"],
  ["trust_sara", "Sara Fernandes"],
];

const initialState = () => ({
  intern_name: "",
  vars: { ...DEFAULT_VARS },
  day: 1,
  status: "ALL CLEAR",
  scene_index: 0, // 0..N-1 for current day's scenes
  scene_progress: {}, // sceneId -> { decisionId? }
  feed: [], // [{ id, category, headline, body, priority, time }]
  feed_seen_ids: [], // ids the user has viewed on the Signal Feed
  dms: { vikram: [], ananya: [], ishaan: [], sara: [] }, // arrays of { text, read }
  reflection_answers: ["", "", ""],
  day2_reflection_answers: ["", "", ""],
  day3_reflection_answers: ["", "", ""],
  day1_complete: false,
  day2_complete: false,
  day3_complete: false,
  day2_started: false, // legacy flag, kept for backwards compat
  day_dms_sent: [false, false, false], // index 0 = Day 1, 1 = Day 2, 2 = Day 3
});

export function loadState() {
  if (typeof window === "undefined") return initialState();
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw);
    // Merge defaults to guard against shape drift
    return { ...initialState(), ...parsed, vars: { ...DEFAULT_VARS, ...(parsed.vars || {}) } };
  } catch {
    return initialState();
  }
}

export function saveState(state) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function resetState() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function applyEffects(vars, effects) {
  const next = { ...vars };
  Object.entries(effects || {}).forEach(([k, v]) => {
    next[k] = Math.max(0, Math.min(100, (next[k] ?? 50) + v));
  });
  return next;
}

export function relationshipLabel(value) {
  if (value >= 65) return "High";
  if (value <= 40) return "Low";
  return "Neutral";
}
