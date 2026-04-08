import { createClient } from '@/lib/supabaseClient'
import { useAuth } from './AuthContext'

export function useGameLogic(gameId: number) {
  const { user, refreshProfile } = useAuth()
  const supabase = createClient()

  const saveGameSession = async (score: number, coinsEarned: number) => {
    if (!user) return; // Anonymous play for non-logged in users

    // 1. Update Profile Coins
    const { data: profile } = await supabase
      .from('profiles')
      .select('math_coins')
      .eq('id', user.id)
      .single()

    const newTotal = (profile?.math_coins || 0) + coinsEarned

    await supabase
      .from('profiles')
      .update({ math_coins: newTotal, updated_at: new Date() })
      .eq('id', user.id)

    // 2. Save Score Record 
    await supabase.from('game_scores').insert({
      user_id: user.id,
      game_id: gameId,
      score: score
    })

    refreshProfile()
  }

  return { saveGameSession }
}