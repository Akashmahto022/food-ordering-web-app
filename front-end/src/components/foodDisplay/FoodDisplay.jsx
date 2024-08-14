import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {loading == true ? (
        <div className="verify">
          <div className="spinner"></div>
          <h1>Please wait while we are loading best food for you</h1>
        </div>
      ) : (
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
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
          })}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
