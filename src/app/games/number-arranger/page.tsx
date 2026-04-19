import type { Metadata } from 'next'
import NumberArranger from '@/components/games/NumberArranger'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata: Metadata = buildGameMetadata('number-arranger')

export default function NumberArrangerPage() {
  return (
    <GamePageShell slug="number-arranger">
      <NumberArranger />
    </GamePageShell>
  )
}
