"use client";
import React from "react";
import { PopperEngine, PopperProblem } from "./PopperEngine";

/**
 * Prime Protector: A high-precision click-to-pop game for identifying primes.
 * Success depends on quick identification and accurate clicking.
 */
export default function PrimeProtector() {
  
  const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const getRandomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateProblem = (score: number): PopperProblem => {
    const tier = Math.floor(score / 1500);
    
    let min = 2, max = 30;
    if (tier === 1) max = 80;
    if (tier === 2) max = 150;
    if (tier >= 3) max = 300;

    // Pick a prime as the 'answer' for current engine architecture
    let targetPrime = 2;
    let attempts = 0;
    while (attempts < 100) {
      const n = getRandomInRange(min, max);
      if (isPrime(n)) {
        targetPrime = n;
        break;
      }
      attempts++;
    }

    // Pick 2 composites
    const wrongArr: number[] = [];
    attempts = 0;
    while (wrongArr.length < 2 && attempts < 100) {
      const w = getRandomInRange(min, max);
      if (!isPrime(w) && w !== targetPrime && !wrongArr.includes(w)) {
        if (tier >= 3 && Math.random() > 0.6) {
           const trickyOptions = [91, 51, 57, 119, 133, 161, 203, 217, 221];
           const tricky = trickyOptions[Math.floor(Math.random() * trickyOptions.length)];
           if (!wrongArr.includes(tricky) && tricky !== targetPrime) {
             wrongArr.push(tricky);
             continue;
           }
        }
        wrongArr.push(w);
      }
      attempts++;
    }

    const options = [targetPrime, ...wrongArr].sort(() => Math.random() - 0.5);
    
    return {
      question: <span style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>FIND THE <span style={{ color: "#fbbf24" }}>PRIME</span></span>,
      isCorrect: (val) => isPrime(Number(val)),
      options
    };
  };

  const getTierInfo = (score: number) => {
    const tier = Math.floor(score / 1500);
    const labels = ["🥉 Novice (2-30)", "🥈 Adept (2-80)", "🥇 Expert (2-150)", "💎 Legend (2-300)"];
    const colors = ["#60a5fa", "#34d399", "#fb923c", "#f472b6"];
    return {
      label: labels[Math.min(tier, 3)],
      color: colors[Math.min(tier, 3)],
    };
  };

  return (
    <PopperEngine
      title="Prime Protector"
      description={
        <>
          Scan the floating numbers and <span style={{ color: "#34d399", fontWeight: 700 }}>Pop the Primes!</span><br />
          Clicking a composite number will burst a heart.
        </>
      }
      generateProblem={generateProblem}
      getTierInfo={getTierInfo}
      colors={{
        gradientText: "linear-gradient(90deg, #34d399, #10b981, #059669)",
        buttonGradient: "linear-gradient(90deg, #34d399, #059669)",
      }}
    />
  );
}
