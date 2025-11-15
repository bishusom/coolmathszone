// app/parents-guide/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

export const metadata: Metadata = {
  title: 'Parent\'s Guide to Cool Maths Zone | Maximize Math Learning',
  description: 'Discover how to get the most educational value from Cool Maths Zone games for your child\'s math development.',
};

export default function ParentsGuidePage() {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <MagicButton className="text-lg">
              𓇼 Back to Math Adventures
            </MagicButton>
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">👨‍👩‍👧‍👦</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">Parent's Guide</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Maximize your child's math learning with these tips and strategies
          </p>
        </div>

        {/* Getting Started Section */}
        <ContentCard className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">Getting Started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Choose the Right Level</h3>
              <p className="text-white">Start with the level that matches your child's current skills to build confidence before advancing</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-white mb-2">Recommended Play Time</h3>
              <p className="text-white">15-20 minutes daily provides optimal benefits without causing fatigue</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">Celebrate Progress</h3>
              <p className="text-white">Recognize improvements in speed and accuracy to motivate continued practice</p>
            </div>
          </div>
          
          <div className="bg-blue-800/20 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="text-xl font-bold text-cyan-300 mb-2">Pro Tip: Make It a Routine</h3>
            <p className="text-white">
              Incorporate Cool Maths Zone into your child's daily schedule, perhaps after school or before dinner. 
              Consistent short practice sessions are more effective than occasional long ones.
            </p>
          </div>
        </ContentCard>

        {/* Age-Specific Tips */}
        <ContentCard className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">Age-Specific Guidance</h2>
          
          {/* Kindergarten */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">🐛</div>
              <h3 className="text-2xl font-bold text-white">Kindergarten (Ages 4-6)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-bold text-cyan-200 mb-2">Focus on Counting</h4>
                <p className="text-white text-base">Have your child count physical objects along with the on-screen visuals to reinforce number concepts.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-bold text-cyan-300 mb-2">Play Together</h4>
                <p className="text-white text-base">Sit with your child and talk through the problems. Ask questions like "How many apples do you see?" to develop verbal math skills.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-bold text-cyan-300 mb-2">Keep Sessions Short</h4>
                <p className="text-white text-base">5-10 minutes is plenty for this age group. Stop while they're still enjoying it to keep the experience positive.</p>
              </div>
            </div>
          </div>

          {/* Elementary */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">🥷</div>
              <h3 className="text-2xl font-bold text-white">Elementary (Ages 6-10)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-200 mb-2">Encourage Mental Math</h4>
                <p className="text-white text-base">Ask your child to solve problems in their head before selecting an answer to build calculation fluency.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-300 mb-2">Connect to Real Life</h4>
                <p className="text-white text-base">Relate game problems to everyday situations: "If you have 8 candies and eat 3, how many are left?"</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-300 mb-2">Track Progress</h4>
                <p className="text-white text-base">Note improvements in speed and accuracy week-to-week to show tangible growth.</p>
              </div>
            </div>
          </div>

          {/* Middle School */}
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">🦸♂️</div>
              <h3 className="text-2xl font-bold text-white">Middle School (Ages 10-14)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-yellow-200 mb-2">Challenge Appropriately</h4>
                <p className="text-white text-base">Use the higher levels to identify and strengthen weaker areas before they become problematic in school.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-yellow-300 mb-2">Discuss Strategies</h4>
                <p className="text-white text-base">Ask your child to explain how they solved problems to develop mathematical communication skills.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-yellow-300 mb-2">Supplement School Work</h4>
                <p className="text-white text-base">Align game practice with current classroom topics for reinforcement.</p>
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Educational Benefits */}
        <ContentCard className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">Educational Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-2">Mental Math Skills</h3>
              <p className="text-white">Improves calculation speed and number sense through repeated practice</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-white mb-2">Problem Solving</h3>
              <p className="text-white">Develops logical thinking and multiple solution strategies</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-2">Confidence Building</h3>
              <p className="text-white">Positive reinforcement helps reduce math anxiety</p>
            </div>
          </div>
          
          <div className="bg-green-500/20 border-l-4 border-green-500 p-4 rounded">
            <h3 className="text-xl font-bold text-green-300 mb-2">Alignment with School Curriculum</h3>
            <p className="text-white">
              Cool Maths Zone activities complement standard math curricula, reinforcing concepts taught in classrooms worldwide. 
              The progressive levels match typical developmental milestones in math education.
            </p>
          </div>
        </ContentCard>

        {/* FAQ Section */}
        <ContentCard className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-white/20 pb-6">
              <h3 className="text-xl font-bold text-white mb-3">How much screen time is appropriate for math games?</h3>
              <p className="text-white">
                We recommend balancing screen time with other learning activities. 15-20 minutes of focused math practice is ideal, 
                supplemented with hands-on math activities like cooking or board games.
              </p>
            </div>
            
            <div className="border-b border-white/20 pb-6">
              <h3 className="text-xl font-bold text-white mb-3">My child gets frustrated with wrong answers. What should I do?</h3>
              <p className="text-white">
                Emphasize that mistakes are part of learning. Use the "Show Answer" feature to analyze errors together. 
                Celebrate effort as much as correct answers to build perseverance.
              </p>
            </div>
            
            <div className="border-b border-white/20 pb-6">
              <h3 className="text-xl font-bold text-white mb-3">How do I know if the level is too easy or hard?</h3>
              <p className="text-white">
                The ideal level challenges without frustrating. If your child gets &gt;80% correct easily, try the next level. 
                If they struggle with &gt;50%, step back a level to rebuild confidence.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Can Cool Maths Zone replace traditional math homework?</h3>
              <p className="text-white">
                While excellent for supplemental practice, it shouldn't replace all written work. 
                The combination of digital and paper-based math provides the most comprehensive learning.
              </p>
            </div>
          </div>
        </ContentCard>

        {/* Download Section */}
        <ContentCard className="p-8 text-center">
          <h2 className="text-3xl font-bold text-cyan-300 mb-4">Downloadable Resources</h2>
          <p className="text-white mb-4">Get our complete Parent's Guide as a printable PDF, including:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto mb-6 text-left">
            <li className="text-white">✓ Detailed age-specific activity suggestions</li>
            <li className="text-white">✓ Progress tracking sheets</li>
            <li className="text-white">✓ Math skill development timeline</li>
            <li className="text-white">✓ Offline math game ideas</li>
          </ul>
          <Link href="/downloads/parents-guide.pdf" className="inline-block mb-6">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
              Download Full Guide (PDF)
            </button>
          </Link>  
        </ContentCard>
      </div>
    </PageContainer>
  );
}