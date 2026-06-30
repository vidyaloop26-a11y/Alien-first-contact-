import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Header } from "@/components/afc/Header";
import { TeamStrip } from "@/components/afc/Avatar";
import { SceneDivider, Message, Reaction, OutgoingBubble, SystemCard, TypingIndicator } from "@/components/afc/ChatItems";
import { DecisionCard } from "@/components/afc/DecisionCard";
import { Button } from "@/components/ui/button";
import StarField from "@/components/afc/StarField";
import SessionLost from "@/components/afc/SessionLost";
import { AFC } from "@/constants/testIds";
import { DAY1_SCENES } from "@/data/day1";
import { DAY2_SCENES } from "@/data/day2";
import { DAY3_SCENES, FAREWELLS } from "@/data/day3";
import { dmsForDayStart } from "@/data/dms";
import { loadState, saveState, applyEffects } from "@/lib/afcState";

const rand = (min, max) => Math.floor(min + Math.random() * (max - min));
const NEAR_BOTTOM_PX = 100;

export default function MissionChat() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => loadState());
  const day = state.day || 1;
  const scenes = day === 3 ? DAY3_SCENES : day === 2 ? DAY2_SCENES : DAY1_SCENES;

  const [sceneIdx, setSceneIdx] = useState(() => loadState().scene_index || 0);
  const [played, setPlayed] = useState([]); // visible items
  const [stepIdx, setStepIdx] = useState(0); // pointer into scene.items
  const [isTyping, setIsTyping] = useState(false);
  const [typingSpeaker, setTypingSpeaker] = useState(null);
  const [decision, setDecision] = useState(null); // current decision item
  const [showContinue, setShowContinue] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const scrollRef = useRef(null);
  const isNearBottomRef = useRef(true);
  const timeoutRef = useRef(null);
  const dayDmFiredRef = useRef({ 1: false, 2: false, 3: false });
  const [showDayTransition, setShowDayTransition] = useState(false);

  // Guard: must have a name — render handled below at JSX return (rules-of-hooks safe).
  useEffect(() => {}, [state.intern_name, navigate]);

  // Track whether user is near the bottom of the chat log
  const updateNearBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    const near = distance < NEAR_BOTTOM_PX;
    isNearBottomRef.current = near;
    if (near && hasNewMessage) setHasNewMessage(false);
  };

  const scrollToBottom = (smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    isNearBottomRef.current = true;
    setHasNewMessage(false);
  };

  // Conditional auto-scroll: only if user is within NEAR_BOTTOM_PX of the bottom
  useEffect(() => {
    if (isNearBottomRef.current) {
      // wait a tick for the DOM to grow before scrolling
      requestAnimationFrame(() => scrollToBottom(true));
    } else {
      // user has scrolled up — surface "New message" affordance
      setHasNewMessage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [played.length, isTyping, decision?.id, showContinue]);

  const scene = scenes[sceneIdx];

  // When scene changes, push divider + add feed item + update status
  useEffect(() => {
    if (!scene) return;
    setPlayed((prev) => [...prev, { kind: "divider", scene }]);
    setStepIdx(0);

    setState((s) => {
      const next = { ...s, scene_index: sceneIdx, status: scene.status || s.status };
      if (scene.feedItem && !s.feed.find((f) => f.id === scene.id)) {
        next.feed = [...s.feed, { id: scene.id, ...scene.feedItem }];
      }
      // Day-start trust-state DMs: fire once for the current day on its first scene.
      const sentArr = s.day_dms_sent || [false, false, false];
      if (sceneIdx === 0 && !sentArr[day - 1] && !dayDmFiredRef.current[day]) {
        dayDmFiredRef.current[day] = true;
        const dms = dmsForDayStart(s.vars, day);
        const nextDms = { ...s.dms };
        dms.forEach(({ speaker, text }) => {
          const thread = nextDms[speaker] || [];
          nextDms[speaker] = [...thread, { text, read: false, day }];
        });
        next.dms = nextDms;
        const newSent = [...sentArr];
        newSent[day - 1] = true;
        next.day_dms_sent = newSent;
      }
      saveState(next);
      return next;
    });
    setTimeout(() => advance(0), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, day]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const advance = (idx) => {
    if (!scene) return;
    if (idx >= scene.items.length) {
      setShowContinue(true);
      return;
    }
    const item = scene.items[idx];

    if (item.type === "message") {
      setTypingSpeaker(item.speaker);
      setIsTyping(true);
      const delay = rand(450, 850);
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingSpeaker(null);
        setPlayed((prev) => [...prev, { kind: "message", speaker: item.speaker, text: item.text }]);
        setStepIdx(idx + 1);
        timeoutRef.current = setTimeout(() => advance(idx + 1), rand(300, 550));
      }, delay);
    } else if (item.type === "system") {
      timeoutRef.current = setTimeout(() => {
        setPlayed((prev) => [...prev, { kind: "system", ...item }]);
        setStepIdx(idx + 1);
        timeoutRef.current = setTimeout(() => advance(idx + 1), rand(400, 700));
      }, 350);
    } else if (item.type === "dm") {
      setState((s) => {
        const thread = s.dms[item.speaker] || [];
        const next = {
          ...s,
          dms: { ...s.dms, [item.speaker]: [...thread, { text: item.text, read: false }] },
        };
        saveState(next);
        return next;
      });
      setStepIdx(idx + 1);
      timeoutRef.current = setTimeout(() => advance(idx + 1), 250);
    } else if (item.type === "silence") {
      timeoutRef.current = setTimeout(() => {
        setPlayed((prev) => [...prev, { kind: "silence" }]);
        setStepIdx(idx + 1);
        timeoutRef.current = setTimeout(() => advance(idx + 1), 1100);
      }, 700);
    } else if (item.type === "farewell") {
      // Read current trust values and queue 4 farewell messages (Ananya, Vikram, Ishaan, Sara).
      const current = loadState();
      const order = ["ananya", "vikram", "ishaan", "sara"];
      let i = 0;
      const playFarewell = () => {
        if (i >= order.length) {
          // End of farewell — advance to end of scene
          setStepIdx(idx + 1);
          timeoutRef.current = setTimeout(() => advance(idx + 1), 500);
          return;
        }
        const speaker = order[i];
        const tv = current.vars?.[`trust_${speaker}`] ?? 50;
        const text = tv > 65 ? FAREWELLS[speaker].high : FAREWELLS[speaker].low;
        setTypingSpeaker(speaker);
        setIsTyping(true);
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setTypingSpeaker(null);
          setPlayed((prev) => [...prev, { kind: "farewell", speaker, text }]);
          i += 1;
          timeoutRef.current = setTimeout(playFarewell, rand(500, 800));
        }, rand(650, 1000));
      };
      timeoutRef.current = setTimeout(playFarewell, 400);
    } else if (item.type === "decision") {
      setDecision(item);
      setStepIdx(idx);
    }
  };

  const onChoose = (opt) => {
    if (!decision) return;
    const decisionItem = decision;
    setPlayed((prev) => [
      ...prev,
      { kind: "outgoing", text: decisionItem.options.find((o) => o.id === opt.id).label },
    ]);
    setState((s) => {
      const next = {
        ...s,
        vars: applyEffects(s.vars, opt.effects),
        scene_progress: { ...s.scene_progress, [scene.id]: { decisionId: opt.id } },
      };
      saveState(next);
      return next;
    });
    setDecision(null);

    const reactions = opt.reactions || [];
    let i = 0;
    const playNext = () => {
      if (i >= reactions.length) {
        const nextIdx = scene.items.findIndex((it) => it === decisionItem) + 1;
        if (nextIdx >= scene.items.length) {
          setShowContinue(true);
        } else {
          setStepIdx(nextIdx);
          timeoutRef.current = setTimeout(() => advance(nextIdx), 350);
        }
        return;
      }
      const r = reactions[i];
      setTypingSpeaker(r.speaker);
      setIsTyping(true);
      const delay = rand(500, 850);
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingSpeaker(null);
        setPlayed((prev) => [...prev, { kind: "reaction", speaker: r.speaker, text: r.text }]);
        i += 1;
        timeoutRef.current = setTimeout(playNext, rand(350, 600));
      }, delay);
    };
    timeoutRef.current = setTimeout(playNext, 500);
  };

  const onContinue = () => {
    setShowContinue(false);
    if (sceneIdx < scenes.length - 1) {
      setSceneIdx(sceneIdx + 1);
    } else {
      const next = {
        ...state,
        day1_complete: day === 1 ? true : state.day1_complete,
        day2_complete: day === 2 ? true : state.day2_complete,
        day3_complete: day === 3 ? true : state.day3_complete,
      };
      saveState(next);
      setState(next);
      navigate("/reflection");
    }
  };

  const hasUnreadDM = useMemo(() => {
    return Object.values(state.dms || {}).some((arr) => arr.some((m) => !m.read));
  }, [state.dms]);

  const unreadFeedCount = useMemo(() => {
    const seen = new Set(state.feed_seen_ids || []);
    return (state.feed || []).filter((f) => !seen.has(f.id)).length;
  }, [state.feed, state.feed_seen_ids]);

  const isLastScene = sceneIdx === scenes.length - 1;

  // Render branches (rules-of-hooks safe — all hooks above always run):
  // 1. No intern_name → Mission interrupted screen
  if (!state.intern_name) {
    return <SessionLost variant="session-lost" />;
  }
  // 2. Scene missing OR explicit day-transition state → Loading next mission briefing
  if (!scenes || !scenes[sceneIdx] || showDayTransition) {
    return (
      <SessionLost
        variant="day-transition"
        onContinue={() => {
          const next = { ...state, scene_index: 0 };
          saveState(next);
          setState(next);
          setSceneIdx(0);
          setPlayed([]);
          setShowDayTransition(false);
        }}
      />
    );
  }

  return (
    <div data-testid={AFC.missionChatScreen} className="min-h-screen text-white relative">
      <StarField density={90} />
      <Header day={day} status={state.status} hasUnreadDM={hasUnreadDM} unreadFeedCount={unreadFeedCount} />

      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <TeamStrip />
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={updateNearBottom}
            data-testid={AFC.chatScroll}
            className="rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-sm mt-2 mb-6 p-3 sm:p-6 max-h-[calc(100vh-220px)] overflow-y-auto"
          >
            <AnimatePresence initial={false}>
              {played.map((it, i) => {
                if (it.kind === "divider") return <SceneDivider key={`d-${i}`} scene={it.scene} />;
                if (it.kind === "message")
                  return <Message key={`m-${i}`} speaker={it.speaker} text={it.text} />;
                if (it.kind === "system")
                  return <SystemCard key={`s-${i}`} icon={it.icon} title={it.title} lines={it.lines} priority={it.priority} />;
                if (it.kind === "outgoing")
                  return <OutgoingBubble key={`o-${i}`} internName={state.intern_name} text={it.text} />;
                if (it.kind === "reaction")
                  return <Reaction key={`r-${i}`} speaker={it.speaker} text={it.text} />;
                if (it.kind === "silence")
                  return (
                    <div
                      key={`si-${i}`}
                      data-testid={AFC.silenceLine}
                      className="my-3 text-center text-[11px] uppercase tracking-[0.32em] font-display text-white/35 italic"
                    >
                      · · · &nbsp;[Silence]&nbsp; · · ·
                    </div>
                  );
                if (it.kind === "farewell")
                  return (
                    <div key={`fw-${i}`} data-testid={AFC.farewellMessage}>
                      <Message speaker={it.speaker} text={it.text} />
                    </div>
                  );
                return null;
              })}
            </AnimatePresence>

            {isTyping && typingSpeaker && <TypingIndicator speaker={typingSpeaker} />}

            {decision && <DecisionCard decision={decision} onChoose={onChoose} />}

            {showContinue && !decision && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex justify-end"
              >
                <Button
                  data-testid={AFC.continueBtn}
                  onClick={onContinue}
                  className="h-11 px-6 bg-cyan-400 text-slate-900 hover:bg-cyan-300 font-display uppercase tracking-wider text-xs rounded-full shadow-[0_0_30px_-8px_rgba(34,211,238,0.7)]"
                >
                  {isLastScene ? "Proceed to Reflection" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* "New message ↓" affordance — only visible when user has scrolled up */}
          <AnimatePresence>
            {hasNewMessage && (
              <motion.button
                key="new-msg"
                data-testid={AFC.newMessageBtn}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                onClick={() => scrollToBottom(true)}
                className="absolute left-1/2 -translate-x-1/2 bottom-12 px-4 py-2 rounded-full bg-cyan-400 text-slate-900 font-display uppercase tracking-wider text-xs shadow-[0_0_30px_-6px_rgba(34,211,238,0.8)] flex items-center gap-1.5 hover:bg-cyan-300 transition-colors"
              >
                New message <ArrowDown className="h-3.5 w-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
