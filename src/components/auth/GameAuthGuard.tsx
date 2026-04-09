'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabaseClient'
import { trackAuthPromptShown, trackAuthSignupCompleted, trackAuthSignupStarted } from '@/utils/analytics'

const PENDING_AUTH_EVENT_KEY = 'cmz_pending_auth_event'

interface GameAuthPromptContextValue {
  openPrompt: () => void
}

const GameAuthPromptContext = createContext<GameAuthPromptContextValue>({
  openPrompt: () => {},
})

export function GameAuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [showPrompt, setShowPrompt] = useState(false)

  const openPrompt = useCallback(() => {
    if (!user) {
      setShowPrompt(true)
    }
  }, [user])

  const closePrompt = useCallback(() => {
    setShowPrompt(false)
  }, [])

  const contextValue = useMemo(() => ({ openPrompt }), [openPrompt])

  return (
    <GameAuthPromptContext.Provider value={contextValue}>
      {children}
      {!user && showPrompt ? <GameAuthModal onClose={closePrompt} /> : null}
    </GameAuthPromptContext.Provider>
  )
}

export function useMeaningfulSuccessPrompt() {
  const { user } = useAuth()
  const { openPrompt } = useContext(GameAuthPromptContext)
  const hasPromptedRef = useRef(false)

  const triggerPrompt = useCallback(() => {
    if (user || hasPromptedRef.current) {
      return
    }

    hasPromptedRef.current = true
    openPrompt()
  }, [openPrompt, user])

  return { triggerPrompt }
}

function GameAuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    trackAuthPromptShown({ source: 'game_prompt' })
  }, [])

  const storePendingAuthEvent = (details: Record<string, string>) => {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(PENDING_AUTH_EVENT_KEY, JSON.stringify(details))
  }

  const clearPendingAuthEvent = () => {
    if (typeof window === 'undefined') return
    window.sessionStorage.removeItem(PENDING_AUTH_EVENT_KEY)
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const authMode = isSignUp ? 'sign_up' : 'sign_in'
    const baseDetails = {
      auth_mode: authMode,
      provider: 'password',
      source: 'game_prompt',
    }
    trackAuthSignupStarted(baseDetails)
    storePendingAuthEvent(baseDetails)
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.href,
          },
        })
        if (error) throw error
        trackAuthSignupCompleted({
          ...baseDetails,
          completion_state: data.session ? 'authenticated' : 'pending_verification',
        })
        setError('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err: unknown) {
      clearPendingAuthEvent()
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(String(err))
      }
    }
  }

  const handleGoogleLogin = async () => {
    const baseDetails = {
      auth_mode: isSignUp ? 'sign_up' : 'sign_in',
      provider: 'google',
      source: 'game_prompt',
    }
    trackAuthSignupStarted(baseDetails)
    storePendingAuthEvent(baseDetails)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href,
      },
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_0_50px_rgba(124,58,237,0.2)] backdrop-blur-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
        >
          Later
        </button>

        <div className="mb-6 text-center">
          <div className="mb-4 text-5xl">✨</div>
          <h2 className="text-3xl font-black text-white">Nice run. Save it?</h2>
          <p className="mt-2 font-medium text-white/70">
            Create an account to keep your scores, coins, skins, and progress across sessions.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/50 bg-red-500/20 p-3 text-center text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="mb-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 font-medium text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 font-medium text-white placeholder:text-white/50 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 py-4 font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:scale-[1.02] hover:from-fuchsia-500 hover:to-indigo-500"
          >
            {isSignUp ? 'Create Free Account' : 'Sign In'}
          </button>
        </form>

        <div className="mb-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="cursor-pointer text-sm font-bold uppercase tracking-wider text-white/70 transition-colors hover:text-white"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-white/10"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
      </div>
    </div>
  )
}
