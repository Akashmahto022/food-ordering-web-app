import { OrderSchema } from "../modals/order.modals.js";
import { UserSchema } from "../modals/user.modals.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order from frontend
const placeOrder = async(req, res)=>{
    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new OrderSchema({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        })
        await newOrder.save();
        await UserSchema.findByIdAndUpdate(req.body.userId, {cartData: {}})

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency: "inr",
                product_data: {
                    name:"Delivery Charges"
                },
                unit_amount: 2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error, "error in the payment")
        res.json({success:false, message: "error in the payment"})
    }
}

const verifyOrder = async(req, res)=>{
    const {orderId, success} = req.body
    try {
        if (success=='true') {
            await OrderSchema.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"})
        }
        else{
            await OrderSchema.findByIdAndDelete(orderId);
            res.json({success:false, message: "not paid"})
        }
    } catch (error) {
        console.log(error)
        res.josn({success:false, message:"Error in paid"})
    }
}


const userOrders = async(req, res)=>{
    try {
        const orders = await OrderSchema.find({userId:req.body.userId})
        if (!orders) {
            res.json({success:false, message: "error in order"})
        }
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "error in order"})
    }
}

// list all the orders from the user
const listOrders = async(req, res)=>{
    try {
        const orders = await OrderSchema.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "error in geting orders"})
    }
}

//  api for updating order status
const updateStatusOfOrders = async(req, res)=>{
  try {
    await OrderSchema.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true, message: "update status of order"})
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "error in updating order"})
  }
}


export {placeOrder, verifyOrder, userOrders, listOrders, updateStatusOfOrders}