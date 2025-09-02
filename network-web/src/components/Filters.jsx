```typescript
import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchCategories();
    fetchTags();
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