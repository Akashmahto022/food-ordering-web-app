import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/db.js";
import foodRouter from "./routes/food.route.js";

dotenv.config({
  path: "./env",
});

connectDB();

//api endpoints
app.use('/api/food', foodRouter)

app.listen(process.env.PORT || port, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
