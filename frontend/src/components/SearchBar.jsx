import React, { useState } from 'react';
import '../css/searchbar.css'; // Import the CSS file for styling

const SearchBar = ({ setSearchQuery }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(input);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search transactions..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
