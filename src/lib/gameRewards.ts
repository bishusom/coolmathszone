import { createClient } from '@/lib/supabaseClient'

/**
 * Handles the logic for updating user currency and scores.
 * This is abstracted so you can swap the database provider easily.
 */
export const updatePlayerStats = async (
  userId: string, 
  gameId: number, 
  newScore: number, 
  coinsToEntry: number
) => {
  const supabase = createClient()

  // 1. Fetch current profile data
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('math_coins')
    .eq('id', userId)
    .single()

  if (fetchError) throw new Error('Could not retrieve profile')

  // 2. Calculate new totals
  const updatedTotalCoins = (profile?.math_coins || 0) + coinsToEntry

  // 3. Update the Profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ 
      math_coins: updatedTotalCoins,
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId)

  if (profileError) throw profileError

  // 4. Record the specific Game Session
  const { error: scoreError } = await supabase
    .from('game_scores')
    .insert({
      user_id: userId,
      game_id: gameId,
      score: newScore
    })

  if (scoreError) throw scoreError

  return { success: true }
}