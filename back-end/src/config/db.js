import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const uri =
  "mongodb+srv://akashmahto2272003:food-app-5060@cluster0.inxmnso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MongoDB Connected !! DB host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error in connecting DB", error);
    console.log(process.env.ERRORMS);
  }
};

export default connectDB;
