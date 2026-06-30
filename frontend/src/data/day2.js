// Day 2 content — verbatim from Stage 2 brief
// Imports CHARACTERS from day1 for shared character voices

import { CHARACTERS } from "./day1";
export { CHARACTERS };

// Reflection content shown AFTER Day 2 (i.e. on the way to Day 3)
export const DAY2_REFLECTION_QUESTIONS = [
  "What helped build trust today?",
  "Which cultural lesson surprised you the most?",
  "What should humanity focus on in the final session tomorrow?",
];

export const DAY3_TEASER =
  "Tomorrow: DAY 3 — Building Trust. A joint scientific mission. A historic agreement. The beginning of an interstellar partnership that will define humanity's future.";

// Trust-state DM (Vikram) fired at Day 2 start
export const DAY2_START_VIKRAM_DM = {
  high: "Today we make history. I need your best judgment out there.",
  neutral: "First contact expedition is a go. Stay calm and observant.",
  low: "Follow protocols today.",
};

export const DAY2_SCENES = [
  {
    id: "2.1",
    title: "Arrival at the Landing Site",
    format: "Mission Chat",
    time: "08:00",
    status: "HISTORIC",
    feedItem: {
      category: "Mission Alert",
      priority: "PRIORITY",
      headline: "Alien delegation confirmed 2km from landing site",
      body:
        "Translation systems: ONLINE. Mission status escalated to HISTORIC. All four team members on-site.",
      time: "08:00",
    },
    items: [
      {
        type: "system",
        icon: "📡",
        title: "MISSION ALERT",
        priority: "PRIORITY",
        lines: [
          "Alien delegation confirmed 2km from landing site",
          "Translation systems: ONLINE",
          "Mission status: HISTORIC",
        ],
      },
      { type: "message", speaker: "vikram", text: "Everyone stay calm and observant. Today we represent all of humanity." },
      { type: "message", speaker: "ananya", text: "Remember, we're here to learn as much as to communicate. Don't rush anything." },
      { type: "message", speaker: "ishaan", text: "Translation systems are online. Accuracy is at 31% but improving with each exchange." },
      { type: "message", speaker: "sara", text: "Watch body language as closely as spoken language. Gesture and posture will tell us as much as words." },
      { type: "message", speaker: "vikram", text: "We move together. We speak carefully. We listen more than we talk." },
    ],
  },
  {
    id: "2.2",
    title: "The First Greeting",
    format: "Contact Zone",
    time: "09:30",
    status: "HISTORIC",
    items: [
      {
        type: "system",
        icon: "✨",
        title: "FIRST VISUAL CONTACT",
        priority: "PRIORITY",
        lines: [
          "Alien delegation visible.",
          "Peaceful approach confirmed.",
        ],
      },
      { type: "message", speaker: "sara", text: "They're approaching slowly. Deliberately. That's respectful." },
      { type: "message", speaker: "ananya", text: "Three individuals. Bilateral symmetry. Similar height to humans. They breathe our atmosphere." },
      { type: "message", speaker: "ishaan", text: "They're producing structured sound. Could be speech. Recording everything." },
      { type: "message", speaker: "vikram", text: "We need to respond. How do we greet them?" },
      {
        type: "decision",
        id: "d4",
        prompt: "DECISION 4 — How does humanity greet the alien delegation?",
        options: [
          {
            id: "A",
            label: "Offer a respectful greeting first.",
            effects: { diplomacy: 6, communication: 3, trust_sara: 3 },
            reactions: [
              { speaker: "sara", text: "Initiating contact shows confidence and openness. Well done." },
              { speaker: "vikram", text: "Good. We set the tone." },
            ],
          },
          {
            id: "B",
            label: "Wait for the aliens to make the first move.",
            effects: { scientific_knowledge: 5, mission_trust: 3, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "Patience is a form of respect. They appreciate it." },
              { speaker: "sara", text: "They just nodded. I think that's a positive signal." },
            ],
          },
          {
            id: "C",
            label: "Use AI to suggest the safest communication.",
            effects: { communication: 5, discovery_progress: 3, trust_ishaan: 3 },
            reactions: [
              { speaker: "ishaan", text: "System recommends mirroring their opening gesture. Executing now." },
              { speaker: "vikram", text: "Clean. Measured. Good call." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2.3",
    title: "Learning Their Language",
    format: "Translation Lab",
    time: "11:00",
    status: "HISTORIC",
    feedItem: {
      category: "Translation Update",
      priority: "STANDARD",
      headline: "Translation accuracy 31% → 58% — dual-channel comms enabled",
      body:
        "New patterns: 847. Shared concepts identified: mathematics, light, time, life. Light-frequency channel carries emotional context; sound carries information.",
      time: "11:00",
    },
    items: [
      {
        type: "system",
        icon: "📊",
        title: "TRANSLATION UPDATE",
        priority: "STANDARD",
        lines: [
          "Accuracy: 31% → 58%",
          "New patterns: 847",
          "Shared concepts identified: mathematics, light, time, life",
        ],
      },
      { type: "message", speaker: "ishaan", text: "This is incredible. Every exchange teaches the system ten new patterns." },
      { type: "message", speaker: "ishaan", text: "They use light frequency modulation alongside sound. It's like having two languages simultaneously." },
      { type: "message", speaker: "ananya", text: "The light patterns may carry emotional context. The sound carries information." },
      { type: "message", speaker: "sara", text: "So what they say and how they feel are transmitted separately. That's fascinating." },
      { type: "message", speaker: "vikram", text: "Can we reply in both?" },
      { type: "message", speaker: "ishaan", text: "Give me twenty minutes." },
      {
        type: "system",
        icon: "✨",
        title: "TRANSLATION STATUS",
        priority: "STANDARD",
        lines: [
          "Translation accuracy: 58%",
          "Dual-channel communication enabled",
        ],
      },
    ],
  },
  {
    id: "2.4",
    title: "Cultural Exchange",
    format: "Shared Meeting Dome",
    time: "13:00",
    status: "HISTORIC",
    items: [
      { type: "message", speaker: "sara", text: "They want to share something about their world. And they're inviting us to share about ours." },
      { type: "message", speaker: "vikram", text: "This is a cultural exchange moment. What do we show them?" },
      { type: "message", speaker: "ananya", text: "Science crosses language barriers. They already respect our mathematics." },
      { type: "message", speaker: "ishaan", text: "But humanity is more than science. Our diversity is our greatest strength." },
      { type: "message", speaker: "sara", text: "Or we could show them what we want most — peaceful partnership. Lead with intent." },
      {
        type: "decision",
        id: "d5",
        prompt: "DECISION 5 — What does humanity share in the cultural exchange?",
        options: [
          {
            id: "A",
            label: "Share Earth's scientific achievements.",
            effects: { scientific_knowledge: 6, discovery_progress: 3, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "They're responding with their own discoveries. A scientific conversation across civilizations." },
            ],
          },
          {
            id: "B",
            label: "Share Earth's cultural diversity.",
            effects: { diplomacy: 5, communication: 4, trust_sara: 3 },
            reactions: [
              { speaker: "sara", text: "They seem moved. Multiple civilizations united on one planet. That's remarkable to them." },
            ],
          },
          {
            id: "C",
            label: "Share humanity's hopes for peaceful cooperation.",
            effects: { mission_trust: 6, diplomacy: 3, trust_vikram: 3 },
            reactions: [
              { speaker: "vikram", text: "We led with intention. They understand what we're here for." },
              { speaker: "sara", text: "Beautiful. And effective." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2.5",
    title: "Solving a Shared Problem",
    format: "Joint Research Station",
    time: "15:00",
    status: "HISTORIC",
    feedItem: {
      category: "Mission Alert",
      priority: "PRIORITY",
      headline: "Translation equipment malfunction — both teams affected",
      body:
        "Power fluctuation affecting communication systems on both sides. Solar activity spike suspected.",
      time: "15:00",
    },
    items: [
      {
        type: "system",
        icon: "🔧",
        title: "MISSION ALERT",
        priority: "PRIORITY",
        lines: [
          "Translation equipment malfunction.",
          "Power fluctuation affecting both teams' communication systems.",
        ],
      },
      { type: "message", speaker: "ishaan", text: "Power fluctuation. Translation equipment is down on our side." },
      { type: "message", speaker: "ishaan", text: "And it looks like their systems are affected too. Same source?" },
      { type: "message", speaker: "ananya", text: "The solar activity reading spiked two minutes ago. Could be interference." },
      { type: "message", speaker: "sara", text: "They look concerned but not alarmed. They're waiting to see what we do." },
      { type: "message", speaker: "vikram", text: "This is a test we didn't expect. How do we handle it?" },
      {
        type: "decision",
        id: "d6",
        prompt: "DECISION 6 — How do we handle the equipment failure?",
        options: [
          {
            id: "A",
            label: "Solve it together immediately.",
            effects: { mission_trust: 6, diplomacy: 4, trust_vikram: 3 },
            reactions: [
              { speaker: "vikram", text: "Shared problem, shared solution. This builds more trust than any planned exchange." },
              { speaker: "ishaan", text: "Their engineer just showed me something extraordinary." },
            ],
          },
          {
            id: "B",
            label: "Observe how the alien engineers approach it.",
            effects: { scientific_knowledge: 6, discovery_progress: 4, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "Watch carefully. Their diagnostic approach is completely different from ours." },
              { speaker: "ishaan", text: "I'm learning more in five minutes than I would in a year." },
            ],
          },
          {
            id: "C",
            label: "Combine both teams' ideas into one solution.",
            effects: { communication: 5, mission_trust: 4, trust_ishaan: 3 },
            reactions: [
              { speaker: "ishaan", text: "Their method plus our method. Systems back online in ninety seconds." },
              { speaker: "sara", text: "They're delighted. This was the best thing that could have happened." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2.6",
    title: "Trust Grows",
    format: "Diplomatic Briefing",
    time: "16:30",
    status: "HISTORIC",
    feedItem: {
      category: "Diplomatic Brief",
      priority: "STANDARD",
      headline: "Formal invitation extended — visit to alien research habitat",
      body:
        "Openness index: HIGH. Trust indicators: POSITIVE. Delegation has invited the human team to tour one of their working research stations.",
      time: "16:30",
    },
    items: [
      {
        type: "system",
        icon: "🌟",
        title: "DIPLOMATIC UPDATE",
        priority: "STANDARD",
        lines: [
          "Alien delegation extends formal invitation to visit research habitat.",
          "Openness index: HIGH",
          "Trust indicators: POSITIVE",
        ],
      },
      { type: "message", speaker: "sara", text: "They've just done something extraordinary. They've invited us to visit one of their research stations." },
      { type: "message", speaker: "vikram", text: "That's not a small gesture." },
      { type: "message", speaker: "sara", text: "It means they trust us enough to show us something real. Not just what they prepared for first contact." },
      { type: "message", speaker: "ananya", text: "An alien research habitat. The biology alone would be…" },
      { type: "message", speaker: "ishaan", text: "Incredible. Yes. We know, Ananya." },
      { type: "message", speaker: "ananya", text: "I was going to say career-defining but incredible works too." },
    ],
  },
  {
    id: "2.7",
    title: "Planning the Partnership",
    format: "Mission Council",
    time: "18:00",
    status: "HISTORIC",
    items: [
      { type: "message", speaker: "vikram", text: "We have one day left. And a decision to make about what this partnership looks like going forward." },
      { type: "message", speaker: "ananya", text: "Science is the obvious starting point. We both gain from shared research." },
      { type: "message", speaker: "sara", text: "But cultural exchange may matter more long-term. Understanding creates lasting peace." },
      { type: "message", speaker: "ishaan", text: "Why choose? We build something that covers all of it." },
      { type: "message", speaker: "vikram", text: "Three options. What does the intern recommend?" },
      {
        type: "decision",
        id: "d7",
        prompt: "DECISION 7 — What should the partnership prioritise?",
        options: [
          {
            id: "A",
            label: "Prioritise scientific collaboration.",
            effects: { scientific_knowledge: 6, discovery_progress: 5, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "Science is our shared language. Building on that first is right." },
              { speaker: "ishaan", text: "Agreed. The knowledge exchange alone could accelerate human science by decades." },
            ],
          },
          {
            id: "B",
            label: "Prioritise cultural exchange.",
            effects: { diplomacy: 6, mission_trust: 4, trust_sara: 3 },
            reactions: [
              { speaker: "sara", text: "Culture is what creates lasting bonds. Science can follow." },
              { speaker: "vikram", text: "The most sustainable foundation." },
            ],
          },
          {
            id: "C",
            label: "Balance science, culture and diplomacy equally.",
            effects: { leadership: 5, diplomacy: 3, communication: 3, trust_vikram: 3 },
            reactions: [
              { speaker: "vikram", text: "A complete partnership. That's the hardest to build and the most durable." },
              { speaker: "sara", text: "They nodded. I think they agree." },
            ],
          },
        ],
      },
    ],
  },
];
