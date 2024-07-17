import mongoose from "mongoose";

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
