import { useState } from 'react';

const PostSearch = ({ onCategoryFilterChange, onTagFilterChange }) => {
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        onCategoryFilterChange(event.target.value);
    };

    const handleTagsChange = (event) => {
        setTags(event.target.value);
        onTagFilterChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" value={category} onChange={handleCategoryChange} />

            <label htmlFor="tags">Tags:</label>
            <input type="text" id="tags" value={tags} onChange={handleTagsChange} />
        </div>
    );
};

export default PostSearch;
---[END_OF_FILES]---