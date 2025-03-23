import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const url = "https://food-delivery-app-backend-34lu.onrender.com";  //backend url
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    
    const addToCart = async (itemId) => {
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          updatedCart[itemId] = (updatedCart[itemId] || 0) + 1; // safely increment or create a new entry
          return updatedCart;
        });
    
        if (token) { // means the user is logged in
          try {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
          } catch (error) {
            console.error("Error adding to cart:", error);
          }
        }
      };
    
      const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          if (updatedCart[itemId] > 0) {
            updatedCart[itemId] -= 1; // safely decrement
          }
          return updatedCart;
        });
    
        if (token) {
          try {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } }); //making API request in frontend, "http://localhost:4000/api/cart/remove", body, headers.
          } catch (error) {
            console.error("Error removing from cart:", error);
          }
        }
      };


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0) /* means if quantity of the id is greater than 0*/
            {
                let itemInfo = food_list.find((product)=>product._id === item); /*here item represents the id and cartItems[item] represents the qty of item*/
                if (itemInfo) {  // Check if itemInfo exists before accessing price
                  totalAmount += itemInfo.price * cartItems[item];
              } else {
                console.warn(`Item with ID ${item} not found in food_list. Error: ${new Error("Item not found").message}`);
              }
                /*How It Works in Context
                  In this line:

                  totalAmount += itemInfo.price * cartItems[item];
                  itemInfo.price: The price of a single unit of the item (retrieved from food_list).
                  cartItems[item]: The quantity of this item in the cart.
                  itemInfo.price * cartItems[item]: The total price for this particular item in the cart.
                  This value is then added to totalAmount, which keeps a running total of the cart's total cost.
                  
                  Example Walkthrough
                  Given:
                  
                  const cartItems = {
                    "1": 2, // 2 units of item with _id = "1"
                    "2": 3, // 3 units of item with _id = "2"
                  };
                  
                  const food_list = [
                    { _id: "1", name: "Pizza", price: 100 },
                    { _id: "2", name: "Burger", price: 50 },
                  ];
                  During the loop:
                  
                  When item = "1":
                  
                  itemInfo = { _id: "1", name: "Pizza", price: 100 }.
                  cartItems[item] = cartItems["1"] = 2 (2 pizzas in the cart).
                  totalAmount += 100 * 2 = 200. */
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
      try {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };

    const loadCartData = async (token) => {
      try {
        const response = await axios.get(url + "/api/cart/get", { headers: { token } });
        setCartItems(response.data.cartData);
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    };
 
    //we'll add the logic using which the local storage data will be saved in the token state when we'll refresh the web page
    //basically when we are logged in, the state will not change by adding the below logic on refreshing the webpage
    useEffect(()=>{
        //we'll get the localStorage by >>Inspect>>Application>>Local Storage>> there we'll get the token that is generated when the user logs in successfully
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token")); //we have to call this func whenever our page is loaded (logic by which the number of added items remains intact even on reloading the webpage)
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,  
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
 
