'use client'

import { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import type { GameEntry } from '@/data/games'
import { trackGameOver, trackGameStart, trackGameWin } from '@/utils/analytics'

interface GameAnalyticsContextValue {
  game: GameEntry
}

const GameAnalyticsContext = createContext<GameAnalyticsContextValue | null>(null)

export function GameAnalyticsProvider({
  game,
  children,
}: {
  game: GameEntry
  children: React.ReactNode
}) {
  const value = useMemo(() => ({ game }), [game])

  return (
    <GameAnalyticsContext.Provider value={value}>
      {children}
    </GameAnalyticsContext.Provider>
  )
}

export function useGameRunAnalytics() {
  const context = useContext(GameAnalyticsContext)
  const hasTrackedWinRef = useRef(false)
  const hasTrackedGameOverRef = useRef(false)

  const trackStart = useCallback((details: Record<string, string | number> = {}) => {
    if (!context) return
    hasTrackedWinRef.current = false
    hasTrackedGameOverRef.current = false
    trackGameStart(context.game, details)
  }, [context])

  const trackWin = useCallback((details: Record<string, string | number> = {}) => {
    if (!context || hasTrackedWinRef.current) return
    hasTrackedWinRef.current = true
    trackGameWin(context.game, details)
  }, [context])

  const trackGameOverEvent = useCallback((details: Record<string, string | number> = {}) => {
    if (!context || hasTrackedGameOverRef.current) return
    hasTrackedGameOverRef.current = true
    trackGameOver(context.game, details)
  }, [context])

  return { trackStart, trackWin, trackGameOver: trackGameOverEvent }
}
