import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { Header } from "@/components/afc/Header";
import StarField from "@/components/afc/StarField";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AFC } from "@/constants/testIds";
import { DAY1_REFLECTION_QUESTIONS, DAY2_TEASER, CHARACTERS } from "@/data/day1";
import { DAY2_REFLECTION_QUESTIONS, DAY3_TEASER } from "@/data/day2";
import { DAY3_REFLECTION_QUESTIONS } from "@/data/day3";
import SessionLost from "@/components/afc/SessionLost";
import { loadState, saveState, STAT_LABELS, CHARACTER_TRUST, relationshipLabel } from "@/lib/afcState";
import { Avatar } from "@/components/afc/Avatar";

export default function DayReflection() {
  const [state, setState] = useState(() => loadState());
  const day = state.day || 1;

  let questions;
  let answersKey;
  let teaser;
  if (day === 3) {
    questions = DAY3_REFLECTION_QUESTIONS;
    answersKey = "day3_reflection_answers";
    teaser = null; // Day 3 has no "Tomorrow" teaser — Final Summary follows
  } else if (day === 2) {
    questions = DAY2_REFLECTION_QUESTIONS;
    answersKey = "day2_reflection_answers";
    teaser = DAY3_TEASER;
  } else {
    questions = DAY1_REFLECTION_QUESTIONS;
    answersKey = "reflection_answers";
    teaser = DAY2_TEASER;
  }

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setAnswer((state[answersKey] || ["", "", ""])[step] || "");
  }, [step, answersKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = () => {
    const next = { ...state };
    next[answersKey] = [...(state[answersKey] || ["", "", ""])];
    next[answersKey][step] = answer;
    setState(next);
    saveState(next);
    if (step < questions.length - 1) setStep(step + 1);
    else setStep(questions.length);
  };

  const hasUnreadDM = Object.values(state.dms || {}).some((arr) => arr.some((m) => !m.read));
  const showSummary = step >= questions.length;

  if (!state.intern_name) return <SessionLost variant="session-lost" />;

  return (
    <div data-testid={AFC.reflectionScreen} className="min-h-screen text-white relative">
      <StarField density={90} />
      <Header day={day} status={state.status} hasUnreadDM={hasUnreadDM} unreadFeedCount={0} showTabs={!showSummary} />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-10 pb-20">
        {!showSummary ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-7 sm:p-10 shadow-[0_0_60px_-15px_rgba(34,211,238,0.3)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-[10px] uppercase tracking-[0.32em] font-display text-cyan-300/80">
                  Day {day} · Reflection {step + 1} of {questions.length}
                </div>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-8 rounded-full ${
                        i <= step ? "bg-cyan-400" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h2
                data-testid={AFC.reflectionQuestion}
                className="font-display text-2xl sm:text-3xl text-white leading-snug"
              >
                {questions[step]}
              </h2>

              <Textarea
                data-testid={AFC.reflectionAnswer}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Take a moment. Type your reflection here..."
                className="mt-6 min-h-[140px] bg-white/[0.04] border-white/15 text-white placeholder:text-white/30 focus-visible:ring-cyan-400/50 focus-visible:border-cyan-400/50 text-[15px] leading-relaxed"
              />

              <div className="mt-7 flex justify-end">
                <Button
                  data-testid={AFC.reflectionNextBtn}
                  onClick={advance}
                  className="h-11 px-6 bg-cyan-400 text-slate-900 hover:bg-cyan-300 font-display uppercase tracking-wider text-xs rounded-full"
                >
                  {step === questions.length - 1 ? "View Summary" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <Summary state={state} day={day} teaser={teaser} />
        )}
      </div>
    </div>
  );
}

const Summary = ({ state, day, teaser }) => {
  const navigate = useNavigate();
  const vars = state.vars;
  const nextDay = day + 1;
  const nextDayEnabled = day === 1 || day === 2; // Day 1 unlocks Day 2; Day 2 unlocks Day 3
  const isFinalDay = day === 3;

  // Day 3: auto-advance to /final after the summary has been visible for ~6s.
  useEffect(() => {
    if (!isFinalDay) return;
    const t = setTimeout(() => navigate("/final"), 6500);
    return () => clearTimeout(t);
  }, [isFinalDay, navigate]);

  const startNextDay = () => {
    if (!nextDayEnabled) return;
    const next = {
      ...state,
      day: nextDay,
      scene_index: 0,
      status: "HISTORIC",
      day1_complete: day === 1 ? true : state.day1_complete,
      day2_complete: day === 2 ? true : state.day2_complete,
    };
    saveState(next);
    navigate("/mission");
  };

  const dayCompleteLabel =
    day === 1 ? "Day 1 Complete" : day === 2 ? "Day 2 Complete" : "Day 3 Complete";
  const statusChangedLine =
    day === 1
      ? "Status updated to FIRST CONTACT."
      : day === 2
      ? "Status updated to HISTORIC — the team has built the foundation for an interstellar partnership."
      : "Mission accomplished. The partnership has been signed.";

  return (
    <motion.div
      data-testid={AFC.variableSummary}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.32em] font-display text-amber-300/80">
          {dayCompleteLabel} · {state.intern_name}
        </div>
        <h1 className="font-display text-3xl sm:text-5xl tracking-tight text-white mt-2">
          {isFinalDay ? "Day 3 Variable Summary" : "Mission Variable Summary"}
        </h1>
        <p className="text-white/55 mt-2 text-sm">{statusChangedLine}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm p-6 sm:p-8">
        <div className="text-[10px] uppercase tracking-[0.32em] font-display text-cyan-300/80 mb-5">
          Stat Bars
        </div>
        <div className="space-y-4">
          {STAT_LABELS.map(([k, label], i) => (
            <StatBar key={k} testid={`${AFC.statBar}-${k}`} label={label} value={vars[k]} delay={i * 0.6} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm p-6 sm:p-8">
        <div className="text-[10px] uppercase tracking-[0.32em] font-display text-amber-300/80 mb-5">
          Team Relationships
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

      {teaser && (
        <div
          data-testid={AFC.dayTeaser}
          className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-400/5 to-amber-400/[0.02] p-6 sm:p-7 shadow-[0_0_60px_-20px_rgba(251,191,36,0.4)]"
        >
          <div className="text-[10px] uppercase tracking-[0.32em] font-display text-amber-300">Next</div>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed mt-2">{teaser}</p>
        </div>
      )}

      <div className="flex justify-end items-center gap-3">
        {isFinalDay ? (
          <Button
            data-testid={AFC.viewFinalSummaryBtn}
            onClick={() => navigate("/final")}
            className="h-12 px-7 bg-amber-400 text-slate-900 hover:bg-amber-300 font-display uppercase tracking-widest text-sm rounded-full shadow-[0_0_30px_-8px_rgba(251,191,36,0.7)]"
          >
            <Sparkles className="mr-2 h-4 w-4" /> View Final Summary
          </Button>
        ) : nextDayEnabled ? (
          <Button
            data-testid={day === 1 ? AFC.beginDay2Btn : AFC.beginDay3Btn}
            onClick={startNextDay}
            className="h-12 px-7 bg-amber-400 text-slate-900 hover:bg-amber-300 font-display uppercase tracking-widest text-sm rounded-full shadow-[0_0_30px_-8px_rgba(251,191,36,0.7)]"
          >
            Begin Day {nextDay} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            data-testid={AFC.beginDay3Btn}
            disabled
            className="h-12 px-7 bg-white/10 text-white/40 cursor-not-allowed font-display uppercase tracking-widest text-sm rounded-full border border-white/10 hover:bg-white/10"
          >
            <Lock className="mr-2 h-4 w-4" /> Begin Day {nextDay}
          </Button>
        )}
      </div>
      <div className="text-right text-[11px] text-white/35 font-display tracking-wider">
        {day === 1
          ? "Stage 1 complete. Day 2 is unlocked."
          : day === 2
          ? "Stage 2 complete. Day 3 is unlocked."
          : "Stage 3 complete. Auto-advancing to Final Summary…"}
      </div>
    </motion.div>
  );
};

const StatBar = ({ label, value, delay, testid }) => {
  return (
    <div data-testid={testid}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] uppercase tracking-[0.22em] font-display text-white/70">{label}</span>
        <span className="text-[12px] font-mono text-cyan-300">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden ring-1 ring-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-cyan-400 to-amber-300 shadow-[0_0_16px_rgba(34,211,238,0.6)]"
        />
      </div>
    </div>
  );
};

const RelationshipBadge = ({ label }) => {
  const styles = {
    High: "text-amber-300 bg-amber-400/10 ring-amber-400/40",
    Neutral: "text-cyan-300 bg-cyan-400/10 ring-cyan-400/30",
    Low: "text-rose-300 bg-rose-400/10 ring-rose-400/30",
  };
  return (
    <span className={`text-[11px] uppercase tracking-widest font-display px-2.5 py-1 rounded-full ring-1 ${styles[label]}`}>
      {label}
    </span>
  );
};
