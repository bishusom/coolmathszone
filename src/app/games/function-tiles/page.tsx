import type { Metadata } from 'next'
import FunctionTiles from '@/components/games/FunctionTiles'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata: Metadata = buildGameMetadata('function-tiles')

export default function FunctionTilesPage() {
  return (
    <GamePageShell slug="function-tiles">
      <FunctionTiles />
    </GamePageShell>
  )
}
