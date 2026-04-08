import { Metadata } from 'next';
import Link from 'next/link';
import { ContentCard, MagicButton, PageContainer } from '@/components/ui/PageContainer';

export const metadata: Metadata = {
  title: 'Terms of Use | CoolMathsZone',
  description: 'CoolMathsZone terms of use covering free lessons, optional accounts, acceptable use, intellectual property, and service rules.',
  alternates: {
    canonical: 'https://coolmathszone.com/terms',
  },
};

export default function TermsPage() {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <MagicButton className="text-lg">
              𓇼 Back to Math Adventures
            </MagicButton>
          </Link>

          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">📘</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">Terms of Use</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto"></div>
            </div>
          </div>

          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            The basic rules for using CoolMathsZone, including lessons, games, and optional accounts.
          </p>
        </div>

        <ContentCard className="p-8 max-w-4xl mx-auto">
          <div className="bg-cyan-800/20 border-l-4 border-cyan-400 p-6 mb-8 rounded-lg">
            <p className="text-cyan-100 font-semibold text-lg mb-2">Plain-language summary</p>
            <p className="text-white">
              You can use CoolMathsZone for free to learn and play. You must not copy, resell, scrape, abuse, or interfere with the site. Accounts are optional, but if you create one, you are responsible for activity under that account.
            </p>
          </div>

          <div className="text-gray-300 space-y-8">
            <p className="text-right text-gray-400 text-sm">Last Updated: April 7, 2026</p>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">1. Acceptance of These Terms</h2>
              <p className="text-white leading-relaxed">
                These Terms of Use apply when you access or use coolmathszone.com and related features, lessons, games, and account functionality. By using the Service, you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">2. Who Can Use the Service</h2>
              <div className="bg-blue-500/10 p-6 rounded-lg text-white space-y-3">
                <p>Lessons and games are available to guest users and logged-in users.</p>
                <p>Creating an account is optional, but certain profile features such as saved skins, coins, streaks, and persistent progress may require login.</p>
                <p>If you use the Service on behalf of a child, you are responsible for supervising that use as appropriate.</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">3. Accounts</h2>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-green-500/10 p-6 rounded-lg">
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You are responsible for activity that occurs through your account.</li>
                <li>You must not impersonate another person or provide misleading account information.</li>
                <li>We may suspend or remove accounts that violate these terms or misuse the Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">4. What You Can Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-5">
                  <div className="text-emerald-200 font-bold mb-2">Play and learn for free</div>
                  <p className="text-gray-100">Use the lessons, games, and practice activities for personal, educational use.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-5">
                  <div className="text-emerald-200 font-bold mb-2">Create an optional account</div>
                  <p className="text-gray-100">Sign in to save coins, streaks, skins, and other profile progress across sessions.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-5">
                  <div className="text-emerald-200 font-bold mb-2">Use as a guest</div>
                  <p className="text-gray-100">Access lessons without signing in, understanding that some unlocks may remain only on that device.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-5">
                  <div className="text-emerald-200 font-bold mb-2">Share the site link</div>
                  <p className="text-gray-100">Link to CoolMathsZone so others can access the original lessons and games on our site.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">5. What You Cannot Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-rose-500/15 border border-rose-400/40 rounded-xl p-5">
                  <div className="text-rose-200 font-bold mb-2">Copy or resell content</div>
                  <p className="text-gray-100">Do not reproduce, package, or commercialize our lessons, games, artwork, or site content without permission.</p>
                </div>
                <div className="bg-rose-500/15 border border-rose-400/40 rounded-xl p-5">
                  <div className="text-rose-200 font-bold mb-2">Scrape or automate abuse</div>
                  <p className="text-gray-100">Do not use bots, scrapers, or automated systems that interfere with the Service or extract content at scale.</p>
                </div>
                <div className="bg-rose-500/15 border border-rose-400/40 rounded-xl p-5">
                  <div className="text-rose-200 font-bold mb-2">Circumvent security</div>
                  <p className="text-gray-100">Do not attempt to probe, hack, overload, or bypass authentication, rate limits, or other protections.</p>
                </div>
                <div className="bg-rose-500/15 border border-rose-400/40 rounded-xl p-5">
                  <div className="text-rose-200 font-bold mb-2">Misrepresent ownership</div>
                  <p className="text-gray-100">Do not claim our content, branding, or educational material as your own.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">6. Intellectual Property</h2>
              <p className="text-white leading-relaxed">
                CoolMathsZone and its lessons, games, designs, branding, text, images, and code are owned by us or used with permission. These terms do not transfer ownership of that content to you.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">7. Availability and Changes</h2>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-purple-500/10 p-6 rounded-lg">
                <li>We may update, change, pause, or remove parts of the Service at any time.</li>
                <li>We do not guarantee uninterrupted availability or that every feature will always remain the same.</li>
                <li>We may modify or discontinue account features, lesson content, or games as the product evolves.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">8. Disclaimers</h2>
              <p className="text-white leading-relaxed">
                The Service is provided on an as-is and as-available basis. We work to keep the site useful and reliable, but we do not guarantee that it will always be error-free, uninterrupted, or suitable for every purpose.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">9. Limitation of Liability</h2>
              <p className="text-white leading-relaxed">
                To the extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the Service. This does not limit rights that cannot legally be waived.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">10. Changes to These Terms</h2>
              <p className="text-white leading-relaxed">
                We may update these terms as the Service changes. We will update the Last Updated date when we do.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">11. Contact</h2>
              <div className="text-center bg-white/5 p-8 rounded-lg border-2 border-cyan-500/30">
                <div className="text-4xl mb-4">📬</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Questions About These Terms?</h3>
                <p className="text-gray-200 mb-6 max-w-md mx-auto">
                  Reach out if you need clarification about acceptable use, accounts, or content permissions.
                </p>
                <Link href="/contact">
                  <MagicButton>
                    🐚 Contact Us
                  </MagicButton>
                </Link>
              </div>
            </section>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  );
}
