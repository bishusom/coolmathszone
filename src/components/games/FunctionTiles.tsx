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
  pairId: string;
  kind: "function" | "pair";
  text: string;
};

type RoundState = {
  cards: TileCard[];
  pairCount: number;
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

function createFunctionSpec(difficulty: Difficulty, level: number, index: number): FunctionSpec {
  const easySpecs: FunctionSpec[] = [
    { label: "f(x) = x + 1", evaluate: (x) => x + 1 },
    { label: "g(x) = x + 2", evaluate: (x) => x + 2 },
    { label: "h(x) = x - 1", evaluate: (x) => x - 1 },
    { label: "p(x) = 2x", evaluate: (x) => x * 2 },
  ];

  const mediumSpecs: FunctionSpec[] = [
    { label: "f(x) = 2x + 1", evaluate: (x) => 2 * x + 1 },
    { label: "g(x) = 3x - 2", evaluate: (x) => 3 * x - 2 },
    { label: "h(x) = x^2 + 1", evaluate: (x) => x * x + 1 },
    { label: "p(x) = 2(x + 3)", evaluate: (x) => 2 * (x + 3) },
  ];

  const hardSpecs: FunctionSpec[] = [
    { label: "f(x) = 2x^2 - x + 1", evaluate: (x) => 2 * x * x - x + 1 },
    { label: "g(x) = 3(x + 2) - 1", evaluate: (x) => 3 * (x + 2) - 1 },
    { label: "h(x) = x^2 + 2x + 3", evaluate: (x) => x * x + 2 * x + 3 },
    { label: "p(x) = (x + 1)(x + 2)", evaluate: (x) => (x + 1) * (x + 2) },
  ];

  const pool = difficulty === "easy" ? easySpecs : difficulty === "medium" ? mediumSpecs : hardSpecs;
  const offset = (level + index) % pool.length;
  return pool[offset];
}

function buildRound(difficulty: Difficulty, level: number): RoundState {
  const basePairs = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
  const pairCount = Math.min(basePairs + Math.floor(level / 2), 8);

  const pairs = Array.from({ length: pairCount }, (_, i) => {
    const spec = createFunctionSpec(difficulty, level, i);
    const input = difficulty === "easy"
      ? randomInt(1, 8 + level)
      : difficulty === "medium"
        ? randomInt(2, 10 + level)
        : randomInt(2, 12 + level);
    const output = spec.evaluate(input);
    return {
      pairId: `pair-${level}-${i}`,
      functionText: spec.label,
      answerText: `${input} → ${output}`,
    };
  });

  const cards: TileCard[] = shuffle(
    pairs.flatMap((pair): TileCard[] => [
      { id: `${pair.pairId}-function`, pairId: pair.pairId, kind: "function", text: pair.functionText },
      { id: `${pair.pairId}-pair`, pairId: pair.pairId, kind: "pair", text: pair.answerText },
    ])
  );

  return { cards, pairCount };
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
    const matched = firstCard?.pairId === secondCard?.pairId;

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
      ? "Match simple function rules to input-output pairs"
      : difficulty === "medium"
        ? "Functions get bigger, outputs get trickier"
        : "Hard mode: polynomial and bracket functions";
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
              onClick={() => phase === "start" && setDifficulty(option)}
              className={`rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.2em] transition-colors ${
                difficulty === option ? "bg-cyan-500 text-white shadow-lg" : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
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
            <div className="mb-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-black uppercase tracking-[0.25em] text-slate-200">
              <span>Round {level + 1}</span>
              <span>{progress}% matched</span>
              <span>{round.pairCount} pairs</span>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {round.cards.map((card) => {
                const isOpen = revealedIds.includes(card.id) || matchedIds.includes(card.id);
                const isMatched = matchedIds.includes(card.id);
                const cardBg = card.kind === "function" ? "from-cyan-500 to-blue-600" : "from-amber-500 to-orange-600";

                return (
                  <button
                    key={card.id}
                    onClick={() => revealTile(card.id)}
                    disabled={locked || isMatched}
                    className={`group min-h-[132px] rounded-[1.5rem] border p-3 text-left shadow-lg transition-all duration-300 ${
                      isOpen ? `border-white/20 bg-gradient-to-br ${cardBg}` : "border-white/10 bg-white/5 hover:-translate-y-1 hover:bg-white/10"
                    } ${isMatched ? "ring-2 ring-emerald-400/70" : ""}`}
                  >
                    <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                      <span>{card.kind === "function" ? "Function" : "Pair"}</span>
                      <span>{isMatched ? "Matched" : isOpen ? "Open" : "Tile"}</span>
                    </div>
                    <div className="flex min-h-[72px] items-center justify-center rounded-2xl border border-white/15 bg-black/20 px-3 text-center text-lg font-black leading-tight text-white transition-transform group-hover:scale-[1.01]">
                      {isOpen ? card.text : "?"}
                    </div>
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
