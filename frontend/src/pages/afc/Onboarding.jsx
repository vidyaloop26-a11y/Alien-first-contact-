import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ONBOARDING, LOGO_URL } from "@/data/day1";
import { loadState, saveState } from "@/lib/afcState";
import { AFC } from "@/constants/testIds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StarField from "@/components/afc/StarField";

export default function Onboarding() {
  const [name, setName] = useState(() => loadState().intern_name || "");
  const navigate = useNavigate();

  const begin = () => {
    if (!name.trim()) return;
    const s = loadState();
    s.intern_name = name.trim();
    s.status = "SIGNAL DETECTED"; // Day 1 starts in detected state per scene 1.1
    saveState(s);
    navigate("/mission");
  };

  return (
    <div data-testid={AFC.onboardingScreen} className="relative min-h-screen text-white">
      <StarField density={140} />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 pb-20">
        {/* Logo top-left */}
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Vidyaloop"
            className="h-12 w-12 object-contain bg-white rounded-lg p-1.5 shadow-xl"
          />
          <div className="leading-tight">
            <div className="text-[10px] tracking-[0.32em] text-white/40 font-display uppercase">Vidyaloop</div>
            <div className="text-[11px] tracking-[0.22em] text-cyan-300/80 font-display uppercase">Learning & Innovation Labs</div>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12 sm:mt-16"
        >
          <div className="text-[11px] sm:text-xs tracking-[0.42em] font-display uppercase text-amber-300/80">
            Stage 1 · Day 1 · The Signal
          </div>
          <h1 className="mt-3 font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            <span className="text-white">INTERNATIONAL</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-amber-300 bg-clip-text text-transparent">
              FIRST CONTACT MISSION
            </span>
          </h1>
          <p className="mt-3 text-white/50 text-sm tracking-wider font-display uppercase">
            A 3-Day Space Diplomacy Internship
          </p>
        </motion.div>

        {/* 4-item grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {ONBOARDING.grid.map((g) => (
            <div
              key={g.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5 hover:border-cyan-400/30 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] font-display text-cyan-300/80">{g.label}</div>
              <div className="mt-1.5 text-white/90 text-base sm:text-lg leading-snug">{g.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Briefing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 max-w-3xl"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] font-display text-amber-300/80 mb-3">Mission Briefing</div>
          <p className="text-white/80 text-base sm:text-[17px] leading-[1.75] tracking-[0.005em]">
            {ONBOARDING.briefing}
          </p>
        </motion.div>

        {/* Name input + begin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-12 max-w-xl"
        >
          <label className="block text-[11px] uppercase tracking-[0.3em] font-display text-white/60 mb-2">
            Enter your name to join the mission
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              data-testid={AFC.internNameInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && begin()}
              placeholder="Your full name"
              className="flex-1 bg-white/[0.04] border-white/15 text-white placeholder:text-white/30 h-12 text-base focus-visible:ring-cyan-400/50 focus-visible:border-cyan-400/50"
            />
            <Button
              data-testid={AFC.beginMissionBtn}
              onClick={begin}
              disabled={!name.trim()}
              className="h-12 px-7 bg-amber-400 text-slate-900 hover:bg-amber-300 font-display tracking-wider uppercase text-sm disabled:opacity-30 disabled:bg-white/10 disabled:text-white/40 transition-all rounded-full shadow-[0_0_30px_-8px_rgba(251,191,36,0.7)]"
            >
              Begin Mission <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 text-[11px] text-white/35 font-display tracking-wider">
            History is listening.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
