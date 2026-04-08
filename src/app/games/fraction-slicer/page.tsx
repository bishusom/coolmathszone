import FractionSlicer from '@/components/games/FractionSlicer'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('fraction-slicer')

export default function FractionSlicerPage() {
  return (
    <GamePageShell slug="fraction-slicer">
      <FractionSlicer />
    </GamePageShell>
  )
}
