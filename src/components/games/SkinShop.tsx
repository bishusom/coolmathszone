'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useUnlocks, SKIN_CATALOGUE, getSkinEmoji } from '@/hooks/useUnlocks'

interface SkinShopProps {
  isOpen: boolean
  onClose: () => void
}

type FeedbackMsg = { type: 'success' | 'error'; text: string }

export default function SkinShop({ isOpen, onClose }: SkinShopProps) {
  const { profile } = useAuth()
  const { unlockedIds, activeSkinId, purchaseSkin, equipSkin } = useUnlocks()
  const [feedback, setFeedback] = useState<FeedbackMsg | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'shop' | 'modules'>('shop')
  const backdropRef = useRef<HTMLDivElement>(null)

  const coins = profile?.math_coins ?? 0

  // Auto-clear feedback
  useEffect(() => {
    if (!feedback) return
    const t = setTimeout(() => setFeedback(null), 2500)
    return () => clearTimeout(t)
  }, [feedback])

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const shopSkins = SKIN_CATALOGUE.filter(s => s.costCoins > 0 && !s.requiredModule)
  const moduleSkins = SKIN_CATALOGUE.filter(s => s.requiredModule)
  const defaultSkin = SKIN_CATALOGUE.find(s => s.isDefault)!

  const handleBuy = async (skinId: string, cost: number) => {
    if (busyId) return
    setBusyId(skinId)
    const result = await purchaseSkin(skinId)
    setBusyId(null)
    if (result === 'ok') setFeedback({ type: 'success', text: `${getSkinEmoji(skinId)} Unlocked! Tap "Equip" to use it.` })
    else if (result === 'insufficient_coins') setFeedback({ type: 'error', text: `Need ${cost} coins — earn more in-game!` })
    else if (result === 'already_owned') setFeedback({ type: 'error', text: 'You already own this skin.' })
    else if (result === 'not_logged_in') setFeedback({ type: 'error', text: 'Sign in to buy skins.' })
  }

  const handleEquip = async (skinId: string) => {
    if (busyId) return
    setBusyId(skinId)
    await equipSkin(skinId)
    setBusyId(null)
    setFeedback({ type: 'success', text: `${getSkinEmoji(skinId)} Equipped! Your ship now wears this skin.` })
  }

  const SkinCard = ({ skin }: { skin: typeof SKIN_CATALOGUE[0] }) => {
    const owned = unlockedIds.includes(skin.id)
    const isActive = activeSkinId === skin.id
    const canAfford = coins >= skin.costCoins
    const isBusy = busyId === skin.id

    return (
      <div style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(34,211,238,0.2))'
          : owned
          ? 'rgba(255,255,255,0.06)'
          : 'rgba(255,255,255,0.03)',
        border: isActive
          ? '2px solid rgba(124,58,237,0.7)'
          : owned
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '18px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        transition: 'all 0.2s',
        boxShadow: isActive ? '0 0 20px rgba(124,58,237,0.35)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {isActive && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
            borderRadius: 10, padding: '2px 8px',
            fontSize: 9, fontWeight: 900, color: 'white', letterSpacing: 1, textTransform: 'uppercase',
          }}>ACTIVE</div>
        )}

        <div style={{
          fontSize: 44,
          filter: owned ? 'none' : 'grayscale(1) opacity(0.4)',
          animation: isActive ? 'skinFloat 2s ease-in-out infinite alternate' : undefined,
        }}>
          {skin.emoji}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 2 }}>{skin.name}</div>
          {skin.costCoins > 0 ? (
            <div style={{ fontSize: 12, color: '#fde047', fontWeight: 700 }}>🪙 {skin.costCoins}</div>
          ) : skin.requiredModule ? (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>LESSON UNLOCK</div>
          ) : (
            <div style={{ fontSize: 10, color: '#34d399', fontWeight: 700 }}>FREE</div>
          )}
        </div>

        {owned ? (
          <button
            onClick={() => handleEquip(skin.id)}
            disabled={isActive || isBusy}
            style={{
              width: '100%', padding: '8px', borderRadius: 12, border: 'none', cursor: isActive ? 'default' : 'pointer',
              background: isActive
                ? 'rgba(124,58,237,0.3)'
                : 'linear-gradient(90deg, #7c3aed, #22d3ee)',
              color: 'white', fontSize: 12, fontWeight: 800, letterSpacing: 0.5,
              opacity: isBusy ? 0.6 : 1,
              transition: 'all 0.2s',
            }}
          >
            {isActive ? '✓ Equipped' : isBusy ? '...' : 'Equip'}
          </button>
        ) : (
          <button
            onClick={() => handleBuy(skin.id, skin.costCoins)}
            disabled={isBusy || !!skin.requiredModule}
            style={{
              width: '100%', padding: '8px', borderRadius: 12, border: 'none',
              cursor: skin.requiredModule ? 'not-allowed' : canAfford ? 'pointer' : 'not-allowed',
              background: skin.requiredModule
                ? 'rgba(255,255,255,0.06)'
                : canAfford
                ? 'linear-gradient(90deg, #f97316, #facc15)'
                : 'rgba(255,255,255,0.06)',
              color: canAfford && !skin.requiredModule ? 'white' : 'rgba(255,255,255,0.35)',
              fontSize: 12, fontWeight: 800, letterSpacing: 0.5,
              opacity: isBusy ? 0.6 : 1,
              transition: 'all 0.2s',
            }}
          >
            {isBusy ? '...' : skin.requiredModule ? '🔒 Via Lesson' : canAfford ? `Buy · ${skin.costCoins} 🪙` : `${skin.costCoins} 🪙 needed`}
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div style={{
        background: 'linear-gradient(145deg, #0d0d1a, #1a0d2e)',
        border: '1px solid rgba(124,58,237,0.4)',
        borderRadius: 32,
        width: '100%', maxWidth: 560,
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(124,58,237,0.2)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              margin: 0, fontSize: 26, fontWeight: 900,
              background: 'linear-gradient(90deg, #c084fc, #22d3ee)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: 1,
            }}>🛍️ Skin Shop</h2>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontWeight: 600 }}>
              Your balance: <span style={{ color: '#fde047', fontWeight: 800 }}>🪙 {coins.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)',
              fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'white' }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >✕</button>
        </div>

        {/* Feedback banner */}
        {feedback && (
          <div style={{
            margin: '12px 28px 0',
            padding: '10px 16px', borderRadius: 12,
            background: feedback.type === 'success' ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${feedback.type === 'success' ? 'rgba(52,211,153,0.4)' : 'rgba(239,68,68,0.4)'}`,
            color: feedback.type === 'success' ? '#34d399' : '#ef4444',
            fontSize: 13, fontWeight: 700, textAlign: 'center',
          }}>
            {feedback.text}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '16px 28px 0' }}>
          {(['shop', 'modules'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '10px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: activeTab === tab ? 'linear-gradient(90deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.06)',
                color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.5)',
                fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' as const,
                transition: 'all 0.2s',
              }}
            >
              {tab === 'shop' ? '🛒 Coin Shop' : '📚 Lesson Unlocks'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ overflowY: 'auto', padding: '16px 28px 28px' }}>
          {activeTab === 'shop' ? (
            <>
              {/* Default (always owned) */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' }}>Default</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  <SkinCard skin={defaultSkin} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' }}>For Purchase</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {shopSkins.map(skin => <SkinCard key={skin.id} skin={skin} />)}
                </div>
              </div>
            </>
          ) : (
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16, lineHeight: 1.6 }}>
                Complete lessons on CoolMathsZone to unlock these exclusive skins — free, just for learning!
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {moduleSkins.map(skin => <SkinCard key={skin.id} skin={skin} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes skinFloat {
          from { transform: translateY(0) rotate(-5deg); }
          to   { transform: translateY(-6px) rotate(5deg); }
        }
      `}</style>
    </div>
  )
}
