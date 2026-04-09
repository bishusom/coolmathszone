"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import { useUnlocks } from "@/hooks/useUnlocks";
import { useCursorAvatar } from "@/hooks/useCursorAvatar";
import CursorAvatarOverlay from "@/components/games/CursorAvatarOverlay";

/**
 * Slope Slider: A physics-based game to master 'y = mx + c'.
 * Players adjust the slope and intercept to launch a ship into a target zone.
 */
export default function SlopeSlider() {
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

  // -- Equation Parameters --
  const [m, setM] = useState(0.5); // Slope
  const [c, setC] = useState(20);  // Y-intercept (Y is inverted in SVG, so C is offset from bottom)

  // -- Simulation State --
  const [target, setTarget] = useState({ x: 80, y: 50, w: 15, h: 10 });
  const [ship, setShip] = useState({ x: 0, y: 20, v: 0, angle: 0, isAirborne: false });
  const [feedback, setFeedback] = useState<string | null>(null);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // -- Difficulty Configuration --
  const DIFFICULTIES = {
    easy: { targetWidth: 20, targetHeight: 15, gravity: 0.08, initialVel: 1.2 },
    medium: { targetWidth: 15, targetHeight: 10, gravity: 0.12, initialVel: 1.5 },
    hard: { targetWidth: 10, targetHeight: 8, gravity: 0.18, initialVel: 1.8 },
  };

  const currentDiff = DIFFICULTIES[difficulty];

  // -- Simulation Constants --
  const RAMP_END_X = 30;
  const GRAVITY = currentDiff.gravity;
  const LAUNCH_SPEED = currentDiff.initialVel;

  // -- Logic --
  const generateTarget = () => {
    const tx = 60 + Math.random() * 25; // X: 60 - 85
    const ty = 20 + Math.random() * 60; // Y: 20 - 80
    setTarget({ 
      x: tx, 
      y: ty, 
      w: currentDiff.targetWidth, 
      h: currentDiff.targetHeight 
    });
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
    setShip({ x: 0, y: c, v: 0, angle: 0, isAirborne: false });
    setFeedback(null);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const launch = () => {
    if (ship.isAirborne || gameState !== "PLAYING") return;
    
    // Initial State on Ramp Start (x=0)
    // We simulate the slide up the ramp first? No, let's just launch from x=0 for simplicity,
    // OR launch from the END of the ramp (RAMP_END_X).
    // Let's launch from RAMP_END_X.
    
    const startY = (m * RAMP_END_X) + c;
    const angleRad = Math.atan(m); 
    const vx = LAUNCH_SPEED * Math.cos(angleRad);
    const vy = LAUNCH_SPEED * Math.sin(angleRad);

    setShip({ x: RAMP_END_X, y: startY, v: 0, angle: angleRad, isAirborne: true });
    startTimeRef.current = 0;
    
    const animate = (time: number) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = time;
      }
      const t = (time - startTimeRef.current) / 16; // Approx frames
      
      const nextX = RAMP_END_X + vx * t;
      const nextY = startY + (vy * t) - (0.5 * GRAVITY * t * t); // SVG Y is up-positive here if we flip viewbox

      // Check for Landing
      if (nextX >= target.x && nextX <= target.x + target.w && 
          nextY >= target.y && nextY <= target.y + target.h) {
        setShip({ x: nextX, y: nextY, v: 0, angle: 0, isAirborne: false });
        handleSuccess();
        return;
      }

      // Check for Out of Bounds / Crash
      if (nextX > 110 || nextY < -10 || (nextY < 0 && nextX > RAMP_END_X)) {
        setShip({ x: nextX, y: nextY, v: 0, angle: 0, isAirborne: false });
        handleFail();
        return;
      }

      setShip(prev => ({ ...prev, x: nextX, y: nextY }));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const handleSuccess = () => {
    setFeedback("🎯 PERFECT LANDING!");
    setScore(s => s + 100);
    setCoins(c => c + 5);
    triggerPrompt();
    trackWin({ score: score + 100, coins: coins + 5, difficulty });
    setTimeout(() => {
      resetAttempt();
      generateTarget();
    }, 1500);
  };

  const handleFail = () => {
    setFeedback("💥 CRASHED! Try adjusting m or c.");
    trackGameOver({ score, coins, difficulty, reason: "crash" });
    updateProgress(coins, Math.floor(score / 100));
    setTimeout(() => resetAttempt(), 1500);
  };

  // Cleanup
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // -- Rendering Constants --
  // Viewbox is 0 0 100 100. (0,0) is bottom-left ideally. 
  // SVG default is top-left, so we'll transform or map.
  const mapY = (y: number) => 100 - y;

  return (
    <div style={{ background: "rgba(10,10,20,0.8)", backdropFilter: "blur(20px)", borderRadius: 32, padding: 32, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>High School Algebra</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "white" }}>Slope Slider</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#22d3ee" }}>Skin {activeSkinEmoji}</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#facc15" }}>🪙 {coins}</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "white" }}>{score.toLocaleString()}</div>
        </div>
      </div>

      {gameState === "START" ? (
        <div style={{ height: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ fontSize: 64 }}>{activeSkinEmoji}</div>
          <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: 300 }}>
            Adjust <b>m</b> (slope) and <b>c</b> (intercept) to land the jump!
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {(["easy", "medium", "hard"] as const).map(d => (
              <button key={d} onClick={() => setDifficulty(d)} style={{ padding: "8px 16px", borderRadius: 16, border: "none", background: difficulty === d ? "rgba(255,255,255,0.2)" : "transparent", color: difficulty === d ? "#facc15" : "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: 800, textTransform: "uppercase" }}>{d}</button>
            ))}
          </div>
          <button onClick={startGame} style={{ padding: "16px 48px", fontSize: 18, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg, #facc15, #fb923c)", color: "white", cursor: "pointer", textTransform: "uppercase" }}>Start Mission</button>
        </div>
      ) : (
        <>
          {/* Main Visual Area */}
          <div
            {...bindCursorAvatar}
            style={{
              position: "relative",
              background: "#050510",
              borderRadius: 24,
              overflow: "hidden",
              height: 400,
              border: "2px solid rgba(255,255,255,0.1)",
              cursor: showPointerSkin ? "none" : "default",
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              {/* Grid Lines */}
              {[...Array(11)].map((_, i) => (
                <line key={`v-${i}`} x1={i * 10} y1={0} x2={i * 10} y2={100} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              ))}
              {[...Array(11)].map((_, i) => (
                <line key={`h-${i}`} x1={0} y1={i * 10} x2={100} y2={i * 10} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              ))}
              <line x1={0} y1={100} x2={100} y2={100} stroke="#a78bfa" strokeWidth="2" />
              <line x1={0} y1={0} x2={0} y2={100} stroke="#a78bfa" strokeWidth="2" />

              {/* Target Zone */}
              <rect 
                x={target.x} y={mapY(target.y + target.h)} 
                width={target.w} height={target.h} 
                fill="rgba(52, 211, 153, 0.2)" 
                stroke="#34d399" strokeWidth="1" strokeDasharray="3,2"
              />
              <text x={target.x + target.w / 2} y={mapY(target.y + target.h / 2)} fontSize="4" textAnchor="middle" fill="#34d399" fontWeight="900">LAND HERE</text>

              {/* The Ramp (y = mx + c) */}
              <line 
                x1={0} y1={mapY(c)} 
                x2={RAMP_END_X} y2={mapY(m * RAMP_END_X + c)} 
                stroke="#facc15" strokeWidth="3" strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 5px #facc15)" }}
              />

              {/* The Ship */}
              <g transform={`translate(${ship.x}, ${mapY(ship.y)}) rotate(${-ship.angle * 180 / Math.PI})`}>
                <text x="-3" y="3" fontSize="8" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}>{activeSkinEmoji}</text>
                {ship.isAirborne && (
                  <path d="M-8,0 Q-12,5 -10,0 Q-12,-5 -8,0" fill="#f87171" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.2s" repeatCount="indefinite" />
                  </path>
                )}
              </g>

              {/* Trajectory Preview */}
              {!ship.isAirborne && (
                <path 
                  d={`M ${RAMP_END_X} ${mapY(m * RAMP_END_X + c)} Q 60 ${mapY(m * RAMP_END_X + c + 20)} 100 ${mapY(0)}`}
                  fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2,2"
                />
              )}
            </svg>

            {/* Feedback Overlay */}
            {feedback && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", zIndex: 10 }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: feedback.includes("PERFECT") ? "#34d399" : "#f87171", textShadow: "0 0 20px rgba(0,0,0,0.8)" }}>{feedback}</div>
              </div>
            )}

            <CursorAvatarOverlay
              activeSkinEmoji={activeSkinEmoji}
              pointerPosition={pointerPosition}
              visible={showPointerSkin}
            />
          </div>

          {/* Controls */}
          <div style={{ marginTop: 24, padding: 24, background: "rgba(255,255,255,0.05)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#facc15" }}>SLOPE (m)</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "white" }}>{m.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="-1" max="2" step="0.05" value={m} 
                  onChange={(e) => setM(parseFloat(e.target.value))}
                  disabled={ship.isAirborne}
                  style={{ width: "100%", accentColor: "#facc15" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#a78bfa" }}>INTERCEPT (c)</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "white" }}>{c.toFixed(0)}</span>
                </div>
                <input 
                  type="range" min="0" max="80" step="1" value={c} 
                  onChange={(e) => setC(parseFloat(e.target.value))}
                  disabled={ship.isAirborne}
                  style={{ width: "100%", accentColor: "#a78bfa" }}
                />
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: "center", background: "rgba(0,0,0,0.3)", padding: 12, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: "white", fontStyle: "italic", letterSpacing: 1 }}>
                y = <span style={{ color: "#facc15" }}>{m.toFixed(2)}</span>x + <span style={{ color: "#a78bfa" }}>{c.toFixed(0)}</span>
              </span>
            </div>

            <button 
              onClick={launch} 
              disabled={ship.isAirborne}
              style={{
                width: "100%", marginTop: 24, padding: "16px", borderRadius: 16, border: "none",
                background: ship.isAirborne ? "rgba(255,255,255,0.1)" : "linear-gradient(90deg, #8b5cf6, #d946ef)",
                color: "white", fontSize: 18, fontWeight: 900, cursor: ship.isAirborne ? "default" : "pointer",
                transition: "all 0.2s"
              }}
            >
              {ship.isAirborne ? `${activeSkinEmoji} FLYING...` : `LAUNCH SKIN ${activeSkinEmoji}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
