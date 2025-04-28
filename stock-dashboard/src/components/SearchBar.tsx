import { useState, useEffect } from 'react';
import { STOCK_SYMBOLS } from '../services/api';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update suggestions when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = STOCK_SYMBOLS.filter(symbol =>
      symbol.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);

    // If input is empty, reset the search
    if (value.trim() === '') {
      onSearch('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6 relative">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="Search by stock symbol..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onClick={(e) => e.stopPropagation()} // Prevent closing suggestions when clicking input
            className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-200"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
