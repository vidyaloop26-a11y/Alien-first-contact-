// Day 3 content — verbatim from Stage 3 brief
import { CHARACTERS } from "./day1";
export { CHARACTERS };

export const DAY3_REFLECTION_QUESTIONS = [
  "Which decision helped build the strongest trust?",
  "What did you learn about communicating across different cultures?",
  "Why is peaceful cooperation important in exploration?",
];

// Dominant variable lines (highest var wins; tiebreaker = leadership)
export const DOMINANT_SUMMARY_LINES = {
  leadership:
    "You guided humanity's first interstellar mission with clarity and purpose. History will remember the decisions made here.",
  scientific_knowledge:
    "You expanded humanity's understanding of life beyond our world. The discoveries made here are only the beginning.",
  diplomacy:
    "You built lasting trust between two civilizations. That trust is now the foundation of an interstellar partnership.",
  communication:
    "You bridged two worlds through careful, respectful communication. Language is now a bridge, not a barrier.",
  mission_trust:
    "You helped both civilizations believe in each other. That belief is what makes long-term partnership possible.",
  discovery_progress:
    "You helped uncover what neither civilization could find alone. Discovery is better when shared.",
};

// Order matters for tiebreaker: leadership first wins ties when iterating with strict greater
export const STAT_TIEBREAK_ORDER = [
  "leadership",
  "scientific_knowledge",
  "diplomacy",
  "communication",
  "mission_trust",
  "discovery_progress",
];

export const FINAL_MESSAGE =
  "Three days ago, we detected a signal. Today, we signed a partnership. Everything in between was shaped by curiosity, diplomacy, and the belief that understanding is always worth the effort.";

// Scene 3.6 farewell variants. Threshold per brief: > 65 = high, otherwise low.
export const FAREWELLS = {
  ananya: {
    high:
      "You asked the right questions at every step. Science needs people who want to understand, not just to know. You're one of them.",
    low:
      "The discovery belongs to all of us. I'm glad you were here for it.",
  },
  vikram: {
    high:
      "Three days ago you were an intern. Today you helped broker humanity's first interstellar agreement. That's not a small thing.",
    low: "The mission succeeded. You were part of that.",
  },
  ishaan: {
    high:
      "98% translation accuracy. Do you know how impossible that seemed seventy-two hours ago? And you helped make decisions that kept the mission on track. Thank you.",
    low: "The communication bridge held. That's what matters.",
  },
  sara: {
    high:
      "You understood something most people miss. That how we say something matters as much as what we say. This partnership exists partly because of that.",
    low: "Trust was built. That's the foundation everything else rests on.",
  },
};

