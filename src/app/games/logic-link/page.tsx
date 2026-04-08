import LogicLink from '@/components/games/LogicLink'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('logic-link')

export default function LogicLinkPage() {
  return (
    <GamePageShell slug="logic-link">
      <LogicLink />
    </GamePageShell>
  )
}
