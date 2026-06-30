import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ClipboardCopy, RotateCcw, Sparkles } from "lucide-react";
import StarField from "@/components/afc/StarField";
import { Header } from "@/components/afc/Header";
import { Avatar } from "@/components/afc/Avatar";
import { Button } from "@/components/ui/button";
import SessionLost from "@/components/afc/SessionLost";
import {
  loadState,
  resetState,
  STAT_LABELS,
  CHARACTER_TRUST,
  relationshipLabel,
} from "@/lib/afcState";
import {
  DOMINANT_SUMMARY_LINES,
  STAT_TIEBREAK_ORDER,
  FINAL_MESSAGE,
  CHARACTERS,
  DAY3_SCENES,
} from "@/data/day3";
import { AFC } from "@/constants/testIds";

export default function FinalSummary() {
  const navigate = useNavigate();
  const state = useMemo(() => loadState(), []);
  const vars = useMemo(() => state.vars || {}, [state]);
  const [copied, setCopied] = useState(false);

  // Tie-breaker: leadership first. We iterate STAT_TIEBREAK_ORDER (leadership first)
  // and only swap on STRICTLY greater values, so leadership wins on ties.
  const dominantKey = useMemo(() => {
    let domKey = STAT_TIEBREAK_ORDER[0];
    let domVal = vars[domKey];
    STAT_TIEBREAK_ORDER.forEach((k) => {
      if ((vars[k] ?? 0) > domVal) {
        domVal = vars[k];
        domKey = k;
      }
    });
    return domKey;
  }, [vars]);

  const dominantLabel = STAT_LABELS.find(([k]) => k === dominantKey)?.[1] || "Leadership";
  const dominantLine = DOMINANT_SUMMARY_LINES[dominantKey];

  // Resolve Decision 9 (scene 3.5) choice label from sessionStorage scene_progress
  const decision9Label = useMemo(() => {
    const chosenId = state.scene_progress?.["3.5"]?.decisionId;
    if (!chosenId) return "Balanced partnership across science, culture and exploration.";
    const scene = DAY3_SCENES.find((s) => s.id === "3.5");
    const dec = scene?.items.find((it) => it.type === "decision");
    return (
      dec?.options.find((o) => o.id === chosenId)?.label ||
      "Balanced partnership across science, culture and exploration."
    );
  }, [state.scene_progress]);

  const startOver = () => {
    resetState();
    navigate("/");
  };

  const copySummary = async () => {
    const lines = [
      `Mission Intern: ${state.intern_name || "Anonymous"}`,
      `Dominant Trait: ${dominantLabel}`,
      `Partnership Focus: ${decision9Label}`,
      "Three days ago, we detected a signal. Today, we signed a partnership.",
    ];
    const text = lines.join("\n");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch {
      /* clipboard blocked — still show confirmation */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!state.intern_name) return <SessionLost variant="session-lost" />;

  return (
    <div data-testid={AFC.finalSummaryScreen} className="min-h-screen text-white relative">
      <StarField density={120} />
      <Header day={3} status={state.status} hasUnreadDM={false} unreadFeedCount={0} showTabs={false} />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-10 pb-20 space-y-6">
        {/* Dominant variable hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-amber-400/[0.04] backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_80px_-15px_rgba(251,191,36,0.45)]"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] font-display text-amber-300/90">
            <Sparkles className="h-3.5 w-3.5" />
            Mission Complete · {state.intern_name}
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.32em] font-display text-cyan-300/80">
            Dominant Trait · {dominantLabel}
          </div>
          <p
            data-testid={AFC.finalDominantLine}
            className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-[1.2] tracking-tight"
          >
            {dominantLine}
          </p>
        </motion.div>

        {/* All 6 stat bars */}
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm p-6 sm:p-8">
          <div className="text-[10px] uppercase tracking-[0.32em] font-display text-cyan-300/80 mb-5">
            Final Mission Variables
          </div>
          <div className="space-y-4">
            {STAT_LABELS.map(([k, label], i) => (
              <StatBar
                key={k}
                testid={`${AFC.statBar}-${k}`}
                label={label}
                value={vars[k]}
                delay={i * 0.5}
                highlight={k === dominantKey}
              />
            ))}
          </div>
        </div>

        {/* All 4 trust indicators */}
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm p-6 sm:p-8">
          <div className="text-[10px] uppercase tracking-[0.32em] font-display text-amber-300/80 mb-5">
            Final Team Relationships
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHARACTER_TRUST.map(([k]) => {
              const charKey = k.replace("trust_", "");
              const v = vars[k];
              const label = relationshipLabel(v);
              return (
                <div
                  key={k}
                  data-testid={`${AFC.relationshipIndicator}-${charKey}`}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-3"
                >
                  <Avatar speaker={charKey} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-display">{CHARACTERS[charKey].name}</div>
                    <div className="text-[10px] uppercase tracking-[0.28em] font-display text-white/40">
                      {CHARACTERS[charKey].role}
                    </div>
                  </div>
                  <RelationshipBadge label={label} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/[0.05] to-cyan-400/[0.01] p-6 sm:p-7"
        >
          <p
            data-testid={AFC.finalMessage}
            className="text-white/90 text-base sm:text-lg leading-relaxed font-display tracking-[0.005em]"
          >
            {FINAL_MESSAGE}
          </p>
        </motion.div>

        {/* Start Over + Copy Summary */}
        <div className="flex flex-col items-stretch sm:items-end gap-3 pt-2">
          <Button
            data-testid={AFC.startOverBtn}
            onClick={startOver}
            className="h-12 px-7 bg-amber-400 text-slate-900 hover:bg-amber-300 font-display uppercase tracking-widest text-sm rounded-full shadow-[0_0_30px_-8px_rgba(251,191,36,0.7)] w-full sm:w-auto"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Start Over
          </Button>

          <div className="relative w-full sm:w-auto">
            <Button
              data-testid={AFC.copySummaryBtn}
              onClick={copySummary}
              variant="outline"
              className="h-11 px-6 border-cyan-400/30 bg-cyan-400/[0.06] text-cyan-200 hover:bg-cyan-400/[0.12] hover:text-cyan-100 font-display uppercase tracking-widest text-xs rounded-full w-full sm:w-auto"
            >
              <ClipboardCopy className="mr-2 h-4 w-4" /> Copy Summary
            </Button>

            <AnimatePresence>
              {copied && (
                <motion.div
                  key="toast"
                  data-testid={AFC.copySummaryToast}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-11 right-0 px-3 py-1.5 rounded-full bg-cyan-300 text-slate-900 text-[11px] font-display uppercase tracking-widest font-medium shadow-[0_0_24px_-4px_rgba(34,211,238,0.8)] flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Check className="h-3.5 w-3.5" /> Copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="text-right text-[11px] text-white/35 font-display tracking-wider">
          Alien First Contact · Vidyaloop Learning and Innovation Labs
        </div>
      </div>
    </div>
  );
}

const StatBar = ({ label, value, delay, testid, highlight }) => (
  <div data-testid={testid}>
    <div className="flex items-center justify-between mb-1.5">
      <span
        className={`text-[12px] uppercase tracking-[0.22em] font-display ${
          highlight ? "text-amber-300" : "text-white/70"
        }`}
      >
        {label}
        {highlight && <span className="ml-2 text-[10px] text-amber-300/70">· dominant</span>}
      </span>
      <span className="text-[12px] font-mono text-cyan-300">{value}</span>
    </div>
    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden ring-1 ring-white/5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, delay, ease: "easeOut" }}
        className={`h-full ${
          highlight
            ? "bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_16px_rgba(251,191,36,0.7)]"
            : "bg-gradient-to-r from-cyan-400 to-amber-300 shadow-[0_0_16px_rgba(34,211,238,0.6)]"
        }`}
      />
    </div>
  </div>
);

const RelationshipBadge = ({ label }) => {
  const styles = {
    High: "text-amber-300 bg-amber-400/10 ring-amber-400/40",
    Neutral: "text-cyan-300 bg-cyan-400/10 ring-cyan-400/30",
    Low: "text-rose-300 bg-rose-400/10 ring-rose-400/30",
  };
  return (
    <span
      className={`text-[11px] uppercase tracking-widest font-display px-2.5 py-1 rounded-full ring-1 ${styles[label]}`}
    >
      {label}
    </span>
  );
};
