import EquationBilliards from '@/components/games/EquationBilliards'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('equation-billiards')

export default function EquationBilliardsPage() {
  return (
    <GamePageShell slug="equation-billiards">
      <EquationBilliards />
    </GamePageShell>
  )
}
