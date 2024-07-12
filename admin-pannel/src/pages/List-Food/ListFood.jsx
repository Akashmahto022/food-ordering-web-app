import React, { useEffect, useState } from "react";
import "./listfood.css";
import axios from "axios";
import { toast } from "react-toastify";

const ListFood = () => {
  const url = "http://localhost:3000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/getallfoods`);
    console.log(response.data.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error in loadpost");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/removefood`, {id:foodId})
    await fetchList();
    if (response.data.success) {
      
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  return (
    <div className="list add flex-col">
      <p>All foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ListFood;
