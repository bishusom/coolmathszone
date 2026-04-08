import AlgebraDash from '@/components/games/AlgebraDash'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('algebra-dash')

export default function AlgebraDashPage() {
  return (
    <GamePageShell slug="algebra-dash">
      <AlgebraDash />
    </GamePageShell>
  )
}
