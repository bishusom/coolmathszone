"use client";
import { PopperEngine, PopperProblem } from "./PopperEngine";
import React from "react";

/**
 * Math Popper: Focused arithmetic game using the PopperEngine.
 * Interaction is click-to-pop for maximum precision.
 */
export default function MathPopper() {
  const generateProblem = (score: number): PopperProblem => {
    const tier = Math.floor(score / 1500); // 1500 per math tier
    let a = 0, b = 0, question = "", answer = 0;

    if (tier === 0) {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      question = `${a} + ${b}`;
      answer = a + b;
    } else if (tier === 1) {
      a = Math.floor(Math.random() * 15) + 6;
      b = Math.floor(Math.random() * a); // Ensures a - b is always >= 0
      question = `${a} - ${b}`;
      answer = a - b;
    } else if (tier === 2) {
      a = Math.floor(Math.random() * 10) + 2;
      b = Math.floor(Math.random() * 10) + 2;
      question = `${a} × ${b}`;
      answer = a * b;
    } else {
      a = Math.floor(Math.random() * 10) + 2;
      b = a * (Math.floor(Math.random() * 10) + 2);
      question = `${b} ÷ ${a}`;
      answer = b / a;
    }

    const wrongSet = new Set<number>();
    let attempts = 0;
    while (wrongSet.size < 2 && attempts < 50) {
      attempts++;
      const offset = Math.floor(Math.random() * 8) + 1;
      const w = Math.random() > 0.5 ? answer + offset : Math.max(0, answer - offset);
      if (w !== answer) wrongSet.add(w);
    }
    const wrongArr = [...wrongSet];
    while (wrongArr.length < 2) wrongArr.push(answer + (wrongArr.length + 1) * 9);

    const options = [answer, wrongArr[0], wrongArr[1]].sort(() => Math.random() - 0.5);
    
    return { 
      question, 
      isCorrect: (val) => val === answer, 
      options 
    };
  };

  const getTierInfo = (score: number) => {
    const tier = Math.floor(score / 1500);
    const tierLabels = ["➕ Addition", "➖ Subtraction", "✖️ Multiplier", "➗ Division"];
    const tierColors = ["#60a5fa", "#34d399", "#fb923c", "#f472b6"];
    return {
      label: tierLabels[Math.min(tier, 3)],
      color: tierColors[Math.min(tier, 3)],
    };
  };

  return (
    <PopperEngine
      title="Math Popper"
      description={
        <>
          Pop the <span style={{ color: "#facc15", fontWeight: 700 }}>correct bubble</span> that solves the equation.<br />
          Clicking a wrong value will burst your streak!
        </>
      }
      generateProblem={generateProblem}
      getTierInfo={getTierInfo}
      colors={{
        gradientText: "linear-gradient(90deg, #facc15, #fb923c, #f472b6)",
        buttonGradient: "linear-gradient(90deg, #facc15, #fb923c)",
      }}
    />
  );
}