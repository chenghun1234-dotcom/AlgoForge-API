import { NextResponse } from 'next/server';
import { fetchStockData } from '@/lib/yahoo';
import { calculateRSI } from '@/lib/indicators';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticker, period = 14, oversold = 30, overbought = 70, interval = '1d' } = body;

    if (!ticker) {
      return NextResponse.json({ error: 'Ticker is required' }, { status: 400 });
    }

    const data = await fetchStockData(ticker, interval, '1mo');
    const closes = data.map(q => q.close);
    const rsi = calculateRSI(closes, period);

    let signal = "HOLD";
    let message = `RSI is currently ${rsi.toFixed(2)}.`;

    if (rsi <= oversold) {
      signal = "BUY";
      message = `Oversold: RSI is below ${oversold}. Potential reversal to the upside.`;
    } else if (rsi >= overbought) {
      signal = "SELL";
      message = `Overbought: RSI is above ${overbought}. Potential reversal to the downside.`;
    }

    return NextResponse.json({
      ticker: ticker.toUpperCase(),
      strategy: 'RSI Mean Reversion',
      signal,
      rsi_value: parseFloat(rsi.toFixed(2)),
      message,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
