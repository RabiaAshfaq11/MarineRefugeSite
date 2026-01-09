// NEW FILE: Controller for handling contact form submissions

import { Request, Response } from "express";
import { contactService } from "../services/contactService";
import { sanitizeInput, isValidEmail } from "../lib/utils";
import { log } from "../app";

interface ContactFormRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    source?: string;
  };
}

export const contactController = {
  /**
   * POST /api/contact
   * Handle contact form submission
   */
  async handleContactForm(
    req: ContactFormRequest,
    res: Response
  ): Promise<void> {
    try {
      const { firstName, lastName, email, phone, message, source } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !phone || !message) {
        res.status(400).json({
          success: false,
          error: "All fields are required",
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

      // Validate message length
      if (message.trim().length < 10) {
        res.status(400).json({
          success: false,
          error: "Message must be at least 10 characters long",
        });
        return;
      }

      // Sanitize inputs to prevent XSS
      const sanitizedData = {
        firstName: sanitizeInput(firstName),
        lastName: sanitizeInput(lastName),
        email: sanitizeInput(email).toLowerCase(),
        phone: sanitizeInput(phone),
        message: sanitizeInput(message),
        source: source || "website_contact_form",
        timestamp: new Date(),
        ip: req.ip,
        userAgent: req.get("user-agent"),
      };

      log(
        `📨 Contact form received from ${sanitizedData.email}`,
        "contactController"
      );

      // Save contact to database
      const savedContact = await contactService.saveContact(sanitizedData);
      log(
        `✅ Contact saved to DB: ${savedContact._id}`,
        "contactController"
      );

      // Send admin notification (non-blocking)
      contactService
        .sendAdminNotification(sanitizedData)
        .catch((err) =>
          log(
            `⚠️ Failed to send admin email: ${err.message}`,
            "contactController"
          )
        );

      // Send user confirmation (non-blocking)
      contactService
        .sendUserConfirmation(sanitizedData)
        .catch((err) =>
          log(
            `⚠️ Failed to send confirmation email: ${err.message}`,
            "contactController"
          )
        );

      // Return success response immediately
      res.status(200).json({
        success: true,
        message:
          "Your message has been received. We'll get back to you soon!",
        data: {
          contactId: savedContact._id,
          status: "received",
          note: "Check your email for confirmation",
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      log(`❌ Contact form error: ${errorMessage}`, "contactController");

      res.status(500).json({
        success: false,
        error: "Failed to process your message. Please try again later.",
      });
    }
  },

  /**
   * GET /api/contacts (Admin only)
   * Get all contact submissions
   */
  async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await contactService.getAllContacts(limit, offset);

      res.status(200).json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      log(`❌ Error fetching contacts: ${errorMessage}`, "contactController");

      res.status(500).json({
        success: false,
        error: "Failed to fetch contacts",
      });
    }
  },
};