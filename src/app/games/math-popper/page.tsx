import MathPopper from '@/components/games/MathPopper'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('math-popper')

export default function MathPopperPage() {
  return (
    <GamePageShell slug="math-popper">
      <MathPopper />
    </GamePageShell>
  )
}
