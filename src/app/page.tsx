import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ApiExplorer from '@/components/ApiExplorer';

export const metadata = {
  title: 'AlgoForge API | High-Performance Stock Trading Bot Infrastructure',
  description: 'The ultimate REST API for quant developers. Access technical indicators, strategy signals, and portfolio rebalancing via simple HTTP calls.',
  openGraph: {
    title: 'AlgoForge API - The Brain for Your Trading Bot',
    description: 'Build trading bots without complex coding. Zero servers, maximum speed.',
    images: ['/images/og-image.png'],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <ApiExplorer />
      
      {/* Pricing / CTA Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to automate your alpha?</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 2,000+ developers building with AlgoForge. Start for free on RapidAPI 
            and scale as your strategy grows.
          </p>
          <div className="glass-card max-w-md mx-auto p-12">
            <div className="text-primary font-bold uppercase tracking-widest text-xs mb-2">FREE TIER</div>
            <div className="text-5xl font-black text-white mb-6">$0</div>
            <ul className="text-left space-y-4 mb-10 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="text-primary">✓</span> 10 API calls per day
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">✓</span> End-of-day data (1d)
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">✓</span> Basic indicators (RSI, MA)
              </li>
            </ul>
            <button className="w-full btn-primary rounded-xl">Get Started</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 glass">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black text-lg italic">A</div>
            <span className="text-xl font-black text-white">AlgoForge API</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white">Documentation</a>
            <a href="#" className="hover:text-white">RapidAPI Marketplace</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
          <div className="text-sm text-slate-600">
            © 2026 AlgoForge API. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
