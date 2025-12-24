import React from 'react';
import MealCard from './MealCard';

const MealGrid = ({ meals, isLoading, error, onViewDetails }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#55883B] mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for delicious meals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <p className="text-red-600 font-semibold mb-2">Oops! Something went wrong</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-2">No meals found</p>
          <p className="text-gray-500">Try searching for something else!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal || meal.id}
          meal={meal}
          onViewDetails={onViewDetails} // Pass it here
        />
      ))}
    </div>
  );
};

export default MealGrid;
