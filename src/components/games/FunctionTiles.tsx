"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import GameScoreSaveBadge from "@/components/games/GameScoreSaveBadge";

type Difficulty = "easy" | "medium" | "hard";
type GamePhase = "start" | "playing" | "gameover";

type TileCard = {
  id: string;
  value: number;
  type: "input" | "output";
  matched: boolean;
};

type RoundState = {
  cards: TileCard[];
  pairCount: number;
  targetFunction: FunctionSpec;
};

type FunctionSpec = {
  label: string;
  evaluate: (x: number) => number;
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFunctionSpec(difficulty: Difficulty, level: number): FunctionSpec {
  const easySpecs: FunctionSpec[] = [
    { label: "f(x) = x + 1", evaluate: (x) => x + 1 },
    { label: "f(x) = x + 2", evaluate: (x) => x + 2 },
    { label: "f(x) = x + 5", evaluate: (x) => x + 5 },
    { label: "f(x) = x - 1", evaluate: (x) => x - 1 },
    { label: "f(x) = 2x", evaluate: (x) => x * 2 },
    { label: "f(x) = 10x", evaluate: (x) => x * 10 },
  ];

  const mediumSpecs: FunctionSpec[] = [
    { label: "f(x) = 2x + 1", evaluate: (x) => 2 * x + 1 },
    { label: "f(x) = 3x - 2", evaluate: (x) => 3 * x - 2 },
    { label: "f(x) = x^2", evaluate: (x) => x * x },
    { label: "f(x) = 100 - x", evaluate: (x) => 100 - x },
    { label: "f(x) = x / 2", evaluate: (x) => x / 2 },
    { label: "f(x) = 2(x + 3)", evaluate: (x) => 2 * (x + 3) },
  ];

  const hardSpecs: FunctionSpec[] = [
    { label: "f(x) = x^2 + x", evaluate: (x) => x * x + x },
    { label: "f(x) = 2x^2 + 1", evaluate: (x) => 2 * x * x + 1 },
    { label: "f(x) = 3(x + 2) - 1", evaluate: (x) => 3 * (x + 2) - 1 },
    { label: "f(x) = (x + 1)(x - 1)", evaluate: (x) => (x + 1) * (x - 1) },
    { label: "f(x) = 5x - 25", evaluate: (x) => 5 * x - 25 },
    { label: "f(x) = x^2 - 10", evaluate: (x) => x * x - 10 },
  ];

  const pool = difficulty === "easy" ? easySpecs : difficulty === "medium" ? mediumSpecs : hardSpecs;
  return pool[randomInt(0, pool.length - 1)];
}

function buildRound(difficulty: Difficulty, level: number): RoundState {
  const basePairs = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
  const pairCount = Math.min(basePairs + Math.floor(level / 3), 12);
  const targetFunction = createFunctionSpec(difficulty, level);

  const entries: { input: number; output: number }[] = [];
  const usedInputs = new Set<number>();

  while (entries.length < pairCount) {
    const input = difficulty === "easy" ? randomInt(1, 10) : difficulty === "medium" ? randomInt(2, 15) : randomInt(3, 20);
    if (!usedInputs.has(input)) {
        const output = targetFunction.evaluate(input);
        entries.push({ input, output });
        usedInputs.add(input);
    }
  }

  const cards: TileCard[] = shuffle(
    entries.flatMap((entry, i): TileCard[] => [
      { id: `in-${i}`, value: entry.input, type: "input", matched: false },
      { id: `out-${i}`, value: entry.output, type: "output", matched: false },
    ])
  );

  return { cards, pairCount, targetFunction };
}

export default function FunctionTiles() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();

  const [phase, setPhase] = useState<GamePhase>("start");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState<RoundState>(() => buildRound("medium", 0));
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
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
    setLives(3);
    setRound(nextRound);
    setRevealedIds([]);
    setMatchedIds([]);
    setLocked(false);
    setFlash(null);
    trackStart({ difficulty });
  };

  const nextRound = () => {
    const nextLevel = level + 1;
    setLevel(nextLevel);
    setRound(buildRound(difficulty, nextLevel));
    setRevealedIds([]);
    setMatchedIds([]);
    setLocked(false);
  };

  const handleGameOver = () => {
    setPhase("gameover");
    updateProgress(coinsRef.current, Math.floor(scoreRef.current / 100));
    trackGameOver({ score: scoreRef.current, coins: coinsRef.current, difficulty, reason: "out_of_lives" });
  };

  const revealTile = (tileId: string) => {
    if (phase !== "playing" || locked || revealedIds.includes(tileId) || matchedIds.includes(tileId)) return;

    const nextRevealed = [...revealedIds, tileId];
    setRevealedIds(nextRevealed);

    if (nextRevealed.length < 2) return;

    setLocked(true);
    const [firstId, secondId] = nextRevealed;
    const firstCard = round.cards.find((card) => card.id === firstId);
    const secondCard = round.cards.find((card) => card.id === secondId);
    
    // Logic: One must be input, one must be output, and they must satisfy the function
    const inputCard = firstCard?.type === "input" ? firstCard : secondCard?.type === "input" ? secondCard : null;
    const outputCard = firstCard?.type === "output" ? firstCard : secondCard?.type === "output" ? secondCard : null;
    
    const matched = inputCard && outputCard && round.targetFunction.evaluate(inputCard.value) === outputCard.value;

    window.setTimeout(() => {
      if (matched) {
        const scoreGain = 120 + level * 20;
        const coinsGain = 1;
        const nextScore = scoreRef.current + scoreGain;
        const nextCoins = coinsRef.current + coinsGain;
        const nextMatched = [...matchedIds, firstId, secondId];

        setMatchedIds(nextMatched);
        setScore(nextScore);
        setCoins(nextCoins);
        setFlash("correct");
        triggerPrompt();
        trackWin({ score: nextScore, coins: nextCoins, difficulty });

        window.setTimeout(() => {
          setFlash(null);
          setRevealedIds([]);
          setLocked(false);
          if (nextMatched.length >= round.cards.length) {
            nextRound();
          }
        }, 450);
      } else {
        setFlash("wrong");
        setLives((current) => {
          const nextLives = current - 1;
          if (nextLives <= 0) {
            window.setTimeout(handleGameOver, 500);
          }
          return nextLives;
        });
        window.setTimeout(() => {
          setFlash(null);
          setRevealedIds([]);
          setLocked(false);
        }, 650);
      }
    }, 550);
  };

  const boardTitle = useMemo(() => {
    return difficulty === "easy"
      ? "Match the input value to the correct result using the rule below"
      : difficulty === "medium"
        ? "Calculate the outputs as the rules get more complex"
        : "Expert level: polynomials and squared functions";
  }, [difficulty]);

  const progress = round.cards.length === 0 ? 0 : Math.round((matchedIds.length / round.cards.length) * 100);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 text-white shadow-2xl shadow-cyan-950/10 backdrop-blur-xl md:p-8">
      <div className={`mb-4 rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${flash === "correct" ? "from-emerald-500/35 to-cyan-500/20" : flash === "wrong" ? "from-rose-500/35 to-orange-500/20" : "from-cyan-500/15 to-indigo-500/10"} p-5 transition-colors`}>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-100/60">Middle School Functions</div>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Function Tiles</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">{boardTitle}</p>
            </div>

          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">Score <span className="ml-2 text-cyan-200">{score.toLocaleString()}</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">Coins <span className="ml-2 text-amber-300">{coins}</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">Lives <span className="ml-2 text-rose-300">{lives}</span></div>
          </div>
        </div>

        <div className="mb-4 grid gap-2 sm:grid-cols-3">
          {(["easy", "medium", "hard"] as Difficulty[]).map((option) => (
            <button
              key={option}
              disabled={phase === "playing"}
              onClick={() => setDifficulty(option)}
              className={`rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.2em] transition-all ${
                difficulty === option ? "bg-cyan-500 text-white shadow-lg" : "bg-white/5 text-white/70 hover:bg-white/10"
              } ${phase === "playing" ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>

        {phase === "start" ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <p className="mb-4 text-sm leading-relaxed text-slate-200">
              Flip two tiles at a time. Match each function card with the input-output tile that fits it.
              </p>
            <button
              onClick={startGame}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 font-black text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              Start Matching
            </button>
          </div>
        ) : phase === "gameover" ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-center">
            <div className="mb-3 text-5xl">💥</div>
            <p className="text-2xl font-black">Game Over</p>
            <p className="mt-2 text-sm text-slate-300">Final score {score.toLocaleString()} across {level + 1} rounds.</p>
            <GameScoreSaveBadge className="mt-4" />
            <button
              onClick={startGame}
              className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 font-black text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="group relative overflow-hidden rounded-3xl border-2 border-cyan-400/50 bg-gradient-to-br from-indigo-900/80 to-blue-900/80 px-10 py-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]"></div>
                <div className="text-center">
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400/70">Current Rule</span>
                  <div className="mt-1 text-4xl font-black text-white md:text-5xl">{round.targetFunction.label}</div>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-black uppercase tracking-[0.25em] text-slate-200">
              <span>Round {level + 1}</span>
              <span>{progress}% matched</span>
              <span>{round.pairCount} pairs</span>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {round.cards.map((card) => {
                const isSelected = revealedIds.includes(card.id);
                const isMatched = matchedIds.includes(card.id);
                
                // Vibrant Middle School Colors: Input = Neon Blue/Cyan, Output = Neon Orange/Hot Pink
                const cardTheme = card.type === "input" 
                    ? "border-cyan-400/50 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_4px_15px_rgba(6,182,212,0.3)]" 
                    : "border-rose-400/50 bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-[0_4px_15px_rgba(244,63,94,0.3)]";
                
                const activeTheme = card.type === "input"
                    ? "border-white bg-gradient-to-br from-cyan-400 to-blue-400 text-white scale-105 shadow-[0_0_25px_rgba(34,211,238,0.6)] ring-2 ring-white/50"
                    : "border-white bg-gradient-to-br from-rose-400 to-orange-400 text-white scale-105 shadow-[0_0_25px_rgba(251,113,133,0.6)] ring-2 ring-white/50";

                return (
                  <button
                    key={card.id}
                    onClick={() => revealTile(card.id)}
                    disabled={locked || isMatched}
                    className={`group relative flex min-h-[110px] flex-col items-center justify-center rounded-[2rem] border-2 p-4 text-center transition-all duration-500 ${
                      isMatched ? "scale-0 opacity-0 pointer-events-none" :
                      isSelected ? activeTheme : 
                      `${cardTheme} hover:-translate-y-1 hover:brightness-110 active:scale-95`
                    }`}
                  >
                    {!isMatched && (
                        <>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
                            <div className="flex flex-col items-center gap-1 relative z-10">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white" : "text-white/80"}`}>
                                    {card.type}
                                </span>
                                <span className="text-3xl font-black drop-shadow-md md:text-4xl">{card.value}</span>
                            </div>
                        </>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
