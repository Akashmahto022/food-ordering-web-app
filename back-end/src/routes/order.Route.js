import express from 'express'
import { placeOrder, verifyOrder, userOrders } from '../controllers/order.Controller.js'
import authMiddleware from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post("/placeorder",authMiddleware,placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

export default orderRouter;
