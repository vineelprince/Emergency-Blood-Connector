import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("DB_URL =", process.env.DB_URL);
    const conn = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;