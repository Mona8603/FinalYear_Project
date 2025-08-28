import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
      setKeyword('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter industry (e.g., hotels)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
