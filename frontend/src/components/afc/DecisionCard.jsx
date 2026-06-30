import React, { useState } from "react";
import { motion } from "framer-motion";
import { AFC } from "@/constants/testIds";

export const DecisionCard = ({ decision, onChoose }) => {
  const [chosenId, setChosenId] = useState(null);
  const locked = chosenId !== null;

  const handleChoose = (opt) => {
    if (locked) return;
    setChosenId(opt.id);
    onChoose(opt);
  };

  return (
    <motion.div
      data-testid={AFC.decisionCard}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="my-4 rounded-2xl border border-amber-300/30 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 shadow-[0_0_40px_-12px_rgba(251,191,36,0.4)]"
    >
      <div className="text-[11px] uppercase tracking-[0.3em] font-display text-amber-300 mb-3">
        Decision Required
      </div>
      <div className="text-lg sm:text-xl font-display text-white mb-4 leading-snug">
        {decision.prompt}
      </div>
      <div className="grid gap-2.5">
        {decision.options.map((opt) => {
          const isChosen = chosenId === opt.id;
          return (
            <button
              key={opt.id}
              data-testid={`${AFC.decisionOption}-${opt.id}`}
              onClick={() => handleChoose(opt)}
              disabled={locked}
              className={`group text-left rounded-xl px-4 py-3 ring-1 transition-all duration-200 flex items-start gap-3 ${
                isChosen
                  ? "bg-amber-400/15 ring-amber-300/60"
                  : locked
                  ? "bg-white/[0.02] ring-white/5 opacity-40 cursor-not-allowed"
                  : "bg-white/[0.04] ring-white/10 hover:ring-amber-300/50 hover:bg-amber-400/[0.07]"
              }`}
            >
              <span className="font-display text-amber-300 text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                {opt.id}
              </span>
              <span className="text-white/90 text-[15px] leading-relaxed">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DecisionCard;
