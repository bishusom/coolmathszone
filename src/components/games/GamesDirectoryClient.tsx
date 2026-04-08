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

        <div className="flex flex-col gap-12">
          {sortedGroups.map((group) => (
            <section key={group.key}>
              <div className="mb-6 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-black text-white">
                    {group.label}
                  </h2>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                    {group.games.length} games
                  </span>
                </div>
                <p className="text-slate-200">
                  {group.description}
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                {group.games.map((game) => (
                  <div
                    key={game.slug}
                    className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10"
                  >
                    <div className={`absolute -right-24 -top-24 h-48 w-48 bg-gradient-to-br ${game.color} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
                    <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${game.color} opacity-50`} />

                    <div className="mb-6 flex items-start justify-between">
                      <div className={`flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br ${game.color} text-4xl text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        {game.icon}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-100 backdrop-blur-md">
                          {game.difficulty}
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-200 backdrop-blur-md">
                          {game.grade}
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-3 text-3xl font-black text-white transition-colors group-hover:text-indigo-200">{game.title}</h3>
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-cyan-200">{game.skill}</p>
                    <p className="mb-8 min-h-[72px] text-lg leading-relaxed text-white/70 lg:text-base">
                      {game.description}
                    </p>

                    <Link href={`/games/${game.slug}`}>
                      <button className={`w-full rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 active:scale-95 ${game.buttonColor}`}>
                        Play Game →
                      </button>
                    </Link>
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
