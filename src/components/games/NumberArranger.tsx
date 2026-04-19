"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import GameScoreSaveBadge from "@/components/games/GameScoreSaveBadge";

type Difficulty = "easy" | "medium" | "hard";
type GamePhase = "start" | "playing" | "gameover";

type Tile = number | null;

type SequenceType = "linear" | "multiples" | "even-odd" | "powers";

type RoundState = {
  grid: Tile[];
  target: number[];
  size: number;
  sequenceName: string;
};

function shuffleArray<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getValidNeighbors(index: number, size: number) {
  const neighbors: number[] = [];
  const row = Math.floor(index / size);
  const col = index % size;

  if (row > 0) neighbors.push(index - size);
  if (row < size - 1) neighbors.push(index + size);
  if (col > 0) neighbors.push(index - 1);
  if (col < size - 1) neighbors.push(index + 1);

  return neighbors;
}

function buildRound(difficulty: Difficulty, level: number): RoundState {
  const size = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;
  const tileCount = size * size - 1;
  
  // Decide sequence
  const seqTypes: SequenceType[] = ["linear", "multiples", "even-odd", "powers"];
  const type = seqTypes[randomInt(0, difficulty === "easy" ? 1 : 3)];

  let target: number[] = [];
  let sequenceName = "";

  if (type === "linear") {
    const start = randomInt(1, 20);
    const step = randomInt(1, 5);
    target = Array.from({ length: tileCount }, (_, i) => start + i * step);
    sequenceName = `Sequence: Start at ${start}, add ${step}`;
  } else if (type === "multiples") {
    const n = randomInt(2, 12);
    target = Array.from({ length: tileCount }, (_, i) => n * (i + 1));
    sequenceName = `Multiples of ${n}`;
  } else if (type === "even-odd") {
    const start = level % 2 === 0 ? 2 : 1;
    target = Array.from({ length: tileCount }, (_, i) => start + i * 2);
    sequenceName = start === 2 ? "Even Numbers" : "Odd Numbers";
  } else {
    const base = randomInt(2, 3);
    target = Array.from({ length: tileCount }, (_, i) => Math.pow(base, i + 1));
    sequenceName = `Powers of ${base}`;
  }

  // Generate solvable shuffle
  // Start from sorted
  let grid: Tile[] = [...target, null];
  let emptyIndex = grid.length - 1;

  // Move random empty slot around
  const shuffleMoves = size * size * 20; // Enough moves to scramble well
  for (let i = 0; i < shuffleMoves; i++) {
    const neighbors = getValidNeighbors(emptyIndex, size);
    const moveIndex = neighbors[randomInt(0, neighbors.length - 1)];
    // Swap
    grid[emptyIndex] = grid[moveIndex];
    grid[moveIndex] = null;
    emptyIndex = moveIndex;
  }

  return { grid, target, size, sequenceName };
}

