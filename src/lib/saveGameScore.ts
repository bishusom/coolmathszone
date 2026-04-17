import { createClient } from '@/lib/supabaseClient'

const gameIdCache = new Map<string, number>()

export async function saveGameScoreByName(params: {
  userId: string
  gameName: string
  score: number
}) {
  const { userId, gameName, score } = params
  const supabase = createClient()

  let gameId = gameIdCache.get(gameName)

  if (!gameId) {
    const { data, error } = await supabase
      .from('games')
      .select('id')
      .eq('name', gameName)
      .single()

    if (error || !data) {
      throw new Error(`Could not resolve game id for ${gameName}`)
    }

    gameId = data.id
    if (typeof gameId !== 'number') {
      throw new Error(`Invalid game id for ${gameName}`)
    }
    gameIdCache.set(gameName, gameId)
  }

  const { error } = await supabase.from('game_scores').insert({
    user_id: userId,
    game_id: gameId,
    score,
  })

  if (error) {
    throw error
  }
}
