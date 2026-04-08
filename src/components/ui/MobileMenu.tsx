'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/grades', emoji: '🐠', label: 'Grades' },
  { href: '/exercises', emoji: '🎣', label: 'Exercises' },
  { href: '/worksheets', emoji: '📜', label: 'Worksheets' },
  { href: '/games', emoji: '🕹️', label: 'Games' },
  { href: '/resources', emoji: '🐡', label: 'Resources' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

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
