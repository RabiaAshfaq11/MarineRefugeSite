import { config } from "dotenv";

config();

interface EnvConfig {
  PORT: number;
  SENDGRID_API_KEY: string;
  SENDGRID_SENDER_EMAIL: string;
  MONGODB_URI: string;
  NODE_ENV: string;
}

function validateEnv(): EnvConfig {
  // SENDGRID variables are now optional for deployment without email functionality
  const requiredEnvVars = [
    "MONGODB_URI",
  ];

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(
      `Warning: Missing environment variables: ${missingVars.join(", ")}`
    );
  }

  // Warn if SendGrid is not configured (but don't fail)
  if (!process.env.SENDGRID_API_KEY) {
    console.warn(
      "⚠️ SENDGRID_API_KEY not set - Email functionality will be disabled"
    );
  }

  return {
    PORT: parseInt(process.env.PORT || "5000", 10),
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
    SENDGRID_SENDER_EMAIL:
      process.env.SENDGRID_SENDER_EMAIL ||
      "Marine Refuge Updates <marinerefugestartup@gmail.com>",
    MONGODB_URI: process.env.MONGODB_URI || "",
    NODE_ENV: process.env.NODE_ENV || "development",
  };
}

export const env = validateEnv();
