import BinaryBridge from '@/components/games/BinaryBridge'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('binary-bridge')

export default function BinaryBridgePage() {
  return (
    <GamePageShell slug="binary-bridge">
      <BinaryBridge />
    </GamePageShell>
  )
}
