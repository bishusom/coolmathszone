"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import GameScoreSaveBadge from "@/components/games/GameScoreSaveBadge";
import { useUnlocks } from "@/hooks/useUnlocks";
import { useCursorAvatar } from "@/hooks/useCursorAvatar";
import CursorAvatarOverlay from "@/components/games/CursorAvatarOverlay";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Node {
  id: number;
  row: number;
  col: number;
  value: number;
}

interface Puzzle {
  nodes: Node[];
  target: number;
  operator: "sum" | "product";
  gridSize: number;
  solutionPath: Node[];
}

type GameState = "START" | "PLAYING" | "GAMEOVER";
type Difficulty = "easy" | "medium" | "hard";

// ── Puzzle Generator ───────────────────────────────────────────────────────────
function generatePuzzle(score: number, difficulty: Difficulty = "medium"): Puzzle {
  const tier = Math.floor(score / 400);
  let gridSize = 4;
  if (difficulty === "hard" || (difficulty === "medium" && tier >= 2)) gridSize = 5;
  
  const operator: "sum" | "product" = (difficulty !== "easy" && (tier >= 1 || difficulty === "hard") && Math.random() > 0.4) ? "product" : "sum";

  const nodes: Node[] = [];
  let id = 0;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      let maxVal = 9;
      if (operator === "product") {
        maxVal = difficulty === "easy" ? 5 : difficulty === "hard" ? 12 : 9;
      } else {
        maxVal = difficulty === "easy" ? 9 : difficulty === "hard" ? 25 : 15;
      }
      nodes.push({ id: id++, row: r, col: c, value: Math.floor(Math.random() * (maxVal - 1)) + 1 });
    }
  }

  // Pick a random path length and compute target from it
  const minLen = difficulty === "easy" ? 2 : 3;
  const maxLen = difficulty === "easy" ? 3 : gridSize;
  const pathLen = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  
  let r = Math.floor(Math.random() * gridSize);
  let c = Math.floor(Math.random() * gridSize);
  const solutionPath: Node[] = [];
  const visited = new Set<string>();
  
  for (let i = 0; i < pathLen; i++) {
    const key = `${r},${c}`;
    if (visited.has(key)) break;
    visited.add(key);
    solutionPath.push(nodes[r * gridSize + c]);
    
    // Move to adjacent
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]].filter(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      return nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && !visited.has(`${nr},${nc}`);
    });
    if (dirs.length === 0) break;
    const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
    r += dr; c += dc;
  }

  const values = solutionPath.map(n => n.value);
  const target = operator === "sum"
    ? values.reduce((a, b) => a + b, 0)
    : values.reduce((a, b) => a * b, 1);

  return { nodes, target, operator, gridSize, solutionPath };
}

function isAdjacent(a: Node, b: Node): boolean {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;
}

function computePathValue(path: Node[], op: "sum" | "product"): number {
  if (path.length === 0) return op === "sum" ? 0 : 1;
  return op === "sum"
    ? path.reduce((acc, n) => acc + n.value, 0)
    : path.reduce((acc, n) => acc * n.value, 1);
}

