import type { Metadata } from 'next'
import NumberScramble from '@/components/games/NumberScramble'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata: Metadata = buildGameMetadata('number-scramble')

export default function NumberScramblePage() {
  return (
    <GamePageShell slug="number-scramble">
      <NumberScramble />
    </GamePageShell>
  )
}
