'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabaseClient'

const navLinks = [
  { href: '/grades', emoji: '🐠', label: 'Grades' },
  { href: '/exercises', emoji: '🎣', label: 'Exercises' },
  { href: '/worksheets', emoji: '📜', label: 'Worksheets' },
  { href: '/games', emoji: '🕹️', label: 'Games' },
  { href: '/resources', emoji: '🐡', label: 'Resources' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { user, profile, loading } = useAuth()
  const pathname = usePathname()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setOpen(false)
    window.location.href = '/'
  }

  const signInPath = `/profile?redirect=${encodeURIComponent(pathname)}`

  return (
    <>
      {/* Hamburger button */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`block w-5 h-0.5 bg-blue-700 rounded-full transition-all duration-300 ${
            open ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-blue-700 rounded-full transition-all duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-blue-700 rounded-full transition-all duration-300 ${
            open ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 top-[76px] z-50 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <nav
            className="bg-white border-b border-blue-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'mobileSlideDown 0.25s ease-out' }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {/* Account section */}
              {loading ? (
                <div className="mb-2 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-4">
                  <div className="h-4 w-28 rounded-full bg-blue-100 animate-pulse" />
                  <div className="mt-3 h-10 rounded-xl bg-blue-100 animate-pulse" />
                </div>
              ) : user ? (
                <div className="mb-2 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
                  <div className="flex items-center gap-3 px-4 py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg shrink-0">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.username || user.email?.split('@')[0] || 'Explorer'}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/20 flex items-center justify-center text-white font-black text-xl">
                          {(profile?.username || user.email?.split('@')[0] || 'Explorer').charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">{profile?.username || user.email?.split('@')[0] || 'Explorer'}</p>
                      <p className="text-cyan-100 text-xs truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 px-4 py-3">
                    <span className="text-sm font-semibold">🪙 Math Coins</span>
                    <span className="text-lg font-black">{(profile?.math_coins ?? 0).toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <Link
                  href={signInPath}
                  onClick={() => setOpen(false)}
                  id="header-sign-in"
                  className="mb-2 flex items-center justify-between rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-4 text-white shadow-lg transition-transform hover:scale-[1.01]"
                >
                  <span className="flex items-center gap-3 font-bold">
                    <span className="text-xl">👤</span>
                    <span>Sign In</span>
                  </span>
                  <span className="text-sm font-semibold text-cyan-100">Profile, coins, progress</span>
                </Link>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-blue-700 hover:bg-blue-50 font-bold transition-colors rounded-xl px-4 py-3"
                >
                  <span className="text-xl">{link.emoji}</span>
                  <span>{link.label}</span>
                </Link>
              ))}

              {user && !loading && (
                <>
                  <div className="my-2 h-px bg-blue-100" />
                  <Link
                    href="/profile"
                    id="header-profile-link"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-lg">👤</span>
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/games"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-lg">🕹️</span>
                    <span>My Games</span>
                  </Link>
                  <button
                    id="header-sign-out"
                    onClick={handleSignOut}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <span className="text-lg">🚪</span>
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mobileSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </>
  )
}
