```typescript
import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [resultCount, setResultCount] = useState(0);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Replace with your categories API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error, e.g., display an error message
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags'); // Replace with your tags API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
        // Handle error, e.g., display an error message
      }
    };

    fetchCategories();
    fetchTags();
  }, []);



  useEffect(() => {
    const fetchResultCount = async () => {
      try {

        const params = new URLSearchParams();
        if (selectedCategory) {
          params.append('category', selectedCategory);
        }
        if (selectedTags.length > 0) {
          params.append('tags', selectedTags.join(','));
        }

        const response = await fetch(`/api/posts/count?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResultCount(data.count);

      } catch (error) {
        console.error("Error fetching search results count:", error)
      }
    }
    fetchResultCount();
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
    </div>
  );
};

export default Filters;
```