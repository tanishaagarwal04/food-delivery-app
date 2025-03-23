import React, { useState, useEffect, useContext } from 'react';
import './SearchBar.css';
import { StoreContext } from '../../context/StoreContext';

const SearchBar = ({ setSelectedItem = () => {}, onClose = () => {} }) => {
  const { food_list } = useContext(StoreContext);  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  
  // 🔹 Automatically filter items when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const results = food_list.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) //gives all cake varieties, when you type cake (Checks if the lowercase searchQuery is a substring of the lowercase item.name.)
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]); // Clear results if searchQuery is empty
    }
  }, [searchQuery]); // Runs every time searchQuery updates

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item
    setSearchQuery(""); // Clear search input
    setFilteredItems([]); // Clear search results
    onClose(); // Close the search bar
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-btn">
        Search
      </button>
      <button className="close-btn" onClick={onClose}>
        X
      </button>

      <div className="search-results">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div onClick={() => handleItemClick(item)} key={item._id} className="food-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))
        ) : searchQuery.trim() !== "" ? (
          <p>No items found</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
