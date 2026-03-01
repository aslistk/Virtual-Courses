import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    if (process.env.NODE_ENV !== "production") console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

export default connectDB;
