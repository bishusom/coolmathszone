'use client'

import { useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/ui/Layout'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import DailyStreak from '@/components/games/DailyStreak'
import SkinShop from '@/components/games/SkinShop'
import { useAuth } from '@/context/AuthContext'
import { games } from '@/data/games'

type GameDifficultySortOrder = 'difficulty-asc' | 'difficulty-desc'

const difficultyConfig = [
  { key: 'Beginner', label: 'Beginner', description: 'Foundational arithmetic and confidence-building games for younger learners.' },
  { key: 'Intermediate', label: 'Intermediate', description: 'Fractions, logic, primes, angles, and multi-step reasoning challenges.' },
  { key: 'Advanced', label: 'Advanced', description: 'Faster algebra, graph-based thinking, and more demanding problem solving.' },
] as const

const difficultyThemes = {
  Beginner: {
    shell: 'border-cyan-200/15 bg-gradient-to-br from-cyan-950/35 via-slate-950/25 to-blue-950/35',
    headerPill: 'border-cyan-200/15 bg-cyan-400/10 text-cyan-50',
    headerLabel: 'text-cyan-100/80',
    title: 'text-cyan-50',
    description: 'text-cyan-50/72',
    count: 'border-cyan-200/15 bg-cyan-400/10 text-cyan-50',
    cardGlow: 'bg-gradient-to-br from-cyan-300/20 via-blue-300/10 to-transparent',
    cardHover: 'hover:border-cyan-300/25 hover:shadow-cyan-500/15',
    banner: 'Bubble Lab',
    bannerEmoji: '🫧',
    sectionTag: 'Warm-up Zone'
  },
  Intermediate: {
    shell: 'border-violet-200/15 bg-gradient-to-br from-violet-950/35 via-slate-950/25 to-indigo-950/35',
    headerPill: 'border-violet-200/15 bg-violet-400/10 text-violet-50',
    headerLabel: 'text-violet-100/80',
    title: 'text-violet-50',
    description: 'text-violet-50/72',
    count: 'border-violet-200/15 bg-violet-400/10 text-violet-50',
    cardGlow: 'bg-gradient-to-br from-violet-300/20 via-cyan-300/10 to-transparent',
    cardHover: 'hover:border-violet-300/25 hover:shadow-violet-500/15',
    banner: 'Logic Circuit',
    bannerEmoji: '⚡',
    sectionTag: 'Puzzle Lab'
  },
  Advanced: {
    shell: 'border-amber-200/15 bg-gradient-to-br from-amber-950/35 via-slate-950/25 to-rose-950/35',
    headerPill: 'border-amber-200/15 bg-amber-400/10 text-amber-50',
    headerLabel: 'text-amber-100/80',
    title: 'text-amber-50',
    description: 'text-amber-50/72',
    count: 'border-amber-200/15 bg-amber-400/10 text-amber-50',
    cardGlow: 'bg-gradient-to-br from-amber-300/20 via-rose-300/10 to-transparent',
    cardHover: 'hover:border-amber-300/25 hover:shadow-amber-500/15',
    banner: 'Challenge Vault',
    bannerEmoji: '🏆',
    sectionTag: 'Boss Mode'
  },
} as const

const difficultyRank: Record<string, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
}

