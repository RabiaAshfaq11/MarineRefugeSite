/**
 * Test script for Marine Refuge Email System
 * 
 * Run with: npx tsx server/test-email-system.ts
 */

import { connectDB } from "./config/database";
import { Subscriber } from "./models/Subscriber";
import { EmailService } from "./services/emailService";
import { isValidEmail, sanitizeEmail } from "./lib/utils";

async function testEmailSystem() {
  console.log("\n🧪 Testing Marine Refuge Email System\n");
  console.log("=" .repeat(50));

  // Test 1: Utility Functions
  console.log("\n📋 Test 1: Utility Functions");
  console.log("-".repeat(50));
  
  const testEmails = [
    "valid@example.com",
    "  VALID@EXAMPLE.COM  ",
    "invalid-email",
    "missing@domain",
    "",
  ];

  testEmails.forEach((email) => {
    const isValid = isValidEmail(email);
    const sanitized = sanitizeEmail(email);
    console.log(`Email: "${email}"`);
    console.log(`  Valid: ${isValid}`);
    console.log(`  Sanitized: "${sanitized}"\n`);
  });

  // Test 2: Database Connection
  console.log("\n📋 Test 2: Database Connection");
  console.log("-".repeat(50));
  
  try {
    await connectDB();
    console.log("✅ Database connection successful");
  } catch (error: any) {
    console.error("❌ Database connection failed:", error.message);
    console.log("\n⚠️  Skipping database tests due to connection failure");
    return;
  }

  // Test 3: Subscriber Model
  console.log("\n📋 Test 3: Subscriber Model");
  console.log("-".repeat(50));
  
  const testEmail = `test-${Date.now()}@example.com`;
  
  try {
    // Create test subscriber
    const subscriber = new Subscriber({
      email: testEmail,
      isActive: true,
    });
    
    await subscriber.save();
    console.log("✅ Subscriber created:", subscriber.email);

    // Find subscriber
    const found = await Subscriber.findOne({ email: testEmail });
    console.log("✅ Subscriber found:", found?.email);

    // Count subscribers
    const count = await Subscriber.countDocuments({ isActive: true });
    console.log("✅ Active subscribers count:", count);

    // Clean up test subscriber
    await Subscriber.deleteOne({ email: testEmail });
    console.log("✅ Test subscriber cleaned up");
  } catch (error: any) {
    console.error("❌ Subscriber model test failed:", error.message);
  }

  // Test 4: Email Service (WARNING: This will send a real email!)
  console.log("\n📋 Test 4: Email Service");
  console.log("-".repeat(50));
  console.log("⚠️  WARNING: This test will send a real email via SendGrid");
  console.log("⚠️  Make sure you have:");
  console.log("    1. Valid SENDGRID_API_KEY in .env");
  console.log("    2. Verified sender email in SendGrid");
  console.log("\n❓ Skipping email send test (uncomment to enable)");
  
  // UNCOMMENT THE LINES BELOW TO TEST EMAIL SENDING
  // Replace with your actual email address
  /*
  try {
    const yourEmail = "your-email@example.com"; // ← CHANGE THIS
    await EmailService.sendWelcomeEmail(yourEmail);
    console.log("✅ Welcome email sent successfully");
    console.log("📧 Check your inbox at:", yourEmail);
  } catch (error: any) {
    console.error("❌ Email send failed:", error.message);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
  }
  */

  // Test 5: Environment Configuration
  console.log("\n📋 Test 5: Environment Configuration");
  console.log("-".repeat(50));
  
  const requiredVars = [
    "PORT",
    "SENDGRID_API_KEY",
    "SENDGRID_SENDER_EMAIL",
    "MONGODB_URI",
  ];

  requiredVars.forEach((varName) => {
    const value = process.env[varName];
    if (value) {
      // Mask sensitive data
      const masked = varName.includes("KEY") || varName.includes("URI")
        ? value.substring(0, 10) + "..."
        : value;
      console.log(`✅ ${varName}: ${masked}`);
    } else {
      console.log(`❌ ${varName}: NOT SET`);
    }
  });

  console.log("\n" + "=".repeat(50));
  console.log("✨ Tests completed!\n");
  
  // Close database connection
  process.exit(0);
}

// Run tests
testEmailSystem().catch((error) => {
  console.error("\n❌ Test failed with error:", error);
  process.exit(1);
});
