import { z } from "zod";

/**
 * Environment variable schema with Zod validation
 * Provides detailed error messages for missing or invalid environment variables
 */
const envSchema = z.object({
  // Public variables (exposed to client)
  NEXT_PUBLIC_DISCORD_URL: z
    .string()
    .url("NEXT_PUBLIC_DISCORD_URL must be a valid URL")
    .default("https://discord.gg/Xrk5m6svGt"),

  // Server-side only variables
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required for database connection")
    .regex(
      /^mongodb(\+srv)?:\/\/.+/,
      "MONGODB_URI must be a valid MongoDB connection string (mongodb:// or mongodb+srv://)"
    ),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/**
 * Parse and validate environment variables with detailed error messaging
 */
function parseEnv() {
  try {
    const parsed = envSchema.parse({
      NEXT_PUBLIC_DISCORD_URL: process.env.NEXT_PUBLIC_DISCORD_URL,
      MONGODB_URI: process.env.MONGODB_URI,
      NODE_ENV: process.env.NODE_ENV,
    });
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format error messages for better readability
      const errorMessages = error.issues.map((err: z.ZodIssue) => {
        const path = err.path.join(".");
        return `  ❌ ${path}: ${err.message}`;
      });

      console.error("❌ Environment variable validation failed:\n");
      console.error(errorMessages.join("\n"));
      console.error("\n📝 Please check your .env file and ensure all required variables are set correctly.\n");

      throw new Error("Invalid environment variables - see error messages above");
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * Access these instead of process.env for type safety and validation
 */
export const env = parseEnv();
