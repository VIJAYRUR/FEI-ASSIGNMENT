import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { StockData } from '../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SimpleChartProps {
  stocks: StockData[];
}

const SimpleChart = ({ stocks }: SimpleChartProps) => {
  console.log('SimpleChart received stocks:', stocks);
  
  if (!stocks || stocks.length === 0) {
    return (
      <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Stock Chart</h3>
        <p className="text-gray-500">No stock data available to display chart.</p>
      </div>
    );
  }

  // Take only the first 10 stocks for simplicity
  const displayStocks = stocks.slice(0, 10);
  
  // Prepare data for chart
  const chartData = {
    labels: displayStocks.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Stock Price ($)',
        data: displayStocks.map(stock => stock.price),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Prices',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Stock Prices</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SimpleChart;
