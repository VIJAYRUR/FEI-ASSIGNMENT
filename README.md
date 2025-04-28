# Stock Price Dashboard

A real-time stock price dashboard built with React, TypeScript, and Tailwind CSS that fetches stock data from the Alpha Vantage API.

## Features

- Display stock prices in a clean, responsive table format
- Toggle between table view and chart view
- Interactive charts for visualizing stock prices and price changes
- Search functionality to filter stocks by symbol
- Pagination for both table and chart views
- Responsive design that works on desktop and mobile devices
- Real-time data fetching with fallback to mock data

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
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
cd FEI-ASSIGNMENT
```

2. Install dependencies:
```bash
cd stock-dashboard
npm install
```

3. Create a `.env` file in the root directory and add your Alpha Vantage API key:
```
VITE_ALPHA_VANTAGE_API_KEY=ULU7AM4CZ3RGCGAU
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

- **View Stock Data**: The dashboard displays stock data in a table format by default
- **Search Stocks**: Use the search bar to filter stocks by symbol
- **Pagination**: Navigate through multiple pages of stock data
- **Toggle View**: Click "Show Charts" to switch to chart view, or "Show Table" to return to table view
- **Chart Navigation**: When in chart view, use the pagination controls to view different sets of stocks
- **Refresh Data**: Click the "Refresh Data" button to fetch the latest stock information

## Project Structure

```
stock-dashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── data/            # Mock data for fallback
│   ├── services/        # API services
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## API Integration

The dashboard uses the Alpha Vantage API to fetch real-time stock data. The API has rate limits, so the application includes fallback to mock data when necessary.

## License

This project is licensed under the MIT License.