export default function NumberArranger() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();

  const [phase, setPhase] = useState<GamePhase>("start");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [moves, setMoves] = useState(0);
  const [round, setRound] = useState<RoundState>(() => buildRound("easy", 0));
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
    setMoves(0);
    setRound(nextRound);
    setFlash(null);
    trackStart({ difficulty });
  };

  const handleGameOver = () => {
    setPhase("gameover");
    updateProgress(coinsRef.current, Math.floor(scoreRef.current / 100));
    trackGameOver({ score: scoreRef.current, coins: coinsRef.current, difficulty, reason: "quit" });
  };

  const nextLevel = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setRound(buildRound(difficulty, nextLvl));
    setMoves(0);
    setFlash("correct");
    triggerPrompt();
    
    const scoreGain = 200 + difficulty.length * 50;
    setScore(s => s + scoreGain);
    setCoins(c => c + 2);

    window.setTimeout(() => setFlash(null), 1000);
  };

  const moveTile = (index: number) => {
    if (phase !== "playing") return;

    const emptyIndex = round.grid.indexOf(null);
    const neighbors = getValidNeighbors(emptyIndex, round.size);

    if (neighbors.includes(index)) {
      const newGrid = [...round.grid];
      newGrid[emptyIndex] = newGrid[index];
      newGrid[index] = null;
      
      setRound(r => ({ ...r, grid: newGrid }));
      setMoves(m => m + 1);

      // Check win?
      const isWon = round.target.every((val, i) => newGrid[i] === val);
      if (isWon) {
        window.setTimeout(nextLevel, 300);
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-4 text-white shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:p-8">
      <div
        className={`rounded-[2rem] border border-white/10 bg-gradient-to-br ${
          flash === "correct"
            ? "from-emerald-500/35 to-cyan-500/20"
            : "from-indigo-500/15 to-blue-500/10"
        } p-6 transition-colors`}
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-100/60">Logic & Sequences</div>
            <h2 className="mt-2 text-3xl font-black md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Number Arranger</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base opacity-80">
              Slide tiles to arrange numbers in the correct mathematical sequence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              Score <span className="ml-2 text-cyan-300">{score.toLocaleString()}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              Moves <span className="ml-2 text-amber-300">{moves}</span>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-2 sm:grid-cols-3">
          {(["easy", "medium", "hard"] as Difficulty[]).map((option) => (
            <button
              key={option}
              disabled={phase === "playing"}
              onClick={() => setDifficulty(option)}
              className={`rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.2em] transition-all ${
                difficulty === option ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-white/5 text-white/50 hover:bg-white/10"
              } ${phase === "playing" ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>

        {phase === "start" ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6 text-center">
            <div className="mb-4 text-5xl">🧩</div>
            <p className="mb-6 text-sm leading-relaxed text-slate-300">
              Click tiles adjacent to the empty slot to move them. Sort the board from top-left to solve the sequence!
            </p>
            <button
              onClick={startGame}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 font-black text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              Start Game
            </button>
          </div>
        ) : phase === "gameover" ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-8 text-center">
            <div className="mb-3 text-6xl">🏆</div>
            <p className="text-2xl font-black">Well Done!</p>
            <p className="mt-2 text-sm text-slate-300">
              You reached level {level + 1} with {score.toLocaleString()} points.
            </p>
            <GameScoreSaveBadge className="mt-6" />
            <button
              onClick={startGame}
              className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 font-black text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-6 w-full rounded-2xl border border-indigo-400/20 bg-indigo-900/20 px-6 py-4 text-center backdrop-blur-sm">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300/60 block mb-1">Target Sequence</span>
                <span className="text-xl md:text-2xl font-black text-white">{round.sequenceName}</span>
            </div>

            <div 
                className="grid gap-2 p-3 bg-black/40 rounded-[2rem] border-2 border-white/5 shadow-inner"
                style={{ 
                    gridTemplateColumns: `repeat(${round.size}, 1fr)`,
                    width: '100%',
                    maxWidth: round.size === 3 ? '400px' : round.size === 4 ? '500px' : '600px'
                }}
            >
              {round.grid.map((tile, i) => {
                const isCorrect = tile !== null && tile === round.target[i];
                
                // Color logic: alternating neon patterns
                const isEvenIdx = (Math.floor(i / round.size) + (i % round.size)) % 2 === 0;

                return (
                  <button
                    key={i}
                    onClick={() => moveTile(i)}
                    disabled={tile === null}
                    className={`aspect-square relative rounded-xl md:rounded-2xl border-2 transition-all duration-200 flex items-center justify-center overflow-hidden group
                      ${tile === null ? "bg-transparent border-transparent" : 
                        isCorrect ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-white/30 shadow-lg shadow-emerald-950/40" :
                        isEvenIdx ? "bg-gradient-to-br from-indigo-600 to-blue-700 border-white/20 shadow-lg" : 
                        "bg-gradient-to-br from-violet-600 to-indigo-700 border-white/20 shadow-lg"}
                      ${tile !== null ? "hover:scale-[0.98] active:scale-95 hover:brightness-110" : ""}
                    `}
                  >
                    {tile !== null && (
                        <>
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="text-xl md:text-3xl font-black text-white drop-shadow-md">{tile}</span>
                        </>
                    )}
                  </button>
                );
              })}
            </div>

            <button 
                onClick={handleGameOver}
                className="mt-8 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-400 transition-colors"
            >
                End Mission ⛌
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
