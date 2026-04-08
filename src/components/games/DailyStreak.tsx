import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

interface DailyStreakProps {
  compact?: boolean
}

export default function DailyStreak({ compact = false }: DailyStreakProps) {
  const { user, profile } = useAuth()
  const [animate, setAnimate] = useState(false)
  const streak = profile?.daily_streak ?? 0

  useEffect(() => {
    if (streak > 0) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [streak])

  if (!user) return null

  const streakLevel =
    streak >= 30 ? 'legendary' :
    streak >= 14 ? 'epic' :
    streak >= 7  ? 'hot' :
    streak >= 3  ? 'warm' : 'new'

  const gradients: Record<string, string> = {
    new:      'linear-gradient(135deg, #f97316, #fb923c)',
    warm:     'linear-gradient(135deg, #f97316, #ef4444)',
    hot:      'linear-gradient(135deg, #dc2626, #f97316)',
    epic:     'linear-gradient(135deg, #7c3aed, #ec4899)',
    legendary:'linear-gradient(135deg, #d97706, #f59e0b)',
  }

  const glows: Record<string, string> = {
    new:      'rgba(249,115,22,0.4)',
    warm:     'rgba(239,68,68,0.45)',
    hot:      'rgba(220,38,38,0.5)',
    epic:     'rgba(124,58,237,0.55)',
    legendary:'rgba(217,119,6,0.6)',
  }

  const labels: Record<string, string> = {
    new:      'Getting Warmed Up',
    warm:     'On a Roll!',
    hot:      'On Fire! 🔥',
    epic:     'Unstoppable! 💜',
    legendary: 'Legendary! 👑',
  }

  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: gradients[streakLevel],
          borderRadius: 24,
          padding: '6px 16px',
          boxShadow: `0 4px 16px ${glows[streakLevel]}`,
          animation: animate ? 'streakPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' : undefined,
        }}
      >
        <span style={{ fontSize: 18 }}>🔥</span>
        <span style={{ fontWeight: 900, color: 'white', fontSize: 16, lineHeight: 1 }}>
          {streak} day{streak !== 1 ? 's' : ''}
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, rgba(30,20,10,0.85), rgba(10,5,0,0.95))',
        border: `1px solid ${glows[streakLevel].replace('0.4)', '0.5)')}`,
        borderRadius: 24,
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        boxShadow: `0 8px 30px ${glows[streakLevel]}, inset 0 1px 1px rgba(255,255,255,0.06)`,
        backdropFilter: 'blur(12px)',
        animation: animate ? 'streakPop 0.5s cubic-bezier(0.34,1.56,0.64,1)' : undefined,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow orb background */}
      <div style={{
        position: 'absolute', top: '-30%', left: '-10%',
        width: 180, height: 180,
        background: gradients[streakLevel],
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.25,
        pointerEvents: 'none',
      }} />

      {/* Flame icon */}
      <div style={{
        fontSize: 52,
        lineHeight: 1,
        filter: `drop-shadow(0 0 12px ${glows[streakLevel]})`,
        animation: streak > 0 ? 'flameDance 1.5s ease-in-out infinite alternate' : undefined,
        position: 'relative',
        zIndex: 1,
      }}>
        🔥
      </div>

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 40,
          fontWeight: 900,
          color: 'white',
          lineHeight: 1,
          textShadow: `0 0 20px ${glows[streakLevel]}`,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>
          {streak}
          <span style={{ fontSize: 18, fontWeight: 700, marginLeft: 8, color: 'rgba(255,255,255,0.7)' }}>
            day{streak !== 1 ? 's' : ''}
          </span>
        </div>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: 1,
          marginTop: 4,
          textTransform: 'uppercase',
        }}>
          {labels[streakLevel]}
        </div>
      </div>

      {/* Milestone pips */}
      {streak > 0 && (
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: 5,
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
          maxWidth: 80,
          justifyContent: 'flex-end',
        }}>
          {[3, 7, 14, 30].map(milestone => (
            <div key={milestone} style={{
              width: 14, height: 14,
              borderRadius: '50%',
              background: streak >= milestone ? gradients[streakLevel] : 'rgba(255,255,255,0.1)',
              boxShadow: streak >= milestone ? `0 0 8px ${glows[streakLevel]}` : 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 7, fontWeight: 900, color: 'white',
            }}>
              {streak >= milestone ? '✓' : ''}
            </div>
          ))}
          <div style={{ width: '100%', textAlign: 'right', fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1 }}>
            3 · 7 · 14 · 30
          </div>
        </div>
      )}

      <style>{`
        @keyframes flameDance {
          from { transform: rotate(-5deg) scale(1); }
          to   { transform: rotate(5deg) scale(1.08); }
        }
        @keyframes streakPop {
          0%   { transform: scale(0.92); }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
