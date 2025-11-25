import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema, insertContactMessageSchema } from "@shared/schema";

// Helper function to check if request is from admin IP
function isAdminIP(req: any): boolean {
  const adminIPs = (process.env.ADMIN_IPS || "127.0.0.1,::1").split(",").map(ip => ip.trim());
  const clientIP = req.ip || req.connection.remoteAddress || "";
  return adminIPs.includes(clientIP);
}

// Helper function to send email (placeholder)
async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  // TODO: Implement actual SMTP email sending here
  // For now, this is a placeholder that logs the email
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}\n${body}`);
  // In production, you would integrate with nodemailer or similar:
  // const transporter = nodemailer.createTransport({...});
  // await transporter.sendMail({to, subject, text: body});
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter Subscription Routes
  
  // POST /api/subscribe - Public route to subscribe to newsletter
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, name } = req.body;
      
      // Validate input
      const validation = insertNewsletterSubscriberSchema.safeParse({ email, name });
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: validation.error.flatten() 
        });
      }

      // Check if email already exists
      const existing = await storage.getNewsletterSubscriberByEmail(email);
      if (existing) {
        return res.status(409).json({ error: "Already subscribed" });
      }

      // Create new subscriber
      const subscriber = await storage.createNewsletterSubscriber({
        email,
        name: name || null,
      });

      // Send confirmation email
      await sendEmail(
        email,
        "Welcome to Marine Refuge Newsletter",
        `Thank you for subscribing, ${name || 'Friend'}! We'll keep you updated on our climate-resilient housing initiatives.`
      );

      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        subscriber 
      });
    } catch (error) {
      console.error("Subscribe error:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  // GET /api/admin/newsletter - Admin-only route to view all subscribers
  app.get("/api/admin/newsletter", async (req, res) => {
    try {
      // Check admin access
      if (!isAdminIP(req)) {
        return res.status(403).json({ error: "Unauthorized - Admin access only" });
      }

      const subscribers = await storage.getAllNewsletterSubscribers();
      res.json({
        count: subscribers.length,
        subscribers,
      });
    } catch (error) {
      console.error("Admin newsletter error:", error);
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  // Contact Message Routes

  // POST /api/contact - Public route to submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate input
      const validation = insertContactMessageSchema.safeParse({
        name,
        email,
        subject,
        message,
      });
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: validation.error.flatten(),
        });
      }

      // Create contact message
      const contactMsg = await storage.createContactMessage({
        name,
        email,
        subject,
        message,
      });

      // Send confirmation email to user
      await sendEmail(
        email,
        "We received your message",
        `Hi ${name},\n\nThank you for reaching out to Marine Refuge. We've received your message and will get back to you soon.\n\nBest regards,\nMarine Refuge Team`
      );

      // Send notification to admin
      await sendEmail(
        process.env.ADMIN_EMAIL || "admin@marinerefuge.local",
        `New Contact Form Submission: ${subject}`,
        `From: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`
      );

      res.status(201).json({
        success: true,
        message: "Message sent successfully. We'll be in touch soon!",
        id: contactMsg.id,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // GET /api/admin/messages - Admin-only route to view all contact messages
  app.get("/api/admin/messages", async (req, res) => {
    try {
      // Check admin access
      if (!isAdminIP(req)) {
        return res.status(403).json({ error: "Unauthorized - Admin access only" });
      }

      const messages = await storage.getAllContactMessages();
      res.json({
        count: messages.length,
        messages,
      });
    } catch (error) {
      console.error("Admin messages error:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
