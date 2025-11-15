// components/ResponsiveAd.tsx
'use client';

import { useEffect, useState } from 'react';

interface ResponsiveAdProps {
  position: 'hero' | 'content' | 'sidebar' | 'footer';
  className?: string;
}

export default function ResponsiveAd({ position, className = '' }: ResponsiveAdProps) {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const loadAd = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (error) {
        console.log('AdSense error:', error);
      }
    };

    // Delay ad loading for better UX
    const timer = setTimeout(loadAd, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getAdStyle = () => {
    switch (position) {
      case 'hero':
        return 'min-h-[120px] lg:min-h-[90px]';
      case 'content':
        return 'min-h-[250px]';
      case 'sidebar':
        return 'min-h-[600px]';
      case 'footer':
        return 'min-h-[120px]';
      default:
        return 'min-h-[120px]';
    }
  };

  return (
    <div className={`w-full my-8 ${getAdStyle()} ${className}`}>
      {!adLoaded && (
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-dashed border-blue-300 rounded-xl p-4 text-center animate-pulse">
          <div className="text-blue-600 font-semibold text-sm">Loading Ad...</div>
        </div>
      )}
      
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4386714040098164"
        data-ad-slot={getAdSlot(position)}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

function getAdSlot(position: string): string {
  // You'll need to replace these with your actual AdSense slot IDs
  const slots: { [key: string]: string } = {
    hero: '9516408306',
    content: '1592852108',
    sidebar: '3457679377',
    footer: '6672243801'
  };
  return slots[position] || '9516408306';
}