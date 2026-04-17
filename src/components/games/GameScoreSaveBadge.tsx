"use client";

import { useGameScoreSaveStatus } from "@/components/games/GameAnalyticsContext";

export default function GameScoreSaveBadge({ className = "" }: { className?: string }) {
  const { status, error } = useGameScoreSaveStatus();

  if (status === "idle") return null;

  if (status === "saving") {
    return (
      <div className={`inline-flex items-center justify-center rounded-full border border-cyan-300/30 bg-slate-950/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100 shadow-2xl backdrop-blur-md ${className}`}>
        Saving score...
      </div>
    );
  }

  if (status === "saved") {
    return (
      <div className={`inline-flex items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl ${className}`}>
        Score saved
      </div>
    );
  }

  return (
    <div className={`max-w-[280px] rounded-2xl border border-rose-300/30 bg-slate-950/90 px-4 py-3 text-xs font-bold text-rose-200 shadow-2xl backdrop-blur-md ${className}`}>
      <div className="mb-1 font-black uppercase tracking-[0.2em] text-rose-100">Save failed</div>
      <div className="leading-relaxed text-rose-200/80">{error || "Could not save your score."}</div>
    </div>
  );
}
