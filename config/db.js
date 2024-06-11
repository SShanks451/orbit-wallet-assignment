import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Connection failed");
    console.log("Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
