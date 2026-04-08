import { ReactNode } from 'react'
import { useAuth } from '@/context/AuthContext'

interface GameWrapperProps {
  children: ReactNode
  gameTitle: string
  onStart: () => void
  gameState: string
}

export const GameWrapper = ({ children, gameTitle, onStart, gameState }: GameWrapperProps) => {
  const { user, profile } = useAuth()

  if (gameState === 'START_MENU') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-white rounded-3xl p-8 border-4 border-white shadow-rainbow text-center max-w-sm animate-float">
          <h1 className="text-4xl font-black gradient-rainbow-blast bg-clip-text text-transparent mb-4">
            {gameTitle}
          </h1>
          {!user && (
            <p className="text-magic-purple text-sm mb-4 italic">
              Login to save your 🪙 and high scores!
            </p>
          )}
          <button onClick={onStart} className="btn-magical gradient-neon-arcade animate-glow text-white px-8 py-3 rounded-full font-bold">
            Start Playing
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}