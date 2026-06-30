import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/afc/Header";
import StarField from "@/components/afc/StarField";
import SessionLost from "@/components/afc/SessionLost";
import { AFC } from "@/constants/testIds";
import { loadState, saveState } from "@/lib/afcState";

const PRIORITY_STYLES = {
  PRIORITY: "text-amber-300 bg-amber-400/10 ring-amber-400/40",
  STANDARD: "text-cyan-300 bg-cyan-400/10 ring-cyan-400/40",
  INFO: "text-white/60 bg-white/10 ring-white/20",
};

const CATEGORY_STYLES = {
  // Brief: Signal Report = deep blue | Science Log = teal | Translation Update = purple |
  //        Diplomatic Brief = navy | Mission Alert = gold
  "Signal Report": { text: "text-blue-300", bg: "bg-blue-500/10", ring: "ring-blue-400/40" },
  "Science Log": { text: "text-teal-300", bg: "bg-teal-500/10", ring: "ring-teal-400/40" },
  "Translation Update": { text: "text-purple-300", bg: "bg-purple-500/10", ring: "ring-purple-400/40" },
  "Diplomatic Brief": { text: "text-indigo-300", bg: "bg-indigo-500/10", ring: "ring-indigo-400/40" },
  "Mission Alert": { text: "text-amber-300", bg: "bg-amber-400/10", ring: "ring-amber-400/40" },
};

export default function SignalFeed() {
  const [state, setState] = useState(() => loadState());
  const feed = state.feed || [];
  const hasUnreadDM = Object.values(state.dms || {}).some((arr) => arr.some((m) => !m.read));

  // Mark all feed items as seen when this page opens
  useEffect(() => {
    setState((s) => {
      const ids = (s.feed || []).map((f) => f.id);
      const next = { ...s, feed_seen_ids: ids };
      saveState(next);
      return next;
    });
  }, []);

  if (!state.intern_name) return <SessionLost variant="session-lost" />;

  return (
    <div data-testid={AFC.signalFeedScreen} className="min-h-screen text-white relative">
      <StarField density={80} />
      <Header day={state.day || 1} status={state.status} hasUnreadDM={hasUnreadDM} unreadFeedCount={0} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <div className="mb-6">
          <div className="text-[10px] uppercase tracking-[0.32em] font-display text-cyan-300/80">Live Telemetry</div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-white mt-1">Signal Feed</h1>
          <p className="text-white/50 text-sm mt-1">
            All logs, transmissions, and briefs are auto-collected from Day {state.day || 1} mission activity.
          </p>
        </div>

        {feed.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white/50 font-display tracking-wider uppercase text-sm">
            No signals yet. Return to Mission Chat to begin.
          </div>
        ) : (
          <div className="space-y-3">
            {[...feed].reverse().map((item, i) => {
              const ps = PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.INFO;
              const cs = CATEGORY_STYLES[item.category] || {
                text: "text-white/70",
                bg: "bg-white/5",
                ring: "ring-white/15",
              };
              return (
                <motion.article
                  key={`${item.id}-${i}`}
                  data-testid={AFC.signalFeedItem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="rounded-xl border border-white/10 bg-slate-950/50 backdrop-blur-sm p-4 sm:p-5 hover:border-cyan-400/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-[10px] uppercase tracking-[0.24em] font-display px-2 py-0.5 rounded-full ring-1 ${cs.text} ${cs.bg} ${cs.ring}`}
                      >
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-widest font-display px-2 py-0.5 rounded-full ring-1 ${ps}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/40">
                      Day {item.id?.split(".")[0] || "1"} · {item.time}
                    </span>
                  </div>
                  <h3 className="mt-2 text-white text-base sm:text-lg font-display leading-snug">
                    {item.headline}
                  </h3>
                  {item.body && (
                    <p className="mt-1.5 text-white/65 text-sm leading-relaxed">{item.body}</p>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
