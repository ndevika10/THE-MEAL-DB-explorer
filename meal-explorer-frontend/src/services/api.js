// API configuration
const API_BASE_URL = 'http://localhost:8080/api/meals';

/**
 * Search for meals by name
 * @param {string} name - The search term
 * @param {number} page - Page number (default: 1)
 * @param {number} size - Number of items per page (default: 12)
 * @returns {Promise<Object>} - Returns meal search response with meals array and pagination info
 */
export const searchMeals = async (name, page = 1, size = 12) => {
  try {
    const params = new URLSearchParams({
      name: name,
      page: page.toString(),
      size: size.toString()
    });

    const response = await fetch(`${API_BASE_URL}/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw new Error('Failed to fetch meals. Please check your connection and try again.');
  }
};

/**
 * Search for meals by area
 * @param {string} area - The area/cuisine type
 * @returns {Promise<Object>} - Returns meal search response
 */
export const searchMealsByArea = async (area) => {
  try {
    const params = new URLSearchParams({ area });

    const response = await fetch(
      `${API_BASE_URL}/searchByArea?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching meals by area:', error);
    throw error;
  }
};
/**
 * Get meal by ID (if you need this endpoint later)
 * @param {string} id - The meal ID
 * @returns {Promise<Object>} - Returns meal details
 */
export const getMealById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    throw new Error('Failed to fetch meal details.');
  }
};

/**
 * Get a random meal
 * Fetches a random meal from OUR backend
 */
export const getRandomMeal = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/meals/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching random meal:', error);
    throw new Error('Failed to fetch random meal.');
  }
};


export default {
  searchMeals,
  searchMealsByArea,
  getMealById,
  getRandomMeal
};