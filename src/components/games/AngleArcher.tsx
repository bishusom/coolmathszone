"use client";
import React, { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import { useUnlocks } from "@/hooks/useUnlocks";
import { useCursorAvatar } from "@/hooks/useCursorAvatar";
import CursorAvatarOverlay from "@/components/games/CursorAvatarOverlay";

/**
 * Angle Archer: A target-hitting game to master angles and degrees.
 * Players set the launch angle to hit targets at varying distances.
 */
export default function AngleArcher() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();
  const { activeSkinEmoji } = useUnlocks();
  const { bindCursorAvatar, pointerPosition, showPointerSkin } = useCursorAvatar();

  // -- Game State --
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "GAMEOVER" | "SUCCESS">("START");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);

  // -- Mechanics State --
  const [angle, setAngle] = useState(45); // Degrees (0-90)
  const [isFlying, setIsFlying] = useState(false);
  const [arrow, setArrow] = useState({ x: 5, y: 15, vx: 0, vy: 0, path: [] as {x: number, y: number}[] });
  const [target, setTarget] = useState({ x: 80, y: 15, size: 10 });
  const [wind, setWind] = useState(0); // Horizontal acceleration
  const [feedback, setFeedback] = useState<string | null>(null);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // -- Constants --
  const G = 0.06; // Reduced Gravity for better range
  const V0 = 3.5; // Increased Initial velocity to reach distance 90+
  const GROUND_Y = 15;

  const DIFFICULTIES = {
    easy: { targetSize: 12, windMax: 0 },
    medium: { targetSize: 8, windMax: 0.015 },
    hard: { targetSize: 6, windMax: 0.04 },
  };

  const currentDiff = DIFFICULTIES[difficulty];

  // -- Logic --
  const generateTarget = () => {
    const tx = 50 + Math.random() * 40; // X: 50-90
    const ty = difficulty === "easy" ? GROUND_Y : GROUND_Y + Math.random() * 40; // Y: Ground or elevated
    const w = (Math.random() - 0.5) * 2 * currentDiff.windMax;
    setTarget({ x: tx, y: ty, size: currentDiff.targetSize });
    setWind(w);
  };

  const startGame = () => {
    setGameState("PLAYING");
    setScore(0);
    setCoins(0);
    trackStart({ difficulty });
    resetAttempt();
    generateTarget();
  };

  const resetAttempt = () => {
    setArrow({ x: 5, y: GROUND_Y, vx: 0, vy: 0, path: [] });
    setIsFlying(false);
    setFeedback(null);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const shoot = () => {
    if (isFlying || gameState !== "PLAYING") return;
    
    const angleRad = (angle * Math.PI) / 180;
    const vx = V0 * Math.cos(angleRad);
    const vy = V0 * Math.sin(angleRad);

    setIsFlying(true);
    setArrow({ x: 5, y: GROUND_Y, vx, vy, path: [{ x: 5, y: GROUND_Y }] });
    startTimeRef.current = 0;

    const animate = (time: number) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = time;
      }
      const t = (time - startTimeRef.current) / 16;
      
      // Projectile Position with Wind
      const nextX = 5 + vx * t + 0.5 * wind * t * t;
      const nextY = GROUND_Y + vy * t - 0.5 * G * t * t;

      // Collision Detection (Circle vs Circle simplified)
      const dx = nextX - target.x;
      const dy = nextY - target.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < target.size / 2) {
        setArrow(prev => ({ ...prev, x: nextX, y: nextY }));
        handleHit();
        return;
      }

      // Ground / Boundary Check
      if (nextY < -5 || nextX > 105 || (nextY < GROUND_Y - 2 && nextX > 10)) {
        handleMiss();
        return;
      }

      setArrow(prev => ({
        ...prev,
        x: nextX,
        y: nextY,
        path: [...prev.path, { x: nextX, y: nextY }].slice(-20)
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const handleHit = () => {
    setFeedback("🏹 BULLSEYE! +100");
    setScore(s => s + 100);
    setCoins(c => c + 5);
    triggerPrompt();
    trackWin({ score: score + 100, coins: coins + 5, difficulty });
    setIsFlying(false);
    setTimeout(() => {
      resetAttempt();
      generateTarget();
    }, 1500);
  };

  const handleMiss = () => {
    setFeedback(arrow.x < target.x ? "Short! Try higher angle." : "Long! Try lower angle.");
    trackGameOver({ score, coins, difficulty, reason: "miss" });
    updateProgress(coins, Math.floor(score / 100));
    setIsFlying(false);
    setTimeout(() => resetAttempt(), 2000);
  };

  const mapY = (y: number) => 100 - y;

  return (
    <div style={{ background: "rgba(10,10,25,0.85)", backdropFilter: "blur(20px)", borderRadius: 32, padding: 32, border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>Middle School Geometry</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>Angle Archer</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#22d3ee" }}>Skin {activeSkinEmoji}</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#facc15" }}>🪙 {coins}</div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>{score.toLocaleString()}</div>
        </div>
      </div>

      {gameState === "START" ? (
        <div style={{ height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <div style={{ fontSize: 80, animation: "float 3s infinite ease-in-out" }}>{activeSkinEmoji}</div>
          <p style={{ textAlign: "center", maxWidth: 320, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
            Set your launch angle to hit the target. Watch out for <b>wind</b> in Hard mode!
          </p>
          <div style={{ display: "flex", gap: 12, background: "rgba(0,0,0,0.2)", padding: 6, borderRadius: 20 }}>
            {(["easy", "medium", "hard"] as const).map(d => (
              <button key={d} onClick={() => setDifficulty(d)} style={{ padding: "8px 16px", borderRadius: 16, border: "none", background: difficulty === d ? "rgba(255,255,255,0.2)" : "transparent", color: difficulty === d ? "#34d399" : "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: 800, textTransform: "uppercase" }}>{d}</button>
            ))}
          </div>
          <button onClick={startGame} style={{ padding: "16px 48px", fontSize: 18, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg, #34d399, #10b981)", color: "white", cursor: "pointer", letterSpacing: 1 }}>START ARCHERY</button>
        </div>
      ) : (
        <>
          <div
            {...bindCursorAvatar}
            style={{
              position: "relative",
              background: "linear-gradient(180deg, #0f172a, #1e1b4b)",
              borderRadius: 24,
              overflow: "hidden",
              height: 420,
              border: "2px solid rgba(255,255,255,0.1)",
              cursor: showPointerSkin ? "none" : "default",
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              {/* Background Stars */}
              {[...Array(30)].map((_, i) => (
                <circle key={i} cx={(i * 13 + 7) % 100} cy={(i * 17 + 3) % 100} r="0.3" fill="white" opacity="0.3" />
              ))}

              {/* Floor */}
              <rect x="0" y={mapY(GROUND_Y)} width="100%" height="2" fill="rgba(255,255,255,0.1)" />

              {/* Target */}
              <circle cx={target.x} cy={mapY(target.y)} r={target.size / 2} fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,1" />
              <circle cx={target.x} cy={mapY(target.y)} r={target.size / 4} fill="#ef4444" opacity="0.6" />
              <text x={target.x} y={mapY(target.y + target.size / 2 + 5)} fontSize="3.5" textAnchor="middle" fill="#ef4444" fontWeight="900">TARGET</text>

              {/* Arrow Path (Tail) */}
              <polyline 
                points={arrow.path.map(p => `${p.x},${mapY(p.y)}`).join(" ")}
                fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"
              />

              {/* The Arrow */}
              <g transform={`translate(${arrow.x}, ${mapY(arrow.y)}) rotate(${isFlying ? -Math.atan2(arrow.vy, arrow.vx) * 180 / Math.PI : -angle})`}>
                <line x1="-3" y1="0" x2="3" y2="0" stroke="white" strokeWidth="0.8" />
                <path d="M1, -1 L3, 0 L1, 1" fill="white" />
                <path d="M-3, -1 L-1, 0 L-3, 1" fill="rgba(255,255,255,0.4)" />
              </g>

              {/* The Archer / Bow */}
              <circle cx="5" cy={mapY(GROUND_Y)} r="4.2" fill="#34d399" opacity="0.18" />
              <text x="5" y={mapY(GROUND_Y) + 1.5} fontSize="7" textAnchor="middle" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.7))" }}>
                {activeSkinEmoji}
              </text>
              <line 
                x1="5" y1={mapY(GROUND_Y)} 
                x2={5 + 10 * Math.cos(angle * Math.PI / 180)} 
                y2={mapY(GROUND_Y + 10 * Math.sin(angle * Math.PI / 180))} 
                stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.5" strokeDasharray="2,1"
              />

              {/* Wind Indicator */}
              {difficulty === "hard" && (
                <g transform="translate(50, 10)">
                  <text x="0" y="0" fontSize="3" textAnchor="middle" fill="white" opacity="0.6">WIND: {wind > 0 ? ">>>" : "<<<"}</text>
                  <line x1={-wind * 200} y1="3" x2={wind * 200} y2="3" stroke="#facc15" strokeWidth="1" />
                </g>
              )}
            </svg>

            {/* Feedback */}
            {feedback && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: feedback.includes("BULLSEYE") ? "#34d399" : "#f87171" }}>{feedback}</div>
              </div>
            )}

            <CursorAvatarOverlay
              activeSkinEmoji={activeSkinEmoji}
              pointerPosition={pointerPosition}
              visible={showPointerSkin}
            />
          </div>

          <div style={{ marginTop: 24, padding: 24, background: "rgba(255,255,255,0.05)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#34d399", letterSpacing: 1 }}>LAUNCH ANGLE (θ)</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: "white" }}>{angle}°</span>
            </div>
            
            <input 
              type="range" min="0" max="90" step="1" value={angle} 
              onChange={(e) => setAngle(parseInt(e.target.value))}
              disabled={isFlying}
              style={{ width: "100%", accentColor: "#34d399", height: 8 }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>
              <span>0° HORIZONTAL</span>
              <span>45° MAX DISTANCE</span>
              <span>90° VERTICAL</span>
            </div>

            <button 
              onClick={shoot} 
              disabled={isFlying}
              style={{
                width: "100%", marginTop: 24, padding: "16px", borderRadius: 16, border: "none",
                background: isFlying ? "rgba(255,255,255,0.1)" : "linear-gradient(90deg, #34d399, #10b981)",
                color: "white", fontSize: 18, fontWeight: 900, cursor: isFlying ? "default" : "pointer",
                boxShadow: isFlying ? "none" : "0 8px 25px rgba(16, 185, 129, 0.3)",
                transition: "all 0.2s"
              }}
            >
              {isFlying ? `${activeSkinEmoji} IN FLIGHT...` : `RELEASE SHOT ${activeSkinEmoji}`}
            </button>
          </div>
        </>
      )}
      <style>{`
        @keyframes float { from { transform: translateY(0); } to { transform: translateY(-10px); } }
      `}</style>
    </div>
  );
}
