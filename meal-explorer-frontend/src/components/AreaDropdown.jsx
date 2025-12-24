import React from 'react';

const AreaDropdown = ({ selectedArea, onAreaChange, isLoading }) => {
  const areas = [
    'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch',
    'Egyptian', 'Filipino', 'French', 'Greek', 'Indian', 'Irish',
    'Italian', 'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican',
    'Moroccan', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Thai',
    'Tunisian', 'Turkish', 'Ukrainian', 'Vietnamese'
  ];

  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🌍</span>
        <select
          value={selectedArea}
          onChange={onAreaChange}
          disabled={isLoading}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#55883B] disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white cursor-pointer"
        >
          <option value="">Select a cuisine/area...</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
      </div>
    </div>
  );
};

export default AreaDropdown;