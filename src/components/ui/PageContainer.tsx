// components/ui/PageContainer.tsx
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export function PageContainer({ children, className = '', gradient = 'gradient-ocean-blue' }: PageContainerProps) {
  return (
    <div className={`min-h-screen ${gradient} ${className}`}>
      <div className="absolute inset-0 bg-cover bg-center opacity-10"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function ContentCard({ children, className = '', variant = 'glass' }: { children: React.ReactNode; className?: string; variant?: 'glass' | 'solid' }) {
  const baseClass = 'rounded-3xl shadow-2xl';
  
  if (variant === 'solid') {
    return (
      <div className={`${baseClass} bg-white border-2 border-gray-200 ${className}`}>
        {children}
      </div>
    );
  }
  
  // Default glass variant
  return (
    <div className={`${baseClass} bg-white/10 backdrop-blur-md border border-white/20 ${className}`}>
      {children}
    </div>
  );
}

export function MagicButton({ children, onClick, className = '', gradient = 'gradient-ocean' }: any) {
  return (
    <button
      onClick={onClick}
      className={`${gradient} text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export function TextGradient({ children, className = '', gradient = 'text-gradient-ocean' }: any) {
  return (
    <span className={`${gradient} ${className}`}>
      {children}
    </span>
  );
}