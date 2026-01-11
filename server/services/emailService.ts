// SENDGRID TEMPORARILY DISABLED FOR DEPLOYMENT
import sgMail from "@sendgrid/mail";
import { env } from "../config/env";

// Initialize SendGrid only if API key is available
if (env.SENDGRID_API_KEY) {
  sgMail.setApiKey(env.SENDGRID_API_KEY);
} else {
  console.warn("⚠️ SendGrid is disabled - SENDGRID_API_KEY not configured");
}

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export class EmailService {
  private static readonly FROM_EMAIL = env.SENDGRID_SENDER_EMAIL;

  /**
   * Send a welcome email to a new subscriber
   * TEMPORARILY DISABLED: Returns immediately if SendGrid is not configured
   */
  static async sendWelcomeEmail(email: string): Promise<void> {
    if (!env.SENDGRID_API_KEY) {
      console.log(`📧 [DISABLED] Would send welcome email to ${email} (SendGrid not configured)`);
      return; // Silently skip - no error thrown
    }

    const subject = "Welcome to Marine Refuge Updates! 🌊";
    const text = this.getWelcomeEmailText();
    const html = this.getWelcomeEmailHtml();

    await this.sendEmail({
      to: email,
      subject,
      text,
      html,
    });
  }

  /**
   * Generic method to send email via SendGrid
   */
  private static async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const msg = {
        to: options.to,
        from: this.FROM_EMAIL,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      await sgMail.send(msg);
      console.log(`✅ Email sent successfully to ${options.to}`);
    } catch (error: any) {
      console.error("❌ SendGrid error:", error);

      if (error.response) {
        console.error("SendGrid error details:", error.response.body);
      }

      throw new Error(
        `Failed to send email: ${error.message || "Unknown error"}`
      );
    }
  }

  /**
   * Plain text version of welcome email
   */
  private static getWelcomeEmailText(): string {
    return `
Welcome to Marine Refuge!

Thank you for subscribing to our newsletter. We're thrilled to have you join our community dedicated to marine conservation and ocean protection.

What you can expect:
- Latest updates on marine conservation efforts
- Educational content about ocean ecosystems
- News about our projects and initiatives
- Tips on how you can help protect our oceans

Stay tuned for our upcoming newsletters!

Best regards,
The Marine Refuge Team

---
If you wish to unsubscribe, please reply to this email with "unsubscribe" in the subject line.
    `.trim();
  }

  /**
   * HTML version of welcome email
   */
  private static getWelcomeEmailHtml(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Marine Refuge</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #0077be;
      margin-bottom: 10px;
      font-size: 28px;
    }
    .wave-emoji {
      font-size: 32px;
    }
    .content {
      margin-bottom: 30px;
    }
    .content p {
      margin-bottom: 15px;
    }
    .features {
      background-color: #e8f4f8;
      border-left: 4px solid #0077be;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .features ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .features li {
      margin-bottom: 8px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #777;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #0077be;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="wave-emoji">🌊</div>
      <h1>Welcome to Marine Refuge!</h1>
    </div>
    
    <div class="content">
      <p>Thank you for subscribing to our newsletter. We're thrilled to have you join our community dedicated to marine conservation and ocean protection.</p>
      
      <div class="features">
        <strong>What you can expect:</strong>
        <ul>
          <li>🐠 Latest updates on marine conservation efforts</li>
          <li>📚 Educational content about ocean ecosystems</li>
          <li>🌍 News about our projects and initiatives</li>
          <li>💡 Tips on how you can help protect our oceans</li>
        </ul>
      </div>
      
      <p>Stay tuned for our upcoming newsletters filled with inspiring stories and actionable ways to make a difference for our oceans!</p>
      
      <p style="margin-top: 30px;"><strong>Best regards,</strong><br>The Marine Refuge Team</p>
    </div>
    
    <div class="footer">
      <p>If you wish to unsubscribe, please reply to this email with "unsubscribe" in the subject line.</p>
      <p>&copy; ${new Date().getFullYear()} Marine Refuge. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }
}
