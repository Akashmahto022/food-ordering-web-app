import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cart.Controller.js";
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/removefromcart", authMiddleware, removeFromCart);
cartRouter.post("/getcart", authMiddleware, getCart);

export default cartRouter;
