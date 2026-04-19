"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import GameScoreSaveBadge from "@/components/games/GameScoreSaveBadge";

type Difficulty = "easy" | "medium" | "hard";
type GamePhase = "start" | "playing" | "gameover";

type Token = {
  id: string;
  text: string;
  kind: "number" | "operator";
};

type RoundState = {
  target: number;
  tokens: Token[];
  solution: string;
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildRound(difficulty: Difficulty, level: number): RoundState {
  // Beginner focused: Simple addition and subtraction
  // As level increases, add more tokens
  const tokenCount = level < 5 ? 3 : level < 10 ? 5 : 7;
  
  let target = 0;
  let tokens: Token[] = [];
  let solution = "";

  if (tokenCount === 3) {
    const a = randomInt(1, 10 + level);
    const b = randomInt(1, 10 + level);
    const op = Math.random() > 0.5 ? "+" : "-";
    
    if (op === "+") {
      target = a + b;
      solution = `${a} + ${b}`;
    } else {
      // Ensure positive result for beginners
      const big = Math.max(a, b);
      const small = Math.min(a, b);
      target = big - small;
      solution = `${big} - ${small}`;
    }
  } else if (tokenCount === 5) {
    const a = randomInt(5, 15);
    const b = randomInt(5, 15);
    const c = randomInt(1, 10);
    // a + b - c style
    target = a + b - c;
    solution = `${a} + ${b} - ${c}`;
  } else {
    // a + b - c + d style
    const a = randomInt(5, 15);
    const b = randomInt(5, 15);
    const c = randomInt(2, 10);
    const d = randomInt(2, 10);
    target = a + b - c + d;
    solution = `${a} + ${b} - ${c} + ${d}`;
  }

  const parts = solution.split(" ");
  tokens = shuffle(parts.map((p, i) => ({
    id: `token-${level}-${i}-${p}`,
    text: p,
    kind: /^[0-9]+$/.test(p) ? "number" : "operator"
  })));

  return { target, tokens, solution };
}

export default function NumberScrambler() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();

  const [phase, setPhase] = useState<GamePhase>("start");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [round, setRound] = useState<RoundState>(() => buildRound("easy", 0));
  const [placed, setPlaced] = useState<Token[]>([]);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);

  const scoreRef = useRef(score);
  const coinsRef = useRef(coins);

  useEffect(() => {
    scoreRef.current = score;
    coinsRef.current = coins;
  }, [score, coins]);

  const startGame = () => {
    const nextRound = buildRound(difficulty, 0);
    setPhase("playing");
    setLevel(0);
    setScore(0);
    setCoins(0);
    setPlaced([]);
    setRound(nextRound);
    setFlash(null);
    trackStart({ difficulty });
  };

  const nextLevel = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setRound(buildRound(difficulty, nextLvl));
    setPlaced([]);
    setFlash("correct");
    triggerPrompt();
    
    setScore(s => s + 150 + level * 20);
    setCoins(c => c + 1);

    window.setTimeout(() => setFlash(null), 800);
  };

  const placeToken = (token: Token) => {
    if (phase !== "playing" || flash) return;
    if (placed.some(t => t.id === token.id)) return;

    const nextPlaced = [...placed, token];
    setPlaced(nextPlaced);

    if (nextPlaced.length === round.tokens.length) {
      // Check answer
      const expression = nextPlaced.map(t => t.text).join(" ");
      try {
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${expression}`)();
        if (result === round.target) {
          nextLevel();
        } else {
          setFlash("wrong");
          window.setTimeout(() => {
            setFlash(null);
            setPlaced([]);
          }, 800);
        }
      } catch {
        setFlash("wrong");
        window.setTimeout(() => {
          setFlash(null);
          setPlaced([]);
        }, 800);
      }
    }
  };

  const pool = useMemo(() => {
    return round.tokens.filter(t => !placed.some(p => p.id === t.id));
  }, [round.tokens, placed]);

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/20 bg-slate-950/40 p-4 text-white shadow-2xl backdrop-blur-xl md:p-8">
      {/* Game Area */}
      <div className={`relative min-h-[500px] rounded-[2rem] border-2 border-white/10 p-6 transition-all duration-500 overflow-hidden
        ${flash === "correct" ? "bg-emerald-500/20 border-emerald-400/30" : 
          flash === "wrong" ? "bg-rose-500/20 border-rose-400/30 animate-shake" : 
          "bg-gradient-to-b from-blue-900/20 to-cyan-900/10"}
      `}>
        {/* Background Bubbles Decor */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Header Information */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-300/60 block mb-1">Beginner Math</span>
                <h2 className="text-3xl font-black text-white">Number Scramble</h2>
            </div>
            <div className="flex gap-3">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold">
                    Round <span className="text-cyan-400 ml-1">{level + 1}</span>
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold">
                    Score <span className="text-amber-400 ml-1">{score.toLocaleString()}</span>
                </div>
            </div>
        </div>

        {phase === "start" ? (
            <div className="flex flex-col items-center justify-center h-[350px] text-center relative z-10">
                <div className="text-7xl mb-6 animate-bounce-gentle">🫧</div>
                <p className="max-w-md text-slate-200 mb-8 font-medium italic">
                    Bubbles have scrambled the math equation! Collect them in the right order to reach the target.
                </p>
                <button 
                   onClick={startGame}
                   className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-lg shadow-xl shadow-cyan-900/40 hover:scale-105 active:scale-95 transition-transform"
                >
                    Start Bubbling!
                </button>
            </div>
        ) : (
            <>
                {/* Target Number Display */}
                <div className="flex flex-col items-center mb-12 relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Target Number</div>
                    <div className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        {round.target}
                    </div>
                </div>

                {/* Placed Equation Area */}
                <div className="flex justify-center gap-3 min-h-[80px] mb-12 items-center relative z-10">
                    {placed.map((token, i) => (
                        <div 
                            key={token.id}
                            className={`flex items-center justify-center min-w-[60px] h-[60px] rounded-2xl border-2 font-black text-2xl shadow-lg animate-in fade-in zoom-in duration-300 
                                ${token.kind === "number" ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-100" : "bg-white/10 border-white/20 text-white"}
                            `}
                        >
                            {token.text}
                        </div>
                    ))}
                    {Array.from({ length: round.tokens.length - placed.length }).map((_, i) => (
                        <div 
                            key={i} 
                            className="w-[60px] h-[60px] rounded-2xl border-2 border-dashed border-white/10 bg-white/5"
                        ></div>
                    ))}
                </div>

                {/* Bubble Bank */}
                <div className="flex flex-wrap justify-center gap-6 relative z-10 px-4">
                    {pool.map((token, i) => (
                        <button
                            key={token.id}
                            onClick={() => placeToken(token)}
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center text-2xl md:text-3xl font-black transition-all hover:scale-110 active:scale-90 group relative animate-bubble-float
                                ${token.kind === "number" ? "bg-gradient-to-br from-blue-500/80 to-cyan-400/80 border-cyan-300/50 shadow-cyan-900/30" : "bg-gradient-to-br from-slate-600 to-slate-800 border-white/30 shadow-black/30"}
                            `}
                            style={{
                                animationDelay: `${i * 0.4}s`
                            }}
                        >
                            {/* Reflex highlight */}
                            <div className="absolute top-2 left-4 w-4 h-2 bg-white/30 rounded-full blur-[1px]"></div>
                            <span className="drop-shadow-lg">{token.text}</span>
                        </button>
                    ))}
                </div>

                {/* Reset button */}
                <div className="mt-12 flex justify-center relative z-10">
                    <button 
                        onClick={() => setPlaced([])}
                        className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5"
                    >
                        Reset Equation
                    </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
}
