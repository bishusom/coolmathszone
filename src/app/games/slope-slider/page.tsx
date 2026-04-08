import SlopeSlider from '@/components/games/SlopeSlider'
import GamePageShell from '@/components/games/GamePageShell'
import { buildGameMetadata } from '@/data/games'

export const metadata = buildGameMetadata('slope-slider')

export default function SlopeSliderPage() {
  return (
    <GamePageShell slug="slope-slider">
      <SlopeSlider />
    </GamePageShell>
  )
}
