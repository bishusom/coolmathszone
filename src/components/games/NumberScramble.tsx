"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMeaningfulSuccessPrompt } from "@/components/auth/GameAuthGuard";
import { useGameRunAnalytics } from "@/components/games/GameAnalyticsContext";
import GameScoreSaveBadge from "@/components/games/GameScoreSaveBadge";

type Difficulty = "easy" | "medium" | "hard";
type GamePhase = "start" | "playing" | "gameover";

type NumberTile = {
  id: string;
  value: number;
};

type TokenKind = "number" | "operator" | "bracket";

type TokenTile = {
  id: string;
  text: string;
  kind: TokenKind;
};

type SequenceRound = {
  mode: "sequence";
  target: number[];
  tiles: NumberTile[];
};

type ExpressionRound = {
  mode: "expression";
  target: number;
  solution: string;
  tiles: TokenTile[];
  tokenCount: number;
};

type Round = SequenceRound | ExpressionRound;
type PlacedTile = NumberTile | TokenTile;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tokenTextList(tokens: PlacedTile[]) {
  return tokens.map((token) => ("value" in token ? token.value.toString() : token.text)).join(" ");
}

function evaluateExpression(expression: string) {
  if (!/^[0-9+\-*/()\s]+$/.test(expression)) return null;

  try {
    const result = Function(`"use strict"; return (${expression});`)();
    if (typeof result === "number" && Number.isFinite(result) && Number.isInteger(result)) {
      return result;
    }
  } catch {
    return null;
  }

  return null;
}

function buildSequenceRound(level: number): SequenceRound {
  const length = Math.min(5 + Math.floor(level / 2), 8);
  const start = randomInt(1, 30);
  const step = randomInt(1, 8);
  const target = Array.from({ length }, (_, index) => start + index * step);

  return {
    mode: "sequence",
    target,
    tiles: shuffle(
      target.map((value, index) => ({
        id: `seq-${level}-${index}`,
        value,
      }))
    ),
  };
}

function createExpressionTokens(text: string, kind: TokenKind, index: number): TokenTile {
  return {
    id: `expr-token-${index}-${text}`,
    text,
    kind,
  };
}

