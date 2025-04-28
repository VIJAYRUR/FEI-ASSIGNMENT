import { StockData } from '../services/api';

// Mock data for when the API fails or is rate limited
export const generateMockStockData = (): StockData[] => {
  const symbols = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM',
    'NFLX', 'INTC', 'AMD', 'PYPL', 'ADBE', 'CSCO', 'CRM', 'CMCSA',
    'PEP', 'AVGO', 'COST', 'TMUS', 'QCOM', 'TXN', 'SBUX', 'AMGN',
    'GOOG', 'INTU', 'CHTR', 'ISRG', 'MDLZ', 'BKNG', 'ADP', 'GILD'
  ];

  return symbols.map(symbol => {
    // Generate random price between 50 and 500
    const price = Math.floor(Math.random() * 450) + 50;
    
    // Generate random change between -20 and 20
    const change = Math.round((Math.random() * 40 - 20) * 100) / 100;
    
    // Calculate change percent
    const changePercent = Math.round((change / price * 100) * 100) / 100;
    
    // Generate a random date within the last week
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const randomDate = new Date(lastWeek.getTime() + Math.random() * (today.getTime() - lastWeek.getTime()));
    const lastUpdated = randomDate.toISOString().split('T')[0];
    
    return {
      symbol,
      price,
      change,
      changePercent,
      lastUpdated
    };
  });
};

// Export a pre-generated set of mock data
export const mockStockData = generateMockStockData();
