import PrimeProtector from '@/components/games/PrimeProtector'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('prime-protector')

export default function PrimeProtectorPage() {
  return (
    <GamePageShell slug="prime-protector">
      <PrimeProtector />
    </GamePageShell>
  )
}
