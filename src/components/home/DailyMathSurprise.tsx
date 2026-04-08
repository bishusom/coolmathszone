'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

type DailyItemKind = 'trick' | 'joke';

interface DailyMathItem {
  id: string;
  title: string;
  content: string;
  kind: DailyItemKind;
  audience_label: string | null;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function getDayIndex(length: number) {
  if (length <= 0) return 0;

  const currentDay = Math.floor(Date.now() / DAY_IN_MS);
  return currentDay % length;
}

function getTheme(kind: DailyItemKind) {
  if (kind === 'joke') {
    return {
      badge: 'Today\'s Joke',
      emoji: '😄',
      border: 'border-blue-400/40',
      panel: 'from-blue-600 via-indigo-700 to-purple-800',
      accent: 'text-cyan-200',
      button: 'from-amber-400 to-orange-500',
      label: 'Laugh, then learn',
    };
  }

  return {
    badge: 'Today\'s Trick',
    emoji: '🧠',
    border: 'border-cyan-400/40',
    panel: 'from-cyan-700 via-blue-800 to-indigo-900',
    accent: 'text-cyan-300',
    button: 'from-cyan-400 to-blue-500',
    label: 'Quick win for sharper maths',
  };
}

interface DailyMathSurpriseProps {
  isCompact?: boolean;
}

export default function DailyMathSurprise({ isCompact = false }: DailyMathSurpriseProps) {
  const [item, setItem] = useState<DailyMathItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    async function loadDailyItem() {
      const { data, error } = await supabase
        .from('daily_math_surprises')
        .select('id, title, content, kind, audience_label')
        .eq('is_active', true)
        .order('kind', { ascending: false })
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (!isMounted) return;

      if (error || !data || data.length === 0) {
        setItem(null);
        setIsLoading(false);
        return;
      }

      const selectedItem = data[getDayIndex(data.length)] as DailyMathItem;
      setItem(selectedItem);
      setIsLoading(false);
    }

    loadDailyItem();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    if (isCompact) {
      return (
        <div className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-6 animate-pulse">
          <div className="h-4 w-24 rounded-full bg-white/10 mb-5" />
          <div className="h-8 w-48 rounded-xl bg-white/10 mb-4" />
          <div className="h-4 w-full rounded bg-white/10 mb-2" />
          <div className="h-4 w-11/12 rounded bg-white/10" />
        </div>
      );
    }
    return (
      <section className="py-14 bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10 animate-pulse">
            <div className="h-6 w-40 rounded-full bg-white/10 mb-5" />
            <div className="h-10 w-72 rounded-xl bg-white/10 mb-4" />
            <div className="h-5 w-full rounded bg-white/10 mb-3" />
            <div className="h-5 w-11/12 rounded bg-white/10 mb-3" />
            <div className="h-5 w-9/12 rounded bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  if (!item) {
    return null;
  }

  const theme = getTheme(item.kind);

  const content = (
    <div className={`${isCompact ? '' : 'max-w-5xl mx-auto'} relative h-full overflow-hidden rounded-[2rem] border ${theme.border} bg-gradient-to-br ${theme.panel} ${isCompact ? 'p-6' : 'p-8 md:p-10'} shadow-[0_0_45px_rgba(15,23,42,0.35)] flex flex-col`}>
      <div className="absolute -top-20 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl pointer-events-none" />

      <div className={`relative z-10 ${isCompact ? 'flex flex-col h-full' : 'grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center'}`}>
        <div className={isCompact ? 'flex-grow' : ''}>
          <div className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 ${isCompact ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} font-black uppercase tracking-[0.2em] ${theme.accent}`}>
            <span>{theme.emoji}</span>
            <span>{theme.badge}</span>
          </div>

          <h2 className={`${isCompact ? 'mt-3 text-2xl' : 'mt-5 text-3xl md:text-4xl'} font-black text-white drop-shadow-md`}>
            {item.title}
          </h2>

          <p className={`${isCompact ? 'mt-3 text-sm' : 'mt-4 text-lg'} leading-relaxed text-white/90 drop-shadow-sm line-clamp-4`}>
            {item.content}
          </p>

          {!isCompact && (
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
              <div className="rounded-full border border-white/15 bg-slate-950/30 px-4 py-2 text-slate-100">
                {theme.label}
              </div>
              {item.audience_label ? (
                <div className="rounded-full border border-white/15 bg-slate-950/30 px-4 py-2 text-slate-100">
                  Best for {item.audience_label}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {!isCompact ? (
          <div className="rounded-[1.75rem] border border-white/15 bg-slate-950/35 p-6 md:p-7 backdrop-blur-md">
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.button} text-3xl shadow-lg`}>
              {theme.emoji}
            </div>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.25em] text-slate-300">
              Daily Math Surprise
            </p>
            <p className="mt-3 text-xl font-black text-white">
              Fresh each day
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              This section rotates through tricks and jokes from Supabase, so returning visitors always get a new reason to stop at the homepage.
            </p>
          </div>
        ) : (
          <div className="mt-4 pt-4 border-t border-white/10 mt-auto">
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 tracking-wider">DAILY SURPRISE</span>
                <span className="text-xs text-slate-400">Rotates daily</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isCompact) {
    return content;
  }

  return (
    <section className="py-14 bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-950 text-white">
      <div className="container mx-auto px-4">
        {content}
      </div>
    </section>
  );
}
