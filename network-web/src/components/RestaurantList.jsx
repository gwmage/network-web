import { useState, useEffect } from 'react';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/restaurants/available');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch restaurants.');
        }
        const data = await response.json();
        setRestaurants(data.restaurants);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading available restaurants...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Available Restaurants</h2>
      {restaurants.length > 0 ? (
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={restaurant.id || index}>
              <h3>{restaurant.name}</h3>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Availability: {restaurant.availability}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available restaurants at the moment.</p>
      )}
    </div>
  );
};

export default RestaurantList;