function buildExpressionRound(difficulty: Exclude<Difficulty, "easy">, level: number): ExpressionRound {
  const tokenCount = difficulty === "medium" ? 7 : 9;
  const maxAttempts = 100;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (difficulty === "medium") {
      const a = randomInt(2, 20 + level * 2);
      const b = randomInt(2, 12 + level);
      const c = randomInt(2, 10 + Math.floor(level / 2));
      const d = randomInt(1, 15 + level);

      const templates: Array<{ solution: string; target: number }> = [
        { solution: `${a} + ${b} * ${c} - ${d}`, target: a + b * c - d },
        { solution: `${a} * ${b} + ${c} - ${d}`, target: a * b + c - d },
        { solution: `${a} + ${b} * ${c} + ${d}`, target: a + b * c + d },
        { solution: `${a} * ${b} - ${c} + ${d}`, target: a * b - c + d },
      ];

      const candidate = templates[randomInt(0, templates.length - 1)];
      if (candidate.target > 0) {
        const tokens = candidate.solution.split(" ").map((part, index) =>
          createExpressionTokens(
            part,
            /^[0-9]+$/.test(part) ? "number" : "operator",
            index
          )
        );

        return {
          mode: "expression",
          target: candidate.target,
          solution: candidate.solution,
          tiles: shuffle(tokens),
          tokenCount,
        };
      }
    } else {
      const a = randomInt(2, 18 + level * 2);
      const b = randomInt(2, 12 + level);
      const c = randomInt(2, 10 + Math.floor(level / 2));
      const d = randomInt(1, 12 + level);
      const e = randomInt(1, 18 + level);

      const templates: Array<{ solution: string; target: number }> = [
        { solution: `( ${a} + ${b} ) * ${c} - ${d} + ${e}`, target: (a + b) * c - d + e },
        { solution: `${a} * ( ${b} + ${c} ) - ${d} + ${e}`, target: a * (b + c) - d + e },
        { solution: `${a} + ( ${b} * ${c} ) - ${d} + ${e}`, target: a + b * c - d + e },
        { solution: `( ${a} + ${b} ) + ( ${c} * ${d} ) - ${e}`, target: (a + b) + c * d - e },
      ];

      const candidate = templates[randomInt(0, templates.length - 1)];
      if (candidate.target > 0) {
        const tokens = candidate.solution.split(" ").map((part, index) => {
          const kind: TokenKind = part === "(" || part === ")" ? "bracket" : /^[0-9]+$/.test(part) ? "number" : "operator";
          return createExpressionTokens(part, kind, index);
        });

        return {
          mode: "expression",
          target: candidate.target,
          solution: candidate.solution,
          tiles: shuffle(tokens),
          tokenCount,
        };
      }
    }
  }

  // Fallback: keep the game playable if random generation gets unlucky.
  if (difficulty === "medium") {
    const fallback = `${8 + level} + ${6 + level} * ${3 + (level % 4)} - ${2 + (level % 5)}`;
    const target = evaluateExpression(fallback) ?? 0;
    const tokens = fallback.split(" ").map((part, index) =>
      createExpressionTokens(part, /^[0-9]+$/.test(part) ? "number" : "operator", index)
    );
    return { mode: "expression", target, solution: fallback, tiles: shuffle(tokens), tokenCount };
  }

  const fallback = `( ${6 + level} + ${4 + level} ) * ${3 + (level % 4)} - ${2 + (level % 5)} + ${1 + (level % 3)}`;
  const target = evaluateExpression(fallback) ?? 0;
  const tokens = fallback.split(" ").map((part, index) => {
    const kind: TokenKind = part === "(" || part === ")" ? "bracket" : /^[0-9]+$/.test(part) ? "number" : "operator";
    return createExpressionTokens(part, kind, index);
  });
  return { mode: "expression", target, solution: fallback, tiles: shuffle(tokens), tokenCount };
}

function buildRound(difficulty: Difficulty, level: number): Round {
  if (difficulty === "easy") {
    return buildSequenceRound(level);
  }

  return buildExpressionRound(difficulty, level);
}

