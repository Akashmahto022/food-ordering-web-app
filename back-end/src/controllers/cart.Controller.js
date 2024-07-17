import { UserSchema } from "../modals/user.modals.js";

// add to cart
const addToCart = async(req, res)=>{
    try {
        let userData = await UserSchema.findOne({_id:req.body.userId})
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await UserSchema.findByIdAndDelete(req.body.userId, {cartData});
        res.json({succes:true, message: "Added to cart"});
    } catch (error) {
        console.log(error)
        res.json({succes:false, message: "error on add to cart"});

    }
}

// remove from cart
const removeFromCart = async(req, res)=>{

}

// fetch user cart data
const getCart = async(req, res)=>{

}

export {addToCart, removeFromCart, getCart}

