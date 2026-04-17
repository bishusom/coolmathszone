"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import GameScoreSaveBadge from "@/components/games/GameScoreSaveBadge";
import { useUnlocks } from "@/hooks/useUnlocks";
import { useCursorAvatar } from "@/hooks/useCursorAvatar";
import CursorAvatarOverlay from "@/components/games/CursorAvatarOverlay";

/**
 * Binary Bridge: Advanced High-School Edition.
 * Features: Decimal, Hex, Bitwise Logic, and Two's Complement.
 */
export default function BinaryBridge() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();
  const { activeSkinEmoji } = useUnlocks();
  const { bindCursorAvatar, pointerPosition, showPointerSkin } = useCursorAvatar();

  // -- Game State --
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "GAMEOVER" | "SUCCESS">("START");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);

  // -- Toggles (Hard Mode Extensions) --
  const [useHex, setUseHex] = useState(false);
  const [useLogic, setUseLogic] = useState(false);
  const [useSigned, setUseSigned] = useState(false);

  // -- Mechanics State --
  const [bits, setBits] = useState<number[]>(new Array(8).fill(0));
  const [target, setTarget] = useState(0);
  const [logicOp, setLogicOp] = useState<{ a: number; b: number; op: string } | null>(null);
  
  const [isCrossing, setIsCrossing] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [charPos, setCharPos] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // -- Calculation --
  const calculateCurrentVal = (bitArray: number[]) => {
    if (useSigned) {
      // Two's Complement: MSB is -128
      let sum = bitArray[0] === 1 ? -128 : 0;
      for (let i = 1; i < 8; i++) {
        sum += bitArray[i] * Math.pow(2, 7 - i);
      }
      return sum;
    } else {
      return bitArray.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
    }
  };

  const currentVal = calculateCurrentVal(bits);

  // -- Logic Generation --
  const generateTarget = () => {
    let t = 0;
    let opData = null;

    if (useLogic) {
      // Bitwise Operation Mode
      const a = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const ops = ["AND", "OR", "XOR"];
      const op = ops[Math.floor(Math.random() * ops.length)];
      
      if (op === "AND") t = a & b;
      else if (op === "OR") t = a | b;
      else t = a ^ b;

      // Wrap for signed if needed
      if (useSigned && t > 127) t -= 256;

      opData = { a, b, op };
    } else {
      // Standard or Hex Mode
      if (useSigned) {
        t = Math.floor(Math.random() * 256) - 128;
      } else {
        t = Math.floor(Math.random() * 255) + 1;
      }
    }

    setTarget(t);
    setLogicOp(opData);
    setBits(new Array(8).fill(0));
  };

  const startGame = () => {
    setGameState("PLAYING");
    setScore(0);
    setCoins(0);
    setFeedback(null);
    trackStart({
      use_hex: useHex ? 1 : 0,
      use_logic: useLogic ? 1 : 0,
      use_signed: useSigned ? 1 : 0,
    });
    generateTarget();
  };

  const toggleBit = (idx: number) => {
    if (isCrossing || isFalling || gameState !== "PLAYING") return;
    const newBits = [...bits];
    newBits[idx] = newBits[idx] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const checkSolution = () => {
    if (currentVal === target) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleSuccess = () => {
    setIsCrossing(true);
    setFeedback("💎 CODE COMPILED! ACCESS GRANTED.");
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setCharPos(p);
      if (p >= 100) {
        clearInterval(interval);
        setScore(s => s + 250);
        setCoins(c => c + 15);
        triggerPrompt();
        trackWin({ score: score + 250, coins: coins + 15 });
        setIsCrossing(false);
        setCharPos(0);
        generateTarget();
        setFeedback(null);
      }
    }, 40);
  };

  const handleFailure = () => {
    setIsFalling(true);
    setFeedback("⚠️ STACK OVERFLOW! SYSTEM COLLAPSE.");
    trackGameOver({ score, coins, reason: "wrong_solution" });
    updateProgress(coins, Math.floor(score / 100));
    setTimeout(() => {
      setGameState("GAMEOVER");
      setIsFalling(false);
    }, 2000);
  };

  const toBinaryString = (val: number) => (val >>> 0).toString(2).padStart(8, '0');
  const toHexString = (val: number) => {
    const hex = (val >>> 0).toString(16).toUpperCase().padStart(2, '0');
    return `0x${hex}`;
  };

  return (
    <div style={{ background: "rgba(10,10,25,0.95)", backdropFilter: "blur(20px)", borderRadius: 32, padding: 32, border: "2px solid rgba(167, 139, 250, 0.2)", color: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: "#a78bfa", fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>High School / Advanced CS</div>
          <div style={{ fontSize: 28, fontWeight: 900, textShadow: "0 0 10px rgba(167, 139, 250, 0.5)" }}>Binary Bridge v2.0</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#22d3ee" }}>Skin {activeSkinEmoji}</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#facc15" }}>🪙 {coins}</div>
          <div style={{ fontSize: 20, fontWeight: 900 }}>{score.toLocaleString()}</div>
        </div>
      </div>

      {gameState === "START" || gameState === "GAMEOVER" ? (
        <div style={{ minHeight: 460, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ fontSize: 80, animation: "float 3s infinite ease-in-out" }}>{gameState === "START" ? activeSkinEmoji : "💀"}</div>
          
          <div style={{ textAlign: "center", maxWidth: 450 }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>{gameState === "START" ? "System Initialization" : "Critical Failure"}</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontSize: 14 }}>
              {gameState === "START" 
                ? "The bridge requires valid binary clusters. Configure your technical parameters below and begin the crossing."
                : "Your code failed to stabilize the bridge. Sequence terminated."}
            </p>
          </div>

          {gameState === "GAMEOVER" && <GameScoreSaveBadge className="mt-1" />}

          {/* Advanced Toggles */}
          <div style={{ background: "rgba(0,0,0,0.3)", padding: 20, borderRadius: 24, width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { id: 'hex', label: 'Hex Mode', state: useHex, set: setUseHex, icon: '📜' },
              { id: 'logic', label: 'Logic Ops', state: useLogic, set: setUseLogic, icon: '🧩' },
              { id: 'signed', label: 'Signed (2\'s Comp)', state: useSigned, set: setUseSigned, icon: '⚖️' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => t.set(!t.state)}
                style={{
                  padding: "10px 16px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)",
                  background: t.state ? "rgba(167, 139, 250, 0.2)" : "rgba(255,255,255,0.05)",
                  color: t.state ? "#a78bfa" : "white",
                  cursor: "pointer", fontSize: 12, fontWeight: 800,
                  display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s"
                }}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          <button onClick={startGame} style={{ padding: "18px 60px", fontSize: 18, fontWeight: 900, borderRadius: 50, border: "none", background: "linear-gradient(90deg, #a78bfa, #8b5cf6)", color: "white", cursor: "pointer", letterSpacing: 2, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}>
            {gameState === "START" ? "ACCESS ARCHIVE" : "RETRY SEQUENCE"}
          </button>
        </div>
      ) : (
        <>
          {/* Visual Abyss Area */}
          <div
            {...bindCursorAvatar}
            style={{
              position: "relative",
              background: "#050515",
              borderRadius: 24,
              overflow: "hidden",
              height: 260,
              border: "2px solid rgba(255,255,255,0.05)",
              marginBottom: 32,
              cursor: showPointerSkin ? "none" : "default",
            }}
          >
             {/* Neon Grid Background */}
             <div style={{ position: "absolute", inset: 0, opacity: 0.1, background: "linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
             
             <svg viewBox="0 0 100 50" style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}>
                <defs>
                  <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "rgba(167,139,250,0.6)" }} />
                    <stop offset="100%" style={{ stopColor: "rgba(139,92,246,0.6)" }} />
                  </linearGradient>
                </defs>
                
                {/* Visual Bridge */}
                <rect x="0" y="35" width="100" height="4" fill="rgba(255,255,255,0.05)" />
                {!isFalling && (
                  <rect 
                    x="0" y="35" width={isCrossing ? "100" : "33"} height="4" 
                    fill="url(#bridgeGrad)" 
                    style={{ filter: "drop-shadow(0 0 15px rgba(167,139,250,0.6))" }}
                  />
                )}

                {/* Character */}
                <g transform={`translate(${isCrossing ? charPos : 15}, ${isFalling ? 35 + charPos/2 : 28})`}>
                  <text x="0" y="0" fontSize="10" textAnchor="middle" style={{ filter: "drop-shadow(0 0 10px #a78bfa)" }}>{activeSkinEmoji}</text>
                  {isFalling && <text x="0" y="-8" fontSize="4" fill="#ef4444" textAnchor="middle" fontWeight="900">CORE DUMP!</text>}
                </g>

                {/* Challenge Display */}
                <g transform="translate(80, 20)">
                  <circle r="14" fill="rgba(167,139,250,0.05)" stroke="#a78bfa" strokeWidth="0.5" strokeDasharray="2,1" />
                  <text y="-5" fontSize="3" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontWeight="800">ENCRYPTED GOAL</text>
                  <text y="6" fontSize="10" textAnchor="middle" fill="#facc15" fontWeight="900" style={{ filter: "drop-shadow(0 0 12px rgba(250,204,21,0.6))" }}>
                    {useHex ? toHexString(target) : target}
                  </text>
                </g>

                {/* Bitwise Hint (if logic mode) */}
                {useLogic && logicOp && (
                  <g transform="translate(45, 15)">
                    <rect x="-30" y="-5" width="60" height="12" rx="4" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.1)" />
                    <text fontSize="4" textAnchor="middle" fill="#34d399" fontWeight="900">
                      {toBinaryString(logicOp.a)} {logicOp.op} {toBinaryString(logicOp.b)}
                    </text>
                    <text y="10" fontSize="2.5" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontWeight="700">BITWISE OPERATOR ACTIVE</text>
                  </g>
                )}
             </svg>

             {feedback && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 10 }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: currentVal === target ? "#34d399" : "#f87171", textTransform: "uppercase", letterSpacing: 4 }}>{feedback}</div>
                </div>
             )}

             <CursorAvatarOverlay
               activeSkinEmoji={activeSkinEmoji}
               pointerPosition={pointerPosition}
               visible={showPointerSkin}
             />
          </div>

          {/* Programming Terminal */}
          <div style={{ padding: 24, background: "rgba(255,255,255,0.02)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 900, letterSpacing: 3, marginBottom: 4 }}>RUNTIME VALUE</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: currentVal === target ? "#34d399" : "white" }}>
                  {useHex ? toHexString(currentVal) : currentVal}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 900, letterSpacing: 3, marginBottom: 4 }}>GOAL OFFSET</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#facc15" }}>
                  {target - currentVal > 0 ? `+${target - currentVal}` : target - currentVal}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              {bits.map((bit, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 9, color: i === 0 && useSigned ? "#f87171" : "rgba(255,255,255,0.3)", fontWeight: 900 }}>
                    {i === 0 && useSigned ? "-128" : Math.pow(2, 7 - i)}
                  </span>
                  <button
                    onClick={() => toggleBit(i)}
                    style={{
                      width: "100%", aspectRatio: "1/1.3", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)",
                      background: bit === 1 ? "linear-gradient(135deg, #a78bfa, #8b5cf6)" : "rgba(255,255,255,0.03)",
                      color: bit === 1 ? "white" : "rgba(255,255,255,0.15)",
                      fontSize: 22, fontWeight: 900, cursor: "pointer", transition: "all 0.15s",
                      boxShadow: bit === 1 ? "0 0 15px rgba(167, 139, 250, 0.4)" : "none"
                    }}
                  >
                    {bit}
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={checkSolution}
              disabled={isCrossing || isFalling}
              style={{
                width: "100%", marginTop: 24, padding: "18px", borderRadius: 16, border: "none",
                background: "linear-gradient(90deg, #a78bfa, #8b5cf6)",
                color: "white", fontSize: 18, fontWeight: 900, cursor: "pointer",
                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)", transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              COMMIT SEQUENCE
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
