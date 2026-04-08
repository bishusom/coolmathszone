import { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

export const metadata: Metadata = {
  title: 'About Us | CoolMathsZone',
  description: 'Meet the team behind CoolMathsZone and learn how the platform blends playful math lessons, games, and optional accounts.',
  alternates: {
    canonical: 'https://coolmathszone.com/about',
  },
};

export default function AboutPage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden gradient-arctic-adventure text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-4xl animate-float">👨‍👦</div>
          <div className="absolute top-40 right-20 text-3xl animate-float" style={{animationDelay: '2s'}}>🔢</div>
          <div className="absolute bottom-20 left-20 text-3xl animate-float" style={{animationDelay: '4s'}}>🌟</div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-6">
              <Link href="/">
                <MagicButton className="text-lg">
                  ⋆.˚ 𓇼 Back to Home
                </MagicButton>
              </Link>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">👨‍👦</span>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
                    About Us
                  </h1>
                  <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
                </div>
              </div>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Building a playful math world where free lessons, games, and progress tracking work together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
              Meet the <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Dream Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining product building, lesson design, and kid-tested gameplay into one learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Bishu Som */}
            <ContentCard className="p-8 text-center variant=solid">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-4xl text-white">
                👨‍💻
              </div>
              {/*<div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full overflow-hidden">
                <img 
                    src="/images/bishu-som.jpg" 
                    alt="Bishu Som"
                    className="w-full h-full object-cover"
                />
              </div> */}
              <h3 className="text-2xl font-bold text-white mb-2">Bishu Som</h3>
              <p className="text-cyan-300 font-semibold mb-4">Tech Developer & Dad</p>
              <p className="text-white/70 mb-4">
                Bishu builds the product platform behind CoolMathsZone, from the site experience and game systems to account features and SEO foundations. He focuses on making the experience feel smooth, playful, and easy to use.
              </p>
              <div className="flex justify-center space-x-4 text-white/60">
                <span>💻 Code Wizard</span>
                <span>🎨 UI Designer</span>
                <span>🚀 Problem Solver</span>
              </div>
            </ContentCard>

            {/* Shubhang Som */}
            <ContentCard className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-4xl text-white">
                🧮
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Shubhang Som</h3>
              <p className="text-emerald-300 font-semibold mb-4">Math Wiz & Son</p>
              <p className="text-white/70 mb-4">
                Shubhang helps shape the lesson ideas, challenge flow, and what actually feels fun from a student perspective. He pressure-tests the activities so the learning stays clear without becoming dry.
              </p>
              <div className="flex justify-center space-x-4 text-white/60">
                <span>🎯 Math Genius</span>
                <span>📚 Lesson Creator</span>
                <span>🎮 Fun Designer</span>
              </div>
            </ContentCard>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-br from-blue-200 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <ContentCard className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="max-w-3xl mx-auto text-lg text-white/80 leading-relaxed">
              <p className="mb-6">
                CoolMathsZone started as a small family project. The goal was simple: build a place where math feels more like exploration than repetition, without forcing every learner into the same dry worksheet flow.
              </p>
              <p className="mb-6">
                What began as weekend experiments grew into a platform that combines structured grade-based learning, game-style practice, and optional profiles for players who want to save progress, coins, and cosmetics.
              </p>
              <p className="text-cyan-300 font-semibold">
                Our mission: make math feel approachable, repeatable, and worth coming back to.
              </p>
            </div>
          </ContentCard>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* What You Can Do */}
            <ContentCard className="p-6">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">✅ What You CAN Do</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                  <div className="text-green-400 font-semibold mb-2">🎮 Play All Games</div>
                  <p className="text-slate-900 text-sm">Access every math game and activity for free.</p>
                </div>
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                  <div className="text-green-400 font-semibold mb-2">📚 Learn at Your Pace</div>
                  <p className="text-slate-900 text-sm">Progress through grades and topics when you are ready.</p>
                </div>
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                  <div className="text-green-400 font-semibold mb-2">🏆 Earn Achievements</div>
                  <p className="text-slate-900 text-sm">Collect badges and rewards for completing challenges.</p>
                </div>
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                  <div className="text-green-400 font-semibold mb-2">🔄 Practice Unlimited</div>
                  <p className="text-slate-900 text-sm">Repeat exercises as many times as you need.</p>
                </div>
              </div>
            </ContentCard>

            {/* What You Cannot Do */}
            <ContentCard className="p-6">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">❌ What You CANNOT Do</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
                  <div className="text-red-400 font-semibold mb-2">🚫 Copy Content</div>
                  <p className="text-slate-900 text-sm">Do not copy our lessons or games for commercial use.</p>
                </div>
                <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
                  <div className="text-red-400 font-semibold mb-2">🚫 Misuse Platform</div>
                  <p className="text-slate-900 text-sm">No automated bots, scraping, or hacking attempts.</p>
                </div>
                <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
                  <div className="text-red-400 font-semibold mb-2">🚫 Claim Ownership</div>
                  <p className="text-slate-900 text-sm">Do not claim our content as your own creation.</p>
                </div>
                <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
                  <div className="text-red-400 font-semibold mb-2">🚫 Redistribute</div>
                  <p className="text-slate-900 text-sm">Do not repackage or resell our educational content.</p>
                </div>
              </div>
            </ContentCard>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <ContentCard className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Have Questions?</h2>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              We&apos;d love to hear from you! Whether you have feedback, found a bug, or just want to say hello, 
              reach out to the dad-and-son team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <MagicButton className="text-lg">
                  ⋆.˚ 𓇼 Back to Home
                </MagicButton>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-cyan-300 text-white font-bold px-6 py-3 rounded-2xl hover:bg-cyan-300 hover:text-blue-600 transition-all duration-300 bg-white/10 backdrop-blur-sm">
                  📧 Contact Us
                </button>
              </Link>
            </div>
          </ContentCard>
        </div>
      </section>

      {/* AdSense Section */}
      <section className="py-12 bg-gradient-to-r from-blue-700 to-cyan-700">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-sm border border-cyan-300/20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/20 rounded-xl p-6">
                <div className="bg-white rounded-lg p-6">
                  <div className="text-blue-600 font-semibold text-lg mb-2">
                    Advertisement
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 h-24 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-medium">Google AdSense</span>
                  </div>
                  <p className="text-blue-500 text-sm mt-2">
                    Supporting free math education worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
