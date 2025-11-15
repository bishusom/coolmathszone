import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'CoolMathsZone' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Ocean background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-200 rounded-full opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-200 rounded-full opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-40 right-10 w-12 h-12 bg-teal-300 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
      
      {/* Wave patterns */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20"></div>
      
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}