import React from 'react';

const MealCard = ({ meal, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-48 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {meal.strMeal}
        </h3>

        <div className="flex gap-2 mb-4 flex-wrap">
          {meal.strCategory && (
            <span className="px-3 py-1 bg-[#9A6735] text-white text-xs rounded-full">
              {meal.strCategory}
            </span>
          )}
          {meal.strArea && (
            <span className="px-3 py-1 bg-[#9A6735] text-white text-xs rounded-full">
              {meal.strArea}
            </span>
          )}
        </div>

        <button
          onClick={() => onViewDetails(meal.idMeal)}
          className="w-full py-2 border border-[#55883B] text-[#55883B] rounded-lg hover:bg-[#55883B] hover:text-white"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default MealCard;
