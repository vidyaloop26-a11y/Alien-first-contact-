# Alien First Contact — PRD

## Original Problem Statement
Build a 3-day space diplomacy internship simulation called **Alien First Contact** for school students (ages 13–17) under the **Vidyaloop Learning & Innovation Labs** brand. Three sequential stages:
- Stage 1: complete shell + Day 1 "The Signal"
- Stage 2: Day 2 "First Contact" + auto-scroll fix + trust-state DM
- Stage 3: Day 3 "Building Trust" + farewell variants + Final Summary Card (no certificate, no download — just Start Over)

State is held entirely in sessionStorage. Vidyaloop logo on every screen.

## Tech Stack
- React 19 + react-router 7, Tailwind, shadcn/ui (Button, Input, Textarea)
- framer-motion animations, lucide-react icons
- sessionStorage key: `afc_state_v1`. No backend writes.
- Fonts: Chakra Petch (display) + DM Sans (body) + JetBrains Mono (telemetry)

## What's Built — All 3 Stages (Feb 2026)

### Shell (5 screens + Final Summary)
1. **Onboarding** (`/`) — logo, title, 4-item grid, briefing, name input, Begin Mission
2. **Mission Chat** (`/mission`) — day-aware scene engine, typing delays, decision cards, outgoing bubble, reactions, continue button. **Auto-scroll fix**: only scrolls if user is within 100px of bottom; otherwise shows a "New message ↓" floating button (testid `new-message-btn`)
3. **Signal Feed** (`/feed`) — auto-populated from scenes, unread cyan dot (`signal-feed-unread-dot`) clears on view
4. **DMs** (`/dms`) — 4 character threads, amber unread dot, marks as read on open
5. **Day Reflection** (`/reflection`) — day-aware questions + per-day teaser + Begin Day N+1 (or View Final Summary on Day 3)
6. **Final Summary** (`/final`) — dominant-variable hero line + 6 stat bars + 4 trust indicators + final message + Start Over (clears sessionStorage → `/`)

### Day 1 — The Signal (Stage 1, verbatim)
- 7 chat scenes (1.1–1.7) + Reflection screen (1.8)
- 3 decisions, scene 1.7 status flip → FIRST CONTACT
- Vikram DM at scene 1.1

### Day 2 — First Contact (Stage 2, verbatim)
- 7 chat scenes (2.1–2.7) + Reflection (2.8)
- 4 decisions (D4–D7), status stays HISTORIC throughout
- Trust-state Vikram DM at Day 2 start (>65 / 35–65 / <35 branches)
- Auto-scroll fix shipped here
- Signal Feed items at 2.1 / 2.3 / 2.5 / 2.6 with unread tab dot

### Day 3 — Building Trust (Stage 3, verbatim)
- 6 chat scenes (3.1–3.6) + Reflection (3.7)
- 2 decisions (D8, D9)
- Signal Feed items at 3.1 / 3.3 / 3.4
- Scene 3.6: HISTORIC MOMENT system card, 4 character lines, [Silence] beat, then 4 trust-aware farewells (per-character `>65` high vs `≤65` low variants)
- After Day 3 Reflection → 6.5s auto-advance to Final Summary Card (also manual "View Final Summary" button)

### Final Summary Card
- Dominant variable resolved with **leadership as tiebreaker on ties**
- All 6 stat bars (dominant bar highlighted gold)
- All 4 trust indicators (Low / Neutral / High)
- Final message (verbatim): "Three days ago, we detected a signal..."
- **Start Over** button clears sessionStorage and returns to onboarding

## State (sessionStorage `afc_state_v1`)
- 10 variables (default 50, clamped 0–100)
- intern_name, day, status, scene_index, scene_progress
- feed[], feed_seen_ids[], dms{ananya/vikram/ishaan/sara}[]
- reflection_answers / day2_reflection_answers / day3_reflection_answers
- day{1,2,3}_complete, day2_started

## Test Status
- Iteration 1 (Stage 1, Day 1): **100% frontend pass, 0 issues**
- Stage 2: verified locally (lint + manual compile)
- Stage 3: Final Summary Card + Start Over verified via headless screenshot — dominant line, bars, trust indicators, final message present; Start Over clears sessionStorage and returns to `/`

## Backlog / Possible Extensions
- Sound design (ambient hum, decision chime, message ping)
- Reduced-motion / a11y audit (typing indicator labels, keyboard nav for decisions)
- Optional teacher mode: aggregate variable distributions across a class (would need opt-in MongoDB writes)
- Replay/export final transcript per intern for classroom discussion
