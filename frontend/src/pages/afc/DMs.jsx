import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/afc/Header";
import StarField from "@/components/afc/StarField";
import { Avatar } from "@/components/afc/Avatar";
import { Button } from "@/components/ui/button";
import SessionLost from "@/components/afc/SessionLost";
import { CHARACTERS } from "@/data/day1";
import { loadState, saveState } from "@/lib/afcState";
import { AFC } from "@/constants/testIds";

export default function DMs() {
  const [state, setState] = useState(() => loadState());
  const navigate = useNavigate();

  // Mark all DMs as read when this page opens
  useEffect(() => {
    setState((s) => {
      const dms = Object.fromEntries(
        Object.entries(s.dms || {}).map(([k, arr]) => [k, arr.map((m) => ({ ...m, read: true }))])
      );
      const next = { ...s, dms };
      saveState(next);
      return next;
    });
  }, []);

  const threads = useMemo(() => {
    return Object.keys(CHARACTERS).map((k) => ({
      character: CHARACTERS[k],
      messages: state.dms?.[k] || [],
    }));
  }, [state.dms]);

  const hasUnread = false; // we just read them

  if (!state.intern_name) return <SessionLost variant="session-lost" />;

  return (
    <div data-testid={AFC.dmsScreen} className="min-h-screen text-white relative">
      <StarField density={70} />
      <Header day={state.day || 1} status={state.status} hasUnreadDM={hasUnread} unreadFeedCount={0} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] font-display text-cyan-300/80">
              Private Channel
            </div>
            <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-white mt-1">
              Direct Messages
            </h1>
          </div>
          <Button
            data-testid={AFC.dmBackBtn}
            onClick={() => navigate("/mission")}
            variant="outline"
            className="border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-white font-display uppercase text-xs tracking-wider"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Mission Chat
          </Button>
        </div>

        <div className="space-y-4">
          {threads.map(({ character, messages }) => (
            <motion.div
              key={character.key}
              data-testid={AFC.dmThread}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-slate-950/50 backdrop-blur-sm p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar speaker={character.key} size="lg" />
                <div>
                  <div className="text-white font-display text-base">{character.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.28em] font-display text-white/45">
                    {character.role}
                  </div>
                </div>
              </div>
              {messages.length === 0 ? (
                <div className="text-white/40 text-sm italic">No messages yet.</div>
              ) : (
                <div className="space-y-2">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5"
                    >
                      {m.day && (
                        <div className="text-[10px] uppercase tracking-[0.28em] font-display text-cyan-300/70 mb-1">
                          Day {m.day} · Day Start
                        </div>
                      )}
                      <div className="text-white/85 text-[15px] leading-relaxed">{m.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
