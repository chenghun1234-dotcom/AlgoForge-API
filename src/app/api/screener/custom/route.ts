import { NextResponse } from 'next/server';
import { fetchStockData, NASDAQ_100 } from '@/lib/yahoo';
import { calculateRSI, calculateSMA } from '@/lib/indicators';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { conditions = [], limit = 10 } = body;

    // To keep it fast for serverless/edge, we only screen a subset of NASDAQ_100
    const tickersToScreen = NASDAQ_100.slice(0, 30);
    const results: any[] = [];

    // Process in parallel with a limit to avoid rate limits
    const promises = tickersToScreen.map(async (ticker) => {
      try {
        const data = await fetchStockData(ticker, '1d', '1mo');
        const closes = data.map(q => q.close);
        const currentPrice = closes[closes.length - 1];
        
        let matches = true;
        const indicators: any = { price: currentPrice };

        for (const cond of conditions) {
          let value: number;
          if (cond.indicator === 'rsi') {
            value = calculateRSI(closes, cond.period || 14);
            indicators.rsi = value;
          } else if (cond.indicator === 'price') {
            value = currentPrice;
          } else if (cond.indicator === 'ma') {
            value = calculateSMA(closes, cond.period || 20);
            indicators[`ma_${cond.period}`] = value;
          } else {
            continue;
          }

          if (cond.operator === '<=' && !(value <= cond.value)) matches = false;
          if (cond.operator === '>=' && !(value >= cond.value)) matches = false;
          if (cond.operator === '<' && !(value < cond.value)) matches = false;
          if (cond.operator === '>' && !(value > cond.value)) matches = false;
          if (cond.operator === '==' && !(value === cond.value)) matches = false;
          
          // Target handling (e.g., price > ma_20)
          if (cond.target === 'ma_20') {
             const ma20 = calculateSMA(closes, 20);
             if (cond.operator === '>' && !(currentPrice > ma20)) matches = false;
          }
        }

        if (matches) {
          return { ticker, ...indicators };
        }
      } catch (e) {
        return null;
      }
      return null;
    });

    const screenedResults = (await Promise.all(promises)).filter(r => r !== null);

    return NextResponse.json({
      count: screenedResults.length,
      results: screenedResults.slice(0, limit),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
