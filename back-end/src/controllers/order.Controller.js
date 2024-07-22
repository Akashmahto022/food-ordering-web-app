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
            itmes: req.body.itmes,
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


export {placeOrder}