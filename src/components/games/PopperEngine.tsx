"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import { useUnlocks } from "@/hooks/useUnlocks";
import { useCursorAvatar } from "@/hooks/useCursorAvatar";
import CursorAvatarOverlay from "@/components/games/CursorAvatarOverlay";

interface PopperParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface PopperBubble {
  id: string;
  val: string | number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export interface PopperProblem {
  question: React.ReactNode;
  isCorrect: (val: string | number) => boolean;
  options: (string | number)[];
}

export interface PopperEngineProps {
  title: React.ReactNode;
  description: React.ReactNode;
  generateProblem: (score: number) => PopperProblem;
  getTierInfo: (score: number) => { label: string; color: string };
  colors?: {
    gradientText?: string;
    buttonGradient?: string;
    bubbleGradient?: string;
  };
}

/**
 * PopperEngine: A 2D interaction engine for "Click-to-Pop" games.
 * Optimized for speed and accuracy. No Rocket mascot to maximize space.
 */
export function PopperEngine({ title, description, generateProblem, getTierInfo, colors }: PopperEngineProps) {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();
  const { activeSkinEmoji } = useUnlocks();
  
  const defaultColors = {
    gradientText: "linear-gradient(90deg, #facc15, #fb923c, #f472b6)",
    buttonGradient: "linear-gradient(90deg, #facc15, #fb923c)",
    bubbleGradient: "radial-gradient(circle at 30% 30%, #ffffff 0%, #a78bfa 40%, rgba(0,0,0,0.8) 100%)",
  };
  const theme = { ...defaultColors, ...colors };

  const [gameState, setGameState] = useState<"START" | "PLAYING" | "GAMEOVER">("START");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [bubbles, setBubbles] = useState<PopperBubble[]>([]);
  const [particles, setParticles] = useState<PopperParticle[]>([]);
  const [problem, setProblem] = useState<PopperProblem>(() => generateProblem(0));
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const { bindCursorAvatar, pointerPosition, showPointerSkin, setPointerPosition } = useCursorAvatar();

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);
  const coinsRef = useRef(coins);
  const problemRef = useRef(problem);
  const rafRef = useRef<number | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);

  gameStateRef.current = gameState;
  scoreRef.current = score;
  coinsRef.current = coins;
  problemRef.current = problem;

  // -- Mechanics --
  const getSpeed = (s: number) => {
    const base = 0.9;
    return base + Math.min(s / 20000, 2.5);
  };

  const spawnParticles = (x: number, y: number, color: string) => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: `${Date.now()}_${i}`,
      x, y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      color,
      size: Math.random() * 8 + 4,
      life: 1,
    }));
    setParticles(p => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles(p => p.filter(pt => !newParticles.find(n => n.id === pt.id)));
    }, 600);
  };

  const spawnFlash = (color: string) => {
    setFlashColor(color);
    setTimeout(() => setFlashColor(null), 200);
  };

  const handlePop = (bubbleId: string, val: string | number, x: number, y: number) => {
    if (gameStateRef.current !== "PLAYING") return;
    
    const isCorrect = problemRef.current.isCorrect(val);
    
    if (isCorrect) {
      spawnFlash("rgba(52, 211, 153, 0.3)");
      spawnParticles(x, y, "#34d399");
      const gain = 150;
      setScore(s => s + gain);
      setCoins(c => c + 2);
      triggerPrompt();
      trackWin({ score: scoreRef.current + gain, coins: coinsRef.current + 2 });
      const nextProb = generateProblem(scoreRef.current + gain);
      setProblem(nextProb);
      problemRef.current = nextProb;
      // Clear all current bubbles to refresh for the new problem
      setBubbles([]);
    } else {
      spawnFlash("rgba(239, 68, 68, 0.4)");
      spawnParticles(x, y, "#ef4444");
      setLives(l => {
        const next = l - 1;
        if (next <= 0) {
          endGame();
        }
        return next;
      });
      setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    }
  };

  const endGame = () => {
    gameStateRef.current = "GAMEOVER";
    setGameState("GAMEOVER");
    trackGameOver({ score: scoreRef.current, coins: coinsRef.current, reason: "out_of_lives" });
    updateProgress(coins, Math.floor(score / 100));
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
  };

  const spawnBubbles = useCallback(() => {
    if (gameStateRef.current !== "PLAYING") return;
    const prob = problemRef.current;
    
    // Spawn 3 bubbles (one correct, two wrong)
    const newBatch = prob.options.map((val, i) => ({
      id: `${Date.now()}_${i}`,
      val,
      x: 20 + i * 30 + (Math.random() - 0.5) * 10, // Distribute along X
      y: 110, // Start below screen
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.8 + 0.5) * getSpeed(scoreRef.current),
      size: 70 + Math.random() * 30,
      color: ["#60a5fa", "#34d399", "#fb923c", "#f472b6"][i % 4],
    }));
    setBubbles(prev => [...prev, ...newBatch]);
  }, []);

  const gameLoop = useCallback(function loop() {
    if (gameStateRef.current !== "PLAYING") return;

    setBubbles(prev => {
      const updated = prev.map(b => ({
        ...b,
        x: b.x + b.vx,
        y: b.y + b.vy,
      }));
      // Remove off-screen bubbles
      return updated.filter(b => b.y > -20);
    });

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setCoins(0);
    setBubbles([]);
    setParticles([]);
    setPointerPosition({ x: 50, y: 80 });
    const p = generateProblem(0);
    setProblem(p);
    problemRef.current = p;
    gameStateRef.current = "PLAYING";
    setGameState("PLAYING");
    trackStart();

    spawnBubbles();
    spawnRef.current = setInterval(() => {
      if (gameStateRef.current === "PLAYING") spawnBubbles();
    }, 3000);

    rafRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, []);

  const tierInfo = getTierInfo(score);

  return (
    <div style={{ background: "#05050f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 600 }}>
        
        {/* Header HUD */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, background: theme.gradientText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "uppercase", letterSpacing: 4 }}>{title}</h1>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10 }}>
            <div style={{ color: "white", fontWeight: 800 }}>Skin {activeSkinEmoji}</div>
            <div style={{ color: "white", fontWeight: 800 }}>🪙 {coins}</div>
            <div style={{ color: "white", fontWeight: 900, fontSize: 20 }}>{score.toLocaleString()}</div>
            <div style={{ color: "#ef4444", fontWeight: 800 }}>{"❤️".repeat(lives)}</div>
          </div>
        </div>

        {/* Game Arena */}
        <div
          {...bindCursorAvatar}
          style={{
            position: "relative",
            width: "100%",
            height: 600,
            borderRadius: 32,
            overflow: "hidden",
            background: "radial-gradient(circle at 50% 100%, #1e1b4b 0%, #05050f 80%)",
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 50px rgba(124,58,237,0.2)",
            cursor: gameState === "PLAYING" && showPointerSkin ? "none" : "default",
          }}
        >
          {flashColor && <div style={{ position: "absolute", inset: 0, background: flashColor, zIndex: 50, pointerEvents: "none" }} />}
          
          {/* Target Problem */}
          {gameState === "PLAYING" && (
            <div style={{ position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)", zIndex: 40, textAlign: "center", background: "rgba(10,10,20,0.8)", backdropFilter: "blur(12px)", padding: "16px 40px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.2)" }}>
              <div style={{ color: tierInfo.color, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>{tierInfo.label}</div>
              <div style={{ color: "white", fontSize: 48, fontWeight: 900 }}>{problem.question} = ?</div>
            </div>
          )}

          {/* Bubbles */}
          {bubbles.map(b => (
            <div
              key={b.id}
              onPointerDown={(e) => {
                e.preventDefault();
                handlePop(b.id, b.val, b.x, b.y);
              }}
              style={{
                position: "absolute", left: `${b.x}%`, top: `${b.y}%`,
                width: b.size, height: b.size, borderRadius: "50%",
                background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${b.color} 40%, rgba(0,0,0,0.8) 100%)`,
                boxShadow: `0 0 20px ${b.color}80, inset -4px -4px 10px rgba(0,0,0,0.5)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: 24, fontWeight: 900, cursor: "pointer",
                transform: "translate(-50%, -50%)", transition: "transform 0.1s",
                zIndex: 30, border: "2px solid rgba(255,255,255,0.3)",
                userSelect: "none",
                touchAction: "none"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
            >
              {b.val}
            </div>
          ))}

          {/* Particles */}
          {particles.map(p => (
            <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, borderRadius: "50%", opacity: p.life, transform: "translate(-50%, -50%)", zIndex: 30, pointerEvents: "none", boxShadow: `0 0 10px ${p.color}` }} />
          ))}

          <CursorAvatarOverlay
            activeSkinEmoji={activeSkinEmoji}
            pointerPosition={pointerPosition}
            visible={gameState === "PLAYING" && showPointerSkin}
          />

          {/* UI Overlays */}
          {gameState === "START" && (
            <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(5,5,15,0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "rgba(30,30,50,0.9)", padding: 40, borderRadius: 32, textAlign: "center", maxWidth: "80%", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>{activeSkinEmoji}</div>
                <h2 style={{ fontSize: 32, fontWeight: 900, color: "white", marginBottom: 10 }}>{title}</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 24 }}>{description}</p>
                <button onClick={startGame} style={{ padding: "16px 48px", fontSize: 20, fontWeight: 900, borderRadius: 50, border: "none", background: theme.buttonGradient, color: "white", cursor: "pointer", letterSpacing: 1 }}>ACTIVATE GRID</button>
              </div>
            </div>
          )}

          {gameState === "GAMEOVER" && (
            <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "rgba(15,5,5,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "rgba(40,20,20,0.9)", padding: 40, borderRadius: 32, textAlign: "center", minWidth: 320, border: "1px solid rgba(239,68,68,0.3)" }}>
                <div style={{ fontSize: 60, marginBottom: 10 }}>💔</div>
                <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fca5a5", marginBottom: 20 }}>BURST!</h2>
                <div style={{ fontSize: 50, fontWeight: 900, color: "white", marginBottom: 8 }}>{score.toLocaleString()}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 32 }}>FINAL SCORE</div>
                <button onClick={startGame} style={{ padding: "16px 48px", fontSize: 20, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg, #ec4899, #ef4444)", color: "white", cursor: "pointer", letterSpacing: 1 }}>TRY AGAIN</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
