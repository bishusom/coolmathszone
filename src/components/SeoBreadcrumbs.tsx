// src/components/SeoBreadcrumbs.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SeoBreadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);
  
  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    const name = path.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return {
      href,
      name: name === 'Grade' ? 'Grade Level' : name
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        🏠 Home
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center space-x-2">
          <span className="text-gray-400">/</span>
          {index === breadcrumbs.length - 1 ? (
            <span className="text-blue-600 font-semibold">{crumb.name}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
              {crumb.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}