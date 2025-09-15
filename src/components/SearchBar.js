import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/dashboardSlice";

// Search component for filtering widgets
function SearchBar() {
  const dispatch = useDispatch();
  const currentQuery = useSelector((s) => s.dashboard.searchQuery);
  const [inputValue, setInputValue] = useState(currentQuery);

  // Perform search
  const handleSearch = () => {
    dispatch(setSearchQuery(inputValue));
  };

  // Clear search
  const handleClear = () => {
    setInputValue("");
    dispatch(setSearchQuery(""));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchbar">
      <input
        className="search-input"
        placeholder="Search widgets..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {inputValue && (
        <button 
          className="icon-btn small" 
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      <button className="btn small" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

