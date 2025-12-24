import React, { useState } from 'react';
import AreaDropdown from './AreaDropdown';

const SearchBar = ({ onSearch, onSearchByArea, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSelectedArea(''); // Clear area selection
    }
  };

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setSelectedArea(area);
    if (area) {
      onSearchByArea(area);
      setSearchTerm(''); // Clear text search
    }
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search by Name */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search for pizza, sushi etc, ingredients, or category. Start now!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55883B] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchTerm.trim()}
          className="px-6 py-3 bg-[#55883B] text-white rounded-lg hover:bg-[#4a7533] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Find Meals'}
        </button>
      </div>

      {/* OR Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Search by Area - Using AreaDropdown Component */}
      <AreaDropdown 
        selectedArea={selectedArea}
        onAreaChange={handleAreaChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchBar;