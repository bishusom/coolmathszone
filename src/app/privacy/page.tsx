import { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

export const metadata: Metadata = {
  title: 'Privacy Policy | CoolMathsZone',
  description: 'CoolMathsZone privacy policy covering accounts, game progress, lesson usage, analytics, and how user data is handled.',
  alternates: {
    canonical: 'https://coolmathszone.com/privacy',
  },
};

export default function PrivacyPage() {
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
            <span className="text-6xl mr-4">🔒</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">Privacy Policy</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>

          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            How CoolMathsZone handles accounts, saved progress, analytics, and guest play.
          </p>
        </div>

        <ContentCard className="p-8 max-w-4xl mx-auto">
          <div className="bg-blue-800/20 border-l-4 border-cyan-400 p-6 mb-8 rounded-lg">
            <p className="text-cyan-100 font-semibold text-lg mb-2">
              Plain-language summary
            </p>
            <p className="text-white">
              Lessons remain free to access whether you are logged in or using the site as a guest. If you create an account, we store profile and progress data so your coins, skins, streaks, and saved gameplay can persist across sessions. If you stay as a guest, some lesson unlocks and cosmetic selections may be stored only in your browser on that device.
            </p>
          </div>

          <div className="text-gray-300 space-y-8">
            <p className="text-right text-gray-400 text-sm">Last Updated: April 7, 2026</p>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">1. Introduction</h2>
              <p className="text-white leading-relaxed">
                CoolMathsZone (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates coolmathszone.com (the &quot;Service&quot;). This policy explains what information we collect, how we use it, and what choices you have when using the Service.
              </p>
              <p className="text-white leading-relaxed mt-3">
                We aim to collect as little personal information as we reasonably can while still supporting free lessons, optional accounts, saved progress, and interactive games.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">2. Information We Collect</h2>

              <div className="bg-blue-500/10 p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">2.1 Information You Provide</h3>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li><span className="font-bold text-cyan-300">Account Information:</span> If you sign in or register, we may process your email address and any username or profile details attached to your account.</li>
                  <li><span className="font-bold text-cyan-300">Contact Information:</span> If you contact us through the contact form, we process the information you submit so we can respond.</li>
                  <li><span className="font-bold text-cyan-300">Profile Preferences:</span> For signed-in users, we store selected skins and unlocked assets so they persist across sessions.</li>
                </ul>
              </div>

              <div className="bg-green-500/10 p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold text-green-300 mb-4">2.2 Information We Generate During Use</h3>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li><span className="font-bold text-green-200">Game and Lesson Progress:</span> Scores, coins, XP, streaks, unlocked skins, and related gameplay/profile progress for signed-in users.</li>
                  <li><span className="font-bold text-green-200">Lesson Completion Data:</span> Completion of certain lesson topics may unlock cosmetic skins for logged-in users, and may be stored locally for guests.</li>
                  <li><span className="font-bold text-green-200">Analytics and Usage Data:</span> Page views, session behavior, and feature usage to understand how people use the Service.</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">2.3 Device and Browser Data</h3>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li><span className="font-bold text-purple-200">Technical Information:</span> IP address, browser type, device information, and operating system.</li>
                  <li><span className="font-bold text-purple-200">Local Browser Storage:</span> For guest users, certain unlocks and equipped skins may be stored in your browser on that device.</li>
                  <li><span className="font-bold text-purple-200">Cookies and Similar Technologies:</span> We use cookies or similar technologies for authentication, security, analytics, and essential site features.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">3. How We Use Information</h2>
              <ol className="list-decimal list-inside space-y-3 ml-4 text-white bg-purple-500/10 p-6 rounded-lg">
                <li>To provide free lessons, games, and educational content.</li>
                <li>To authenticate users and maintain optional accounts.</li>
                <li>To save coins, skins, streaks, scores, and other profile progress for signed-in users.</li>
                <li>To store guest unlocks and cosmetic preferences locally in the browser when no account is used.</li>
                <li>To improve site performance, content quality, and gameplay experience.</li>
                <li>To monitor usage, diagnose technical issues, and protect the Service against abuse.</li>
                <li>To respond to support requests or messages you send us.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">4. Accounts, Guests, and Saved Progress</h2>

              <div className="bg-cyan-500/10 p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">4.1 Logged-in Users</h3>
                <p className="text-white mb-4">
                  If you create or use an account, we may store the following so your experience persists across visits:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li>Username and email address</li>
                  <li>Math coins and XP</li>
                  <li>Unlocked skins and active skin selection</li>
                  <li>Daily streak information</li>
                  <li>Saved gameplay-related profile information</li>
                </ul>
              </div>

              <div className="bg-teal-500/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-teal-300 mb-4">4.2 Guest Users</h3>
                <p className="text-white mb-4">
                  You can still access lessons without logging in. When using the Service as a guest:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li>Lesson access remains free and available.</li>
                  <li>Some lesson-based skin unlocks and equipped cosmetic selections may be stored only in local browser storage on your device.</li>
                  <li>Guest progress stored locally may be lost if you clear browser storage, use a different browser, or switch devices.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">5. Children&apos;s Privacy</h2>
              <p className="text-white leading-relaxed">
                CoolMathsZone is designed for educational use, including by children. We try to limit the personal information we collect and support guest lesson access without requiring an account.
              </p>
              <p className="text-white leading-relaxed mt-3">
                If you are a parent or guardian and believe a child has provided personal information through the Service that should be reviewed or removed, please contact us. We will review the request and respond as appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">6. Data Security</h2>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-blue-500/10 p-6 rounded-lg">
                <li>Encryption of data in transit through HTTPS/TLS</li>
                <li>Use of managed infrastructure and authentication providers</li>
                <li>Access controls for systems we manage</li>
                <li>Reasonable technical steps to reduce unauthorized access risk</li>
              </ul>
              <p className="text-white mt-4">
                No system can guarantee absolute security, but we work to protect the data we hold.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">7. Data Retention</h2>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-green-500/10 p-6 rounded-lg">
                <li>Account-related information is generally retained while the account remains active, unless deletion is requested.</li>
                <li>Gameplay and profile progress linked to an account may be retained so the Service continues to function for that user.</li>
                <li>Guest unlocks stored in the browser remain until they are cleared by the user or overwritten.</li>
                <li>Analytics data may be retained according to the settings of the analytics providers we use.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">8. Third-Party Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white bg-purple-500/10 p-6 rounded-lg">
                <div>
                  <strong className="text-purple-100">Supabase:</strong> Authentication, account sessions, and profile-related data storage
                </div>
                <div>
                  <strong className="text-purple-100">Google Analytics:</strong> Site analytics and usage measurement
                </div>
                <div>
                  <strong className="text-purple-100">Google AdSense:</strong> Advertising services
                </div>
                <div>
                  <strong className="text-purple-100">Netlify:</strong> Hosting and delivery infrastructure
                </div>
              </div>
              <p className="text-white mt-4">
                These providers may process information on our behalf according to their own terms and privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">9. Your Choices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Use as Guest:</strong> You can access lessons without creating an account.
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Sign Out:</strong> You can stop using a signed-in session at any time.
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Browser Storage:</strong> You can clear locally stored guest unlocks through your browser settings.
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Contact Us:</strong> You can contact us about account, privacy, or deletion requests.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">10. Policy Updates</h2>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-yellow-500/10 p-6 rounded-lg">
                <li>We may update this policy as the Service changes.</li>
                <li>We will update the &quot;Last Updated&quot; date when we make changes.</li>
                <li>Material changes may also be highlighted in-product or elsewhere on the site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">11. Contact Us</h2>
              <p className="text-gray-200 mb-6">For privacy-related questions or requests:</p>

              <div className="text-center bg-white/5 p-8 rounded-lg border-2 border-cyan-500/30">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Get in Touch</h3>
                <p className="text-gray-200 mb-6 max-w-md mx-auto">
                  Have questions about this policy, your account data, or guest-stored unlocks?
                </p>
                <Link href="/contact">
                  <MagicButton>
                    🐚 Contact Us
                  </MagicButton>
                </Link>
                <p className="text-white text-sm mt-4">
                  We aim to respond to legitimate privacy requests within a reasonable time.
                </p>
              </div>
            </section>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  );
}
