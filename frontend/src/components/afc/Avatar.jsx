import React from "react";
import { CHARACTERS } from "@/data/day1";

export const Avatar = ({ speaker, size = "md", active = false }) => {
  const c = CHARACTERS[speaker];
  if (!c) return null;
  const sz =
    size === "sm" ? "h-7 w-7 text-[11px]" : size === "lg" ? "h-12 w-12 text-base" : "h-9 w-9 text-sm";
  return (
    <div className="relative shrink-0">
      <div
        className={`${sz} rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center font-display font-semibold text-slate-900 ring-2 ${active ? "ring-white/40" : c.ring} shadow-lg`}
        title={c.name}
      >
        {c.initial}
      </div>
    </div>
  );
};

export const TeamStrip = () => (
  <div className="flex items-center gap-2 px-1 py-2 overflow-x-auto">
    {Object.values(CHARACTERS).map((c) => (
      <div key={c.key} className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 ring-1 ring-white/10 shrink-0">
        <Avatar speaker={c.key} size="sm" />
        <div className="leading-tight pr-1">
          <div className="text-[11px] text-white/85 font-medium">{c.name}</div>
          <div className="text-[9px] uppercase tracking-widest text-white/40 font-display">{c.role}</div>
        </div>
      </div>
    ))}
  </div>
);

export default Avatar;
