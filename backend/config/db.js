import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("DB_URL exists:", !!process.env.DB_URL);

    const conn = await mongoose.connect(process.env.DB_URL, {
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 60000,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠ MongoDB Disconnected');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('✗ MongoDB Connection Error:', err);
    });

  } catch (error) {
    console.error("✗ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;