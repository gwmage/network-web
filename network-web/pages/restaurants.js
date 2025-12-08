import RestaurantList from '../src/components/RestaurantList';

const RestaurantsPage = () => {
  return (
    <div>
      <h1>Find a Restaurant</h1>
      <p>Check out the list of restaurants with available tables.</p>
      <RestaurantList />
    </div>
  );
};

export default RestaurantsPage;