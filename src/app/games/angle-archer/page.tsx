import AngleArcher from '@/components/games/AngleArcher'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('angle-archer')

export default function AngleArcherPage() {
  return (
    <GamePageShell slug="angle-archer">
      <AngleArcher />
    </GamePageShell>
  )
}
