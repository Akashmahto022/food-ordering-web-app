import express from "express";
import { FoodSchema } from "../modals/food.modals.js";
import fs from "fs";
import foodRouter from "../routes/food.route.js";

// add food item

const addFood = async (req, res) => {
  let image_fileName = `${req.file.filename}`;
  console.log(req.file.filename);

  const food = new FoodSchema({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_fileName,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await FoodSchema.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error)
    res.json(
        {
            success:false,
            message:"error"
        }
    )
  }
};

// delete food
const removeFood = async(req, res)=>{
    try {
        const food = await FoodSchema.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        
        await FoodSchema.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Food remove"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error})
    }
}

export { addFood, listFood, removeFood };
