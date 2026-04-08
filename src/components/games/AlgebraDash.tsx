"use client";
import { PopperEngine, PopperProblem } from "./PopperEngine";
import React from "react";

/**
 * Algebra Dash: Precision algebra solving using the PopperEngine.
 * Eliminates the difficulty of rocket positioning, focusing on quick mental algebra.
 */
export default function AlgebraDash() {
  const generateProblem = (score: number): PopperProblem => {
    const tier = Math.floor(score / 1500);
    let a: number = 0, b: number = 0, c: number = 0;
    let question: React.ReactNode = "";
    let answer: number = 0;

    if (tier === 0) {
      // x + a = b
      a = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 10) + 1;
      b = a + answer;
      question = <span>x + {a} = {b}</span>;
    } else if (tier === 1) {
      // a * x = b
      a = Math.floor(Math.random() * 9) + 2;
      answer = Math.floor(Math.random() * 10) + 2;
      b = a * answer;
      question = <span>{a}x = {b}</span>;
    } else if (tier === 2) {
      // a * x + b = c
      a = Math.floor(Math.random() * 6) + 2;
      b = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 8) + 2;
      c = a * answer + b;
      question = <span>{a}x + {b} = {c}</span>;
    } else {
      // a * x - b = c
      a = Math.floor(Math.random() * 6) + 2;
      b = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 8) + 2;
      c = a * answer - b;
      question = <span>{a}x - {b} = {c}</span>;
    }

    const wrongSet = new Set<number>();
    let attempts = 0;
    while (wrongSet.size < 2 && attempts < 50) {
      attempts++;
      const offset = Math.floor(Math.random() * 6) + 1;
      const w = Math.random() > 0.5 ? answer + offset : Math.max(1, answer - offset);
      if (w !== answer) wrongSet.add(w);
    }
    const wrongArr = [...wrongSet];
    while (wrongArr.length < 2) wrongArr.push(answer + (wrongArr.length + 1) * 7);

    const options = [answer, wrongArr[0], wrongArr[1]].sort(() => Math.random() - 0.5);
    
    return { 
      question, 
      isCorrect: (val) => Number(val) === answer, 
      options 
    };
  };

  const getTierInfo = (score: number) => {
    const tier = Math.floor(score / 1500);
    const tierLabels = ["🔵 Basic Addition", "🟢 Multiplication", "🟡 Double Step", "🔴 Complex Combo"];
    const tierColors = ["#60a5fa", "#34d399", "#facc15", "#ef4444"];
    return {
      label: tierLabels[Math.min(tier, 3)],
      color: tierColors[Math.min(tier, 3)],
    };
  };

  return (
    <PopperEngine
      title="Algebra Dash"
      description={
        <>
          Solve for <strong style={{ color: "#22d3ee" }}>x</strong> and pop the correct bubble!<br />
          Speed and accuracy are key to mastering algebra.
        </>
      }
      generateProblem={generateProblem}
      getTierInfo={getTierInfo}
      colors={{
        gradientText: "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)",
        buttonGradient: "linear-gradient(90deg, #0ea5e9, #6366f1)",
      }}
    />
  );
}
