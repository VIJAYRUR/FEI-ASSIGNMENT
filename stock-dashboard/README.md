# Stock Price Dashboard

A responsive stock price dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- Fetches and displays real-time stock data from Alpha Vantage API
- Responsive design using Tailwind CSS
- Search functionality to filter stocks by symbol
- Loading state while fetching data
- Error handling for API failures
- Refresh button to update stock data

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Alpha Vantage API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stock-dashboard
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

The application uses a demo API key from Alpha Vantage. For production use, you should:

1. Get your own API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Replace the demo key in `src/services/api.ts` with your own key

## License

MIT
