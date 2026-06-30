import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import StarField from "@/components/afc/StarField";
import { Button } from "@/components/ui/button";
import { resetState } from "@/lib/afcState";
import { LOGO_URL } from "@/data/day1";
import { AFC } from "@/constants/testIds";

// Two variants:
//   variant="session-lost"  — heading "Mission interrupted." / body "Your session ended. Please restart." / button "Restart Mission"
//   variant="day-transition" — "Loading next mission briefing…" with manual "Continue" button (no raw error text)
export default function SessionLost({ variant = "session-lost", onContinue }) {
  const navigate = useNavigate();

  const restart = () => {
    resetState();
    navigate("/");
  };

  const isDayTransition = variant === "day-transition";

  return (
    <div
      data-testid={isDayTransition ? AFC.dayTransitionScreen : AFC.sessionLostScreen}
      className="relative min-h-screen text-white flex items-center justify-center px-5"
    >
      <StarField density={70} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-7 sm:p-9 text-center shadow-[0_0_60px_-12px_rgba(34,211,238,0.35)]"
      >
        <img
          src={LOGO_URL}
          alt="Vidyaloop"
          className="h-10 w-10 mx-auto object-contain bg-white rounded-md p-1 shadow"
        />
        <div className="mt-5 inline-flex items-center justify-center h-12 w-12 rounded-full bg-amber-400/10 ring-1 ring-amber-300/40">
          <AlertTriangle className="h-5 w-5 text-amber-300" />
        </div>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl tracking-tight text-white">
          {isDayTransition ? "Loading next mission briefing…" : "Mission interrupted."}
        </h1>
        {!isDayTransition && (
          <p className="mt-2 text-white/70 text-[15px] leading-relaxed">
            Your session ended. Please restart.
          </p>
        )}
        <div className="mt-7">
          {isDayTransition ? (
            <Button
              data-testid={AFC.dayTransitionContinueBtn}
              onClick={onContinue}
              className="h-12 px-7 bg-cyan-400 text-slate-900 hover:bg-cyan-300 font-display uppercase tracking-widest text-sm rounded-full w-full sm:w-auto"
            >
              Continue
            </Button>
          ) : (
            <Button
              data-testid={AFC.restartMissionBtn}
              onClick={restart}
              className="h-12 px-7 bg-amber-400 text-slate-900 hover:bg-amber-300 font-display uppercase tracking-widest text-sm rounded-full w-full sm:w-auto"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Restart Mission
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
