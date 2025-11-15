import { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

export const metadata: Metadata = {
  title: 'Contact Us | CoolMathsZone',
  description: 'Get in touch with the CoolMathsZone team - Bishu Som and Shubhang Som. We love hearing from our users!',
};

export default function ContactPage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden from-blue-500 to-cyan-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-4xl animate-float">📧</div>
          <div className="absolute top-40 right-20 text-3xl animate-float" style={{animationDelay: '2s'}}>💬</div>
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
                <span className="text-6xl mr-4">📬</span>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
                    Contact Us
                  </h1>
                  <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
                </div>
              </div>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                We'd love to hear from you! Questions, feedback, or just want to say hello?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-blue-400 to-cyan-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <ContentCard className="p-6 h-full">
                  <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-white text-lg">
                        👨‍👦
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">The Dad & Son Team</h4>
                        <p className="text-white/70 text-sm">Bishu & Shubhang Som</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white text-lg">
                        ⚡
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Quick Response</h4>
                        <p className="text-white/70 text-sm">We reply within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center text-white text-lg">
                        💡
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Your Ideas Matter</h4>
                        <p className="text-white/70 text-sm">Suggest new features or games</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <h4 className="text-white font-semibold mb-3">Common Topics</h4>
                    <ul className="text-white/70 text-sm space-y-2">
                      <li>• Bug reports</li>
                      <li>• Feature requests</li>
                      <li>• Math questions</li>
                      <li>• Partnership ideas</li>
                      <li>• Just saying hello! 👋</li>
                    </ul>
                  </div>
                </ContentCard>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContentCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                  
                  <form 
                    name="contact" 
                    method="POST"
                    className="space-y-6"
                  >
                    {/* Netlify Form Hidden Fields */}
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don't fill this out if you're human: <input name="bot-field" />
                      </label>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-white font-semibold mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/15 transition-all duration-300"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-white font-semibold mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/15 transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-white font-semibold mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-cyan-300 focus:bg-white/15 transition-all duration-300"
                      >
                        <option value="" className="text-gray-800">Select a topic</option>
                        <option value="bug-report" className="text-gray-800">🐛 Bug Report</option>
                        <option value="feature-request" className="text-gray-800">💡 Feature Request</option>
                        <option value="math-question" className="text-gray-800">🔢 Math Question</option>
                        <option value="feedback" className="text-gray-800">🌟 General Feedback</option>
                        <option value="partnership" className="text-gray-800">🤝 Partnership</option>
                        <option value="other" className="text-gray-800">❓ Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white font-semibold mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 focus:bg-white/15 transition-all duration-300 resize-none"
                        placeholder="Tell us what's on your mind..."
                      ></textarea>
                    </div>

                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-300 focus:ring-2"
                      />
                      <label htmlFor="newsletter" className="text-white/70 text-sm">
                        Send me updates about new features and math games
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
                      <p className="text-white/60 text-sm">
                        * Required fields
                      </p>
                      <button
                        type="submit"
                        className="bg-cyan-400 text-blue-800 font-bold px-8 py-4 rounded-2xl hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                      >
                        🐚 Send Message
                      </button>
                    </div>
                  </form>
                </ContentCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <ContentCard className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Quick Help</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Before contacting us, you might find answers in these places:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/about" className="block">
                <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <div className="text-3xl mb-3">👨‍👦</div>
                  <h3 className="text-xl font-semibold text-white mb-2">About Us</h3>
                  <p className="text-white/70 text-sm">Learn about our story and mission</p>
                </div>
              </Link>
              
              <Link href="/grades" className="block">
                <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <div className="text-3xl mb-3">📚</div>
                  <h3 className="text-xl font-semibold text-white mb-2">All Grades</h3>
                  <p className="text-white/70 text-sm">Browse all available math topics</p>
                </div>
              </Link>
              
              <Link href="/" className="block">
                <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <div className="text-3xl mb-3">🏠</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Homepage</h3>
                  <p className="text-white/70 text-sm">Return to the main page</p>
                </div>
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