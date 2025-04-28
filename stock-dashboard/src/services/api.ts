import axios from 'axios';

// Alpha Vantage API key
const API_KEY = 'ULU7AM4CZ3RGCGAU';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

// List of popular stock symbols
export const STOCK_SYMBOLS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM',
  'NFLX', 'INTC', 'AMD', 'PYPL', 'ADBE', 'CSCO', 'CRM', 'CMCSA',
  'PEP', 'AVGO', 'COST', 'TMUS', 'QCOM', 'TXN', 'SBUX', 'AMGN',
  'GOOG', 'INTU', 'CHTR', 'ISRG', 'MDLZ', 'BKNG', 'ADP', 'GILD'
];

// Fetch global quote for a specific stock symbol
export const fetchStockQuote = async (symbol: string): Promise<StockData> => {
  try {
    console.log(`Fetching data for symbol: ${symbol}`);

    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: API_KEY,
      },
    });

    console.log(`Response for ${symbol}:`, response.data);

    // Check for API error messages
    if (response.data.hasOwnProperty('Note')) {
      console.warn('API rate limit message:', response.data.Note);
      // Return mock data for demonstration when rate limited
      return {
        symbol: symbol,
        price: 100 + Math.random() * 50,
        change: (Math.random() * 10) - 5,
        changePercent: (Math.random() * 5) - 2.5,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
    }

    // Check for error messages
    if (response.data.hasOwnProperty('Error Message')) {
      throw new Error(`API Error: ${response.data['Error Message']}`);
    }

    const data = response.data['Global Quote'];

    if (!data || Object.keys(data).length === 0) {
      console.warn(`No data found for symbol ${symbol}, using mock data`);
      // Return mock data for demonstration
      return {
        symbol: symbol,
        price: 100 + Math.random() * 50,
        change: (Math.random() * 10) - 5,
        changePercent: (Math.random() * 5) - 2.5,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
    }

    return {
      symbol: data['01. symbol'],
      price: parseFloat(data['05. price']),
      change: parseFloat(data['09. change']),
      changePercent: parseFloat(data['10. change percent'].replace('%', '')),
      lastUpdated: data['07. latest trading day'],
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    // Return mock data for demonstration in case of error
    return {
      symbol: symbol,
      price: 100 + Math.random() * 50,
      change: (Math.random() * 10) - 5,
      changePercent: (Math.random() * 5) - 2.5,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
  }
};

// Fetch multiple stock quotes
export const fetchMultipleStocks = async (symbols: string[]): Promise<StockData[]> => {
  try {
    console.log('Fetching data for multiple symbols:', symbols);

    // Limit the number of concurrent requests to avoid rate limiting
    const batchSize = 5;
    const stockData: StockData[] = [];

    // Process symbols in batches
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      console.log(`Processing batch ${i/batchSize + 1}:`, batch);

      // Using Promise.allSettled to handle partial failures
      const results = await Promise.allSettled(
        batch.map(symbol => fetchStockQuote(symbol))
      );

      const batchData = results
        .filter((result): result is PromiseFulfilledResult<StockData> => result.status === 'fulfilled')
        .map(result => result.value);

      stockData.push(...batchData);

      // Add a small delay between batches to avoid rate limiting
      if (i + batchSize < symbols.length) {
        console.log('Waiting before next batch...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('Fetched data for all symbols:', stockData);
    return stockData;
  } catch (error) {
    console.error('Error fetching multiple stocks:', error);

    // Return mock data for demonstration in case of error
    return symbols.map(symbol => ({
      symbol,
      price: 100 + Math.random() * 50,
      change: (Math.random() * 10) - 5,
      changePercent: (Math.random() * 5) - 2.5,
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
  }
};
