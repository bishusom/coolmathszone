'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { User } from '@supabase/supabase-js'
import { trackAuthSignupCompleted } from '@/utils/analytics'

const PENDING_AUTH_EVENT_KEY = 'cmz_pending_auth_event'

export interface Profile {
  username: string | null
  math_coins: number
  avatar_url: string | null
  xp: number
  unlocked_assets: string[]
  active_skin: string
  daily_streak: number
  last_login_date: string | null
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  refreshProfile: () => Promise<void>
  updateProgress: (coins: number, xp: number) => Promise<void>
  unlockAsset: (assetId: string) => Promise<void>
  setActiveSkin: (skinId: string) => Promise<void>
  spendCoins: (amount: number) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  user: null, profile: null, loading: true,
  refreshProfile: async () => {},
  updateProgress: async () => {},
  unlockAsset: async () => {},
  setActiveSkin: async () => {},
  spendCoins: async () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('username, math_coins, avatar_url, xp, unlocked_assets, active_skin, daily_streak, last_login_date')
      .eq('id', userId)
      .single()
    if (data) {
      // Normalise: ensure unlocked_assets always contains 'rocket' (default)
      const assets: string[] = data.unlocked_assets ?? []
      if (!assets.includes('rocket')) assets.unshift('rocket')
      setProfile({ ...data, unlocked_assets: assets, active_skin: data.active_skin ?? 'rocket' })
      // Update daily streak in the background
      updateDailyStreak(userId, data.last_login_date, data.daily_streak ?? 0)
    }
  }

  const updateDailyStreak = async (userId: string, lastLoginDate: string | null, currentStreak: number) => {
    const today = new Date().toISOString().split('T')[0]
    if (lastLoginDate === today) return // already updated today

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const newStreak = lastLoginDate === yesterday
      ? currentStreak + 1
      : 1

    await supabase
      .from('profiles')
      .update({ daily_streak: newStreak, last_login_date: today })
      .eq('id', userId)

    setProfile(prev => prev ? { ...prev, daily_streak: newStreak, last_login_date: today } : prev)
  }

  const updateProgress = async (addedCoins: number, addedXp: number) => {
    if (!user || !profile) return
    const newCoins = (profile.math_coins || 0) + addedCoins
    const newXp = (profile.xp || 0) + addedXp
    setProfile({ ...profile, math_coins: newCoins, xp: newXp })
    await supabase.from('profiles').update({ math_coins: newCoins, xp: newXp }).eq('id', user.id)
  }

  const unlockAsset = async (assetId: string) => {
    if (!user || !profile) return
    if (profile.unlocked_assets.includes(assetId)) return
    const updated = [...profile.unlocked_assets, assetId]
    setProfile({ ...profile, unlocked_assets: updated })
    await supabase.from('profiles').update({ unlocked_assets: updated }).eq('id', user.id)
  }

  const setActiveSkin = async (skinId: string) => {
    if (!user || !profile) return
    // Find the emoji for this skin id from the unlocked assets list
    setProfile({ ...profile, active_skin: skinId })
    await supabase.from('profiles').update({ active_skin: skinId }).eq('id', user.id)
  }

  const spendCoins = async (amount: number): Promise<boolean> => {
    if (!user || !profile) return false
    if ((profile.math_coins || 0) < amount) return false
    const newCoins = (profile.math_coins || 0) - amount
    setProfile({ ...profile, math_coins: newCoins })
    await supabase.from('profiles').update({ math_coins: newCoins }).eq('id', user.id)
    return true
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
        if (typeof window !== 'undefined') {
          const pendingAuthEvent = window.sessionStorage.getItem(PENDING_AUTH_EVENT_KEY)
          if (pendingAuthEvent) {
            try {
              const details = JSON.parse(pendingAuthEvent) as Record<string, string>
              trackAuthSignupCompleted({
                ...details,
                completion_state: 'authenticated',
              })
            } catch {
              trackAuthSignupCompleted({
                source: 'game_prompt',
                completion_state: 'authenticated',
              })
            }
            window.sessionStorage.removeItem(PENDING_AUTH_EVENT_KEY)
          }
        }
      }
      else setProfile(null)
    })
    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile: () => user ? fetchProfile(user.id) : Promise.resolve(), updateProgress, unlockAsset, setActiveSkin, spendCoins }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
