import RootReaper from '@/components/games/RootReaper'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('root-reaper')

export default function RootReaperPage() {
  return (
    <GamePageShell slug="root-reaper">
      <RootReaper />
    </GamePageShell>
  )
}
