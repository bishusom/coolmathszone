import Image from 'next/image';
import Link from 'next/link';

const exploreLinks = [
  { href: '/games', label: 'Games', icon: '🎮' },
  { href: '/grades', label: 'Grade Levels', icon: '🐠' },
  { href: '/exercises', label: 'Exercises', icon: '🎣' },
  { href: '/worksheets', label: 'Worksheets', icon: '📜' },
  { href: '/resources', label: 'Resources', icon: '🐡' },
];

const oceanFriendLinks = [
  { href: '/about', label: 'About Us', icon: '🐬' },
  { href: '/contact', label: 'Contact Us', icon: '🐚' },
  { href: '/parents-guide', label: 'Parents Guide', icon: '🦑' },
  { href: '/privacy', label: 'Privacy', icon: '🐢' },
  { href: '/terms', label: 'Terms', icon: '📘' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-white mt-16 relative overflow-hidden">
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-gradient-ocean rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
                <Image
                  src="/cmz-logo.webp"
                  alt="CoolMathsZone Dolphin Logo"
                  width={60}
                  height={60}
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-white">CoolMathsZone</span>
            </div>
            <p className="text-blue-100 max-w-md">
              Dive deep into mathematics with our ocean of learning adventures!
              From counting coral to calculus currents.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-200">Explore</h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white transition-colors flex items-center">
                    <span className="mr-2">{link.icon}</span>{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ocean Friends */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Ocean Friends</h3>
            <ul className="space-y-2">
              {oceanFriendLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white transition-colors flex items-center">
                    <span className="mr-2">{link.icon}</span>{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/30 mt-8 pt-8 text-center text-blue-200">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>for math explorers everywhere</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
