// app/resources/[topic]/StrategiesSection.tsx
import { ContentCard } from '@/components/ui/PageContainer';

interface Strategy {
  name: string;
  description: string;
  example: string;
  emoji: string;
}

interface StrategiesSectionProps {
  strategies: Strategy[];
}

export function StrategiesSection({ strategies }: StrategiesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {strategies.map((strategy: Strategy, index: number) => (
        <ContentCard 
          key={index}
          className="p-6 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-start mb-4">
            <div className="text-4xl text-white/90 mr-4">{strategy.emoji}</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{strategy.name}</h3>
              <p className="text-white/70">{strategy.description}</p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/90 font-semibold mb-2">Example:</p>
            <p className="text-white/90 font-semibold">{strategy.example}</p>
          </div>
        </ContentCard>
      ))}
    </div>
  );
}