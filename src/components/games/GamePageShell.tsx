import Link from 'next/link'
import Layout from '@/components/ui/Layout'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { GameAuthGuard } from '@/components/auth/GameAuthGuard'
import { GameAnalyticsProvider } from '@/components/games/GameAnalyticsContext'
import { getAdjacentGames, getGameBySlug, getRelatedGames } from '@/data/games'

interface GamePageShellProps {
  slug: string
  children: React.ReactNode
}

export default function GamePageShell({ slug, children }: GamePageShellProps) {
  const game = getGameBySlug(slug)

  if (!game) {
    throw new Error(`Unknown game slug: ${slug}`)
  }

  const { previous, next } = getAdjacentGames(slug)
  const relatedGames = getRelatedGames(slug)

  return (
    <Layout backgroundClass="gradient-ocean-blue">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Games', href: '/games' },
            { label: game.title },
          ]}
          className="mb-6"
        />

        <div className="mb-8 rounded-[2rem] border border-white/15 bg-slate-950/40 p-6 text-white shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${game.color} text-3xl shadow-lg`}>
              {game.icon}
            </span>
            <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              {game.skill}
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-100">
              {game.grade}
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="mb-3 text-4xl font-black text-white md:text-5xl">
                {game.heading}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-200">
                {game.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/games" className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-bold text-white transition-colors hover:bg-white/15">
                All Games
              </Link>
              {previous ? (
                <Link href={`/games/${previous.slug}`} className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 font-bold text-cyan-100 transition-colors hover:bg-cyan-400/20">
                  ← {previous.title}
                </Link>
              ) : null}
              {next ? (
                <Link href={`/games/${next.slug}`} className="rounded-2xl border border-indigo-300/20 bg-indigo-400/10 px-5 py-3 font-bold text-indigo-100 transition-colors hover:bg-indigo-400/20">
                  {next.title} →
                </Link>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {relatedGames.map((relatedGame) => (
              <Link
                key={relatedGame.slug}
                href={`/games/${relatedGame.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
              >
                {relatedGame.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full px-0 md:px-2">
          <GameAnalyticsProvider game={game}>
            <GameAuthGuard>
              {children}
            </GameAuthGuard>
          </GameAnalyticsProvider>
        </div>

        <div className="mt-12 rounded-[2rem] border border-dashed border-cyan-300/30 bg-white p-6 text-center shadow-lg">
          <h2 className="mb-2 text-xl font-bold text-sky-800">How to Play</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            {game.howToPlay}
          </p>
        </div>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Keep Exploring Games</h2>
              <p className="text-slate-600">Use internal links to move between related math challenges instead of ending on a single game page.</p>
            </div>
            <Link href="/games" className="font-bold text-blue-700 transition-colors hover:text-cyan-600">
              Browse arcade →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedGames.map((relatedGame) => (
              <Link
                key={relatedGame.slug}
                href={`/games/${relatedGame.slug}`}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${relatedGame.color} text-2xl shadow-lg`}>
                  {relatedGame.icon}
                </div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {relatedGame.grade}
                </p>
                <h3 className="mb-2 text-xl font-black text-slate-900 transition-colors group-hover:text-blue-700">
                  {relatedGame.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {relatedGame.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