export const DAY3_SCENES = [
  {
    id: "3.1",
    title: "Final Mission Briefing",
    format: "Mission Chat",
    time: "08:00",
    status: "HISTORIC",
    feedItem: {
      category: "Mission Alert",
      priority: "PRIORITY",
      headline: "Translation accuracy 98% — partnership talks scheduled today",
      body:
        "Status: HISTORIC. Two civilizations are about to decide what kind of future they build together.",
      time: "08:00",
    },
    items: [
      {
        type: "system",
        icon: "🌟",
        title: "MISSION UPDATE",
        priority: "PRIORITY",
        lines: [
          "Translation accuracy: 98%",
          "Partnership talks: TODAY",
          "Status: HISTORIC",
        ],
      },
      { type: "message", speaker: "vikram", text: "Today we decide what kind of future our civilizations will build together." },
      { type: "message", speaker: "ananya", text: "Scientific cooperation begins with mutual respect. We've built that over two days." },
      { type: "message", speaker: "ishaan", text: "Translation accuracy has reached 98%. We can finally say exactly what we mean." },
      { type: "message", speaker: "sara", text: "Trust is our greatest achievement so far. Today we turn it into something permanent." },
      { type: "message", speaker: "vikram", text: "Let's make it count." },
    ],
  },
  {
    id: "3.2",
    title: "Joint Scientific Mission",
    format: "Research Outpost",
    time: "09:30",
    status: "HISTORIC",
    items: [
      { type: "message", speaker: "ananya", text: "The energy phenomenon is unlike anything in our databases. It appears in both our monitoring data and theirs." },
      { type: "message", speaker: "ishaan", text: "Their instruments measure things ours can't detect. And vice versa. Together we have a complete picture." },
      { type: "message", speaker: "sara", text: "They're excited. I can see it in the light patterns." },
      { type: "message", speaker: "vikram", text: "How do we approach this investigation?" },
      {
        type: "decision",
        id: "d8",
        prompt: "DECISION 8 — How does the joint team investigate the energy phenomenon?",
        options: [
          {
            id: "A",
            label: "Lead the investigation together from the start.",
            effects: { mission_trust: 6, diplomacy: 4, trust_vikram: 3 },
            reactions: [
              { speaker: "vikram", text: "Equals from the first moment. That's the right approach." },
              { speaker: "sara", text: "They responded beautifully to that." },
            ],
          },
          {
            id: "B",
            label: "Observe the alien team's methods first.",
            effects: { scientific_knowledge: 6, discovery_progress: 4, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "We learn more by watching than directing. Their methodology is extraordinary." },
              { speaker: "ishaan", text: "I'm taking notes on everything." },
            ],
          },
          {
            id: "C",
            label: "Divide responsibilities and share findings.",
            effects: { communication: 5, scientific_knowledge: 4, trust_ishaan: 3 },
            reactions: [
              { speaker: "ishaan", text: "Parallel investigation, combined analysis. Efficient and collaborative." },
              { speaker: "ananya", text: "And the results are twice as rich." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3.3",
    title: "Shared Discovery",
    format: "Research Outpost",
    time: "11:30",
    status: "HISTORIC",
    feedItem: {
      category: "Science Log",
      priority: "STANDARD",
      headline: "Energy phenomenon identified — natural stellar gateway",
      body:
        "Shared benefit: navigation + clean energy research. First joint discovery between two civilizations confirmed.",
      time: "11:30",
    },
    items: [
      {
        type: "system",
        icon: "🔬",
        title: "SCIENCE LOG",
        priority: "STANDARD",
        lines: [
          "Energy phenomenon identified: natural stellar gateway",
          "Shared benefit: navigation + clean energy research",
          "First joint discovery confirmed",
        ],
      },
      { type: "message", speaker: "ananya", text: "It's a natural stellar gateway. A fold in space-time created by the gravitational interaction of three stars." },
      { type: "message", speaker: "ishaan", text: "Their civilisation has been studying it for sixty years. We've had no idea it existed." },
      { type: "message", speaker: "sara", text: "And now we discovered it together. That matters to them. I can tell." },
      { type: "message", speaker: "vikram", text: "The first joint discovery between two civilizations. That goes in the history books." },
      { type: "message", speaker: "ananya", text: "Both our history books." },
    ],
  },
  {
    id: "3.4",
    title: "Interstellar Summit",
    format: "Diplomatic Hall",
    time: "13:00",
    status: "HISTORIC",
    feedItem: {
      category: "Diplomatic Brief",
      priority: "PRIORITY",
      headline: "Interstellar Summit opening — partnership framework under discussion",
      body:
        "Representatives from both civilizations present. Long-term partnership being shaped in real time.",
      time: "13:00",
    },
    items: [
      {
        type: "system",
        icon: "🏛",
        title: "DIPLOMATIC BRIEF",
        priority: "PRIORITY",
        lines: [
          "Interstellar Summit opening",
          "Representatives from both civilizations",
          "Partnership framework under discussion",
        ],
      },
      { type: "message", speaker: "sara", text: "Representatives from both civilizations in one room. Think about that." },
      { type: "message", speaker: "vikram", text: "The summit is open. Both sides have spoken about what they hope this partnership becomes." },
      { type: "message", speaker: "ishaan", text: "Their vision is long-term. Centuries, not years." },
      { type: "message", speaker: "ananya", text: "Ours should be too." },
      { type: "message", speaker: "vikram", text: "We need to prepare a partnership proposal. What should it prioritise?" },
    ],
  },
  {
    id: "3.5",
    title: "Final Partnership Decision",
    format: "Mission Council",
    time: "15:00",
    status: "HISTORIC",
    items: [
      { type: "message", speaker: "vikram", text: "One decision left. What does our proposal say?" },
      { type: "message", speaker: "ananya", text: "Science first. Knowledge sharing accelerates both civilizations." },
      { type: "message", speaker: "sara", text: "Culture first. Understanding prevents conflict for centuries." },
      { type: "message", speaker: "ishaan", text: "Everything together. Science, culture, exploration. A complete partnership." },
      { type: "message", speaker: "vikram", text: "Intern. Final recommendation." },
      {
        type: "decision",
        id: "d9",
        prompt: "DECISION 9 — What is humanity's first long-term collaboration initiative?",
        options: [
          {
            id: "A",
            label: "Focus on scientific research.",
            effects: { scientific_knowledge: 7, discovery_progress: 5, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "Science is how we prove our intentions over time. Excellent choice." },
              { speaker: "ishaan", text: "Joint research stations across both star systems. I love this." },
            ],
          },
          {
            id: "B",
            label: "Focus on cultural and educational exchange.",
            effects: { diplomacy: 7, mission_trust: 5, trust_sara: 3 },
            reactions: [
              { speaker: "sara", text: "Culture creates lasting peace. This will matter for generations." },
              { speaker: "vikram", text: "The most durable foundation we could choose." },
            ],
          },
          {
            id: "C",
            label: "Create a balanced partnership across science, culture and exploration.",
            effects: { leadership: 6, diplomacy: 3, communication: 3, trust_vikram: 3 },
            reactions: [
              { speaker: "vikram", text: "A complete vision. The hardest to build. The most enduring." },
              { speaker: "sara", text: "They're smiling. I think that's a smile." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3.6",
    title: "Historic Agreement",
    format: "Ceremony Hall",
    time: "16:30",
    status: "HISTORIC",
    items: [
      {
        type: "system",
        icon: "✨",
        title: "HISTORIC MOMENT",
        priority: "PRIORITY",
        lines: [
          "First interstellar partnership agreement signed.",
          "Both civilizations witnessed.",
        ],
      },
      { type: "message", speaker: "vikram", text: "Today marks the beginning of a new chapter for both our civilizations." },
      { type: "message", speaker: "ananya", text: "Curiosity brought us here." },
      { type: "message", speaker: "ishaan", text: "Communication made this possible." },
      { type: "message", speaker: "sara", text: "Understanding transformed strangers into partners." },
      { type: "silence" },
      // Trust-aware farewell — MissionChat reads current trust vars and renders 4 messages.
      { type: "farewell" },
    ],
  },
];
