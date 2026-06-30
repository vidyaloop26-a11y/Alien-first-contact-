import React from "react";
import { motion } from "framer-motion";
import { Avatar } from "./Avatar";
import { CHARACTERS } from "@/data/day1";
import { AFC } from "@/constants/testIds";

const PRIORITY_STYLES = {
  PRIORITY: "text-amber-300 bg-amber-400/10 ring-amber-400/40",
  STANDARD: "text-cyan-300 bg-cyan-400/10 ring-cyan-400/40",
  INFO: "text-white/60 bg-white/10 ring-white/20",
};

export const SceneDivider = ({ scene }) => (
  <motion.div
    data-testid={AFC.sceneHeader}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="my-6 flex items-center gap-3"
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    <div className="text-center">
      <div className="text-[10px] tracking-[0.32em] uppercase font-display text-cyan-300/80">
        Scene {scene.id} · {scene.time}
      </div>
      <div className="text-sm font-display tracking-wide text-white/90 mt-0.5">
        {scene.title}
      </div>
      <div className="text-[10px] tracking-[0.22em] uppercase font-display text-white/40 mt-0.5">
        {scene.format}
      </div>
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
  </motion.div>
);

export const Message = ({ speaker, text }) => {
  const c = CHARACTERS[speaker];
  return (
    <motion.div
      data-testid={AFC.chatMessage}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 py-1.5"
    >
      <Avatar speaker={speaker} size="md" />
      <div className="max-w-[78%]">
        <div className="text-[11px] uppercase tracking-widest font-display text-white/45 mb-1">
          {c.name}
        </div>
        <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.06] ring-1 ring-white/10 text-white/90 leading-relaxed text-[15px]">
          {text}
        </div>
      </div>
    </motion.div>
  );
};

export const Reaction = ({ speaker, text }) => (
  <motion.div
    data-testid={AFC.reactionMessage}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="flex items-start gap-3 py-1.5"
  >
    <Avatar speaker={speaker} size="md" />
    <div className="max-w-[78%]">
      <div className="text-[11px] uppercase tracking-widest font-display text-white/45 mb-1">
        {CHARACTERS[speaker].name}
      </div>
      <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-cyan-400/[0.07] ring-1 ring-cyan-400/20 text-white/90 leading-relaxed text-[15px]">
        {text}
      </div>
    </div>
  </motion.div>
);

export const OutgoingBubble = ({ internName, text }) => (
  <motion.div
    data-testid={AFC.outgoingBubble}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="flex items-start gap-3 py-1.5 justify-end"
  >
    <div className="max-w-[78%]">
      <div className="text-[11px] uppercase tracking-widest font-display text-amber-300/70 mb-1 text-right">
        {internName || "Mission Intern"} · You
      </div>
      <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-br from-amber-400/20 to-amber-500/10 ring-1 ring-amber-300/30 text-white leading-relaxed text-[15px]">
        {text}
      </div>
    </div>
    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center font-display font-bold text-slate-900 ring-2 ring-amber-400/40 shadow-lg shrink-0">
      {(internName || "U").charAt(0).toUpperCase()}
    </div>
  </motion.div>
);

export const SystemCard = ({ icon, title, lines, priority = "STANDARD" }) => {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.STANDARD;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-3 rounded-xl border border-cyan-400/20 bg-slate-900/60 p-4 backdrop-blur"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-[11px] uppercase tracking-[0.28em] font-display text-white/70">{title}</span>
        </div>
        <span className={`text-[10px] uppercase tracking-widest font-display px-2 py-0.5 rounded-full ring-1 ${style}`}>
          {priority}
        </span>
      </div>
      <ul className="space-y-1">
        {lines.map((l, i) => (
          <li key={i} className="text-[13px] text-white/80 font-mono">
            <span className="text-cyan-400/70 mr-2">›</span>
            {l}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const TypingIndicator = ({ speaker }) => (
  <div data-testid={AFC.typingIndicator} className="flex items-start gap-3 py-1.5">
    <Avatar speaker={speaker} size="md" />
    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.06] ring-1 ring-white/10 inline-flex items-center gap-1">
      <Dot delay="0s" />
      <Dot delay="0.15s" />
      <Dot delay="0.3s" />
    </div>
  </div>
);

const Dot = ({ delay }) => (
  <span
    className="h-1.5 w-1.5 rounded-full bg-white/60 inline-block"
    style={{ animation: `afcDot 1.1s ease-in-out ${delay} infinite` }}
  />
);
