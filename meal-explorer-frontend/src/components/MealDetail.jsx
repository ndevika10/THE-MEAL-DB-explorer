import React from 'react';

const MealDetail = ({ meal, onClose }) => {
  if (!meal) return null;

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(meal.strYoutube);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        {/* Meal Image */}
        {meal.strMealThumb && (
          <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-4">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meal Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#9A6735] mb-3">
          {meal.strMeal}
        </h2>

        {/* Category and Area Tags */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {meal.strCategory && (
            <span className="px-3 py-1 bg-[#55883B] text-white text-xs rounded-full">
              📂 {meal.strCategory}
            </span>
          )}
          {meal.strArea && (
            <span className="px-3 py-1 bg-[#9A6735] text-white text-xs rounded-full">
              🌍 {meal.strArea}
            </span>
          )}
        </div>

        {/* Instructions */}
        {meal.strInstructions && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 Instructions</h3>
            <div className="bg-[#E6F0DC] rounded-lg p-3">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                {meal.strInstructions}
              </p>
            </div>
          </div>
        )}

        {/* Ingredients */}
        {meal.strIngredient1 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🥘 Ingredients</h3>
            <div className="bg-[#E6F0DC] rounded-lg p-3">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                  const ingredient = meal[`strIngredient${num}`];
                  const measure = meal[`strMeasure${num}`];
                  if (ingredient && ingredient.trim()) {
                    return (
                      <li key={num} className="text-gray-700">
                        • {measure} {ingredient}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )}

        {/* YouTube Video */}
        {videoId && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🎥 Video Tutorial</h3>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Close Button at Bottom */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#55883B] text-white rounded-lg hover:bg-[#4a7533] transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
