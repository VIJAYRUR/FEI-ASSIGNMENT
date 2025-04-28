const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">Stock Price Dashboard</h1>
        <p className="mt-2 text-blue-100">
          Real-time stock data from Alpha Vantage API
        </p>
      </div>
    </header>
  );
};

export default Header;
