import { UserSchema } from "../modals/user.modals.js";

// add to cart
const addToCart = async(req, res)=>{
    try {
        let userData = await UserSchema.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await UserSchema.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({succes:true, message: "Added to cart"});
    } catch (error) {
        console.log(error)
        res.json({succes:false, message: "error on add to cart"});
    }
}

// remove from cart
const removeFromCart = async(req, res)=>{
    try {
        let userData = await UserSchema.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await UserSchema.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success: true, message: "Remove from the card"})
    } catch (error) {
        console.log("Error in remove from the card")
        res.json({success: false, message: "error in the remove the from the card"})
    }
}

// fetch user cart data
const getCart = async(req, res)=>{
    try {
        let userData =await UserSchema.findById(req.body.userId)
        let cartData =await userData.cartData;

        if (!cartData) {
            res.json({success: false, message: "Unable to gt cart data"})
        }

        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.josn({success:false, message: "Error in the get cart data"})
    }
}

export {addToCart, removeFromCart, getCart}

