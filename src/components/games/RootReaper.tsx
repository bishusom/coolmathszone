"use client";
import { PopperEngine, PopperProblem } from "./PopperEngine";
import React from "react";

/**
 * Root Reaper: A precision square root game.
 * Master perfect squares from 1 to 25^2 (625).
 */
export default function RootReaper() {
  const generateProblem = (score: number): PopperProblem => {
    const tier = Math.floor(score / 1500);
    
    let min = 1, max = 12;
    let isCube = false;

    if (tier === 1) {
      min = 10;
      max = 25;
    } else if (tier >= 2) {
      isCube = true;
      min = 1;
      max = 10;
    }

    const answer = Math.floor(Math.random() * (max - min + 1)) + min;
    const value = isCube ? Math.pow(answer, 3) : Math.pow(answer, 2);
    const question = <span>{isCube ? `∛${value}` : `√${value}`}</span>;

    const wrongSet = new Set<number>();
    let attempts = 0;
    while (wrongSet.size < 2 && attempts < 50) {
      attempts++;
      const offset = Math.floor(Math.random() * 5) + 1;
      const w = Math.random() > 0.5 ? answer + offset : Math.max(1, answer - offset);
      if (w !== answer) wrongSet.add(w);
    }
    const wrongArr = [...wrongSet];
    while (wrongArr.length < 2) wrongArr.push(answer + (wrongArr.length + 1) * 3);

    const options = [answer, wrongArr[0], wrongArr[1]].sort(() => Math.random() - 0.5);
    
    return { 
      question, 
      isCorrect: (val) => Number(val) === answer, 
      options 
    };
  };

  const getTierInfo = (score: number) => {
    const tier = Math.floor(score / 1500);
    const tierLabels = ["🟣 Apprentice (1-12)", "🔮 Master (13-25)", "💎 Legend (Cube Roots)"];
    const tierColors = ["#a78bfa", "#8b5cf6", "#d946ef"];
    return {
      label: tierLabels[Math.min(tier, 2)],
      color: tierColors[Math.min(tier, 2)],
    };
  };

  return (
    <PopperEngine
      title="Root Reaper"
      description={
        <>
          Harvest the <span style={{ color: "#a78bfa", fontWeight: 700 }}>square root</span> of each number!<br />
          Quick identification is key to keeping your streak alive.
        </>
      }
      generateProblem={generateProblem}
      getTierInfo={getTierInfo}
      colors={{
        gradientText: "linear-gradient(90deg, #a78bfa, #c084fc, #e879f9)",
        buttonGradient: "linear-gradient(90deg, #a78bfa, #8b5cf6)",
      }}
    />
  );
}
