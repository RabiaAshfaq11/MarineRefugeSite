import mongoose from "mongoose";
import { env } from "../config/env";

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) {
    console.log("📦 Using existing MongoDB connection");
    return;
  }

  if (!env.MONGODB_URI) {
    console.warn("⚠️  MongoDB URI not configured. Database features will be disabled.");
    return;
  }

  try {
    await mongoose.connect(env.MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("📤 MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ MongoDB error:", error);
});
