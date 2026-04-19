import type { Metadata } from 'next'
import NumberScrambler from '@/components/games/NumberScrambler'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata: Metadata = buildGameMetadata('number-scramble')

export default function NumberScramblePage() {
  return (
    <GamePageShell slug="number-scramble">
      <NumberScrambler />
    </GamePageShell>
  )
}
