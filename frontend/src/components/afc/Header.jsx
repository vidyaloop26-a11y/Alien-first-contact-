import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LOGO_URL, DAY_TITLES } from "@/data/day1";
import { AFC } from "@/constants/testIds";

const STATUS_COLORS = {
  "ALL CLEAR": { dot: "bg-emerald-400", text: "text-emerald-300", ring: "ring-emerald-400/30", bg: "bg-emerald-400/10" },
  "SIGNAL DETECTED": { dot: "bg-cyan-400", text: "text-cyan-300", ring: "ring-cyan-400/30", bg: "bg-cyan-400/10" },
  "FIRST CONTACT": { dot: "bg-amber-400", text: "text-amber-300", ring: "ring-amber-400/30", bg: "bg-amber-400/10" },
  HISTORIC: { dot: "bg-violet-400", text: "text-violet-300", ring: "ring-violet-400/30", bg: "bg-violet-400/10" },
};

export const Header = ({
  day = 1,
  status = "ALL CLEAR",
  hasUnreadDM = false,
  unreadFeedCount = 0,
  showTabs = true,
}) => {
  const s = STATUS_COLORS[status] || STATUS_COLORS["ALL CLEAR"];
  const loc = useLocation();
  const dayTitle = DAY_TITLES[day] || "Mission";

  return (
    <header
      data-testid={AFC.appHeader}
      className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/60 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-8 py-3 flex items-center gap-2 sm:gap-4">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" data-testid={AFC.headerLogo}>
          <img
            src={LOGO_URL}
            alt="Vidyaloop"
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain bg-white rounded-md p-1 shadow-md"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[10px] tracking-[0.25em] text-white/40 font-display uppercase">Vidyaloop</span>
            <span className="text-[11px] tracking-[0.18em] text-cyan-300/80 font-display uppercase">Mission Console</span>
          </div>
        </NavLink>

        <div className="hidden md:flex items-center gap-2 ml-2">
          <span
            data-testid={AFC.dayIndicator}
            className="px-3 py-1 rounded-full text-xs font-display tracking-widest uppercase text-white/70 bg-white/5 border border-white/10"
          >
            Day {day} · {dayTitle}
          </span>
        </div>

        <div className="flex-1" />

        <div
          data-testid={AFC.statusBadge}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 ${s.ring} ${s.bg}`}
        >
          <span className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`}>
            <span className={`absolute inset-0 rounded-full ${s.dot} opacity-60 animate-ping`} />
          </span>
          <span className={`text-[11px] font-display tracking-[0.2em] uppercase ${s.text}`}>{status}</span>
        </div>
      </div>

      {showTabs && (
        <nav className="max-w-6xl mx-auto px-3 sm:px-8 pb-2 flex gap-1 text-[11px] sm:text-xs font-display tracking-widest uppercase overflow-x-auto">
          <TabLink to="/mission" testid={AFC.tabMissionChat} active={loc.pathname.startsWith("/mission")}>
            Mission Chat
          </TabLink>
          <TabLink to="/feed" testid={AFC.tabSignalFeed} active={loc.pathname.startsWith("/feed")}>
            <span className="inline-flex items-center gap-1.5">
              Signal Feed
              {unreadFeedCount > 0 && (
                <span
                  data-testid={AFC.signalFeedUnreadDot}
                  className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-cyan-400 text-slate-900 text-[10px] font-mono font-bold leading-none shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                >
                  {unreadFeedCount}
                </span>
              )}
            </span>
          </TabLink>
          <TabLink to="/dms" testid={AFC.tabDMs} active={loc.pathname.startsWith("/dms")}>
            <span className="inline-flex items-center gap-1.5">
              DMs
              {hasUnreadDM && (
                <span
                  data-testid={AFC.dmUnreadDot}
                  className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]"
                />
              )}
            </span>
          </TabLink>
        </nav>
      )}
    </header>
  );
};

const TabLink = ({ to, children, testid, active }) => (
  <NavLink
    to={to}
    data-testid={testid}
    className={`px-3 py-1.5 rounded-md transition-colors duration-200 ${
      active
        ? "text-cyan-300 bg-cyan-400/10 ring-1 ring-cyan-400/30"
        : "text-white/55 hover:text-white/90 hover:bg-white/5"
    }`}
  >
    {children}
  </NavLink>
);

export default Header;
