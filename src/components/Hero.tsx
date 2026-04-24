export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          GLOBAL TRADING API NOW LIVE
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white leading-tight">
          Build Trading Bots <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Without Limits</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          The ultimate REST API for quant developers. Access technical indicators, 
          strategy signals, and portfolio rebalancing via simple HTTP calls. 
          Zero infrastructure, maximum speed.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all">
            Start Building Free
          </button>
          <button className="w-full sm:w-auto px-10 py-4 glass text-white font-bold rounded-xl text-lg hover:bg-white/10 transition-all">
            View API Docs
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="glass p-2 rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-float" style={{ animationDelay: '1s' }}>
            <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-white/5">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">GET /api/strategy/rsi-reversion?ticker=TSLA</div>
              </div>
              <div className="p-6 text-left font-mono text-sm leading-relaxed">
                <p className="text-secondary">{"{"}</p>
                <p className="pl-4"><span className="text-primary">"ticker"</span>: <span className="text-accent">"TSLA"</span>,</p>
                <p className="pl-4"><span className="text-primary">"strategy"</span>: <span className="text-accent">"RSI Mean Reversion"</span>,</p>
                <p className="pl-4"><span className="text-primary">"signal"</span>: <span className="text-green-400">"BUY"</span>,</p>
                <p className="pl-4"><span className="text-primary">"rsi_value"</span>: <span className="text-yellow-400">28.42</span>,</p>
                <p className="pl-4"><span className="text-primary">"message"</span>: <span className="text-slate-300">"Oversold: RSI is below 30. Potential reversal."</span></p>
                <p className="text-secondary">{"}"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
