"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import GameScoreSaveBadge from "@/components/games/GameScoreSaveBadge";
import { useUnlocks } from "@/hooks/useUnlocks";
import { useCursorAvatar } from "@/hooks/useCursorAvatar";
import CursorAvatarOverlay from "@/components/games/CursorAvatarOverlay";

interface Slice { id: string; position: number }
interface Puzzle {
  numerator: number;
  denominator: number;
  shape: "circle" | "rectangle";
  displayMode: "fraction" | "decimal" | "percent";
}
type GameState = "START" | "PLAYING" | "GAMEOVER";
type Difficulty = "easy" | "medium" | "hard";

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

function formatTarget(p: Puzzle): string {
  if (p.displayMode === "decimal") return (p.numerator / p.denominator).toFixed(2);
  if (p.displayMode === "percent") return `${Math.round((p.numerator / p.denominator) * 100)}%`;
  return `${p.numerator}/${p.denominator}`;
}

function generatePuzzle(score: number, difficulty: Difficulty = "medium"): Puzzle {
  const tier = Math.floor(score / 300);
  const easyDenoms = [2, 3, 4];
  const medDenoms = [2, 3, 4, 5, 6, 8];
  const hardDenoms = [4, 6, 8, 9, 10, 12];
  
  const denoms = difficulty === "easy" ? easyDenoms : difficulty === "hard" ? hardDenoms : medDenoms;
  const denom = denoms[Math.min(tier, denoms.length - 1)];
  
  let numer = Math.floor(Math.random() * (denom - 1)) + 1;
  const g = gcd(numer, denom);
  numer = numer / g;
  const simpleDenom = denom / g;
  
  const shapes: Array<"circle" | "rectangle"> = ["rectangle", "circle"];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  let displayMode: "fraction" | "decimal" | "percent" = "fraction";
  if (difficulty === "hard" || (difficulty === "medium" && tier >= 2)) {
    const modes: Array<"fraction" | "decimal" | "percent"> = ["fraction", "decimal", "percent"];
    displayMode = modes[Math.floor(Math.random() * modes.length)];
  }
  return { numerator: numer, denominator: simpleDenom, shape, displayMode };
}

