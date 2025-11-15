// app/privacy/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

export const metadata: Metadata = {
  title: 'Privacy Policy | CoolMathsZone',
  description: 'Cool Maths Zone comprehensive privacy policy detailing how we protect children\'s data and user information on our educational gaming platform.',
};

export default function PrivacyPage() {
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
            <span className="text-6xl mr-4">🔒</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">Privacy Policy</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Protecting your privacy and your children's data is our top priority
          </p>
        </div>

        {/* Policy Content */}
        <ContentCard className="p-8 max-w-4xl mx-auto">
          {/* Important Notice */}
          <div className="bg-green-800/20 border-l-4 border-yellow-400 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-4 mt-1">
                COPPA COMPLIANT
              </span>
              <div>
                <p className="text-yellow-100 font-semibold text-lg mb-2">
                  Important Note for Parents
                </p>
                <p className="text-yellow-50">
                  Cool Maths Zone is committed to protecting children's privacy. Our platform complies with the Children's Online Privacy Protection Act (COPPA) and other applicable regulations.
                </p>
              </div>
            </div>
          </div>

          <div className="text-gray-300 space-y-8">
            <p className="text-right text-gray-400 text-sm">Last Updated: April 2025</p>

            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">1. Introduction</h2>
              <p className="text-white leading-relaxed">
                Welcome to Cool Maths Zone ("we", "our", or "us"). We operate the website coolmathszone.com (the "Service").
              </p>
              <p className="text-white leading-relaxed mt-3">
                We respect your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our Service.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">2. Information We Collect</h2>
              
              <div className="bg-blue-500/10 p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">2.1 Personal Information</h3>
                <p className="text-white mb-4">We collect minimal personal information to provide and improve our Service:</p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li><span className="font-bold text-cyan-300">Account Data:</span> For registered users, we collect username and password.</li>
                  <li><span className="font-bold text-cyan-300">Contact Data:</span> Email address for account recovery or parental contact.</li>
                  <li><span className="font-bold text-cyan-300">Parental Consent:</span> For users under 13, we collect parent/guardian email for COPPA compliance.</li>
                </ul>
              </div>

              <div className="bg-green-500/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-green-300 mb-4">2.2 Non-Personal Information</h3>
                <p className="text-white mb-4">We automatically collect certain technical information:</p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li><span className="font-bold text-green-200">Usage Data:</span> Game progress, scores, and feature usage.</li>
                  <li><span className="font-bold text-green-200">Technical Data:</span> IP address, browser type, device information.</li>
                  <li><span className="font-bold text-green-200">Cookies Data:</span> Session cookies for functionality.</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">3. How We Use Your Information</h2>
              <p className="text-white mb-4">We use the collected data for various purposes:</p>
              <ol className="list-decimal list-inside space-y-3 ml-4 text-white bg-purple-500/10 p-6 rounded-lg">
                <li className="mb-2">To provide and maintain our Service</li>
                <li className="mb-2">To notify you about changes to our Service</li>
                <li className="mb-2">To allow participation in interactive features</li>
                <li className="mb-2">To provide customer support</li>
                <li className="mb-2">To gather analysis to improve our Service</li>
                <li className="mb-2">To monitor Service usage</li>
                <li className="mb-2">To detect and prevent technical issues</li>
                <li>For educational research and product development</li>
              </ol>
            </section>

            {/* Data Protection for Children */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">4. Data Protection for Children</h2>
              
              <div className="bg-cyan-500/10 p-6 rounded-lg mb-6">
                <div className="flex items-center mb-4">
                  <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">
                    COPPA COMPLIANT
                  </span>
                  <p className="text-cyan-200 font-semibold">
                    We take special care to protect children's privacy as required by the Children's Online Privacy Protection Act.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-cyan-300 mb-4">4.1 For Children Under 13</h3>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li>We collect minimal personal information only with verifiable parental consent</li>
                  <li>Parents can review, delete, or refuse further collection of their child's information</li>
                  <li>We never require more personal information than reasonably necessary</li>
                </ul>
              </div>

              <div className="bg-teal-500/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-teal-300 mb-4">4.2 Parental Rights</h3>
                <p className="text-white mb-4">Parents/guardians of children under 13 can:</p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-white">
                  <li>Review their child's personal information</li>
                  <li>Request deletion of their child's information</li>
                  <li>Refuse further collection or use of their child's information</li>
                  <li>Revoke consent at any time</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">5. Data Security</h2>
              <p className="text-white mb-4">We implement appropriate technical and organizational measures to protect personal data:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-blue-500/10 p-6 rounded-lg">
                <li>Encryption of data in transit (SSL/TLS)</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal data</li>
                <li>Secure storage practices</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">6. Data Retention</h2>
              <p className="text-white mb-4">We retain personal data only as long as necessary:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-green-500/10 p-6 rounded-lg">
                <li>Account data: Until account deletion request</li>
                <li>Usage data: 12 months for analytics</li>
                <li>Parental consent records: As required by COPPA (typically 3 years)</li>
              </ul>
            </section>

            {/* Legal Rights */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">7. Your Legal Rights</h2>
              <p className="text-white mb-4">Depending on your location, you may have rights including:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Access:</strong> Request copies of your personal data
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Rectification:</strong> Request correction of inaccurate data
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Erasure:</strong> Request deletion of your personal data
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Restrict Processing:</strong> Request limitation of how we use your data
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Data Portability:</strong> Request transfer of your data to another service
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <strong className="text-blue-300">Object:</strong> Object to our processing of your data
                </div>
                <div className="bg-white/5 p-4 rounded-lg md:col-span-2">
                  <strong className="text-blue-300">Withdraw Consent:</strong> Withdraw previously given consent
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">8. Third-Party Services</h2>
              <p className="text-white mb-4">We use these third-party services that may process data:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white bg-purple-500/10 p-6 rounded-lg">
                <div>
                  <strong className="text-purple-100">Google Analytics:</strong> Website analytics (anonymous data)
                </div>
                <div>
                  <strong className="text-purple-100">Google AdSense:</strong> Advertising platform
                </div>
                <div>
                  <strong className="text-purple-100">Cloudflare:</strong> Security and performance
                </div>
                <div>
                  <strong className="text-purple-100">Netlify:</strong> Website hosting
                </div>
              </div>
              <p className="text-white mt-4">
                We vet all third parties for privacy compliance and limit data sharing.
              </p>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">9. Policy Updates</h2>
              <p className="text-white mb-4">We may update this policy periodically. We'll notify you of changes by:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white bg-yellow-500/10 p-6 rounded-lg">
                <li>Posting the new policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>For significant changes, we may provide additional notice</li>
              </ul>
            </section>

            {/* Contact Us */}
            <section>
            <h2 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-gray-600">10. Contact Us</h2>
            <p className="text-gray-200 mb-6">For privacy-related questions or requests:</p>
            
            <div className="text-center bg-white/5 p-8 rounded-lg border-2 border-cyan-500/30">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Get in Touch</h3>
                <p className="text-gray-200 mb-6 max-w-md mx-auto">
                Have questions about our privacy policy or need to exercise your data rights?
                </p>
                <Link href="/contact">
                <MagicButton>
                    🐚 Contact Us
                </MagicButton>
                </Link>
                <p className="text-white text-sm mt-4">
                We aim to respond to all legitimate requests within 30 days.
                </p>
            </div>
            </section>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  );
}