import { useAuth } from '@/context/AuthContext'
import { updatePlayerStats } from '@/lib/gameRewards'

export function useGameLogic() {
  const { user, refreshProfile } = useAuth()

  const updateRewards = async (gameId: number, score: number, coinsEarned: number) => {
    // Learning Section/Guest behavior: Skip if no user logged in
    if (!user) {
      console.log("Guest mode: Progress not saved.")
      return
    }

    try {
      await updatePlayerStats(user.id, gameId, score, coinsEarned)
      // Refresh the local context so the UI reflects the new coin count
      await refreshProfile() 
    } catch (error) {
      console.error("Error updating player rewards:", error)
    }
  }

  return { updateRewards }
}