export default function GamesDirectoryClient() {
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<GameDifficultySortOrder>('difficulty-asc')
  const { profile, user } = useAuth()

  const groupedGames = difficultyConfig.map((difficulty) => ({
    ...difficulty,
    games: games.filter((game) => game.difficulty === difficulty.key),
  }))

  const sortedGroups = [...groupedGames].sort((a, b) => {
    const rankA = difficultyRank[a.key]
    const rankB = difficultyRank[b.key]

    return sortOrder === 'difficulty-asc' ? rankA - rankB : rankB - rankA
  })

  return (
    <Layout backgroundClass="gradient-ocean-blue">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Games' },
          ]}
          className="mb-6"
        />

        <div className="mb-8 rounded-[2rem] border border-white/15 bg-slate-950/35 p-6 text-white shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
            <DailyStreak />

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
                  <span className="text-2xl">🪙</span>
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase leading-none text-white/50">Your Balance</div>
                    <div className="text-lg font-black leading-none text-amber-400">{(profile?.math_coins ?? 0).toLocaleString()}</div>
                  </div>
                </div>
              ) : null}

              <button
                onClick={() => setIsShopOpen(true)}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:from-indigo-500 hover:to-purple-500 active:scale-95"
              >
                <span className="text-xl">🛍️</span>
                Skin Shop
              </button>
            </div>
          </div>

          <div className="mb-6 text-center">
            <div className="mb-4 inline-block rounded-full border border-white/10 bg-indigo-100/10 px-4 py-1 text-sm font-bold uppercase tracking-wider text-cyan-100 backdrop-blur-sm">
              Interactive Learning Arcade
            </div>
            <h1 className="mb-4 text-5xl font-black md:text-6xl">
              <span className="bg-gradient-to-r from-blue-100 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                CoolMathsZone Games
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-200">
              Choose your challenge, level up your maths fluency, and move between games through a connected arcade instead of isolated pages.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {games.slice(0, 5).map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
              >
                {game.title}
              </Link>
            ))}
          </div>
        </div>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {games.length} Games Across 3 Difficulty Levels
            </h2>
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-600">Sort by:</span>
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setSortOrder('difficulty-asc')}
                  className={`rounded-md px-4 py-2 font-medium transition-all ${sortOrder === 'difficulty-asc'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  Difficulty ↑
                </button>
                <button
                  onClick={() => setSortOrder('difficulty-desc')}
                  className={`rounded-md px-4 py-2 font-medium transition-all ${sortOrder === 'difficulty-desc'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  Difficulty ↓
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-10">
          {sortedGroups.map((group) => (
            <section
              key={group.key}
              className={`relative overflow-hidden rounded-[2.25rem] border p-5 shadow-[0_20px_70px_rgba(2,8,23,0.18)] backdrop-blur-xl md:p-6 ${difficultyThemes[group.key].shell}`}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${group.key === 'Beginner' ? 'from-cyan-300/10 via-cyan-200/70 to-cyan-300/10' : group.key === 'Intermediate' ? 'from-violet-300/10 via-violet-200/70 to-violet-300/10' : 'from-amber-300/10 via-amber-200/70 to-amber-300/10'}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)] opacity-60" />

              <div className="relative mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] backdrop-blur-md ${difficultyThemes[group.key].headerPill}`}>
                    <span className="text-base leading-none">{difficultyThemes[group.key].bannerEmoji}</span>
                    <span>{difficultyThemes[group.key].banner}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className={`text-2xl font-black md:text-3xl ${difficultyThemes[group.key].title}`}>
                      {group.label}
                    </h2>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${difficultyThemes[group.key].count}`}>
                      {group.games.length} games
                    </span>
                  </div>
                  <p className={`mt-2 max-w-2xl text-sm leading-relaxed md:text-base ${difficultyThemes[group.key].description}`}>
                    {group.description}
                  </p>
                </div>

                <div className={`inline-flex w-fit items-center gap-2 rounded-2xl border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-md ${difficultyThemes[group.key].headerPill}`}>
                  <span className="text-base">✦</span>
                  {difficultyThemes[group.key].sectionTag}
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.games.map((game) => (
                  <div
                    key={game.slug}
                    className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 p-5 shadow-[0_18px_60px_rgba(2,8,23,0.28)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-6 ${difficultyThemes[group.key].cardHover}`}
                  >
                    <div className={`absolute inset-0 ${difficultyThemes[group.key].cardGlow} opacity-[0.28] transition-opacity duration-500 group-hover:opacity-[0.45]`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.12]`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)] opacity-70" />
                    <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${game.color} opacity-10 blur-3xl transition-transform duration-500 group-hover:scale-110 md:h-44 md:w-44`} />
                    <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${game.color} opacity-70`} />

                    <div className="relative mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] bg-gradient-to-br ${game.color} text-3xl text-white shadow-[0_12px_30px_rgba(15,23,42,0.35)] ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}>
                          {game.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/90 backdrop-blur-md">
                            {game.grade}
                          </div>
                          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/65 backdrop-blur-md">
                            {game.difficulty}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-2 text-2xl font-black tracking-tight text-white transition-colors group-hover:text-cyan-100">{game.title}</h3>
                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200/90 md:text-xs">{game.skill}</p>
                    <p className="mb-5 min-h-[56px] text-sm leading-relaxed text-white/72 md:text-[15px]">
                      {game.description}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={`/games/${game.slug}`}
                        className={`relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl px-5 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 active:scale-95 ${game.buttonColor}`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Play Game
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <SkinShop isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
    </Layout>
  )
}
