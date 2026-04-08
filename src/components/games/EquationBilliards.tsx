"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUnlocks } from "@/hooks/useUnlocks";

type GameState = "START" | "PLAYING" | "GAMEOVER";

interface PhysicsBall {
  id: string;
  value: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface ExpertProblem {
  question: string;
  answer: number;
  options: number[];
  category: string;
  level: number;
  timerMs: number;
  speed: number;
  ballCount: number;
}

const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 620;
const TABLE_MARGIN = 34;
const HUD_HEIGHT = 156;
const BALL_RADIUS = 45;
const BALL_COLORS = ["#f59e0b", "#38bdf8", "#22c55e", "#f97316", "#e879f9", "#f43f5e", "#a3e635"];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function makeOptions(answer: number, count: number, spread: number) {
  const options = new Set<number>([answer]);

  while (options.size < count) {
    const offset = randInt(1, spread);
    const direction = Math.random() > 0.5 ? 1 : -1;
    const candidate = answer + offset * direction;
    if (candidate !== answer) {
      options.add(candidate);
    }
  }

  return shuffle(Array.from(options));
}

function createProblem(level: number): ExpertProblem {
  const ballCount = clamp(4 + Math.floor((level - 1) / 3), 4, 7);
  const timerMs = Math.max(10500 - (level - 1) * 320, 5500);
  const speed = Math.min(150 + (level - 1) * 12, 300);
  const spread = level < 4 ? 10 : level < 10 ? 14 : 18;

  const generators: Array<() => Omit<ExpertProblem, "level" | "timerMs" | "speed" | "ballCount">> = [];

  if (level <= 3) {
    generators.push(
      () => {
        const a = randInt(2, 12);
        const b = randInt(2, 12);
        const c = randInt(2, 9);
        return {
          question: `${a} + ${b} x ${c}`,
          answer: a + b * c,
          options: [],
          category: "PEMDAS Warm-Up",
        };
      },
      () => {
        const root = randInt(3, 12);
        return {
          question: `sqrt(${root * root})`,
          answer: root,
          options: [],
          category: "Perfect Roots",
        };
      },
      () => {
        const a = randInt(10, 35);
        const b = randInt(4, 15);
        const c = randInt(2, 9);
        return {
          question: `${a} + ${b} - ${c}`,
          answer: a + b - c,
          options: [],
          category: "Two-Step Arithmetic",
        };
      }
    );
  } else if (level <= 6) {
    generators.push(
      () => {
        const a = randInt(2, 12);
        const b = randInt(3, 12);
        const c = randInt(2, 9);
        return {
          question: `(${a} + ${b}) x ${c}`,
          answer: (a + b) * c,
          options: [],
          category: "Bracket Pressure",
        };
      },
      () => {
        const base = randInt(2, 6);
        const power = randInt(2, 3);
        const bonus = randInt(4, 12);
        return {
          question: `${base}^${power} + ${bonus}`,
          answer: base ** power + bonus,
          options: [],
          category: "Powers",
        };
      },
      () => {
        const a = randInt(24, 68);
        const b = randInt(3, 9);
        const c = randInt(4, 12);
        return {
          question: `${a} - ${b} x ${c}`,
          answer: a - b * c,
          options: [],
          category: "Mixed Operations",
        };
      }
    );
  } else if (level <= 9) {
    generators.push(
      () => {
        const root = randInt(8, 18);
        const bonus = randInt(2, 9);
        return {
          question: `sqrt(${root * root}) + ${bonus}`,
          answer: root + bonus,
          options: [],
          category: "Root Combo",
        };
      },
      () => {
        const root = randInt(2, 8);
        return {
          question: `cuberoot(${root ** 3})`,
          answer: root,
          options: [],
          category: "Cube Roots",
        };
      },
      () => {
        const a = randInt(2, 5);
        const b = randInt(3, 5);
        const c = randInt(3, 8);
        return {
          question: `${a}^${b} - ${c}`,
          answer: a ** b - c,
          options: [],
          category: "Power Sprint",
        };
      }
    );
  } else if (level <= 12) {
    generators.push(
      () => {
        const answer = randInt(2, 18);
        const a = randInt(3, 16);
        return {
          question: `x + ${a} = ${answer + a}`,
          answer,
          options: [],
          category: "Linear Algebra",
        };
      },
      () => {
        const answer = randInt(2, 12);
        const a = randInt(2, 8);
        const b = randInt(3, 16);
        return {
          question: `${a}x + ${b} = ${a * answer + b}`,
          answer,
          options: [],
          category: "Two-Step Algebra",
        };
      },
      () => {
        const answer = randInt(3, 12);
        const a = randInt(2, 6);
        const b = randInt(2, 12);
        return {
          question: `${a}(x - ${b}) = ${a * (answer - b)}`,
          answer,
          options: [],
          category: "Bracket Algebra",
        };
      }
    );
  } else {
    generators.push(
      () => {
        const answer = randInt(3, 11);
        const left = randInt(2, 5);
        const shift = randInt(2, 8);
        const bonus = randInt(3, 12);
        return {
          question: `${left}(x + ${shift}) - ${bonus} = ${left * (answer + shift) - bonus}`,
          answer,
          options: [],
          category: "Hybrid Algebra",
        };
      },
      () => {
        const root = randInt(9, 18);
        const mult = randInt(2, 5);
        const minus = randInt(4, 15);
        return {
          question: `sqrt(${root * root}) x ${mult} - ${minus}`,
          answer: root * mult - minus,
          options: [],
          category: "Rooted PEMDAS",
        };
      },
      () => {
        const answer = randInt(2, 9);
        const a = randInt(2, 5);
        const b = randInt(2, 4);
        const c = randInt(3, 9);
        return {
          question: `${a}x + ${b}^2 = ${a * answer + b ** 2 + c} - ${c}`,
          answer,
          options: [],
          category: "Power Algebra",
        };
      }
    );
  }

  const baseProblem = generators[randInt(0, generators.length - 1)]();
  return {
    ...baseProblem,
    level,
    timerMs,
    speed,
    ballCount,
    options: makeOptions(baseProblem.answer, ballCount, spread),
  };
}

function createBalls(problem: ExpertProblem) {
  const minX = TABLE_MARGIN + BALL_RADIUS;
  const maxX = WORLD_WIDTH - TABLE_MARGIN - BALL_RADIUS;
  const minY = HUD_HEIGHT + BALL_RADIUS + 16;
  const maxY = WORLD_HEIGHT - TABLE_MARGIN - BALL_RADIUS;
  const balls: PhysicsBall[] = [];

  problem.options.forEach((value, index) => {
    let x = WORLD_WIDTH / 2;
    let y = WORLD_HEIGHT / 2;
    let attempts = 0;

    do {
      x = randInt(minX, maxX);
      y = randInt(minY, maxY);
      attempts += 1;
    } while (
      attempts < 200 &&
      balls.some((ball) => {
        const dx = x - ball.x;
        const dy = y - ball.y;
        return Math.hypot(dx, dy) < ball.radius + BALL_RADIUS + 12;
      })
    );

    const angle = Math.random() * Math.PI * 2;
    balls.push({
      id: `${Date.now()}_${index}_${value}`,
      value,
      x,
      y,
      vx: Math.cos(angle) * problem.speed,
      vy: Math.sin(angle) * problem.speed,
      radius: BALL_RADIUS,
      color: BALL_COLORS[index % BALL_COLORS.length],
    });
  });

  return balls;
}

function resolvePhysics(balls: PhysicsBall[], dt: number) {
  const minX = TABLE_MARGIN + BALL_RADIUS;
  const maxX = WORLD_WIDTH - TABLE_MARGIN - BALL_RADIUS;
  const minY = HUD_HEIGHT + BALL_RADIUS + 16;
  const maxY = WORLD_HEIGHT - TABLE_MARGIN - BALL_RADIUS;
  const next = balls.map((ball) => ({
    ...ball,
    x: ball.x + ball.vx * dt,
    y: ball.y + ball.vy * dt,
  }));

  for (const ball of next) {
    if (ball.x <= minX || ball.x >= maxX) {
      ball.x = clamp(ball.x, minX, maxX);
      ball.vx *= -1;
    }
    if (ball.y <= minY || ball.y >= maxY) {
      ball.y = clamp(ball.y, minY, maxY);
      ball.vy *= -1;
    }
  }

  for (let i = 0; i < next.length; i += 1) {
    for (let j = i + 1; j < next.length; j += 1) {
      const first = next[i];
      const second = next[j];
      const dx = second.x - first.x;
      const dy = second.y - first.y;
      const distance = Math.hypot(dx, dy);
      const minDistance = first.radius + second.radius;

      if (distance === 0 || distance >= minDistance) {
        continue;
      }

      const nx = dx / distance;
      const ny = dy / distance;
      const overlap = minDistance - distance;
      first.x -= nx * overlap * 0.5;
      first.y -= ny * overlap * 0.5;
      second.x += nx * overlap * 0.5;
      second.y += ny * overlap * 0.5;

      const tx = -ny;
      const ty = nx;
      const v1n = first.vx * nx + first.vy * ny;
      const v1t = first.vx * tx + first.vy * ty;
      const v2n = second.vx * nx + second.vy * ny;
      const v2t = second.vx * tx + second.vy * ty;

      first.vx = v2n * nx + v1t * tx;
      first.vy = v2n * ny + v1t * ty;
      second.vx = v1n * nx + v2t * tx;
      second.vy = v1n * ny + v2t * ty;
    }
  }

  return next;
}

export default function EquationBilliards() {
  const { updateProgress } = useAuth();
  const { activeSkinEmoji } = useUnlocks();
  const [gameState, setGameState] = useState<GameState>("START");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [problem, setProblem] = useState<ExpertProblem>(() => createProblem(1));
  const [balls, setBalls] = useState<PhysicsBall[]>([]);
  const [timeLeft, setTimeLeft] = useState(problem.timerMs);
  const [statusText, setStatusText] = useState("Elite board. Mixed topics. No hiding.");

  const gameStateRef = useRef<GameState>("START");
  const scoreRef = useRef(0);
  const coinsRef = useRef(0);
  const livesRef = useRef(3);
  const clearsRef = useRef(0);
  const problemRef = useRef(problem);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const questionEndsAtRef = useRef(0);
  const slowUntilRef = useRef(0);
  const timeoutHandledRef = useRef(false);

  const endGame = useCallback(() => {
    if (gameStateRef.current !== "PLAYING") {
      return;
    }

    gameStateRef.current = "GAMEOVER";
    setGameState("GAMEOVER");
    void updateProgress(coinsRef.current, Math.floor(scoreRef.current / 100));

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = null;
  }, [updateProgress]);

  const loadProblem = useCallback((nextLevel: number) => {
    const nextProblem = createProblem(nextLevel);
    problemRef.current = nextProblem;
    setProblem(nextProblem);
    setLevel(nextLevel);
    setBalls(createBalls(nextProblem));
    setTimeLeft(nextProblem.timerMs);
    setStatusText(`${nextProblem.category} • ${nextProblem.ballCount} balls • ${Math.round(nextProblem.speed)} speed`);
    questionEndsAtRef.current = performance.now() + nextProblem.timerMs;
    slowUntilRef.current = performance.now() + 650;
    timeoutHandledRef.current = false;
  }, []);

  const advanceProblem = useCallback((wasCorrect: boolean) => {
    if (gameStateRef.current !== "PLAYING") {
      return;
    }

    if (wasCorrect) {
      const bonus = 180 + Math.round(timeLeft / 45) + Math.max(problemRef.current.level - 1, 0) * 12;
      const nextScore = scoreRef.current + bonus;
      const nextCoins = coinsRef.current + (problemRef.current.level >= 10 ? 4 : 3);
      const nextClears = clearsRef.current + 1;
      const nextLevel = Math.floor(nextClears / 3) + 1;

      scoreRef.current = nextScore;
      coinsRef.current = nextCoins;
      clearsRef.current = nextClears;
      setScore(nextScore);
      setCoins(nextCoins);
      setStatusText(`Clean shot. +${bonus} score`);
      loadProblem(nextLevel);
      return;
    }

    const nextLives = livesRef.current - 1;
    livesRef.current = nextLives;
    setLives(nextLives);
    setStatusText(nextLives > 0 ? "Missed line. New rack." : "Table cleared you out.");

    if (nextLives <= 0) {
      endGame();
      return;
    }

    loadProblem(level);
  }, [endGame, level, loadProblem, timeLeft]);

  const handleBallClick = useCallback((value: number) => {
    if (gameStateRef.current !== "PLAYING") {
      return;
    }

    advanceProblem(value === problemRef.current.answer);
  }, [advanceProblem]);

  const startGame = useCallback(() => {
    const firstProblem = createProblem(1);
    gameStateRef.current = "PLAYING";
    scoreRef.current = 0;
    coinsRef.current = 0;
    livesRef.current = 3;
    clearsRef.current = 0;
    problemRef.current = firstProblem;
    timeoutHandledRef.current = false;
    lastFrameRef.current = null;

    setGameState("PLAYING");
    setScore(0);
    setCoins(0);
    setLives(3);
    setLevel(1);
    setProblem(firstProblem);
    setBalls(createBalls(firstProblem));
    setTimeLeft(firstProblem.timerMs);
    setStatusText("Opening break. Read fast and strike clean.");
    questionEndsAtRef.current = performance.now() + firstProblem.timerMs;
    slowUntilRef.current = performance.now() + 700;

  }, []);

  useEffect(() => {
    if (gameState !== "PLAYING") {
      return;
    }

    const loop = (frameTime: number) => {
      if (gameStateRef.current !== "PLAYING") {
        return;
      }

      const previous = lastFrameRef.current ?? frameTime;
      const dt = Math.min((frameTime - previous) / 1000, 0.024);
      lastFrameRef.current = frameTime;

      if (frameTime >= slowUntilRef.current) {
        setBalls((current) => resolvePhysics(current, dt));
      }

      const remaining = Math.max(0, questionEndsAtRef.current - frameTime);
      setTimeLeft(remaining);

      if (remaining <= 0 && !timeoutHandledRef.current) {
        timeoutHandledRef.current = true;
        advanceProblem(false);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
    };
  }, [advanceProblem, gameState]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const timerRatio = timeLeft / problem.timerMs;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background:
          "radial-gradient(circle at top, rgba(16,185,129,0.18), transparent 28%), linear-gradient(180deg, #041217 0%, #02070a 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1080 }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 42,
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #f8fafc, #67e8f9, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Equation Billiards
          </h1>
          <p style={{ margin: "10px 0 0", color: "rgba(226,232,240,0.78)", fontSize: 16 }}>
            Expert table for roots, algebra, powers, and mixed operations.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            marginBottom: 18,
          }}
        >
          {[
            { label: "Skin", value: activeSkinEmoji },
            { label: "Level", value: level.toString() },
            { label: "Score", value: score.toLocaleString() },
            { label: "Coins", value: `🪙 ${coins}` },
            { label: "Lives", value: "❤️".repeat(lives) || "0" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                borderRadius: 24,
                padding: "14px 18px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(15,23,42,0.7)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ color: "rgba(148,163,184,0.88)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
                {item.label}
              </div>
              <div style={{ color: "white", fontSize: 24, fontWeight: 900, marginTop: 6 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: 34,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
            background: "linear-gradient(180deg, #0b1620 0%, #061017 100%)",
          }}
        >
          <svg viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`} style={{ display: "block", width: "100%", height: "auto" }}>
            <defs>
              <linearGradient id="felt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14532d" />
                <stop offset="55%" stopColor="#0f5130" />
                <stop offset="100%" stopColor="#0a3a22" />
              </linearGradient>
              <linearGradient id="rail" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c4a1d" />
                <stop offset="100%" stopColor="#4a2b10" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="#081217" />
            <rect x="14" y="14" width={WORLD_WIDTH - 28} height={WORLD_HEIGHT - 28} rx="34" fill="url(#rail)" />
            <rect x={TABLE_MARGIN} y={TABLE_MARGIN} width={WORLD_WIDTH - TABLE_MARGIN * 2} height={WORLD_HEIGHT - TABLE_MARGIN * 2} rx="26" fill="url(#felt)" />

            <rect
              x="84"
              y="44"
              width="832"
              height="92"
              rx="26"
              fill="rgba(3,7,18,0.74)"
              stroke="rgba(255,255,255,0.14)"
            />
            <text x="500" y="80" textAnchor="middle" fill="#67e8f9" fontSize="16" fontWeight="800" letterSpacing="3">
              {problem.category.toUpperCase()}
            </text>
            <text x="500" y="116" textAnchor="middle" fill="#f8fafc" fontSize="34" fontWeight="900">
              {problem.question}
            </text>

            <rect x="88" y="144" width="824" height="12" rx="6" fill="rgba(255,255,255,0.12)" />
            <rect x="88" y="144" width={824 * timerRatio} height="12" rx="6" fill={timerRatio > 0.45 ? "#22c55e" : timerRatio > 0.2 ? "#f59e0b" : "#ef4444"} />

            {balls.map((ball) => (
              <g
                key={ball.id}
                onPointerDown={() => handleBallClick(ball.value)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={ball.x} cy={ball.y} r={ball.radius} fill={ball.color} stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
                <circle cx={ball.x - 14} cy={ball.y - 14} r={ball.radius * 0.28} fill="rgba(255,255,255,0.28)" />
                <text x={ball.x} y={ball.y + 12} textAnchor="middle" fill="#ffffff" fontSize="30" fontWeight="900">
                  {ball.value}
                </text>
              </g>
            ))}
          </svg>

          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: 18,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: 999,
                padding: "10px 16px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(2,6,23,0.7)",
                color: "rgba(226,232,240,0.9)",
                fontWeight: 700,
              }}
            >
              {statusText}
            </div>
            <div
              style={{
                borderRadius: 999,
                padding: "10px 16px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(2,6,23,0.7)",
                color: "white",
                fontWeight: 900,
              }}
            >
              {Math.ceil(timeLeft / 1000)}s left
            </div>
          </div>

          {gameState === "START" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(2,6,23,0.76)",
                backdropFilter: "blur(8px)",
                padding: 24,
              }}
            >
              <div
                style={{
                  maxWidth: 680,
                  borderRadius: 32,
                  padding: 36,
                  textAlign: "center",
                  background: "rgba(15,23,42,0.92)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div style={{ fontSize: 64, marginBottom: 12 }}>🎱</div>
                <h2 style={{ color: "white", fontSize: 38, fontWeight: 900, margin: 0 }}>Equation Billiards</h2>
                <p style={{ color: "rgba(226,232,240,0.78)", lineHeight: 1.7, fontSize: 17, margin: "14px 0 24px" }}>
                  Read the question at the top, then sink the correct value before the timer expires.
                  The table gets faster, the rack gets denser, and the question pool opens into roots, powers, and algebra.
                </p>
                <button
                  onClick={startGame}
                  style={{
                    border: "none",
                    borderRadius: 999,
                    padding: "16px 34px",
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#082f49",
                    background: "linear-gradient(90deg, #facc15, #67e8f9)",
                    cursor: "pointer",
                  }}
                >
                  Break the Rack
                </button>
              </div>
            </div>
          )}

          {gameState === "GAMEOVER" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(12,6,6,0.8)",
                backdropFilter: "blur(8px)",
                padding: 24,
              }}
            >
              <div
                style={{
                  minWidth: 320,
                  borderRadius: 30,
                  padding: 34,
                  textAlign: "center",
                  background: "rgba(38,18,18,0.94)",
                  border: "1px solid rgba(248,113,113,0.28)",
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 10 }}>💥</div>
                <h2 style={{ color: "#fecaca", fontSize: 38, fontWeight: 900, margin: 0 }}>Scratch</h2>
                <div style={{ marginTop: 18, color: "white", fontSize: 48, fontWeight: 900 }}>{score.toLocaleString()}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginTop: 8 }}>
                  Final Score
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", marginTop: 16, fontWeight: 700 }}>
                  Reached level {level} and earned {coins} coins.
                </div>
                <button
                  onClick={startGame}
                  style={{
                    marginTop: 26,
                    border: "none",
                    borderRadius: 999,
                    padding: "16px 34px",
                    fontSize: 18,
                    fontWeight: 900,
                    color: "white",
                    background: "linear-gradient(90deg, #ef4444, #f59e0b)",
                    cursor: "pointer",
                  }}
                >
                  Rack Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
