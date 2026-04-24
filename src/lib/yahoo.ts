/**
 * Yahoo Finance Data Fetcher for AlgoForge API
 * Optimized for Edge Runtime (using native fetch)
 */

export interface StockQuote {
  time: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export async function fetchStockData(ticker: string, interval: string = '1d', range: string = '1mo'): Promise<StockQuote[]> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${interval}&range=${range}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data for ${ticker}: ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
      throw new Error(`No data found for ticker ${ticker}`);
    }

    const result = data.chart.result[0];
    const quotes = result.indicators.quote[0];
    const timestamps = result.timestamp;

    if (!timestamps || !quotes.close) {
      return [];
    }

    return timestamps.map((t: number, i: number) => ({
      time: t,
      close: quotes.close[i],
      open: quotes.open[i],
      high: quotes.high[i],
      low: quotes.low[i],
      volume: quotes.volume[i]
    })).filter((q: any) => q.close !== null);
    
  } catch (error) {
    console.error(`Error fetching ${ticker}:`, error);
    throw error;
  }
}

export const NASDAQ_100 = [
  "AAPL", "MSFT", "AMZN", "NVDA", "GOOGL", "GOOG", "META", "TSLA", "AVGO", "PEP",
  "COST", "ADBE", "CSCO", "NFLX", "AMD", "CMCSA", "TMUS", "INTC", "INTU", "AMGN",
  "TXN", "HON", "AMAT", "QCOM", "BKNG", "SBUX", "ISRG", "MDLZ", "VRTX", "GILD",
  "LRCX", "ADI", "REGN", "ADP", "PANW", "VRSK", "MU", "MELI", "KDP", "PDD",
  "KLAC", "SNPS", "CDNS", "CHTR", "MAR", "PYPL", "ORLY", "CTAS", "MNST", "AEP",
  "LULU", "NXPI", "ASML", "DXCM", "ADSK", "IDXX", "PAYX", "MCHC", "WDAY", "CPRT",
  "ROST", "MRVL", "ODFL", "PCAR", "FTNT", "FAST", "CRWD", "KLA", "TEAM", "MDB",
  "DDOG", "CTSH", "AZN", "BKR", "GFS", "CEG", "WBD", "ANSS", "DLTR", "EBAY",
  "EXC", "FANG", "IDXX", "ILMN", "LPLA", "MRNA", "ON", "SBAC", "SIRI", "SPLK",
  "VRSN", "WBA", "ZS"
];
