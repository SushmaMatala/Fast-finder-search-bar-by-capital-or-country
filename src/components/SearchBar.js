// src/components/SearchBar.js
import React, { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import data from '../countries.json'; // Adjust the path to your JSON file
import './SearchBar.css';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Debounced search handler
  const handleSearch = useMemo(() => debounce((term) => {
    if (term.length > 0) {
      const results = data.filter((country) =>
        (country.country && country.country.toLowerCase().includes(term.toLowerCase())) ||
        (country.capital && country.capital.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, 300), []);

  // Handle input change
  const onChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by country or capital"
        value={searchTerm}
        onChange={onChange}
      />
      <ul className="suggestions">
        {filteredResults.map((country, index) => (
          <li key={index}>
            {country.country} - {country.capital}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
