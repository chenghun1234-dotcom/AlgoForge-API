import { NextResponse } from 'next/server';
import { fetchStockData } from '@/lib/yahoo';
import { calculateSMA } from '@/lib/indicators';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticker, short_window = 5, long_window = 20, interval = '1d' } = body;

    if (!ticker) {
      return NextResponse.json({ error: 'Ticker is required' }, { status: 400 });
    }

    const data = await fetchStockData(ticker, interval, '6mo');
    const closes = data.map(q => q.close);

    const currentShortMA = calculateSMA(closes, short_window);
    const currentLongMA = calculateSMA(closes, long_window);
    
    // For Signal, check if it's a cross
    const prevShortMA = calculateSMA(closes.slice(0, -1), short_window);
    const prevLongMA = calculateSMA(closes.slice(0, -1), long_window);

    let signal = "HOLD";
    let message = "No significant trend change.";

    if (prevShortMA <= prevLongMA && currentShortMA > currentLongMA) {
      signal = "BUY";
      message = "Golden Cross: Short-term MA crossed above Long-term MA.";
    } else if (prevShortMA >= prevLongMA && currentShortMA < currentLongMA) {
      signal = "SELL";
      message = "Death Cross: Short-term MA crossed below Long-term MA.";
    }

    return NextResponse.json({
      ticker: ticker.toUpperCase(),
      strategy: 'Moving Average Cross',
      signal,
      current_price: closes[closes.length - 1],
      short_ma: currentShortMA,
      long_ma: currentLongMA,
      message,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
