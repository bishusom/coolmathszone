"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUnlocks } from "@/hooks/useUnlocks";

export interface GameProblem {
  question: React.ReactNode;
  answer: string | number;
  options: (string | number)[];
}

export interface GameEngineProps {
  title: React.ReactNode;
  description: React.ReactNode;
  generateProblem: (score: number) => GameProblem;
  getTierInfo: (score: number) => { label: string; color: string };
  colors?: {
    gradientText?: string;
    buttonGradient?: string;
    playerGradient?: string;
  };
}

// ── Constants ─────────────────────────────────────────────────────────────────
const LANE_X = [16.5, 50, 83.5]; // % positions
const TILE_H = 12; // % of track height per tile
const SPAWN_Y = -5;
const HIT_Y = 80;
const HIT_TOLERANCE = 15;
const BASE_SPEED = 0.22;

let obstacleId = 0;

export function GameEngine({ title, description, generateProblem, getTierInfo, colors }: GameEngineProps) {
  const { updateProgress } = useAuth();
  const { activeSkinEmoji } = useUnlocks();

  
  const defaultColors = {
    gradientText: "linear-gradient(90deg, #facc15, #fb923c, #f472b6)",
    buttonGradient: "linear-gradient(90deg, #facc15, #fb923c)",
    playerGradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
  };
  const theme = { ...defaultColors, ...colors };

  const [gameState, setGameState] = useState<"START" | "PLAYING" | "GAMEOVER">("START");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [lane, setLane] = useState(1);
  // Optional: keep track of last lane change to animate player tilt
  const [playerTilt, setPlayerTilt] = useState(0); 
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [problem, setProblem] = useState<GameProblem>(() => generateProblem(0));
  const [obstacles, setObstacles] = useState<any[]>([]);
  const [particles, setParticles] = useState<any[]>([]);
  const [bgGrid, setBgGrid] = useState(0); // For scrolling the neon grid
  
  const [shakeScreen, setShakeScreen] = useState(false);
  const [flashColor, setFlashColor] = useState<string | null>(null);

  const laneRef = useRef(lane);
  const scoreRef = useRef(score);
  const coinsRef = useRef(coins);
  const problemRef = useRef(problem);
  const gameStateRef = useRef(gameState);
  const difficultyRef = useRef(difficulty);
  const rafRef = useRef<number | null>(null);
  const spawnRef = useRef<any>(null);

  laneRef.current = lane;
  scoreRef.current = score;
  coinsRef.current = coins;
  problemRef.current = problem;
  gameStateRef.current = gameState;
  difficultyRef.current = difficulty;

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const getSpeed = (s: number) => {
    const base = difficultyRef.current === "easy" ? 0.12 : difficultyRef.current === "hard" ? 0.28 : 0.18;
    const factor = difficultyRef.current === "easy" ? 15000 : difficultyRef.current === "hard" ? 4000 : 8000;
    return base + Math.min(s / factor, 0.8);
  };

  const spawnFlash = (color: string) => {
    setFlashColor(color);
    setTimeout(() => setFlashColor(null), 350);
  };

  const spawnParticles = (laneIdx: number, correct: boolean) => {
    const x = LANE_X[laneIdx];
    const newParticles = Array.from({ length: correct ? 20 : 12 }, (_, i) => ({
      id: `${Date.now()}_${i}_${Math.random()}`,
      x,
      y: HIT_Y,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 6 + 2),
      color: correct
        ? ["#facc15", "#fb923c", "#34d399", "#60a5fa", "#ffffff"][i % 5]
        : ["#ef4444", "#f87171", "#7f1d1d"][i % 3],
      size: Math.random() * 12 + 6,
      life: 1,
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles((p) => p.filter((pt) => !newParticles.find((n) => n.id === pt.id)));
    }, 800);
  };

  // ── Game Loop ────────────────────────────────────────────────────────────────
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== "PLAYING") return;

    const speed = getSpeed(scoreRef.current);

    setObstacles((prev) => {
      const updated = prev.map((o) => ({ ...o, y: o.y + speed }));

      // Collision check
      for (const obs of updated) {
        if (
          obs.y >= HIT_Y - HIT_TOLERANCE &&
          obs.y <= HIT_Y + HIT_TOLERANCE &&
          obs.lane === laneRef.current &&
          !obs.hit
        ) {
          if (obs.isCorrect) {
            // Correct!
            const gain = 100 * (1 + Math.floor(scoreRef.current / 500));
            setScore((s) => s + gain);
            setCoins((c) => c + 1);
            setCombo((c) => c + 1);
            spawnFlash("rgba(52, 211, 153, 0.4)"); // emerald
            spawnParticles(obs.lane, true);
            const nextProblem = generateProblem(scoreRef.current + gain);
            setProblem(nextProblem);
            problemRef.current = nextProblem;
            return updated
              .filter((o) => o.groupId !== obs.groupId)
              .map((o) => ({ ...o, hit: false }));
          } else {
            // Wrong!
            spawnFlash("rgba(239, 68, 68, 0.6)"); // red
            spawnParticles(obs.lane, false);
            setShakeScreen(true);
            setCombo(0);
            setTimeout(() => setShakeScreen(false), 400);
            setScore((s) => Math.max(0, s - 50));
            updateProgress(coinsRef.current, Math.floor(Math.max(0, scoreRef.current - 50) / 100));
            gameStateRef.current = "GAMEOVER";
            setGameState("GAMEOVER");
            setHighScore((h) => Math.max(h, scoreRef.current));
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            clearInterval(spawnRef.current);
            return [];
          }
        }
      }

      return updated.filter((o) => o.y < 110);
    });

    // Scroll neon grid
    setBgGrid((grid) => (grid + speed * 0.5) % TILE_H);

    rafRef.current = requestAnimationFrame(gameLoop);
  }, [generateProblem]);

  // ── Spawn obstacles ──────────────────────────────────────────────────────────
  const spawnObstacles = useCallback(() => {
    if (gameStateRef.current !== "PLAYING") return;
    const prob = problemRef.current;
    if (!prob) return;
    const gid = ++obstacleId;
    const newObs = prob.options.map((val, idx) => ({
      id: `${gid}-${idx}`,
      groupId: gid,
      lane: idx,
      y: SPAWN_Y - 5,
      val,
      isCorrect: val === prob.answer,
      hit: false,
    }));
    setObstacles((prev) => [...prev, ...newObs]);
  }, []);

  // ── Start Game ───────────────────────────────────────────────────────────────
  const startGame = () => {
    obstacleId = 0;
    const p = generateProblem(0);
    setProblem(p);
    problemRef.current = p;
    setScore(0);
    setCoins(0);
    setCombo(0);
    setObstacles([]);
    setParticles([]);
    setLane(1);
    laneRef.current = 1;
    setPlayerTilt(0);
    scoreRef.current = 0;
    gameStateRef.current = "PLAYING";
    setGameState("PLAYING");

    setTimeout(() => {
      spawnObstacles();
      const intervalMs = difficultyRef.current === "easy" ? 3200 : difficultyRef.current === "hard" ? 1800 : 2500;
      const minInterval = difficultyRef.current === "easy" ? 2200 : difficultyRef.current === "hard" ? 1200 : 1600;
      const interval = setInterval(() => {
        if (gameStateRef.current !== "PLAYING") {
          clearInterval(interval);
          return;
        }
        spawnObstacles();
      }, Math.max(minInterval, intervalMs - scoreRef.current / 8));
      spawnRef.current = interval;
    }, 500);

    rafRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState !== "PLAYING") return;
    return () => {};
  }, [score, gameState]);

  // ── Controls ─────────────────────────────────────────────────────────────────
  const triggerLaneChange = (direction: "LEFT" | "RIGHT" | number) => {
    if (gameStateRef.current !== "PLAYING") return;
    setLane((l) => {
      let n = l;
      if (direction === "LEFT") n = Math.max(0, l - 1);
      else if (direction === "RIGHT") n = Math.min(2, l + 1);
      else if (typeof direction === "number") n = direction;
      laneRef.current = n;
      
      // Animate tilt
      if (n !== l) {
        setPlayerTilt(direction === "LEFT" ? -25 : 25);
        setTimeout(() => setPlayerTilt(0), 150);
      }
      return n;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") triggerLaneChange("LEFT");
      if (e.key === "ArrowRight" || e.key === "d") triggerLaneChange("RIGHT");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) {
      if (dx < 0) triggerLaneChange("LEFT");
      else triggerLaneChange("RIGHT");
    }
    touchStartX.current = null;
  };

  // ── Cleanup ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(spawnRef.current);
    };
  }, []);

  const tierInfo = getTierInfo(score);

  // ── Perspective Math ────────────────────────────────────────────────────────
  const perspScale = (y: number) => 0.25 + (y / 100) * 0.9;
  const perspOpacity = (y: number) => Math.min(1, 0.1 + (y / 100) * 1.5);

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: "#05050f",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 500 }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h1 style={{
            fontSize: 34, fontWeight: 900, letterSpacing: 4,
            background: theme.gradientText,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: 0, textTransform: "uppercase",
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))"
          }}>
            {title}
          </h1>
        </div>

        {/* Game Arena bounds */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            position: "relative",
            width: "100%",
            height: 600,
            borderRadius: 32,
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 80px rgba(124, 58, 237, 0.2), inset 0 0 30px rgba(0,0,0,0.8)",
            transform: shakeScreen ? "translateX(8px) translateY(-4px)" : "translateX(0) translateY(0)",
            transition: shakeScreen ? "none" : "transform 0.1s ease-out",
            userSelect: "none",
          }}
        >
          {/* Deep sky / Space background */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 0%, #2e1065 0%, #0f172a 50%, #000000 100%)",
          }} />

          {/* Render Stars */}
          {[...Array(60)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${(i * 31 + 17) % 100}%`,
              top: `${(i * 47 + 3) % 45}%`,
              width: i % 4 === 0 ? 3 : 1.5,
              height: i % 4 === 0 ? 3 : 1.5,
              borderRadius: "50%",
              background: "white",
              opacity: 0.2 + (i % 5) * 0.15,
              boxShadow: i % 4 === 0 ? "0 0 6px white" : "none",
              animation: i % 3 === 0 ? `twinkle ${2 + (i % 3)}s infinite alternate` : "none"
            }} />
          ))}

          {/* Sun / Horizon glow */}
          <div style={{
            position: "absolute",
            top: "30%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(20px)", pointerEvents: "none"
          }} />

          {/* Flash overlay */}
          {flashColor && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 99,
              background: flashColor,
              pointerEvents: "none",
              mixBlendMode: "screen",
            }} />
          )}

          {/* ── 3D Neon Horizon Track ── */}
          <div style={{
            position: "absolute",
            bottom: 0, left: "50%",
            transform: "translateX(-50%)",
            width: "200%",
            height: "60%",
            perspective: 600,
          }}>
            {/* Base track surface */}
            <div style={{
              position: "absolute", bottom: 0, left: "25%", right: "25%", top: 0,
              background: "linear-gradient(180deg, #1e1b4b 0%, #000000 100%)",
              clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
            }} />

            {/* Scrolling horizontal grid lines */}
            <div style={{
              position: "absolute", bottom: 0, left: "25%", right: "25%", top: 0,
              clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
              overflow: "hidden"
            }}>
              {[...Array(12)].map((_, i) => {
                const yPos = ((i * TILE_H) + bgGrid) % 120; // 120 so it scrolls off entirely
                return (
                  <div key={i} style={{
                    position: "absolute",
                    bottom: `${yPos}%`,
                    left: 0, right: 0,
                    height: "1.5px",
                    background: "rgba(167, 139, 250, 0.5)",
                    boxShadow: "0 0 8px rgba(167, 139, 250, 0.8)",
                  }} />
                );
              })}
            </div>

            {/* Vertical grid lines (Lane dividers, extra lines) */}
            <div style={{
              position: "absolute", bottom: 0, left: "25%", right: "25%", top: 0,
              clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
            }}>
              {/* Left/Right bounds */}
              <div style={{ position: "absolute", left: '0%', width: 2, height: "100%", background: "#a78bfa", boxShadow: "0 0 10px #c084fc", transformOrigin: "bottom center", transform: "rotate(-42deg)" }} />
              <div style={{ position: "absolute", left: '25%', width: 2, height: "100%", background: "rgba(167,139,250,0.3)", transformOrigin: "bottom center", transform: "rotate(-25deg)" }} />
              <div style={{ position: "absolute", left: '50%', width: 2, height: "100%", background: "rgba(167,139,250,0.3)" }} />
              <div style={{ position: "absolute", left: '75%', width: 2, height: "100%", background: "rgba(167,139,250,0.3)", transformOrigin: "bottom center", transform: "rotate(25deg)" }} />
              <div style={{ position: "absolute", left: '100%', width: 2, height: "100%", background: "#a78bfa", boxShadow: "0 0 10px #c084fc", transformOrigin: "bottom center", transform: "rotate(42deg)" }} />
            </div>
          </div>

          {/* ── OBSTACLE ORBS ── */}
          {obstacles.map((obs) => {
            const scale = perspScale(obs.y);
            const opacity = perspOpacity(obs.y);
            const lx = LANE_X[obs.lane];
            const cx = 50 + (lx - 50) * (obs.y / 100);
            const size = 56 + scale * 34;

            // Vibrant orb styles
            const laneStyles = [
              { color: "#3b82f6", glow: "rgba(59,130,246,0.8)" },
              { color: "#10b981", glow: "rgba(16,185,129,0.8)" },
              { color: "#f59e0b", glow: "rgba(245,158,11,0.8)" },
            ];
            const s = laneStyles[obs.lane];

            return (
              <div
                key={obs.id}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  triggerLaneChange(obs.lane);
                }}
                style={{
                  position: "absolute",
                  left: `${cx}%`,
                  top: `${obs.y}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity,
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${s.color} 40%, rgba(0,0,0,0.8) 100%)`,
                  border: `2px solid rgba(255,255,255,0.4)`,
                  boxShadow: `0 0 25px ${s.glow}, inset -5px -5px 15px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(255,255,255,0.5)`,
                  fontSize: 22,
                  fontWeight: 900,
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  zIndex: 10,
                  pointerEvents: "auto",
                  cursor: "pointer",
                  animation: "floatOrb 2s ease-in-out infinite alternate",
                }}
              >
                {obs.val}
              </div>
            );
          })}

          {/* ── PARTICLES ── */}
          {particles.map((p) => (
            <div key={p.id} style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              opacity: p.life,
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
              zIndex: 20,
              boxShadow: `0 0 10px ${p.color}`,
            }} />
          ))}

          {/* ── PLAYER AVATAR ── */}
          <div style={{
            position: "absolute",
            top: "72%",
            left: `${LANE_X[lane]}%`,
            transform: `translateX(-50%) rotate(${playerTilt}deg)`,
            transition: "left 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.2s ease-out",
            zIndex: 30,
            width: 64, height: 64,
          }}>
            {/* Exhaust glow */}
            <div style={{
              position: "absolute", bottom: -24, left: "50%",
              transform: "translateX(-50%)",
              width: 24, height: 34,
              background: "linear-gradient(to bottom, #d8b4fe, transparent)",
              filter: "blur(6px)",
              borderRadius: "50%",
              animation: "flicker 0.2s infinite alternate",
            }} />
            
            {/* Body */}
            <div style={{
              width: "100%", height: "100%",
              background: theme.playerGradient,
              borderRadius: "16px 16px 24px 24px",
              border: "2px solid rgba(255,255,255,0.6)",
              borderTop: "4px solid rgba(255,255,255,0.9)", // Glass reflection highlight
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32,
              boxShadow: "0 0 30px rgba(124,58,237,1), inset 0 8px 10px rgba(255,255,255,0.4)",
              animation: "playerBob 0.8s ease-in-out infinite alternate",
              backdropFilter: "blur(4px)",
            }}>
              {activeSkinEmoji}
            </div>
          </div>

          {/* ── HIT LINE indicator ── */}
          <div style={{
            position: "absolute",
            top: `72%`,
            left: "5%", right: "5%",
            height: 3,
            background: "linear-gradient(90deg, transparent, rgba(250,204,21,0.5), transparent)",
            boxShadow: "0 0 10px rgba(250,204,21,0.8)",
            zIndex: 5,
          }} />

          {/* ── HUD ── */}
          {gameState === "PLAYING" && problem && (
            <div style={{
              position: "absolute",
              top: 16, left: "50%",
              transform: "translateX(-50%)",
              zIndex: 40,
              textAlign: "center",
              background: "rgba(10, 10, 20, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 24,
              padding: "12px 32px",
              whiteSpace: "nowrap",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}>
              <div style={{ fontSize: 12, color: tierInfo.color, fontWeight: 800, letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>
                {tierInfo.label}
              </div>
              <div style={{ fontSize: 42, fontWeight: 900, color: "white", lineHeight: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                {problem.question} = ?
              </div>
            </div>
          )}

          {gameState === "PLAYING" && (
            <div style={{
              position: "absolute", top: 16, right: 16,
              zIndex: 40, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end",
            }}>
              <div style={{
                background: "rgba(10, 10, 20, 0.6)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(250,204,21,0.5)",
                borderRadius: 20, padding: "6px 14px",
                fontSize: 16, fontWeight: 800, color: "#fde047",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}>
                🪙 {coins}
              </div>
              <div style={{
                background: "rgba(10, 10, 20, 0.6)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(167,139,250,0.5)",
                borderRadius: 20, padding: "6px 14px",
                fontSize: 18, fontWeight: 900, color: "#ddd6fe",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}>
                {score.toLocaleString()}
              </div>
              {combo >= 2 && (
                <div style={{
                  background: "linear-gradient(90deg, #f97316, #facc15)",
                  borderRadius: 20, padding: "4px 14px",
                  fontSize: 14, fontWeight: 900, color: "white",
                  animation: "pulseMultiplier 0.5s ease-in-out infinite alternate",
                  boxShadow: "0 0 15px rgba(249,115,22,0.6)"
                }}>
                  🔥 ×{combo}
                </div>
              )}
            </div>
          )}

          {gameState === "PLAYING" && (
            <div style={{
              position: "absolute", bottom: 16, left: 16,
              zIndex: 40,
              background: "rgba(10, 10, 20, 0.6)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12, padding: "6px 12px",
              fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 800, letterSpacing: 1
            }}>
              MACH {getSpeed(score).toFixed(2)}
            </div>
          )}

          {/* CONTROLS Hint */}
          {gameState === "PLAYING" && (
            <div style={{
              position: "absolute", bottom: 16, right: 16,
              zIndex: 40, display: "flex", gap: 8,
            }}>
              {["◀", "▶"].map((arrow, i) => (
                <button key={i}
                  onPointerDown={() => triggerLaneChange(i === 0 ? "LEFT" : "RIGHT")}
                  style={{
                    width: 48, height: 48,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white", fontSize: 20, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                  }}
                >
                  {arrow}
                </button>
              ))}
            </div>
          )}

          {/* ── START MENU (Glassmorphism) ── */}
          {gameState === "START" && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 100,
              background: "rgba(5, 5, 15, 0.55)",
              backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                background: "linear-gradient(145deg, rgba(30, 30, 50, 0.8), rgba(15, 15, 25, 0.9))",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 32, padding: "40px",
                textAlign: "center", maxWidth: "85%",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 20
              }}>
                <div style={{ fontSize: 64, animation: "floatOrb 3s infinite ease-in-out" }}>🎮</div>
                <div style={{
                  fontSize: 36, fontWeight: 900,
                  background: theme.gradientText,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  letterSpacing: 2,
                }}>{title}</div>
                <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: 0, fontSize: 16, fontWeight: 500 }}>
                  {description}
                </p>
                <div style={{ display: "flex", gap: 10, background: "rgba(255,255,255,0.05)", padding: 6, borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                  {(["easy", "medium", "hard"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      style={{
                        padding: "8px 16px", borderRadius: 16, border: "none", cursor: "pointer",
                        fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1,
                        background: difficulty === d ? "rgba(255,255,255,0.15)" : "transparent",
                        color: difficulty === d 
                          ? d === "easy" ? "#34d399" : d === "hard" ? "#f87171" : "#fbbf24"
                          : "rgba(255,255,255,0.4)",
                        transition: "all 0.2s",
                        boxShadow: difficulty === d ? "0 4px 12px rgba(0,0,0,0.2)" : "none"
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <button onClick={startGame} style={{
                  marginTop: 10,
                  padding: "16px 48px",
                  fontSize: 22, fontWeight: 900,
                  borderRadius: 50,
                  border: "none",
                  background: theme.buttonGradient,
                  color: "white",
                  cursor: "pointer",
                  letterSpacing: 2,
                  boxShadow: "0 10px 25px rgba(124,58,237,0.4), inset 0 2px 0 rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Start Game
                </button>
              </div>
            </div>
          )}

          {/* ── GAMEOVER MENU (Glassmorphism) ── */}
          {gameState === "GAMEOVER" && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 100,
              background: "rgba(20, 5, 5, 0.7)",
              backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                background: "linear-gradient(145deg, rgba(50, 20, 20, 0.8), rgba(20, 10, 10, 0.9))",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 32, padding: "40px",
                textAlign: "center", width: "85%",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 16
              }}>
                <div style={{ fontSize: 56, animation: "shake 0.5s ease-in-out" }}>💥</div>
                <div style={{
                  fontSize: 40, fontWeight: 900,
                  color: "#fca5a5", letterSpacing: 2,
                  textShadow: "0 0 15px rgba(239, 68, 68, 0.8)"
                }}>CRASHED!</div>
                
                <div style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 24, padding: "24px", width: "100%",
                  display: "flex", flexDirection: "column", gap: 12,
                }}>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, letterSpacing: 3, fontWeight: 700 }}>FINAL SCORE</div>
                  <div style={{ color: "white", fontSize: 56, fontWeight: 900, lineHeight: 1 }}>{score.toLocaleString()}</div>
                  
                  <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 10 }}>
                    <div style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", padding: "10px 20px", borderRadius: 16 }}>
                      <div style={{ color: "#facc15", fontSize: 24, fontWeight: 900 }}>🪙 {coins}</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, marginTop: 4 }}>COINS</div>
                    </div>
                    <div style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", padding: "10px 20px", borderRadius: 16 }}>
                      <div style={{ color: "#c084fc", fontSize: 24, fontWeight: 900 }}>🔥 {combo}</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, marginTop: 4 }}>MAX COMBO</div>
                    </div>
                  </div>
                </div>

                {score >= highScore && score > 0 && (
                  <div style={{ color: "#facc15", fontWeight: 900, fontSize: 16, animation: "pulseMultiplier 1s infinite alternate" }}>🏆 NEW HIGH SCORE!</div>
                )}
                
                <button onClick={startGame} style={{
                  marginTop: 10,
                  padding: "16px 48px",
                  fontSize: 22, fontWeight: 900,
                  borderRadius: 50,
                  border: "none",
                  background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                  color: "white",
                  cursor: "pointer",
                  letterSpacing: 2,
                  boxShadow: "0 10px 25px rgba(236,72,153,0.4), inset 0 2px 0 rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes playerBob {
          from { transform: translateY(0px); }
          to   { transform: translateY(-8px); }
        }
        @keyframes pulseMultiplier {
          from { transform: scale(1); filter: brightness(1); }
          to   { transform: scale(1.1); filter: brightness(1.2); }
        }
        @keyframes floatOrb {
          from { background-position: 30% 30%; }
          to   { background-position: 70% 70%; }
        }
        @keyframes flicker {
          from { opacity: 0.6; height: 30px; }
          to   { opacity: 1; height: 45px; }
        }
        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(0.8); }
          to   { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes shake {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(0px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(2px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
