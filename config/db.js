import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shashanksuman451:oMVXUphbCQBBJ1Pm@cluster0.unehxz0.mongodb.net/myDB");
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Connection failed");
    console.log("Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