export default function LogicLink() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();
  const { activeSkinEmoji } = useUnlocks();
  const { bindCursorAvatar, pointerPosition, showPointerSkin } = useCursorAvatar();
  const [gameState, setGameState] = useState<GameState>("START");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [puzzle, setPuzzle] = useState<Puzzle>(() => generatePuzzle(0, "medium"));
  const [path, setPath] = useState<Node[]>([]);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [shake, setShake] = useState(false);
  const [lives, setLives] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(1);
  const [hintId, setHintId] = useState<number | null>(null);
  const scoreRef = useRef(score);
  const coinsRef = useRef(coins);

  useEffect(() => {
    scoreRef.current = score;
    coinsRef.current = coins;
  }, [score, coins]);

  const pathValue = computePathValue(path, puzzle.operator);
  const isOverTarget = pathValue > puzzle.target && puzzle.operator === "sum";

  const triggerHint = useCallback(() => {
    if (hintsRemaining <= 0 || gameState !== "PLAYING") return;
    const nextNode = puzzle.solutionPath[path.length];
    if (nextNode) {
      setHintId(nextNode.id);
      setHintsRemaining(h => h - 1);
      setTimeout(() => setHintId(null), 1500);
    }
  }, [hintsRemaining, gameState, puzzle.solutionPath, path.length]);

  const handleNodeInteract = useCallback((node: Node) => {
    if (gameState !== "PLAYING") return;
    setPath(prev => {
      const alreadyIdx = prev.findIndex(n => n.id === node.id);
      if (alreadyIdx !== -1) {
        // Backtrack to this node
        return prev.slice(0, alreadyIdx + 1);
      }
      // Must be adjacent to last node
      if (prev.length > 0 && !isAdjacent(prev[prev.length - 1], node)) return prev;
      const next = [...prev, node];
      return next;
    });
  }, [gameState]);

  const handleSubmit = useCallback(() => {
    if (gameState !== "PLAYING" || path.length < 2) return;
    const val = computePathValue(path, puzzle.operator);
    if (val === puzzle.target) {
      const gain = 150 + Math.floor(scoreRef.current / 400) * 75 + (path.length * 20);
      setScore(s => s + gain);
      setCoins(c => c + 1);
      triggerPrompt();
      trackWin({ score: scoreRef.current + gain, coins: coinsRef.current + 1, difficulty });
      setFlash("correct");
      setTimeout(() => {
        setFlash(null);
        setPath([]);
        setPuzzle(generatePuzzle(scoreRef.current + gain, difficulty));
      }, 700);
    } else {
      setFlash("wrong");
      setShake(true);
      const penalty = puzzle.operator === "product" ? 0 : 30;
      setScore(s => Math.max(0, s - penalty));
      setLives(l => {
        const next = l - 1;
        if (next <= 0) {
          trackGameOver({ score: scoreRef.current, coins: coinsRef.current, difficulty, reason: "out_of_lives" });
          updateProgress(coinsRef.current, Math.floor(scoreRef.current / 100));
          setTimeout(() => setGameState("GAMEOVER"), 600);
        }
        return next;
      });
      setTimeout(() => { setFlash(null); setShake(false); setPath([]); }, 700);
    }
  }, [gameState, path, puzzle, trackGameOver, trackWin, updateProgress, difficulty, triggerPrompt]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
      if (e.key === "Escape" || e.key === "Backspace") setPath([]);
      if (e.key === "h" || e.key === "H") triggerHint();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSubmit, triggerHint]);

  const startGame = () => {
    setScore(0); setCoins(0); setLives(3); setPath([]);
    const hints = difficulty === "easy" ? 3 : difficulty === "hard" ? 0 : 1;
    setHintsRemaining(hints);
    setPuzzle(generatePuzzle(0, difficulty)); setGameState("PLAYING");
    trackStart({ difficulty });
  };

  const flashBg = flash === "correct" ? "rgba(52,211,153,0.4)" : flash === "wrong" ? "rgba(239,68,68,0.5)" : null;
  const tierInfo = (() => {
    const t = Math.min(Math.floor(score / 400), 3);
    const labels = [
      puzzle.operator === "sum" ? "🟦 Addition Paths" : "🟩 Multiplication",
      puzzle.gridSize === 5 ? "🟨 Larger Grid" : "🟦 Basic Grid",
      "🟥 Expert Challenge",
      "🔥 Logic Master"
    ];
    const colors = ["#60a5fa", "#34d399", "#facc15", "#ef4444"];
    return { label: labels[t], color: colors[t] ? colors[t] : colors[0] };
  })();

  const cellSize = puzzle.gridSize === 5 ? 56 : 68;
  const gap = 8;
  const gridPx = puzzle.gridSize * cellSize + (puzzle.gridSize - 1) * gap;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#05050f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: 3, background: "linear-gradient(90deg, #22d3ee, #818cf8, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, textTransform: "uppercase" }}>
            Logic Link
          </h1>
        </div>

        <div style={{ position: "relative", width: "100%", borderRadius: 32, overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)", background: "radial-gradient(circle at 50% 20%, #0f172a 0%, #050810 70%, #000 100%)", boxShadow: "0 0 80px rgba(34,211,238,0.18), inset 0 0 30px rgba(0,0,0,0.8)", minHeight: 600, transform: shake ? "translateX(6px)" : "none", transition: shake ? "none" : "transform 0.1s ease-out" }}>
          {flashBg && <div style={{ position: "absolute", inset: 0, background: flashBg, zIndex: 99, pointerEvents: "none", mixBlendMode: "screen" }} />}

          {/* Stars */}
          {[...Array(30)].map((_, i) => (
            <div key={i} style={{ position: "absolute", left: `${(i * 41 + 13) % 100}%`, top: `${(i * 57 + 9) % 100}%`, width: 1.5, height: 1.5, borderRadius: "50%", background: "white", opacity: 0.1 + (i % 4) * 0.07 }} />
          ))}

          {/* PLAYING */}
          {gameState === "PLAYING" && (
            <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              {/* HUD */}
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ background: "rgba(10,10,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(250,204,21,0.4)", borderRadius: 20, padding: "6px 14px", fontSize: 15, fontWeight: 800, color: "#fde047" }}>🪙 {coins}</div>
                <div style={{ background: "rgba(10,10,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 20, padding: "6px 14px", fontSize: 15, fontWeight: 800, color: "#67e8f9" }}>Skin {activeSkinEmoji}</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: 3 }, (_, i) => <span key={i} style={{ fontSize: 20, opacity: i < lives ? 1 : 0.15 }}>❤️</span>)}
                </div>
                <div style={{ background: "rgba(10,10,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(167,139,250,0.4)", borderRadius: 20, padding: "6px 14px", fontSize: 15, fontWeight: 800, color: "#ddd6fe" }}>{score.toLocaleString()}</div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: tierInfo.color, textTransform: "uppercase" }}>{tierInfo.label}</div>

              {/* Target */}
              <div style={{ textAlign: "center", background: "rgba(10,10,20,0.65)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 24, padding: "14px 28px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", width: "100%" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>
                  {puzzle.operator === "sum" ? "Path must SUM to:" : "Path must MULTIPLY to:"}
                </div>
                <div style={{ fontSize: 52, fontWeight: 900, color: isOverTarget ? "#ef4444" : "white", lineHeight: 1, transition: "color 0.2s" }}>
                  {puzzle.target}
                </div>
                {path.length > 0 && (
                  <div style={{ fontSize: 14, color: isOverTarget ? "#ef4444" : "#34d399", fontWeight: 800, marginTop: 6, transition: "color 0.2s" }}>
                    Current: {path.map(n => n.value).join(puzzle.operator === "sum" ? " + " : " × ")} = {pathValue}
                  </div>
                )}
              </div>

              {/* Grid */}
              <div
                {...bindCursorAvatar}
                style={{
                  position: "relative",
                  cursor: showPointerSkin ? "none" : "default",
                }}
              >
                {/* SVG connection lines */}
                <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5, width: gridPx, height: gridPx }} viewBox={`0 0 ${gridPx} ${gridPx}`}>
                  {path.slice(1).map((node, i) => {
                    const prev = path[i];
                    const x1 = prev.col * (cellSize + gap) + cellSize / 2;
                    const y1 = prev.row * (cellSize + gap) + cellSize / 2;
                    const x2 = node.col * (cellSize + gap) + cellSize / 2;
                    const y2 = node.row * (cellSize + gap) + cellSize / 2;
                    return <line key={`${prev.id}-${node.id}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />;
                  })}
                </svg>

                {/* Nodes */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${puzzle.gridSize}, ${cellSize}px)`, gap, position: "relative", zIndex: 10 }}>
                  {puzzle.nodes.map(node => {
                    const inPath = path.some(n => n.id === node.id);
                    const isHead = path.length > 0 && path[path.length - 1].id === node.id;
                    const canConnect = path.length > 0 && isAdjacent(path[path.length - 1], node) && !inPath;
                    const isHint = hintId === node.id;

                    return (
                      <div
                        key={node.id}
                        onClick={() => handleNodeInteract(node)}
                        onMouseEnter={() => isDragging && handleNodeInteract(node)}
                        onMouseDown={() => { setIsDragging(true); handleNodeInteract(node); }}
                        onMouseUp={() => setIsDragging(false)}
                        style={{
                          width: cellSize, height: cellSize,
                          borderRadius: 16,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: puzzle.gridSize === 5 ? 18 : 22,
                          fontWeight: 900,
                          cursor: "pointer",
                          userSelect: "none",
                          position: "relative",
                          background: isHead
                            ? "linear-gradient(135deg, #22d3ee, #818cf8)"
                            : inPath
                            ? "linear-gradient(135deg, rgba(34,211,238,0.4), rgba(129,140,248,0.4))"
                            : isHint
                            ? "rgba(34,211,238,0.4)"
                            : canConnect
                            ? "rgba(34,211,238,0.12)"
                            : "rgba(255,255,255,0.06)",
                          border: isHead
                            ? "2px solid #22d3ee"
                            : inPath
                            ? "2px solid rgba(34,211,238,0.6)"
                            : isHint
                            ? "2px solid #22d3ee"
                            : canConnect
                            ? "2px solid rgba(34,211,238,0.3)"
                            : "2px solid rgba(255,255,255,0.1)",
                          color: inPath ? "white" : "rgba(255,255,255,0.85)",
                          boxShadow: isHead
                            ? "0 0 20px rgba(34,211,238,0.7), inset 0 2px 4px rgba(255,255,255,0.3)"
                            : isHint
                            ? "0 0 20px #22d3ee"
                            : inPath
                            ? "0 0 12px rgba(34,211,238,0.4)"
                            : "none",
                          transform: isHead || isHint ? "scale(1.1)" : "scale(1)",
                          transition: "all 0.15s ease",
                          animation: isHint ? "pulseHint 0.5s infinite alternate" : "none"
                        }}
                      >
                        {node.value}
                      </div>
                    );
                  })}
                </div>

                <CursorAvatarOverlay
                  activeSkinEmoji={activeSkinEmoji}
                  pointerPosition={pointerPosition}
                  visible={showPointerSkin}
                />
              </div>

              {/* Controls */}
              <div style={{ display: "flex", gap: 10, width: "100%" }}>
                <button onClick={() => setPath([])} style={{ flex: 1, padding: 12, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>↩ Clear</button>
                <button 
                  onClick={triggerHint} 
                  disabled={hintsRemaining <= 0}
                  style={{ flex: 1, padding: 12, borderRadius: 16, border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: hintsRemaining > 0 ? "#22d3ee" : "rgba(255,255,255,0.2)", fontSize: 13, fontWeight: 700, cursor: hintsRemaining > 0 ? "pointer" : "default", opacity: hintsRemaining > 0 ? 1 : 0.5 }}
                >
                  💡 Hint ({hintsRemaining})
                </button>
                <button onClick={handleSubmit} disabled={path.length < 2}
                  style={{ flex: 2, padding: 12, borderRadius: 16, border: "none", background: path.length >= 2 ? "linear-gradient(90deg,#22d3ee,#818cf8)" : "rgba(255,255,255,0.08)", color: "white", fontSize: 16, fontWeight: 900, cursor: path.length >= 2 ? "pointer" : "default", boxShadow: path.length >= 2 ? "0 8px 20px rgba(34,211,238,0.35)" : "none", letterSpacing: 1, transition: "all 0.2s", opacity: path.length >= 2 ? 1 : 0.5 }}>
                  Submit [↵]
                </button>
              </div>

              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.33)", textAlign: "center", fontWeight: 600 }}>
                Build a path that {puzzle.operator === "sum" ? "adds up" : "multiplies"} to {puzzle.target}
              </div>
            </div>
          )}

          {/* START */}
          {gameState === "START" && (
            <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(5,5,15,0.6)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "linear-gradient(145deg,rgba(10,20,40,0.9),rgba(5,8,20,0.95))", border: "1px solid rgba(34,211,238,0.3)", borderRadius: 32, padding: 32, textAlign: "center", maxWidth: "90%", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 56 }}>{activeSkinEmoji}</div>
                <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg,#22d3ee,#818cf8,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 1 }}>Logic Link</div>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.5, margin: 0, fontSize: 14, fontWeight: 500 }}>Connect nodes to form a path that {puzzle.operator === "sum" ? "sums" : "multiplies"} to the target.</p>
                
                {/* Difficulty Selector */}
                <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.05)", padding: 4, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                  {(["easy", "medium", "hard"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      style={{
                        padding: "6px 12px", borderRadius: 12, border: "none", cursor: "pointer",
                        fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                        background: difficulty === d ? "rgba(34,211,238,0.2)" : "transparent",
                        color: difficulty === d ? "#22d3ee" : "rgba(255,255,255,0.4)",
                        transition: "all 0.2s"
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <button onClick={startGame} style={{ marginTop: 8, padding: "14px 40px", fontSize: 18, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg,#22d3ee,#818cf8)", color: "white", cursor: "pointer", letterSpacing: 1, boxShadow: "0 10px 25px rgba(34,211,238,0.4)" }}>
                  Start Linking
                </button>
              </div>
            </div>
          )}

          {/* GAMEOVER */}
          {gameState === "GAMEOVER" && (
            <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(20,5,5,0.75)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "linear-gradient(145deg,rgba(50,20,20,0.9),rgba(20,10,10,0.95))", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 32, padding: 32, textAlign: "center", width: "85%", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 50 }}>{activeSkinEmoji}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#fca5a5", letterSpacing: 1 }}>CHAIN BROKEN!</div>
                <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 20, width: "100%" }}>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>FINAL SCORE</div>
                  <div style={{ color: "white", fontSize: 44, fontWeight: 900 }}>{score.toLocaleString()}</div>
                </div>
                <GameScoreSaveBadge className="mt-1" />
                <button onClick={startGame} style={{ padding: "14px 40px", fontSize: 18, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg,#22d3ee,#ec4899)", color: "white", cursor: "pointer" }}>
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
