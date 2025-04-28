import { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { StockData } from '../services/api';

interface StockChartProps {
  stocks: StockData[];
  selectedStocks?: string[]; // Optional array of selected stock symbols to display
}

type ChartType = 'line' | 'bar';

const StockChart = ({ stocks, selectedStocks }: StockChartProps) => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [dataToDisplay, setDataToDisplay] = useState<StockData[]>([]);

  // Log props for debugging
  useEffect(() => {
    console.log('StockChart component received stocks:', stocks);
    console.log('Selected stocks:', selectedStocks);
  }, [stocks, selectedStocks]);

  // Filter stocks based on selectedStocks prop
  useEffect(() => {
    if (!stocks || stocks.length === 0) {
      console.log('No stocks data available for chart');
      setDataToDisplay([]);
      return;
    }

    let displayData;
    if (!selectedStocks || selectedStocks.length === 0) {
      // If no specific stocks are selected, use all stocks (limited to top 10 by price)
      displayData = [...stocks]
        .sort((a, b) => b.price - a.price)
        .slice(0, 10);
    } else {
      // Filter to only include selected stocks
      displayData = stocks.filter(stock => selectedStocks.includes(stock.symbol));
    }

    console.log('Data to display in chart:', displayData);
    setDataToDisplay(displayData);
  }, [stocks, selectedStocks]);

  // Generate random colors for chart
  const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colors;
  };

  // Prepare data for price chart
  const priceChartData: ChartData<'bar' | 'line'> = {
    labels: dataToDisplay.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Stock Price ($)',
        data: dataToDisplay.map(stock => stock.price),
        backgroundColor: generateColors(dataToDisplay.length),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for change percentage chart
  const changeChartData: ChartData<'bar' | 'line'> = {
    labels: dataToDisplay.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Change (%)',
        data: dataToDisplay.map(stock => stock.changePercent),
        backgroundColor: dataToDisplay.map(stock =>
          stock.changePercent >= 0 ? 'rgba(75, 192, 92, 0.7)' : 'rgba(255, 99, 132, 0.7)'
        ),
        borderColor: dataToDisplay.map(stock =>
          stock.changePercent >= 0 ? 'rgba(75, 192, 92, 1)' : 'rgba(255, 99, 132, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const priceChartOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Prices',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `$${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
        },
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
  };

  const changeChartOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Price Change',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed.y.toFixed(2)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Change (%)',
        },
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  // Render the appropriate chart based on chartType
  const renderChart = (type: ChartType, data: ChartData<'bar' | 'line'>, options: ChartOptions<'bar' | 'line'>) => {
    if (type === 'line') {
      return <Line data={data} options={options} />;
    }
    return <Bar data={data} options={options} />;
  };

  // Check if we have data to display
  if (dataToDisplay.length === 0) {
    return (
      <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Stock Charts</h3>
        <p className="text-gray-500">No stock data available to display charts.</p>
      </div>
    );
  }

  console.log('Rendering charts with data:', dataToDisplay);
  console.log('Price chart data:', priceChartData);
  console.log('Change chart data:', changeChartData);

  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-700">Stock Charts</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded ${
              chartType === 'bar'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded ${
              chartType === 'line'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Line
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-center text-gray-700 mb-2">Stock Prices</h4>
          {renderChart(chartType, priceChartData, priceChartOptions)}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-center text-gray-700 mb-2">Price Change (%)</h4>
          {renderChart(chartType, changeChartData, changeChartOptions)}
        </div>
      </div>
    </div>
  );
};

export default StockChart;
