import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({
  path: "./env",
});

connectDB();



app.listen(process.env.PORT || port, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
