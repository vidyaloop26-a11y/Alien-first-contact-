// Day 1 content — verbatim from Stage 1 brief
// Logo URL is referenced in components/Header

export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_5ef235f3-f128-4816-837b-f58fac037485/artifacts/8x1vpox1_Vidyaloop%20%282%29.png";

export const CHARACTERS = {
  ananya: {
    key: "ananya",
    name: "Dr. Ananya Bose",
    role: "Astrobiologist",
    initial: "A",
    color: "from-cyan-400 to-teal-500",
    ring: "ring-cyan-400/40",
    trustVar: "trust_ananya",
  },
  vikram: {
    key: "vikram",
    name: "Commander Vikram Arora",
    role: "Mission Commander",
    initial: "V",
    color: "from-amber-400 to-orange-500",
    ring: "ring-amber-400/40",
    trustVar: "trust_vikram",
  },
  ishaan: {
    key: "ishaan",
    name: "Ishaan Kapoor",
    role: "AI Comms Engineer",
    initial: "I",
    color: "from-fuchsia-400 to-purple-500",
    ring: "ring-fuchsia-400/40",
    trustVar: "trust_ishaan",
  },
  sara: {
    key: "sara",
    name: "Sara Fernandes",
    role: "Cultural Intelligence",
    initial: "S",
    color: "from-emerald-400 to-green-500",
    ring: "ring-emerald-400/40",
    trustVar: "trust_sara",
  },
};

export const ONBOARDING = {
  title: "INTERNATIONAL FIRST CONTACT MISSION",
  grid: [
    { label: "Duration", value: "3 Days" },
    { label: "Location", value: "Deep Space Station Horizon" },
    { label: "Role", value: "Mission Intern" },
    {
      label: "Team",
      value:
        "Dr. Ananya Bose / Commander Vikram Arora / Ishaan Kapoor / Sara Fernandes",
    },
  ],
  briefing:
    "Three days ago, deep-space sensors detected a repeating transmission from a region of space that should be silent. Preliminary analysis confirms it is not natural. It is intelligent. It is directed at us. You have been selected as a Mission Intern on humanity's first official response to extraterrestrial contact. Your team includes an astrobiologist, a mission commander, an AI communications engineer, and a cultural intelligence specialist. This is not a drill. History is listening. Your job is to help us get it right.",
};

// Each scene = ordered list of items with type:
//   "divider": header banner (format/time/status)
//   "message": chat from character
//   "system": system/log card (signal log, transmission log, translation status)
//   "decision": decision card with options
//   "dm": fires a DM to the intern as unread badge
// Reactions on options are arrays of {speaker, text}

