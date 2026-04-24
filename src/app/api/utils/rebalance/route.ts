import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { assets, total_cash = 0 } = body;

    // Expected assets format: [{ ticker: "AAPL", current_value: 1000, target_weight: 0.5 }, ...]
    
    const currentTotalValue = assets.reduce((sum: number, a: any) => sum + a.current_value, 0) + total_cash;
    
    const results = assets.map((asset: any) => {
      const targetValue = currentTotalValue * asset.target_weight;
      const diff = targetValue - asset.current_value;
      return {
        ticker: asset.ticker,
        current_value: asset.current_value,
        target_value: targetValue,
        rebalance_amount: parseFloat(diff.toFixed(2)),
        action: diff > 0 ? "BUY" : "SELL"
      };
    });

    return NextResponse.json({
      total_portfolio_value: currentTotalValue,
      rebalance_plan: results,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