export default function NumberScramble() {
  const { updateProgress } = useAuth();
  const { triggerPrompt } = useMeaningfulSuccessPrompt();
  const { trackStart, trackWin, trackGameOver } = useGameRunAnalytics();

  const [phase, setPhase] = useState<GamePhase>("start");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState<Round>(() => buildRound("easy", 0));
  const [placed, setPlaced] = useState<PlacedTile[]>([]);
  const [pool, setPool] = useState<PlacedTile[]>([]);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [checking, setChecking] = useState(false);

  const scoreRef = useRef(score);
  const coinsRef = useRef(coins);

  useEffect(() => {
    scoreRef.current = score;
    coinsRef.current = coins;
  }, [score, coins]);

  const resetRoundState = (nextRound: Round) => {
    setRound(nextRound);
    setPlaced([]);
    setPool(nextRound.tiles as PlacedTile[]);
    setChecking(false);
    setFlash(null);
  };

  const startGame = () => {
    const nextRound = buildRound(difficulty, 0);
    setPhase("playing");
    setLevel(0);
    setScore(0);
    setCoins(0);
    setLives(3);
    resetRoundState(nextRound);
    trackStart({ difficulty });
  };

  const handleGameOver = () => {
    setPhase("gameover");
    updateProgress(coinsRef.current, Math.floor(scoreRef.current / 100));
    trackGameOver({ score: scoreRef.current, coins: coinsRef.current, difficulty, reason: "out_of_lives" });
  };

  const advanceRound = () => {
    const nextLevel = level + 1;
    setLevel(nextLevel);
    resetRoundState(buildRound(difficulty, nextLevel));
  };

  const returnTileToPool = (tile: PlacedTile) => {
    setPool((current) => shuffle([...current, tile]));
  };

  const placeTile = (tile: PlacedTile) => {
    if (phase !== "playing" || checking) return;
    if (placed.some((item) => item.id === tile.id)) return;

    const nextPlaced = [...placed, tile];

    setPool((current) => current.filter((item) => item.id !== tile.id));
    setPlaced(nextPlaced);

    if (
      (round.mode === "sequence" && nextPlaced.length === round.target.length) ||
      (round.mode === "expression" && nextPlaced.length === round.tokenCount)
    ) {
      submitRound(nextPlaced);
    }
  };

  const undoLast = () => {
    if (phase !== "playing" || checking || placed.length === 0) return;
    const last = placed[placed.length - 1];
    setPlaced((current) => current.slice(0, -1));
    returnTileToPool(last);
  };

  const clearAll = () => {
    if (phase !== "playing" || checking) return;
    setPlaced([]);
    setPool(shuffle(round.tiles as PlacedTile[]));
  };

  const submitRound = (tiles: PlacedTile[]) => {
    if (phase !== "playing" || checking) return;

    if (round.mode === "sequence") {
      if (tiles.length !== round.target.length) return;
    } else {
      if (tiles.length !== round.tokenCount) return;
    }

    setChecking(true);

    window.setTimeout(() => {
      let success = false;

      if (round.mode === "sequence") {
        success = tiles.every((tile, index) => "value" in tile && tile.value === round.target[index]);
      } else {
        const expression = tokenTextList(tiles);
        const evaluated = evaluateExpression(expression);
        success = evaluated === round.target;
      }

      if (success) {
        const scoreGain =
        round.mode === "sequence"
          ? 100 + level * 20 + round.target.length * 15
          : 140 + level * 25 + round.tokenCount * 10;
        const coinGain = round.mode === "sequence" ? 1 : 2;
        const nextScore = scoreRef.current + scoreGain;
        const nextCoins = coinsRef.current + coinGain;

        setScore(nextScore);
        setCoins(nextCoins);
        setFlash("correct");
        triggerPrompt();
        trackWin({ score: nextScore, coins: nextCoins, difficulty });

        window.setTimeout(() => {
          setFlash(null);
          setChecking(false);
          advanceRound();
        }, 650);
      } else {
        setFlash("wrong");
        setLives((current) => {
          const nextLives = current - 1;
          if (nextLives <= 0) {
            window.setTimeout(handleGameOver, 550);
          }
          return nextLives;
        });

        window.setTimeout(() => {
          setFlash(null);
          setChecking(false);
          resetRoundState(buildRound(difficulty, level));
        }, 750);
      }
    }, 250);
  };

  const instruction = useMemo(() => {
    if (round.mode === "sequence") {
      return "Arrange the numbers from smallest to largest.";
    }

    if (difficulty === "medium") {
      return "Use the scrambled numbers and operators to reach the target number.";
    }

    return "Use the numbers, operators, and brackets to reach the target number.";
  }, [difficulty, round.mode]);

  const poolPreview = useMemo(
    () =>
      round.mode === "sequence"
        ? pool.map((tile) => (tile as NumberTile).value).join(" • ")
        : pool.map((tile) => ("text" in tile ? tile.text : tile.value.toString())).join(" • "),
    [pool, round.mode]
  );

  const progress =
    round.mode === "sequence"
      ? Math.round((placed.length / round.target.length) * 100)
      : Math.round((placed.length / round.tokenCount) * 100);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 text-white shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:p-8">
      <div
        className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${
          flash === "correct"
            ? "from-emerald-500/35 to-cyan-500/20"
            : flash === "wrong"
              ? "from-rose-500/35 to-orange-500/20"
              : "from-amber-500/15 to-orange-500/10"
        } p-5 transition-colors`}
      >
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-100/60">
              {round.mode === "sequence" ? "Elementary Ordering" : "Countdown Math"}
            </div>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Number Scramble</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              {instruction}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              Score <span className="ml-2 text-cyan-200">{score.toLocaleString()}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              Coins <span className="ml-2 text-amber-300">{coins}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              Lives <span className="ml-2 text-rose-300">{lives}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 grid gap-2 sm:grid-cols-3">
          {(["easy", "medium", "hard"] as Difficulty[]).map((option) => (
            <button
              key={option}
              onClick={() => phase === "start" && setDifficulty(option)}
              className={`rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.2em] transition-colors ${
                difficulty === option ? "bg-amber-500 text-white shadow-lg" : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {phase === "start" ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <p className="mb-4 text-sm leading-relaxed text-slate-200">
              Easy mode is a straight ordering puzzle. Medium and hard switch to target-number puzzles using numbers, operators, and brackets.
            </p>
            <button
              onClick={startGame}
              className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-black text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              Start Scrambling
            </button>
          </div>
        ) : phase === "gameover" ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-center">
            <div className="mb-3 text-5xl">🧨</div>
            <p className="text-2xl font-black">Game Over</p>
            <p className="mt-2 text-sm text-slate-300">
              Final score {score.toLocaleString()} across {level + 1} rounds.
            </p>
            <GameScoreSaveBadge className="mt-4" />
            <button
              onClick={startGame}
              className="mt-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-black text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-black uppercase tracking-[0.2em] text-amber-200">Round {level + 1}</span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{progress}% complete</span>
              </div>
              <div className="text-sm font-black text-white">
                {round.mode === "sequence" ? (
                  <span>Number Sequence: start with the smallest number and build upward.</span>
                ) : (
                  <span>
                    Target: <span className="text-cyan-200">{round.target.toLocaleString()}</span>
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold text-slate-300">Scrambled bank: {poolPreview}</div>
            </div>

            {round.mode === "sequence" ? (
              <div className="mb-4 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                  {round.target.map((_, index) => (
                  <div
                    key={index}
                    className="flex min-h-[72px] items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-sm font-black text-white/30"
                  >
                    {placed[index] && "value" in placed[index] ? placed[index].value : index + 1}
                  </div>
                ))}
                </div>
              </div>
            ) : (
              <div className="mb-4 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-center">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Build Expression</div>
                  <div className="mt-3 flex min-h-[72px] flex-wrap items-center justify-center gap-2 text-xl font-black text-white">
                    {placed.length > 0 ? (
                      placed.map((tile) => {
                        const chipClass = "kind" in tile
                          ? tile.kind === "number"
                            ? "bg-cyan-500/20"
                            : tile.kind === "bracket"
                              ? "bg-amber-500/20"
                              : "bg-white/10"
                          : "bg-white/10";
                        const chipText = "text" in tile ? tile.text : tile.value;

                        return (
                          <span key={tile.id} className={`rounded-xl px-3 py-2 ${chipClass}`}>
                            {chipText}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-white/30">Tap tiles to build the equation</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4 flex flex-wrap gap-3">
              <button
                onClick={undoLast}
                disabled={placed.length === 0 || checking}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Undo
              </button>
              <button
                onClick={clearAll}
                disabled={placed.length === 0 || checking}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear
              </button>
              <button
                onClick={() => submitRound(placed)}
                disabled={checking || (round.mode === "sequence" ? placed.length !== round.target.length : placed.length !== round.tokenCount)}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {pool.map((tile) => {
                const tileLabel = "text" in tile ? tile.text : tile.value;
                const tileClass = round.mode === "sequence"
                  ? "border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-white hover:bg-white/10"
                  : "kind" in tile
                    ? tile.kind === "number"
                      ? "border-cyan-300/20 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-cyan-50 hover:bg-cyan-500/20"
                      : tile.kind === "bracket"
                        ? "border-amber-300/20 bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-50 hover:bg-amber-500/20"
                        : "border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-white hover:bg-white/10"
                    : "border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-white hover:bg-white/10";

                return (
                  <button
                    key={tile.id}
                    onClick={() => placeTile(tile)}
                    disabled={checking}
                    className={`min-h-[88px] rounded-[1.5rem] border px-4 py-3 text-center text-2xl font-black shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-60 ${tileClass}`}
                  >
                    {tileLabel}
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
