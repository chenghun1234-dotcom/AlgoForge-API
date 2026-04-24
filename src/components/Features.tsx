export default function Features() {
  const features = [
    {
      title: "Technical Indicators",
      desc: "RSI, MACD, Bollinger Bands, and more. Highly optimized calculations on the edge.",
      icon: "📊"
    },
    {
      title: "Alpha Strategies",
      desc: "Pre-built strategy signals like Golden Cross and Mean Reversion. Ready for your bot.",
      icon: "⚡"
    },
    {
      title: "Global Screener",
      desc: "Filter through NASDAQ 100 markets with custom conditions in milliseconds.",
      icon: "🔍"
    },
    {
      title: "Zero Infrastructure",
      desc: "Focus on your alpha. We handle data fetching, parsing, and heavy computations.",
      icon: "🏗️"
    },
    {
      title: "Edge Performance",
      desc: "Vercel Edge Runtime ensures global low latency for high-frequency needs.",
      icon: "🌍"
    },
    {
      title: "Free Tier Available",
      desc: "Start for $0. Perfect for building and testing your first automated bot.",
      icon: "💎"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Core Capabilities</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Everything you need to power your algorithmic trading platform without managing a single server.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass-card group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
