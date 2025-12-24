import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MealGrid from './components/MealGrid';
import Pagination from './components/Pagination';
import MealDetail from './components/MealDetail';
import HungryButton from './components/HungryButton';
import { searchMeals, searchMealsByArea, getMealById, getRandomMeal } from './services/api';

const App = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const handleSearch = async (searchTerm, page = 1) => {
    setIsLoading(true);
    setError(null);
    setLastSearchTerm(searchTerm);
    setCurrentPage(page);
    setSearchType('name');

    try {
      const response = await searchMeals(searchTerm, page, 12);
      setMeals(response.meals || []);
      setTotalPages(response.totalPages || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch meals. Please try again.');
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchByArea = async (area, page = 1) => {
    setIsLoading(true);
    setError(null);
    setLastSearchTerm(area);
    setCurrentPage(page);
    setSearchType('area');

    try {
      const response = await searchMealsByArea(area, page, 12);
      setMeals(response.meals || []);
      setTotalPages(response.totalPages || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch meals. Please try again.');
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (lastSearchTerm) {
      if (searchType === 'area') {
        handleSearchByArea(lastSearchTerm, newPage);
      } else {
        handleSearch(lastSearchTerm, newPage);
      }
    }
  };

  const handleViewDetails = async (mealId) => {
    setIsLoadingDetail(true);
    try {
      const mealDetails = await getMealById(mealId);
      setSelectedMeal(mealDetails);
    } catch (err) {
      console.error('Error loading meal details:', err);
      alert('Failed to load meal details. Please try again.');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleRandomMeal = async () => {
    setIsLoadingDetail(true);
    try {
      const randomMeal = await getRandomMeal();
      setSelectedMeal(randomMeal);
    } catch (err) {
      console.error('Error loading random meal:', err);
      alert('Failed to load random meal. Please try again.');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen bg-[#E6F0DC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Random Button */}
        <div className="text-center mb-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-[#9A6735]">Meal Explorer</h1>
            <HungryButton onClick={handleRandomMeal} isLoading={isLoadingDetail} />
          </div>
          <p className="text-gray-600">
            Discover delicious recipes by name, ingredient, or category. Start your culinary journey today!
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearch={(term) => handleSearch(term, 1)} 
          onSearchByArea={(area) => handleSearchByArea(area, 1)}
          isLoading={isLoading} 
        />

        {/* Meal Grid */}
        <MealGrid 
          meals={meals} 
          isLoading={isLoading} 
          error={error}
          onViewDetails={handleViewDetails}
        />

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <MealDetail 
          meal={selectedMeal}
          onClose={handleCloseDetail}
        />
      )}

      {/* Loading Overlay for Detail */}
      {isLoadingDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#55883B] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading meal details...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;