export const DAY1_SCENES = [
  {
    id: "1.1",
    title: "Mission Control Briefing",
    format: "Mission Chat",
    time: "08:30",
    status: "SIGNAL DETECTED",
    feedItem: {
      category: "Signal Report",
      priority: "PRIORITY",
      headline: "Repeating transmission isolated from Sector 7-G",
      body:
        "Deep-space sensors have confirmed a non-natural, directed signal. Mission Intern is now active on humanity's first official response.",
      time: "08:30",
    },
    items: [
      { type: "message", speaker: "vikram", text: "Welcome to the International First Contact Mission. I'm Commander Vikram Arora." },
      { type: "message", speaker: "ananya", text: "Dr. Ananya Bose. Astrobiologist. We may be witnessing the most significant moment in human history today." },
      { type: "message", speaker: "ishaan", text: "Ishaan Kapoor. Deep-space sensors picked up the signal 72 hours ago. I haven't slept much since." },
      { type: "message", speaker: "sara", text: "Sara Fernandes. Cultural intelligence. Every first impression matters more than we realise." },
      { type: "message", speaker: "vikram", text: "Our intern joins us at exactly the right moment. Today we analyse the transmission and decide how humanity responds." },
      { type: "message", speaker: "ananya", text: "No pressure." },
      { type: "message", speaker: "ishaan", text: "A little pressure. Healthy amount." },
    ],
  },
  {
    id: "1.2",
    title: "The Signal Arrives",
    format: "Signal Analysis Lab",
    time: "09:30",
    status: "SIGNAL DETECTED",
    feedItem: {
      category: "Signal Report",
      priority: "PRIORITY",
      headline: "SIGNAL LOG — Sector 7-G — 1420 MHz",
      body:
        "Source: Sector 7-G | Frequency: 1420 MHz | Pattern: Repeating | Classification: INTELLIGENT",
      time: "09:30",
    },
    items: [
      {
        type: "system",
        icon: "📡",
        title: "SIGNAL LOG",
        priority: "PRIORITY",
        lines: [
          "Source: Sector 7-G",
          "Frequency: 1420 MHz",
          "Pattern: Repeating",
          "Classification: INTELLIGENT",
        ],
      },
      { type: "message", speaker: "ishaan", text: "There it is. Live feed from the deep-space array." },
      { type: "message", speaker: "ananya", text: "The frequency is 1420 megahertz. The hydrogen line. Every intelligent civilization would know this frequency." },
      { type: "message", speaker: "sara", text: "They chose it deliberately. They want to be understood." },
      { type: "message", speaker: "vikram", text: "Which means they know we're here. How do we approach the analysis?" },
      {
        type: "decision",
        id: "d1",
        prompt: "DECISION 1 — How should we analyse the signal?",
        options: [
          {
            id: "A",
            label: "Analyse mathematical patterns first.",
            effects: { scientific_knowledge: 5, trust_ishaan: 3 },
            reactions: [
              { speaker: "ishaan", text: "Mathematics is universal. Good call." },
              { speaker: "ananya", text: "Patterns will tell us how they think." },
            ],
          },
          {
            id: "B",
            label: "Search for language structures.",
            effects: { communication: 5, trust_sara: 3 },
            reactions: [
              { speaker: "sara", text: "Language reveals culture. Excellent instinct." },
              { speaker: "ishaan", text: "I'll run linguistic pattern recognition immediately." },
            ],
          },
          {
            id: "C",
            label: "Compare with known cosmic phenomena first.",
            effects: { discovery_progress: 5, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "Smart. Rule out the natural before accepting the extraordinary." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "1.3",
    title: "Translation Engine Activated",
    format: "AI Communications Lab",
    time: "11:00",
    status: "SIGNAL DETECTED",
    feedItem: {
      category: "Translation Update",
      priority: "STANDARD",
      headline: "Translation engine online — 12% accuracy",
      body:
        "Base-10 counting sequences, prime numbers, and geometric ratios detected. Signal decoded: partial. Estimated full decode: 18–24 hours.",
      time: "11:00",
    },
    items: [
      { type: "message", speaker: "ishaan", text: "Translation engine is live. I've loaded every mathematical language model we have." },
      { type: "message", speaker: "ishaan", text: "Early results: the signal contains base-10 counting sequences. Prime numbers. Geometric ratios." },
      { type: "message", speaker: "ananya", text: "They're introducing themselves through science." },
      { type: "message", speaker: "sara", text: "It's the safest possible introduction. Neutral. Universal. Respectful." },
      { type: "message", speaker: "vikram", text: "Can we respond in kind?" },
      { type: "message", speaker: "ishaan", text: "Give me two hours and yes." },
      {
        type: "system",
        icon: "✨",
        title: "TRANSLATION STATUS",
        priority: "STANDARD",
        lines: [
          "Translation accuracy: 12%",
          "Signal decoded: partial",
          "Estimated full decode: 18–24 hours",
        ],
      },
    ],
  },
  {
    id: "1.4",
    title: "Planning the First Reply",
    format: "Strategy Room",
    time: "13:00",
    status: "SIGNAL DETECTED",
    feedItem: {
      category: "Diplomatic Brief",
      priority: "INFO",
      headline: "Strategy session — drafting humanity's first reply",
      body:
        "Three reply options under review: mathematical greeting, scientific dossier, or peaceful multilingual message.",
      time: "13:00",
    },
    items: [
      { type: "message", speaker: "vikram", text: "We have one chance to make a first impression. What does humanity say?" },
      { type: "message", speaker: "sara", text: "Whatever we say will define how they see our entire species." },
      { type: "message", speaker: "ananya", text: "We should speak the language they used. Mathematics." },
      { type: "message", speaker: "ishaan", text: "Or we give them a fuller picture. Who we are, not just that we can count." },
      { type: "message", speaker: "vikram", text: "Three options on the table. What's the call?" },
      {
        type: "decision",
        id: "d2",
        prompt: "DECISION 2 — What do we send as our first reply?",
        options: [
          {
            id: "A",
            label: "Send a mathematical greeting.",
            effects: { scientific_knowledge: 5, diplomacy: 3, trust_ishaan: 3 },
            reactions: [
              { speaker: "ishaan", text: "Mirror their language back to them. They'll understand." },
              { speaker: "sara", text: "Safe and clear. I like it." },
            ],
          },
          {
            id: "B",
            label: "Send scientific information about Earth.",
            effects: { discovery_progress: 5, scientific_knowledge: 3, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "We tell them what we've discovered. Scientists respect other scientists." },
            ],
          },
          {
            id: "C",
            label: "Send a peaceful multilingual message.",
            effects: { diplomacy: 5, communication: 3, trust_sara: 3 },
            reactions: [
              { speaker: "sara", text: "We show them our diversity and our shared hope. That's who humanity really is." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "1.5",
    title: "Unexpected Response",
    format: "Deep Space Network",
    time: "15:00",
    status: "SIGNAL DETECTED",
    feedItem: {
      category: "Mission Alert",
      priority: "PRIORITY",
      headline: "Reply received in 4.2 minutes — local relay suspected",
      body:
        "Response detected far faster than interstellar distance would allow. Analysts suggest a nearby relay. They were waiting.",
      time: "15:00",
    },
    items: [
      {
        type: "system",
        icon: "✨",
        title: "INCOMING TRANSMISSION",
        priority: "PRIORITY",
        lines: [
          "Response detected 4.2 minutes after our signal.",
          "Distance suggests local relay. They were waiting.",
        ],
      },
      { type: "message", speaker: "ishaan", text: "They replied in under five minutes. [Silence]" },
      { type: "message", speaker: "ananya", text: "That's impossible at interstellar distances." },
      { type: "message", speaker: "ishaan", text: "Unless they have a relay station. Much closer than the signal origin." },
      { type: "message", speaker: "sara", text: "They've been watching us. And they're ready to talk." },
      { type: "message", speaker: "vikram", text: "The decoded message appears friendly. But it's incomplete. How do we proceed?" },
      {
        type: "decision",
        id: "d3",
        prompt: "DECISION 3 — How do we respond to the quick reply?",
        options: [
          {
            id: "A",
            label: "Continue translating patiently.",
            effects: { communication: 5, mission_trust: 3, trust_ishaan: 3 },
            reactions: [
              { speaker: "ishaan", text: "Good. Rushing translation loses meaning." },
              { speaker: "sara", text: "Patience communicates respect." },
            ],
          },
          {
            id: "B",
            label: "Request more information from them.",
            effects: { diplomacy: 5, discovery_progress: 3, trust_sara: 3 },
            reactions: [
              { speaker: "sara", text: "Asking questions is one of the most diplomatic things we can do." },
            ],
          },
          {
            id: "C",
            label: "Observe before sending another message.",
            effects: { scientific_knowledge: 5, trust_ananya: 3 },
            reactions: [
              { speaker: "ananya", text: "Every observation gives us more to work with. Patience is science." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "1.6",
    title: "Scientific Review",
    format: "Research Briefing",
    time: "16:30",
    status: "SIGNAL DETECTED",
    feedItem: {
      category: "Science Log",
      priority: "STANDARD",
      headline: "Spectral analysis — orange dwarf, likely liquid water",
      body:
        "Embedded spectral data points to a star type and atmosphere similar to early Earth. Convergent evolution likely.",
      time: "16:30",
    },
    items: [
      { type: "message", speaker: "ananya", text: "Let me share what the biology and environmental data tell us." },
      { type: "message", speaker: "ananya", text: "The signal contains embedded spectral data. Their star is an orange dwarf. Their world likely has liquid water. Similar atmospheric composition to early Earth." },
      { type: "message", speaker: "ishaan", text: "Which means they evolved under similar pressures to us." },
      { type: "message", speaker: "sara", text: "Convergent evolution. Similar challenges, similar solutions. That's actually hopeful." },
      { type: "message", speaker: "vikram", text: "They may think more like us than we expect." },
      { type: "message", speaker: "ananya", text: "Or just enough like us to communicate. That's all we need." },
    ],
  },
  {
    id: "1.7",
    title: "Mission Debrief",
    format: "Mission Control",
    time: "18:00",
    status: "FIRST CONTACT",
    feedItem: {
      category: "Diplomatic Brief",
      priority: "PRIORITY",
      headline: "Two-way communication established",
      body:
        "Day 1 close: signal detected, analysed, replied to, and confirmed. Translation at 31% and rising. Mission status updated to FIRST CONTACT.",
      time: "18:00",
    },
    items: [
      { type: "message", speaker: "vikram", text: "Today's summary. We detected a signal, analysed the pattern, sent our first reply, and received confirmation of two-way communication." },
      { type: "message", speaker: "ishaan", text: "Translation is at 31% and improving every hour." },
      { type: "message", speaker: "sara", text: "They responded respectfully. That matters." },
      { type: "message", speaker: "ananya", text: "Tomorrow we prepare for something humanity has never done before." },
      { type: "message", speaker: "vikram", text: "Tomorrow we meet them. [Silence]" },
      { type: "message", speaker: "ishaan", text: "No pressure though." },
      { type: "message", speaker: "sara", text: "A little pressure. Healthy amount." },
    ],
  },
];

export const DAY1_REFLECTION_QUESTIONS = [
  "What made communication successful today?",
  "Which response best represented humanity?",
  "What should the team prepare for before first contact tomorrow?",
];

export const DAY2_TEASER =
  "Tomorrow: DAY 2 — First Contact. Face-to-face with an intelligent alien civilization. Every gesture, every word, every silence will be observed and interpreted.";

// Day titles used by the Header subtitle
export const DAY_TITLES = {
  1: "The Signal",
  2: "First Contact",
  3: "Building Trust",
};
