"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";

type Difficulty = "easy" | "medium" | "hard";
type GamePhase = "start" | "playing" | "gameover";

type Token = {
  id: string;
  text: string;
  kind: "number" | "operator";
};

type BubbleChoice = Token & {
  left: number;
  top: number;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
};

type RoundState = {
  target: number;
  tokens: Token[];
  choices: BubbleChoice[];
  solution: string;
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildBubbleLayout(total: number, level: number) {
  const columns = total > 8 ? 4 : total > 5 ? 3 : 2;
  const rows = Math.ceil(total / columns);
  const cellWidth = 100 / columns;
  const cellHeight = 100 / rows;
  const speedTier = Math.floor(level / 3);
  const speedMultiplier = 1 + speedTier * 0.18;
  return shuffle(Array.from({ length: rows * columns }, (_, i) => i))
    .slice(0, total)
    .map((cell) => {
      const row = Math.floor(cell / columns);
      const col = cell % columns;

      return {
        left: clamp((col + 0.5) * cellWidth + randomInt(-8, 8), 10, 90),
        top: clamp((row + 0.5) * cellHeight + randomInt(-8, 8), 10, 88),
        size: randomInt(68, 98),
        driftX: randomInt(-18, 18),
        driftY: randomInt(-14, 14),
        duration: Number((randomInt(5, 9) / speedMultiplier).toFixed(2)),
        delay: Number((Math.random() * -6).toFixed(2)),
      };
    });
}

function makeDecoyNumber(existing: Set<string>, maxValue: number) {
  let candidate = randomInt(0, Math.max(maxValue, 12));
  let attempts = 0;

  while (existing.has(String(candidate)) && attempts < 20) {
    candidate = randomInt(0, Math.max(maxValue, 12));
    attempts += 1;
  }

  existing.add(String(candidate));
  return String(candidate);
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

  const existingNumberValues = new Set(
    tokens.filter(token => token.kind === "number").map(token => token.text)
  );
  const extraChoices = tokenCount === 3 ? 6 : tokenCount === 5 ? 5 : 4;
  const bubbleLayout = buildBubbleLayout(tokenCount + extraChoices, level);
  const choices: BubbleChoice[] = tokens.map((token, index) => ({
    ...token,
    ...bubbleLayout[index]
  }));

  for (let i = 0; i < extraChoices; i += 1) {
    const value = makeDecoyNumber(existingNumberValues, target + 12 + level * 2);
    const token: Token = {
      id: `decoy-${level}-${i}-${value}`,
      text: value,
      kind: "number"
    };

    choices.push({
      ...token,
      ...bubbleLayout[tokenCount + i]
    });
  }

  return { target, tokens, choices: shuffle(choices), solution };
}

export default function NumberScrambler() {
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart } = useGameRunAnalytics();

  const [phase, setPhase] = useState<GamePhase>("start");
  const difficulty: Difficulty = "easy";
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
    return round.choices.filter(t => !placed.some(p => p.id === t.id));
  }, [round.choices, placed]);

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
                    {placed.map((token) => (
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
                <div className="relative z-10 mx-auto h-[320px] w-full max-w-5xl px-2 sm:px-4">
                    {pool.map((token) => (
                        <div
                            key={token.id}
                            className="bubble-choice absolute"
                            style={
                              {
                                left: `${token.left}%`,
                                top: `${token.top}%`,
                                width: `${token.size}px`,
                                height: `${token.size}px`,
                                ['--bubble-duration' as string]: `${token.duration}s`,
                                ['--bubble-delay' as string]: `${token.delay}s`,
                                ['--drift-x' as string]: `${token.driftX}`,
                                ['--drift-y' as string]: `${token.driftY}`,
                              } as React.CSSProperties
                            }
                        >
                            <button
                                onClick={() => placeToken(token)}
                                className={`relative flex h-full w-full items-center justify-center rounded-full border-2 text-2xl md:text-3xl font-black transition-all hover:scale-110 active:scale-90 group animate-bubble-float
                                    ${token.kind === "number"
                                      ? "bg-gradient-to-br from-blue-500/80 via-cyan-400/75 to-sky-300/70 border-cyan-200/50 shadow-cyan-900/30"
                                      : "bg-gradient-to-br from-slate-600 to-slate-800 border-white/30 shadow-black/30"}
                                `}
                                style={{
                                  animationDelay: `${token.delay}s`,
                                  animationDuration: `${token.duration}s`,
                                }}
                                aria-label={`Place ${token.text}`}
                            >
                                <div
                                  className="absolute inset-0 rounded-full opacity-90"
                                  style={{
                                    transform: `translate(${token.driftX * 0.04}px, ${token.driftY * 0.04}px)`,
                                    boxShadow: token.kind === "number"
                                      ? "inset 0 0 24px rgba(255,255,255,0.15)"
                                      : "inset 0 0 24px rgba(255,255,255,0.08)",
                                  }}
                                />
                                <div className="absolute top-2 left-4 h-2 w-4 rounded-full bg-white/30 blur-[1px]" />
                                <span className="relative z-10 drop-shadow-lg">{token.text}</span>
                            </button>
                        </div>
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
      <style jsx>{`
        .bubble-choice {
          animation: bubbleDrift var(--bubble-duration) ease-in-out infinite;
          animation-delay: var(--bubble-delay);
          will-change: transform;
        }

        @keyframes bubbleDrift {
          0%, 100% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-50%, -50%) translate3d(calc(var(--drift-x) * 1px), calc(var(--drift-y) * -0.5px), 0) rotate(2deg);
          }
          66% {
            transform: translate(-50%, -50%) translate3d(calc(var(--drift-x) * -0.8px), calc(var(--drift-y) * 1px), 0) rotate(-2deg);
          }
        }
      `}</style>
    </div>
  );
}
