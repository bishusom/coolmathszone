'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Layout from '@/components/ui/Layout'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabaseClient'

type ScoreEntry = {
  score: number
  created_at: string
  games: {
    name: string
  }[] | null
}

export default function ProfilePageClient() {
  const { user, profile, loading, refreshProfile } = useAuth()
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect')

  useEffect(() => {
    if (user) {
      supabase
        .from('game_scores')
        .select('score, created_at, games(name)')
        .eq('user_id', user.id)
        .order('score', { ascending: false })
        .limit(5)
        .then(({ data }) => setScores((data ?? []) as ScoreEntry[]))
    }
  }, [user, supabase])

  const handleUpdateUsername = async () => {
    if (!user) return
    setSaving(true)
    setError(null)

    const { error } = await supabase
      .from('profiles')
      .update({ username: newUsername, updated_at: new Date().toISOString() })
      .eq('id', user.id)

    if (error) {
      setError(error.message)
    } else {
      setIsEditing(false)
      if (refreshProfile) await refreshProfile()
    }
    setSaving(false)
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/profile${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`,
      },
    })
  }

  useEffect(() => {
    if (user && redirectPath && redirectPath !== '/profile') {
      router.push(redirectPath)
    }
  }, [user, redirectPath, router])

  if (loading) {
    return (
      <Layout backgroundClass="gradient-ocean-blue">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout backgroundClass="gradient-ocean-blue">
        <div className="max-w-2xl mx-auto my-20 p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-magic-purple to-sunshine" />

          <div className="text-6xl mb-6 animate-float">✨</div>
          <h2 className="text-4xl font-black text-white mb-4">Adventure Awaits!</h2>
          <p className="text-xl text-cyan-50 mb-10 leading-relaxed font-medium">Log in to start collecting Math Coins, tracking your high scores, and unlocking special badges.</p>

          <button
            onClick={handleGoogleLogin}
            className="group relative bg-white hover:bg-cyan-50 text-slate-800 font-black py-4 px-10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-4 mx-auto transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </Layout>
    )
  }

  const displayName = profile?.username || user.email?.split('@')[0] || 'Math Explorer'

  return (
    <Layout backgroundClass="gradient-ocean-blue">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <div className="relative group overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[3rem] shadow-2xl mb-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-magic-purple/10 pointer-events-none" />

          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-cyan-400 to-blue-600 p-1 shadow-2xl transform transition-transform group-hover:rotate-3 duration-500">
              <div className="w-full h-full bg-slate-900 rounded-[1.8rem] overflow-hidden flex items-center justify-center text-6xl shadow-inner border border-white/10">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="animate-float">🚀</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-400 w-8 h-8 rounded-full border-4 border-[#0b1120] shadow-lg" />
          </div>

          <div className="flex-grow text-center md:text-left relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-2xl font-black text-white focus:outline-none focus:border-cyan-400 min-w-0"
                    autoFocus
                  />
                  <button
                    onClick={handleUpdateUsername}
                    disabled={saving}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {saving ? '...' : '✅'}
                  </button>
                  <button
                    onClick={() => { setIsEditing(false); setNewUsername(profile?.username || ''); }}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all cursor-pointer"
                  >
                    ❌
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                    {displayName}
                  </h1>
                  <button
                    onClick={() => {
                      setNewUsername(profile?.username || '')
                      setIsEditing(true)
                    }}
                    className="opacity-50 hover:opacity-100 text-cyan-300 text-sm font-bold uppercase tracking-widest transition-all cursor-pointer bg-white/5 px-3 py-1 rounded-full border border-white/10"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {error && <p className="text-red-400 text-sm mb-2 font-bold">{error}</p>}

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-cyan-100/70 font-bold uppercase tracking-wider text-sm">
              <span className="flex items-center gap-2">
                <span className="text-lg">📧</span> {user.email}
              </span>
              <span className="hidden md:inline text-white/20">•</span>
              <span className="flex items-center gap-2">
                <span className="text-lg">📅</span> Joined {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="shrink-0 bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 text-center md:text-right min-w-[200px] shadow-xl group/coin transition-all hover:border-sunshine/40">
            <p className="text-xs uppercase font-black text-cyan-300/80 tracking-[0.2em] mb-2">Math Coins Balance</p>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <span className="text-4xl transform group-hover/coin:scale-125 transition-transform duration-300">🪙</span>
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-sunshine drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                {(profile?.math_coins || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-lg rounded-[2.5rem] p-8 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />

            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
              <span className="text-3xl">🏆</span> Hall of Fame
            </h3>

            {scores.length > 0 ? (
              <div className="space-y-4">
                {scores.map((s, i) => (
                  <div key={i} className="group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-cyan-400 font-black text-sm border border-cyan-400/20">
                        #{i + 1}
                      </div>
                      <div>
                        <p className="font-black text-white text-lg tracking-tight group-hover:text-cyan-300 transition-colors">{s.games?.[0]?.name ?? 'Unknown Game'}</p>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider">{new Date(s.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400">
                        {s.score.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-black uppercase tracking-tighter">Points</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="text-6xl mb-6 opacity-30">🎮</div>
                <p className="text-white/50 text-xl font-medium mb-8">No high scores recorded yet. Your legends begin here!</p>
                <button
                  onClick={() => router.push('/games')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-3 px-8 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Go to Arcade →
                </button>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-indigo-900/60 to-slate-900/60 backdrop-blur-lg rounded-[2.5rem] p-8 border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black text-white mb-6">Experience</h3>

              <div className="relative mb-10">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Current</p>
                    <p className="text-4xl font-black text-white">Lvl 1</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-magic-purple uppercase tracking-widest mb-1">Next Rank</p>
                    <p className="text-4xl font-black text-white opacity-40">Lvl 2</p>
                  </div>
                </div>

                <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-magic-purple rounded-full relative shadow-[0_0_15px_rgba(34,211,238,0.5)]" style={{ width: '35%' }}>
                    <div className="absolute top-0 right-0 h-full w-4 bg-white/20 blur-sm" />
                  </div>
                </div>
                <p className="mt-4 text-xs font-bold text-white/50 text-center italic">
                  Earn **650 more XP** to reach Level 2!
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-white font-bold text-sm">3 Day Streak!</p>
                    <p className="text-xs text-white/40">Keep it up for a bonus chest.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => router.push('/games/algebra-dash')}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl border border-white/20 transition-all hover:border-cyan-400/50 cursor-pointer text-sm"
              >
                Boost XP now 🚀
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { opacity: 0.8; box-shadow: 0 0 5px rgba(34,211,238,0.5); }
          50% { opacity: 1; box-shadow: 0 0 20px rgba(34,211,238,0.8); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      ` }} />
    </Layout>
  )
}
