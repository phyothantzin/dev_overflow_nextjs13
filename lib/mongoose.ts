import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
