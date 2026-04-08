import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabaseClient'
import { useCallback, useMemo, useState } from 'react'

// ── Skin catalogue (mirrors what's seeded in the migration) ──────────────────
export interface SkinAsset {
  id: string
  name: string
  emoji: string
  costCoins: number
  requiredModule: string | null
  isDefault: boolean
}

export const SKIN_CATALOGUE: SkinAsset[] = [
  { id: 'rocket',    name: 'Rocket',      emoji: '🚀', costCoins: 0,   requiredModule: null,                  isDefault: true  },
  { id: 'ufo',       name: 'UFO',         emoji: '🛸', costCoins: 50,  requiredModule: null,                  isDefault: false },
  { id: 'dragon',    name: 'Dragon',      emoji: '🐉', costCoins: 150, requiredModule: null,                  isDefault: false },
  { id: 'lightning', name: 'Lightning',   emoji: '⚡', costCoins: 75,  requiredModule: null,                  isDefault: false },
  { id: 'star',      name: 'Star',        emoji: '🌟', costCoins: 100, requiredModule: null,                  isDefault: false },
  { id: 'robot',     name: 'Robot',       emoji: '🤖', costCoins: 80,  requiredModule: null,                  isDefault: false },
  { id: 'crystal',   name: 'Crystal',     emoji: '💎', costCoins: 200, requiredModule: null,                  isDefault: false },
  { id: 'wizard',    name: 'Math Wizard', emoji: '🧙', costCoins: 0,   requiredModule: 'multiplication',      isDefault: false },
  { id: 'phoenix',   name: 'Phoenix',     emoji: '🦅', costCoins: 0,   requiredModule: 'fractions',           isDefault: false },
  { id: 'infinity',  name: 'Infinity',    emoji: '♾️',  costCoins: 0,   requiredModule: 'algebra-equations',  isDefault: false },
]

const GUEST_UNLOCKS_KEY = 'cmz_guest_unlocked_assets'
const GUEST_ACTIVE_SKIN_KEY = 'cmz_guest_active_skin'

function getInitialGuestUnlockedIds(): string[] {
  if (typeof window === 'undefined') return ['rocket']

  const storedUnlocks = window.localStorage.getItem(GUEST_UNLOCKS_KEY)
  if (!storedUnlocks) return ['rocket']

  try {
    const parsed = JSON.parse(storedUnlocks) as string[]
    return parsed.includes('rocket') ? parsed : ['rocket', ...parsed]
  } catch {
    return ['rocket']
  }
}

function getInitialGuestActiveSkinId(): string {
  if (typeof window === 'undefined') return 'rocket'
  return window.localStorage.getItem(GUEST_ACTIVE_SKIN_KEY) ?? 'rocket'
}

export function getSkinEmoji(skinId: string): string {
  return SKIN_CATALOGUE.find(s => s.id === skinId)?.emoji ?? '🚀'
}

// ── useUnlocks hook ────────────────────────────────────────────────────────────
export function useUnlocks() {
  const { user, profile, unlockAsset, setActiveSkin, spendCoins, refreshProfile } = useAuth()
  const [guestUnlockedIds, setGuestUnlockedIds] = useState<string[]>(getInitialGuestUnlockedIds)
  const [guestActiveSkinId, setGuestActiveSkinId] = useState(getInitialGuestActiveSkinId)

  const unlockedIds: string[] = useMemo(() => {
    if (user) return profile?.unlocked_assets ?? ['rocket']
    return guestUnlockedIds
  }, [guestUnlockedIds, profile?.unlocked_assets, user])

  const activeSkinId: string = user
    ? profile?.active_skin ?? 'rocket'
    : guestActiveSkinId
  const activeSkinEmoji: string = getSkinEmoji(activeSkinId)

  const persistGuestUnlocks = useCallback((nextUnlockedIds: string[]) => {
    setGuestUnlockedIds(nextUnlockedIds)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(GUEST_UNLOCKS_KEY, JSON.stringify(nextUnlockedIds))
    }
  }, [])

  const persistGuestActiveSkin = useCallback((skinId: string) => {
    setGuestActiveSkinId(skinId)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(GUEST_ACTIVE_SKIN_KEY, skinId)
    }
  }, [])

  /**
   * Purchase a skin from the shop using coins.
   * Returns: 'ok' | 'insufficient_coins' | 'already_owned' | 'not_logged_in'
   */
  const purchaseSkin = useCallback(async (
    skinId: string
  ): Promise<'ok' | 'insufficient_coins' | 'already_owned' | 'not_logged_in'> => {
    if (!user) return 'not_logged_in'
    if (unlockedIds.includes(skinId)) return 'already_owned'

    const skin = SKIN_CATALOGUE.find(s => s.id === skinId)
    if (!skin) return 'not_logged_in'

    const success = await spendCoins(skin.costCoins)
    if (!success) return 'insufficient_coins'

    await unlockAsset(skinId)
    return 'ok'
  }, [user, unlockedIds, spendCoins, unlockAsset])

  /**
   * Called when a user completes a math module on the main site.
   * Checks if the module grants a skin, and if so, unlocks it.
   */
  const checkModuleUnlock = useCallback(async (moduleId: string) => {
    const matching = SKIN_CATALOGUE.filter(s => s.requiredModule === moduleId)

    if (matching.length === 0) return

    if (!user) {
      const nextUnlockedIds = [...new Set([...unlockedIds, ...matching.map((skin) => skin.id)])]
      persistGuestUnlocks(nextUnlockedIds)

      if (!nextUnlockedIds.includes(guestActiveSkinId)) {
        persistGuestActiveSkin('rocket')
      }
      return
    }

    const supabase = createClient()

    // Record module completion
    await supabase.from('module_completions').upsert({
      user_id: user.id,
      module_id: moduleId,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,module_id' })

    // Check if any skin is gated on this module
    for (const skin of matching) {
      await unlockAsset(skin.id)
    }

    await refreshProfile()
  }, [guestActiveSkinId, persistGuestActiveSkin, persistGuestUnlocks, refreshProfile, unlockAsset, unlockedIds, user])

  const equipSkin = useCallback(async (skinId: string) => {
    if (!unlockedIds.includes(skinId)) return
    if (!user) {
      persistGuestActiveSkin(skinId)
      return
    }
    await setActiveSkin(skinId)
  }, [persistGuestActiveSkin, setActiveSkin, unlockedIds, user])

  return {
    unlockedIds,
    activeSkinId,
    activeSkinEmoji,
    catalogue: SKIN_CATALOGUE,
    purchaseSkin,
    equipSkin,
    checkModuleUnlock,
  }
}
