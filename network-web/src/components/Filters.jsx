```typescript
import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    // Fetch categories and tags from API or other data source
    const fetchCategoriesAndTags = async () => {
      try {
        // Replace with your actual API calls
        const categoriesData = await fetch('/api/categories').then(res => res.json());
        const tagsData = await fetch('/api/tags').then(res => res.json()); 

        setCategories(categoriesData);
        setAvailableTags(tagsData);
      } catch (error) {
        console.error("Error fetching categories and tags:", error);
        // Handle error, e.g., display an error message
      }
    };

    fetchCategoriesAndTags();
  }, []);

  useEffect(() => {
    onFilterChange({ category: selectedCategory, tags: selectedTags });
  }, [selectedCategory, selectedTags, onFilterChange]);

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


  return (
    <div>
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
    </div>
  );
};

export default Filters;
```