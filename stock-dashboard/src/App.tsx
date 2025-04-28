import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StockTable from './components/StockTable';
import RechartsStockChart from './components/RechartsStockChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { fetchMultipleStocks, STOCK_SYMBOLS, StockData } from './services/api';
import { mockStockData } from './data/mockData';

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showCharts, setShowCharts] = useState(false);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching stock data...');

      try {
        // Try to fetch real data from API
        // Use all available stock symbols
        console.log('Using all symbols for API call:', STOCK_SYMBOLS);

        const data = await fetchMultipleStocks(STOCK_SYMBOLS);
        console.log('Received stock data:', data);

        if (data.length > 0) {
          setStocks(data);
          setFilteredStocks(data);
          console.log('Updated state with API stock data');
          return;
        }
      } catch (apiError) {
        console.error('API error, falling back to mock data:', apiError);
      }

      // If API fails or returns no data, use mock data
      console.log('Using mock data as fallback');
      setStocks(mockStockData);
      setFilteredStocks(mockStockData);
      console.log('Updated state with mock stock data');

    } catch (err) {
      setError('Failed to fetch stock data. Using demo data instead.');
      console.error('Error in fetchStockData:', err);

      // Use mock data even in case of error
      setStocks(mockStockData);
      setFilteredStocks(mockStockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredStocks(stocks);
      return;
    }

    const filtered = stocks.filter(stock =>
      stock.symbol.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredStocks(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);

  // Get current page items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredStocks.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredStocks, currentPage, itemsPerPage]);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Stock Prices</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCharts(!showCharts)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition duration-200"
              >
                {showCharts ? 'Show Table' : 'Show Charts'}
              </button>
              <button
                onClick={fetchStockData}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
              >
                Refresh Data
              </button>
            </div>
          </div>

          <SearchBar onSearch={handleSearch} />

          {error && <ErrorMessage message={error} onRetry={fetchStockData} />}

          {loading ? (
            <LoadingSpinner />
          ) : filteredStocks.length > 0 ? (
            <>
              {/* Show either table or charts based on showCharts state */}
              {showCharts ? (
                // Show charts
                <>
                  {console.log('Rendering charts with data:', stocks)}
                  <RechartsStockChart stocks={stocks} />
                </>
              ) : (
                // Show table with pagination
                <>
                  <StockTable stocks={currentItems} />
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                  <div className="text-sm text-gray-500 text-center mt-2">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredStocks.length)} to {Math.min(currentPage * itemsPerPage, filteredStocks.length)} of {filteredStocks.length} stocks
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No stocks found matching your search criteria.
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <p>Data provided by Alpha Vantage API. Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
