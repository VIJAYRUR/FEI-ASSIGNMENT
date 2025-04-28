import { StockData } from '../services/api';

interface StockTableProps {
  stocks: StockData[];
}

const StockTable = ({ stocks }: StockTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change %</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map((stock) => (
            <tr key={stock.symbol} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stock.price.toFixed(2)}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
