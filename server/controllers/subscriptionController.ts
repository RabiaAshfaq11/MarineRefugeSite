import { Request, Response } from "express";
import { Subscriber } from "../models/Subscriber";
import { EmailService } from "../services/emailService";
import { isValidEmail, sanitizeEmail } from "../lib/utils";

export class SubscriptionController {
  /**
   * POST /api/subscribe
   * Subscribe a new email address to the newsletter
   */
  static async subscribe(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      // Validate email presence
      if (!email) {
        res.status(400).json({
          success: false,
          error: "Email is required",
        });
        return;
      }

      // Validate email format
      if (!isValidEmail(email)) {
        res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
        return;
      }

      const sanitizedEmail = sanitizeEmail(email);

      // Check if subscriber already exists
      const existingSubscriber = await Subscriber.findOne({
        email: sanitizedEmail,
      });

      if (existingSubscriber) {
        if (existingSubscriber.isActive) {
          res.status(409).json({
            success: false,
            error: "This email is already subscribed",
          });
          return;
        } else {
          // Reactivate inactive subscriber
          existingSubscriber.isActive = true;
          existingSubscriber.subscribedAt = new Date();
          await existingSubscriber.save();

          // Send welcome email
          try {
            await EmailService.sendWelcomeEmail(sanitizedEmail);
          } catch (emailError: any) {
            console.error("Failed to send welcome email:", emailError);
            // Don't fail the request if email fails, but log it
          }

          res.status(200).json({
            success: true,
            message: "Successfully resubscribed to the newsletter",
            data: {
              email: existingSubscriber.email,
              subscribedAt: existingSubscriber.subscribedAt,
            },
          });
          return;
        }
      }

      // Create new subscriber
      const newSubscriber = new Subscriber({
        email: sanitizedEmail,
        subscribedAt: new Date(),
        isActive: true,
      });

      await newSubscriber.save();

      // Send welcome email
      try {
        await EmailService.sendWelcomeEmail(sanitizedEmail);
      } catch (emailError: any) {
        console.error("Failed to send welcome email:", emailError);
        
        // Return success but note that email failed
        res.status(201).json({
          success: true,
          message: "Successfully subscribed, but welcome email could not be sent",
          data: {
            email: newSubscriber.email,
            subscribedAt: newSubscriber.subscribedAt,
          },
          warning: "Email delivery failed. Please check SendGrid configuration.",
        });
        return;
      }

      // Success response
      res.status(201).json({
        success: true,
        message: "Successfully subscribed to the newsletter",
        data: {
          email: newSubscriber.email,
          subscribedAt: newSubscriber.subscribedAt,
        },
      });
    } catch (error: any) {
      console.error("Subscription error:", error);

      // Handle duplicate key error (race condition)
      if (error.code === 11000) {
        res.status(409).json({
          success: false,
          error: "This email is already subscribed",
        });
        return;
      }

      // Handle validation errors
      if (error.name === "ValidationError") {
        res.status(400).json({
          success: false,
          error: "Invalid email data",
          details: error.message,
        });
        return;
      }

      // Generic error response
      res.status(500).json({
        success: false,
        error: "An error occurred while processing your subscription",
      });
    }
  }

  /**
   * GET /api/subscribers/count
   * Get the count of active subscribers (optional utility endpoint)
   */
  static async getSubscriberCount(req: Request, res: Response): Promise<void> {
    try {
      const count = await Subscriber.countDocuments({ isActive: true });
      
      res.status(200).json({
        success: true,
        data: {
          count,
        },
      });
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch subscriber count",
      });
    }
  }
}
