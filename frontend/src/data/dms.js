// Trust-state DMs per character, per day. Verbatim from AFC Character Bible.
// Thresholds: High > 65 | Neutral 35–65 | Low < 35.

export const DM_VARIANTS = {
  ananya: {
    1: {
      high:
        "Welcome. Science is most exciting when we have curious people asking the right questions. I hope that's you.",
      neutral: "Review the signal analysis files when you're ready. The data is fascinating.",
      low: "Science logs are available for review.",
    },
    2: {
      high:
        "Today we meet them in person. Remember: observe first. Every reaction tells us something.",
      neutral: "First contact protocols are active. Stay observant.",
      low: "Biology logs updated.",
    },
    3: {
      high: "What we build today will outlast all of us. I'm glad you're part of it.",
      neutral: "Final science exchange begins today. Stay curious.",
      low: "Research log available.",
    },
  },
  vikram: {
    1: {
      high:
        "Glad to have you on the team. This mission depends on every person making thoughtful decisions. I trust you will.",
      neutral: "Mission protocols are briefed. Stay focused today.",
      low: "Mission briefing available.",
    },
    2: {
      high: "Today we make history. I need your best judgment out there.",
      neutral: "First contact expedition is a go. Stay calm and observant.",
      low: "Follow protocols today.",
    },
    3: {
      high:
        "The partnership we build today starts with the decisions you make. I'm trusting you with that.",
      neutral: "Final negotiations begin today. Stay sharp.",
      low: "Follow the diplomatic brief today.",
    },
  },
  ishaan: {
    1: {
      high:
        "Okay so the signal is unlike anything in our database. I've been up since 3am working on the translation model. Want to see what I found?",
      neutral: "Translation system is online. Signal analysis is ready to review.",
      low: "System logs available.",
    },
    2: {
      high:
        "Translation accuracy just crossed 74%. The more they speak, the faster we learn. This is incredible.",
      neutral: "Translation systems are improving with each exchange. Monitoring closely.",
      low: "Translation log updated.",
    },
    3: {
      high:
        "98% accuracy. We can actually talk to them properly now. Three days ago that was impossible. Today it's real.",
      neutral: "Communication bridge is stable at 98%. Ready for final session.",
      low: "System status updated.",
    },
  },
  sara: {
    1: {
      high:
        "First impressions matter more than we realise. The choices we make today will shape how they see all of humanity. No pressure though.",
      neutral: "Cultural observation protocols are ready. Watch everything today.",
      low: "Cultural brief available.",
    },
    2: {
      high:
        "Pay attention to what they don't say as much as what they do. Silence and gesture carry as much meaning as words.",
      neutral: "Cultural exchange begins today. Every reaction gives us information.",
      low: "Cultural log updated.",
    },
    3: {
      high:
        "Trust took three days to build. It can take one mistake to lose. Be thoughtful with every word today.",
      neutral: "Final diplomatic session today. Stay respectful and observant.",
      low: "Diplomatic brief available.",
    },
  },
};

export const CHARACTER_ORDER = ["ananya", "vikram", "ishaan", "sara"];

export const trustBucket = (value) => {
  if (value > 65) return "high";
  if (value < 35) return "low";
  return "neutral";
};

// Returns an ordered list of { speaker, text, day, bucket } for a given day.
export const dmsForDayStart = (vars, day) => {
  return CHARACTER_ORDER.map((speaker) => {
    const bucket = trustBucket(vars?.[`trust_${speaker}`] ?? 50);
    const text = DM_VARIANTS[speaker]?.[day]?.[bucket];
    return { speaker, text, day, bucket };
  }).filter((m) => !!m.text);
};
