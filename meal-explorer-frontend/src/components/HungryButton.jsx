import React from 'react';

const HungryButton = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <span className="text-xl">🍽️</span>
      <span>{isLoading ? 'Finding...' : "I'm Hungry!"}</span>
    </button>
  );
};

export default HungryButton;