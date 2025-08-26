```typescript
import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange, resultCount }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt'); // Add sortBy state
  const [sortOrder, setSortOrder] = useState('ASC'); // Add sortOrder state


  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesData = await fetch('/api/categories').then(res => res.json());
        const tagsData = await fetch('/api/tags').then(res => res.json());

        setCategories(categoriesData);
        setAvailableTags(tagsData);
      } catch (error) {
        console.error("Error fetching categories and tags:", error);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  useEffect(() => {
    onFilterChange({ category: selectedCategory, tags: selectedTags, sortBy, sortOrder }); // Include sortBy and sortOrder
  }, [selectedCategory, selectedTags, sortBy, sortOrder, onFilterChange]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTagChange = (event) => {
    const tag = event.target.value;
    const isChecked = event.target.checked;

    setSelectedTags(prevTags => {
      return isChecked
        ? [...prevTags, tag]
        : prevTags.filter(t => t !== tag);
    });
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };


  return (
    <div>
      <div>
        Matching Results: {resultCount}
      </div>
      <label htmlFor="categorySelect">Category:</label>
      <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <div>
        <label>Tags:</label>
        {availableTags.map(tag => (
          <label key={tag.id}>
            <input
              type="checkbox"
              value={tag.id}
              checked={selectedTags.includes(tag.id)}
              onChange={handleTagChange}
            />
            {tag.name}
          </label>
        ))}
      </div>

      <label htmlFor="sortBy">Sort By:</label>
      <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
        <option value="createdAt">Created At</option>
        {/* Add other sorting options as needed */}
        <option value="name">Name</option>
      </select>

      <label htmlFor="sortOrder">Sort Order:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
};

export default Filters;

```