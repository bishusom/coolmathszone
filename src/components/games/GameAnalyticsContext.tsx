'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { GameEntry } from '@/data/games'
import { trackGameOver, trackGameStart, trackGameWin } from '@/utils/analytics'
import { useAuth } from '@/context/AuthContext'
import { saveGameScoreByName } from '@/lib/saveGameScore'

type ScoreSaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface GameAnalyticsContextValue {
  game: GameEntry
  resetScoreSave: () => void
  saveScore: (details: Record<string, string | number>) => Promise<void>
}

const GameAnalyticsContext = createContext<GameAnalyticsContextValue | null>(null)
const GameScoreSaveContext = createContext<{
  status: ScoreSaveStatus
  error: string | null
} | null>(null)

export function GameAnalyticsProvider({
  game,
  children,
}: {
  game: GameEntry
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [status, setStatus] = useState<ScoreSaveStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const hasSavedRef = useRef(false)

  const resetScoreSave = useCallback(() => {
    hasSavedRef.current = false
    setStatus('idle')
    setError(null)
  }, [])

  const saveScore = useCallback(async (details: Record<string, string | number>) => {
    if (hasSavedRef.current || !user) return

    const scoreValue = typeof details.score === 'number' ? details.score : Number(details.score)
    if (!Number.isFinite(scoreValue)) return

    hasSavedRef.current = true
    setStatus('saving')
    setError(null)

    try {
      await saveGameScoreByName({
        userId: user.id,
        gameName: game.title,
        score: scoreValue,
      })
      setStatus('saved')
    } catch (err) {
      hasSavedRef.current = false
      setStatus('error')
      setError(err instanceof Error ? err.message : String(err))
    }
  }, [game.title, user])

  const contextValue = useMemo(() => ({
    game,
    resetScoreSave,
    saveScore,
  }), [game, resetScoreSave, saveScore])

  return (
    <GameAnalyticsContext.Provider value={contextValue}>
      <GameScoreSaveContext.Provider value={{ status, error }}>
        {children}
      </GameScoreSaveContext.Provider>
    </GameAnalyticsContext.Provider>
  )
}

export function useGameRunAnalytics() {
  const context = useContext(GameAnalyticsContext)
  const { status, error } = useContext(GameScoreSaveContext) ?? { status: 'idle' as ScoreSaveStatus, error: null }
  const hasTrackedWinRef = useRef(false)
  const hasTrackedGameOverRef = useRef(false)

  const trackStart = useCallback((details: Record<string, string | number> = {}) => {
    if (!context) return
    hasTrackedWinRef.current = false
    hasTrackedGameOverRef.current = false
    context.resetScoreSave()
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
    void context.saveScore(details)
  }, [context])

  return { trackStart, trackWin, trackGameOver: trackGameOverEvent, scoreSaveStatus: status, scoreSaveError: error }
}

export function useGameScoreSaveStatus() {
  const context = useContext(GameScoreSaveContext)
  return context ?? { status: 'idle' as ScoreSaveStatus, error: null }
}
