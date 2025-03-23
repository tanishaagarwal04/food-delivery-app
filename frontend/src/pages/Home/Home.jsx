import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null); // New state for the selected item
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 🔹 State to control SearchBar visibility

  const handleSearchSelect = (item) => {
    console.log("Setting selectedItem:", item);
    setSelectedItem(item);
    setIsSearchOpen(false);
  };
  


  return (
    <div>
      <Header /> {/* mount the header component in home.jsx file */}
    
      {/* Show SearchBar only if isSearchOpen is true */}
      {isSearchOpen && (
        <SearchBar
          setSelectedItem={setSelectedItem}
          onClose={() => setIsSearchOpen(false)} // 🔹 Pass close function
        />
      )}

      <ExploreMenu category={category} setCategory={setCategory} />{" "} {/* mount the ExploreMenu component in home.jsx file */}
      <FoodDisplay category={category} selectedItem={selectedItem} />
      <AppDownload />
    </div>
  );
};

export default Home;
