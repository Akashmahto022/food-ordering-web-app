import { response } from "express";
import { FoodSchema } from "../modals/food.modals.js";
import fs from 'fs'

// add food item

const addFood = async(req, res)=>{
    let image_fileName = `${req.file.filename}`;

    const food = new FoodSchema({
        name : req.body.name,
        decscription: req.body.decscription,
        price : req.body.price,
        category : req.body.category,
        image : image_fileName
    })

    try {
        await food.save();
        res.json({success:true,message:"food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export {addFood}