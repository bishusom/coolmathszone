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

export function ContentCard({ children, className = '', variant = 'glass' }: { children: React.ReactNode; className?: string; variant?: 'glass' | 'solid' | 'dark' }) {
  const baseClass = 'rounded-3xl shadow-2xl';
  
  if (variant === 'solid') {
    return (
      <div className={`${baseClass} bg-white border-2 border-gray-200 ${className}`}>
        {children}
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className={`${baseClass} relative overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-950 backdrop-blur-xl border border-cyan-300/15 shadow-[0_24px_80px_rgba(2,6,23,0.55)] ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.12),transparent_24%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
        <div className="relative z-10">
          {children}
        </div>
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

export function MagicButton({ children, onClick, className = '', gradient = 'gradient-ocean', type = 'button' }: any) {
  return (
    <button
      type={type}
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
