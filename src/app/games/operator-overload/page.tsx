import OperatorOverload from '@/components/games/OperatorOverload'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('operator-overload')

export default function OperatorOverloadPage() {
  return (
    <GamePageShell slug="operator-overload">
      <OperatorOverload />
    </GamePageShell>
  )
}
