import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, selectedItem }) => {
    const { food_list } = useContext(StoreContext);

    // If a specific food is selected from the search bar, display only that food.
    const displayedFoods =
    selectedItem !== null
        ? food_list.filter((item) => item._id === selectedItem?._id) // 🔹 Added ? to prevent errors
        : food_list.filter((item) => category === "All" || item.category === category);

if (selectedItem && displayedFoods.length === 0) {
    console.error(`Item with ID ${selectedItem._id} not found in food_list.`);
}

    return (
        <div className='food-display' id='food-display'>
            <h2>Popular Picks Around You</h2>
            <div className="food-display-list">
                {selectedItem ? (
                    <FoodItem
                        key={selectedItem._id}
                        id={selectedItem._id}
                        name={selectedItem.name}
                        description={selectedItem.description}
                        price={selectedItem.price}
                        image={selectedItem.image}
                    />
                ) : 
                displayedFoods.map((item, index) => { // index 0: item with id_1, index 1: item with id_2
                    if (category === "All") {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image}
                            />
                        );
                    } 
                    else if (category === item.category) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image}
                            />
                        );
                    }
                    /* if (category==="All" || category===item.category) {
                          return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                          (Done like this in video) (I have just separated it) (the return statement is same in all three) (Just did it for the sake of clarity)
                    } */
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