export default function FractionSlicer() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();
  const { activeSkinEmoji } = useUnlocks();
  const { bindCursorAvatar, pointerPosition, showPointerSkin } = useCursorAvatar();
  const [gameState, setGameState] = useState<GameState>("START");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [puzzle, setPuzzle] = useState<Puzzle>(() => generatePuzzle(0, "medium"));
  const [slices, setSlices] = useState<Slice[]>([]);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [selectedSections, setSelectedSections] = useState<Set<number>>(new Set());
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [phase, setPhase] = useState<"slicing" | "selecting">("slicing");
  const [shake, setShake] = useState(false);
  const [lives, setLives] = useState(3);
  const [hintsRemaining, setHintsRemaining] = useState(1);
  const [showHint, setShowHint] = useState(false);
  
  const scoreRef = useRef(score);
  const coinsRef = useRef(coins);

  useEffect(() => {
    scoreRef.current = score;
    coinsRef.current = coins;
  }, [score, coins]);

  const resetRound = useCallback((newPuzzle?: Puzzle) => {
    setSlices([]);
    setSelectedSections(new Set());
    setPhase("slicing");
    setShowHint(false);
    if (newPuzzle) setPuzzle(newPuzzle);
  }, []);

  const useHint = useCallback(() => {
    if (hintsRemaining <= 0 || gameState !== "PLAYING") return;
    setShowHint(true);
    setHintsRemaining(h => h - 1);
    setTimeout(() => setShowHint(false), 2000);
  }, [hintsRemaining, gameState]);

  const handleShapeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== "PLAYING") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let pos = 0;
    if (puzzle.shape === "circle") {
      // Radial hit detection
      const dx = clickX - centerX;
      const dy = clickY - centerY;
      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      if (angle < 0) angle += 2 * Math.PI;
      pos = angle / (2 * Math.PI);
    } else {
      // Linear x-ratio
      pos = Math.max(0.01, Math.min(0.99, clickX / rect.width));
    }

    if (phase === "slicing") {
      setSlices(prev => {
        const next = [...prev, { id: `s_${Date.now()}`, position: pos }].sort((a, b) => a.position - b.position);
        if (next.length >= puzzle.denominator - 1) setTimeout(() => setPhase("selecting"), 200);
        return next;
      });
    } else {
      const sorted = [...slices].sort((a, b) => a.position - b.position);
      const bounds = [0, ...sorted.map(s => s.position), 1];
      let idx = 0;
      for (let i = 0; i < bounds.length - 1; i++) {
        if (pos >= bounds[i] && pos < bounds[i + 1]) { idx = i; break; }
      }
      setSelectedSections(prev => {
        const next = new Set(prev);
        if (next.has(idx)) {
          next.delete(idx);
        } else {
          next.add(idx);
        }
        return next;
      });
    }
  }, [gameState, phase, puzzle, slices]);

  const handleSubmit = useCallback(() => {
    if (gameState !== "PLAYING" || phase !== "selecting") return;
    const correct = selectedSections.size === puzzle.numerator && slices.length === puzzle.denominator - 1;
    if (correct) {
      const gain = 100 + Math.floor(scoreRef.current / 300) * 50;
      setScore(s => s + gain);
      setCoins(c => c + 1);
      triggerPrompt();
      trackWin({ score: scoreRef.current + gain, coins: coinsRef.current + 1, difficulty });
      setFlash("correct");
      setTimeout(() => { setFlash(null); resetRound(generatePuzzle(scoreRef.current + gain, difficulty)); }, 700);
    } else {
      setFlash("wrong");
      setShake(true);
      setLives(l => {
        const next = l - 1;
        if (next <= 0) {
          trackGameOver({ score: scoreRef.current, coins: coinsRef.current, difficulty, reason: "out_of_lives" });
          updateProgress(coinsRef.current, Math.floor(scoreRef.current / 100));
          setTimeout(() => setGameState("GAMEOVER"), 600);
        }
        return next;
      });
      setTimeout(() => { setFlash(null); setShake(false); resetRound(); }, 700);
    }
  }, [gameState, phase, puzzle, selectedSections, slices, resetRound, trackGameOver, trackWin, updateProgress, difficulty, triggerPrompt]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phase === "selecting") handleSubmit();
      if (e.key === "r" || e.key === "R") resetRound();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSubmit, phase, resetRound]);

  const startGame = () => {
    setScore(0); setCoins(0); setLives(3); setGameState("PLAYING");
    const hints = difficulty === "easy" ? 3 : difficulty === "hard" ? 0 : 1;
    setHintsRemaining(hints);
    resetRound(generatePuzzle(0, difficulty));
    trackStart({ difficulty });
  };

  const sortedSlices = [...slices].sort((a, b) => a.position - b.position);
  const boundaries = [0, ...sortedSlices.map(s => s.position), 1];
  const totalSections = puzzle.denominator;
  const flashBg = flash === "correct" ? "rgba(52,211,153,0.4)" : flash === "wrong" ? "rgba(239,68,68,0.5)" : null;
  
  // Hint position: (slices.length + 1) / totalSections
  // This assumes we want them perfectly even.
  const hintPos = showHint ? (slices.length + 1) / totalSections : null;

  const tierInfo = (() => {
    const t = Math.min(Math.floor(score / 300), 4);
    const labels = ["🟠 Halves & Thirds", "🟡 Quarters & Fifths", "🟢 Sixths & Eighths", "🔵 Decimals", "🟣 Percentages"];
    const colors = ["#fb923c", "#facc15", "#34d399", "#60a5fa", "#c084fc"];
    return { label: labels[t], color: colors[t] };
  })();

  const slicePrompt = phase === "slicing"
    ? `Step 1 — Place ${Math.max(0, puzzle.denominator - 1 - slices.length)} more slice line${puzzle.denominator - 1 - slices.length !== 1 ? "s" : ""}`
    : `Step 2 — Shade ${puzzle.numerator} section${puzzle.numerator !== 1 ? "s" : ""} and Submit`;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#05050f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: 3, background: "linear-gradient(90deg, #fb923c, #f472b6, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, textTransform: "uppercase", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.15))" }}>
            Fraction Slicer
          </h1>
        </div>

        <div style={{ position: "relative", width: "100%", borderRadius: 32, overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)", background: "radial-gradient(circle at 50% 0%, #1a0a32 0%, #0d1117 60%, #000 100%)", boxShadow: "0 0 80px rgba(251,146,60,0.2), inset 0 0 30px rgba(0,0,0,0.8)", minHeight: 600, transform: shake ? "translateX(6px)" : "none", transition: shake ? "none" : "transform 0.1s ease-out" }}>
          {flashBg && <div style={{ position: "absolute", inset: 0, background: flashBg, zIndex: 99, pointerEvents: "none", mixBlendMode: "screen" }} />}

          {/* Stars */}
          {[...Array(35)].map((_, i) => (
            <div key={i} style={{ position: "absolute", left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`, width: i % 5 === 0 ? 2.5 : 1.5, height: i % 5 === 0 ? 2.5 : 1.5, borderRadius: "50%", background: "white", opacity: 0.12 + (i % 4) * 0.08 }} />
          ))}

          {/* PLAYING */}
          {gameState === "PLAYING" && (
            <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              {/* HUD */}
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ background: "rgba(10,10,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(250,204,21,0.4)", borderRadius: 20, padding: "6px 14px", fontSize: 16, fontWeight: 800, color: "#fde047" }}>🪙 {coins}</div>
                <div style={{ background: "rgba(10,10,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 20, padding: "6px 14px", fontSize: 16, fontWeight: 800, color: "#67e8f9" }}>Skin {activeSkinEmoji}</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: 3 }, (_, i) => <span key={i} style={{ fontSize: 20, opacity: i < lives ? 1 : 0.15 }}>❤️</span>)}
                </div>
                <div style={{ background: "rgba(10,10,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(167,139,250,0.4)", borderRadius: 20, padding: "6px 14px", fontSize: 16, fontWeight: 800, color: "#ddd6fe" }}>{score.toLocaleString()}</div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: tierInfo.color, textTransform: "uppercase" }}>{tierInfo.label}</div>

              {/* Target */}
              <div style={{ textAlign: "center", background: "rgba(10,10,20,0.65)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: "16px 32px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", width: "100%" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 700, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>Target</div>
                <div style={{ fontSize: 56, fontWeight: 900, color: "white", lineHeight: 1 }}>{formatTarget(puzzle)}</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, color: "#67e8f9" }}>Slicer Skin {activeSkinEmoji}</div>
              </div>

              {/* Shape */}
              <div
                {...bindCursorAvatar}
                onClick={handleShapeClick}
                style={{
                  position: "relative",
                  width: "100%",
                  cursor: showPointerSkin ? "none" : "crosshair",
                  userSelect: "none",
                }}
              >
                {puzzle.shape === "rectangle" ? (
                  <div style={{ position: "relative", width: "100%", height: 120, borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.18)", overflow: "hidden" }}>
                    {Array.from({ length: totalSections }, (_, i) => (
                      <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${boundaries[i] * 100}%`, width: `${(boundaries[i + 1] - boundaries[i]) * 100}%`, background: selectedSections.has(i) ? "linear-gradient(135deg,rgba(251,146,60,0.7),rgba(244,114,182,0.65))" : "transparent", transition: "background 0.2s" }} />
                    ))}
                    {sortedSlices.map(s => (
                      <div key={s.id} style={{ position: "absolute", top: 0, bottom: 0, left: `${s.position * 100}%`, width: 3, background: "linear-gradient(to bottom,#fb923c,#f472b6)", boxShadow: "0 0 10px rgba(251,146,60,0.8)", transform: "translateX(-50%)", zIndex: 10 }} />
                    ))}
                    {/* Ghost Hint */}
                    {hintPos !== null && (
                      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${hintPos * 100}%`, width: 3, background: "rgba(255,255,255,0.4)", border: "1px dashed white", transform: "translateX(-50%)", zIndex: 5, animation: "pulseHint 0.5s infinite alternate" }} />
                    )}
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ position: "relative", width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255,255,255,0.2)", boxShadow: "0 0 40px rgba(251,146,60,0.15)" }}>
                      <svg viewBox="0 0 200 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                        {Array.from({ length: totalSections }, (_, i) => {
                          const sa = (i / totalSections) * 2 * Math.PI - Math.PI / 2;
                          const ea = ((i + 1) / totalSections) * 2 * Math.PI - Math.PI / 2;
                          const x1 = 100 + 95 * Math.cos(sa), y1 = 100 + 95 * Math.sin(sa);
                          const x2 = 100 + 95 * Math.cos(ea), y2 = 100 + 95 * Math.sin(ea);
                          const la = ea - sa > Math.PI ? 1 : 0;
                          return <path key={i} d={`M 100 100 L ${x1} ${y1} A 95 95 0 ${la} 1 ${x2} ${y2} Z`} fill={selectedSections.has(i) ? "rgba(251,146,60,0.7)" : "rgba(255,255,255,0.04)"} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" style={{ transition: "fill 0.2s" }} />;
                        })}
                        {sortedSlices.map(s => {
                          const angle = s.position * 2 * Math.PI - Math.PI / 2;
                          return <line key={s.id} x1="100" y1="100" x2={100 + 95 * Math.cos(angle)} y2={100 + 95 * Math.sin(angle)} stroke="#fb923c" strokeWidth="3" />;
                        })}
                        {/* Ghost Hint */}
                        {hintPos !== null && (
                          <line x1="100" y1="100" x2={100 + 95 * Math.cos(hintPos * 2 * Math.PI - Math.PI / 2)} y2={100 + 95 * Math.sin(hintPos * 2 * Math.PI - Math.PI / 2)} stroke="white" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" style={{ animation: "pulseHint 0.5s infinite alternate" }} />
                        )}
                      </svg>
                    </div>
                  </div>
                )}

                <CursorAvatarOverlay
                  activeSkinEmoji={activeSkinEmoji}
                  pointerPosition={pointerPosition}
                  visible={showPointerSkin}
                />
              </div>

              {/* Controls */}
              <div style={{ display: "flex", gap: 10, width: "100%" }}>
                <button onClick={() => resetRound()} style={{ flex: 1, padding: 12, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>↩ Reset</button>
                <button onClick={useHint} disabled={hintsRemaining <= 0} style={{ flex: 1, padding: 12, borderRadius: 16, border: "1px solid rgba(251,146,60,0.3)", background: "rgba(251,146,60,0.1)", color: hintsRemaining > 0 ? "#fb923c" : "rgba(255,255,255,0.2)", fontSize: 13, fontWeight: 700, cursor: hintsRemaining > 0 ? "pointer" : "default", opacity: hintsRemaining > 0 ? 1 : 0.5 }}>💡 Hint ({hintsRemaining})</button>
                <button onClick={handleSubmit} disabled={phase !== "selecting"} style={{ flex: 2, padding: 12, borderRadius: 16, border: "none", background: phase === "selecting" ? "linear-gradient(90deg,#fb923c,#f472b6)" : "rgba(255,255,255,0.08)", color: "white", fontSize: 16, fontWeight: 900, cursor: phase === "selecting" ? "pointer" : "default", opacity: phase === "selecting" ? 1 : 0.5 }}>Submit [↵]</button>
              </div>

              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center", fontWeight: 600 }}>{slicePrompt}</div>
            </div>
          )}

          {/* START */}
          {gameState === "START" && (
            <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(5,5,15,0.6)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "linear-gradient(145deg,rgba(30,20,10,0.88),rgba(15,10,5,0.95))", border: "1px solid rgba(251,146,60,0.28)", borderRadius: 32, padding: 32, textAlign: "center", maxWidth: "90%", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 60 }}>{activeSkinEmoji}</div>
                <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg,#fb923c,#f472b6,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 1 }}>Fraction Slicer</div>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.5, margin: 0, fontSize: 14, fontWeight: 500 }}>Slice and shade the shape to match the target fraction, decimal or percent.</p>
                
                {/* Difficulty Selector */}
                <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.05)", padding: 4, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                  {(["easy", "medium", "hard"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      style={{
                        padding: "6px 12px", borderRadius: 12, border: "none", cursor: "pointer",
                        fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                        background: difficulty === d ? "rgba(251,146,60,0.2)" : "transparent",
                        color: difficulty === d ? "#fb923c" : "rgba(255,255,255,0.4)",
                        transition: "all 0.2s"
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <button onClick={startGame} style={{ marginTop: 8, padding: "14px 40px", fontSize: 18, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg,#fb923c,#f472b6)", color: "white", cursor: "pointer", letterSpacing: 1, boxShadow: "0 10px 25px rgba(251,146,60,0.4)" }}>
                  Start Slicing
                </button>
              </div>
            </div>
          )}

          {/* GAMEOVER */}
          {gameState === "GAMEOVER" && (
            <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(20,5,5,0.75)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "linear-gradient(145deg,rgba(50,20,20,0.88),rgba(20,10,10,0.95))", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 32, padding: 32, textAlign: "center", width: "85%", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 50 }}>✂️</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#fca5a5", letterSpacing: 1 }}>SLICED OUT!</div>
                <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 20, width: "100%" }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>FINAL SCORE</div>
                <div style={{ color: "white", fontSize: 44, fontWeight: 900 }}>{score.toLocaleString()}</div>
              </div>
              <GameScoreSaveBadge className="mt-1" />
              <button onClick={startGame} style={{ padding: "14px 40px", fontSize: 18, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg,#f97316,#ec4899)", color: "white", cursor: "pointer" }}>
                Try Again
              </button>
              </div>
            </div>
          )}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulseHint {
            from { opacity: 0.3; }
            to { opacity: 1; stroke-width: 5; }
          }
        ` }} />
      </div>
    </div>
  );
}
