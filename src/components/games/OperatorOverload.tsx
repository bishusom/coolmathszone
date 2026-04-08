"use client";
import { PopperEngine, PopperProblem } from "./PopperEngine";
import React from "react";

/**
 * Operator Overload: An Order of Operations (BODMAS) challenge.
 * Solve multi-step arithmetic problems by following rules of precedence.
 */
export default function OperatorOverload() {
  const generateProblem = (score: number): PopperProblem => {
    const tier = Math.floor(score / 1500);
    let question: React.ReactNode = "";
    let answer = 0;

    if (tier === 0) {
      // a + b * c OR a * b - c (Basic Precedence)
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 8) + 2;
      const c = Math.floor(Math.random() * 5) + 1;
      
      if (Math.random() > 0.5) {
        question = <span>{a} + {b} × {c}</span>;
        answer = a + (b * c);
      } else {
        question = <span>{b} × {c} - {a}</span>;
        answer = (b * c) - a;
      }
    } else {
      // (a + b) * c OR a * (b - c) (Introducing Brackets)
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const c = Math.floor(Math.random() * 5) + 2;

      if (Math.random() > 0.5) {
        question = <span>({a} + {b}) × {c}</span>;
        answer = (a + b) * c;
      } else {
        const big = Math.max(a, b);
        const small = Math.min(a, b);
        question = <span>{c} × ({big} - {small})</span>;
        answer = c * (big - small);
      }
    }

    const wrongSet = new Set<number>();
    let attempts = 0;
    while (wrongSet.size < 2 && attempts < 50) {
      attempts++;
      const offset = Math.floor(Math.random() * 10) + 1;
      const w = Math.random() > 0.5 ? answer + offset : answer - offset;
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
    const tierLabels = ["🟠 Ground Core (Basic)", "⚡ High Voltage (Brackets)"];
    const tierColors = ["#fb923c", "#f97316"];
    return {
      label: tierLabels[Math.min(tier, 1)],
      color: tierColors[Math.min(tier, 1)],
    };
  };

  return (
    <PopperEngine
      title="Operator Overload"
      description={
        <>
          Master the <span style={{ color: "#fb923c", fontWeight: 700 }}>order of operations</span> (BODMAS / PEMDAS)!<br />
          Quickly compute each equation to maintain your circuit stability.
        </>
      }
      generateProblem={generateProblem}
      getTierInfo={getTierInfo}
      colors={{
        gradientText: "linear-gradient(90deg, #fb923c, #f97316, #ea580c)",
        buttonGradient: "linear-gradient(90deg, #fb923c, #f97316)",
      }}
    />
  );
}
