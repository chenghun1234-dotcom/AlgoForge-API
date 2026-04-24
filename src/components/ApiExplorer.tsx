'use client';

import { useState } from 'react';

export default function ApiExplorer() {
  const [ticker, setTicker] = useState('NVDA');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testIndicator = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/indicator/rsi?ticker=${ticker}`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: 'Failed' });
    }
    setLoading(false);
  };

  const testStrategy = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/strategy/rsi-reversion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, oversold: 30, overbought: 70 })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: 'Failed' });
    }
    setLoading(false);
  };

  return (
    <section id="docs" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-white">Interactive API Explorer</h2>
              <p className="text-slate-400 mt-1">Live data from NASDAQ markets</p>
            </div>
            <div className="flex bg-slate-900 rounded-lg p-1 border border-white/5">
              <input 
                value={ticker} 
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                className="bg-transparent border-none outline-none text-white font-bold px-4 py-2 w-24 uppercase"
                placeholder="TICKER"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-slate-900/50 border-r border-white/5">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" /> Select Endpoint
              </h3>
              
              <div className="space-y-4">
                <button 
                  onClick={testIndicator}
                  disabled={loading}
                  className="w-full text-left p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">GET /api/indicator/rsi</div>
                    <div className="text-white font-semibold">Relative Strength Index</div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>

                <button 
                  onClick={testStrategy}
                  disabled={loading}
                  className="w-full text-left p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-secondary mb-1 uppercase tracking-tighter">POST /api/strategy/rsi-reversion</div>
                    <div className="text-white font-semibold">Mean Reversion Signal</div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>

                <div className="p-4 rounded-xl border border-dashed border-white/10 opacity-50">
                  <div className="text-xs font-bold text-slate-500 mb-1 uppercase">POST /api/screener/custom</div>
                  <div className="text-slate-500 font-semibold italic text-sm">More endpoints available in docs...</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-950 flex flex-col">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" /> Live Response
              </h3>
              
              <div className="flex-1 bg-black/50 rounded-xl p-6 font-mono text-xs overflow-auto border border-white/5 min-h-[300px]">
                {loading ? (
                  <div className="h-full flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  </div>
                ) : result ? (
                  <pre className="text-white">{JSON.stringify(result, null, 2)}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center">
                    <p>Select an endpoint to see <br />the magic in action.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
