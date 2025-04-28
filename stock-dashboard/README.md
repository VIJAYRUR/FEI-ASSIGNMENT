# Stock Price Dashboard

A real-time stock price dashboard built with React, TypeScript, and Tailwind CSS that fetches stock data from the Alpha Vantage API.

## Features

- **Real-time Stock Data**: Fetches current stock prices from Alpha Vantage API
- **Dual View Mode**:
  - Table view with pagination for detailed stock information
  - Chart view with interactive visualizations
- **Search Functionality**: Filter stocks by symbol
- **Responsive Design**: Works on desktop and mobile devices
- **Pagination**: Navigate through multiple pages of stock data in both table and chart views
- **Interactive Charts**: Visualize stock prices and price changes
- **Fallback Mechanism**: Uses mock data when API rate limits are reached
- **Loading State**: Visual feedback while fetching data
- **Error Handling**: Graceful error handling for API failures

## Technologies Used

- **React 18**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **Recharts**: Composable charting library for React
- **Axios**: Promise-based HTTP client for API requests
- **Alpha Vantage API**: Stock market data provider

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VIJAYRUR/FEI-ASSIGNMENT.git
cd FEI-ASSIGNMENT/stock-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

This application can be deployed to Vercel, Netlify, or GitHub Pages.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## API Key

The application uses the Alpha Vantage API key: `ULU7AM4CZ3RGCGAU`. For production use, you should:

1. Get your own API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Replace the key in `src/services/api.ts` with your own key

## Usage

### Table View
- View detailed stock information in a tabular format
- Search for specific stocks using the search bar
- Navigate through pages using the pagination controls
- Click "Show Charts" to switch to chart view

### Chart View
- View stock prices and price changes in bar chart format
- Navigate through different sets of stocks using the pagination controls
- Click "Show Table" to return to table view

## Component Structure

- **App.tsx**: Main application component
- **Header.tsx**: Application header with title
- **StockTable.tsx**: Table view for stock data
- **RechartsStockChart.tsx**: Chart view using Recharts library
- **SearchBar.tsx**: Search functionality
- **Pagination.tsx**: Pagination controls
- **LoadingSpinner.tsx**: Loading indicator
- **ErrorMessage.tsx**: Error display

## License

MIT
