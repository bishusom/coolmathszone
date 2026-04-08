'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabaseClient'
import { usePathname } from 'next/navigation'

export default function UserProfileButton() {
  const { user, profile, loading } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const pathname = usePathname()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setOpen(false)
    window.location.href = '/'
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-blue-100 animate-pulse" />
    )
  }

  // Not signed in — show Sign In link
  if (!user) {
    const signInPath = `/profile?redirect=${encodeURIComponent(pathname)}`
    return (
      <Link
        href={signInPath}
        id="header-sign-in"
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
        Sign In
      </Link>
    )
  }

  // Signed in — show avatar button with dropdown
  const displayName = profile?.username || user.email?.split('@')[0] || 'Explorer'
  const avatarUrl = profile?.avatar_url
  const coins = profile?.math_coins ?? 0

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar trigger */}
      <button
        id="header-profile-button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 group cursor-pointer"
        aria-label="Profile menu"
      >
        {/* Coin badge — always visible */}
        <div className="hidden sm:flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
          <span>🪙</span>
          <span>{coins.toLocaleString()}</span>
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400 shadow-md group-hover:border-cyan-300 group-hover:shadow-cyan-400/40 transition-all duration-300">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {/* Online dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
        </div>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2"
          style={{ animation: 'dropdownIn 0.2s ease-out' }}
        >
          {/* User info header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-white/20 flex items-center justify-center text-white font-black text-xl">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">{displayName}</p>
                <p className="text-cyan-100 text-xs truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Coin display (for mobile too) */}
          <div className="px-4 py-3 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
            <span className="text-amber-800 text-sm font-semibold flex items-center gap-1.5">
              🪙 Math Coins
            </span>
            <span className="text-amber-700 font-black text-lg">{coins.toLocaleString()}</span>
          </div>

          {/* Menu links */}
          <div className="py-1">
            <Link
              href="/profile"
              id="header-profile-link"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
            >
              <span className="text-lg">👤</span>
              <span className="font-semibold">My Profile</span>
            </Link>
            <Link
              href="/games"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
            >
              <span className="text-lg">🕹️</span>
              <span className="font-semibold">My Games</span>
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-gray-100">
            <button
              id="header-sign-out"
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <span className="text-lg">🚪</span>
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Dropdown animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  )
}
