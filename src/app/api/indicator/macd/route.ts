import { NextResponse } from 'next/server';
import { fetchStockData } from '@/lib/yahoo';
import { calculateMACD } from '@/lib/indicators';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker');
  const interval = searchParams.get('interval') || '1d';
  const range = searchParams.get('range') || '3mo'; // Need more data for MACD

  if (!ticker) {
    return NextResponse.json({ error: 'Ticker is required' }, { status: 400 });
  }

  try {
    const data = await fetchStockData(ticker, interval, range);
    const closes = data.map(q => q.close);
    const macd = calculateMACD(closes);

    return NextResponse.json({
      ticker: ticker.toUpperCase(),
      indicator: 'MACD',
      ...macd,
      interval,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
