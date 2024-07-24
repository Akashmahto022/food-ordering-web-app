import express from 'express'
import { placeOrder, verifyOrder, userOrders, listOrders } from '../controllers/order.Controller.js'
import authMiddleware from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post("/placeorder",authMiddleware,placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/listorders", listOrders);

export default orderRouter;
