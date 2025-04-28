import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockData } from '../services/api';

interface RechartsStockChartProps {
  stocks: StockData[];
}

const RechartsStockChart = ({ stocks }: RechartsStockChartProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 10;

  console.log('RechartsStockChart received stocks:', stocks);

  if (!stocks || stocks.length === 0) {
    return (
      <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Stock Chart</h3>
        <p className="text-gray-500">No stock data available to display chart.</p>
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(stocks.length / stocksPerPage);

  // Get current page of stocks
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const displayStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  // Format data for Recharts
  const chartData = displayStocks.map(stock => ({
    name: stock.symbol,
    price: stock.price,
    change: stock.changePercent
  }));

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Stock Prices</h3>
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstStock + 1} to {Math.min(indexOfLastStock, stocks.length)} of {stocks.length} stocks
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" name="Price ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 my-4">Price Change (%)</h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar
                dataKey="change"
                name="Change (%)"
                fill="#82ca9d"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Previous
              </button>

              <span className="px-3 py-1 bg-gray-100 rounded">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RechartsStockChart;
