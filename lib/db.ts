import mongoose from "mongoose";
import { env } from "./env";

/**
 * Global type declaration for mongoose connection caching
 * This prevents creating multiple connections in development due to hot reloading
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Initialize global mongoose cache
global.mongoose = global.mongoose || { conn: null, promise: null };

/**
 * Connects to MongoDB with connection pooling and caching
 *
 * In development, uses a global cache to prevent multiple connections
 * due to Next.js hot reloading. In production, connections are properly pooled.
 *
 * @returns Promise<mongoose.Connection> The MongoDB connection
 * @throws Error if connection fails
 */
export async function connectDB(): Promise<mongoose.Connection> {
  // Return existing connection if available
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  // Return pending connection promise if it exists
  if (global.mongoose.promise) {
    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  }

  // Create new connection
  const opts: mongoose.ConnectOptions = {
    bufferCommands: false, // Disable mongoose buffering
    maxPoolSize: 10, // Maximum number of connections in the pool
    minPoolSize: 2, // Minimum number of connections in the pool
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    serverSelectionTimeoutMS: 10000, // Timeout for server selection
  };

  console.log("🔌 Connecting to MongoDB...");

  try {
    global.mongoose.promise = mongoose
      .connect(env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose.connection;
      });

    global.mongoose.conn = await global.mongoose.promise;

    // Set up connection event listeners
    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });

    return global.mongoose.conn;
  } catch (error) {
    global.mongoose.promise = null;
    console.error("❌ Failed to connect to MongoDB:", error);
    throw new Error(
      `Failed to connect to MongoDB: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Disconnects from MongoDB
 * Useful for cleanup in tests or graceful shutdown
 */
export async function disconnectDB(): Promise<void> {
  if (global.mongoose.conn) {
    await mongoose.disconnect();
    global.mongoose.conn = null;
    global.mongoose.promise = null;
    console.log("🔌 MongoDB disconnected");
  }
}

/**
 * Gets the current MongoDB connection status
 */
export function getConnectionStatus(): string {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  return states[mongoose.connection.readyState] || "unknown";
}
