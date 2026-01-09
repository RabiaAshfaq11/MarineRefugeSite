// Service for contact form handling, storage, and email notifications

import sgMail from "@sendgrid/mail";
import { Contact } from "../models/Contact";
import { env } from "../config/env";
import { log } from "../app";

sgMail.setApiKey(env.SENDGRID_API_KEY);

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  timestamp: Date;
  ip?: string;
  userAgent?: string;
}

export const contactService = {
  /**
   * Save contact information to database
   */
  async saveContact(data: ContactData) {
    try {
      const contact = await Contact.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source,
        timestamp: data.timestamp,
        ipAddress: data.ip,
        userAgent: data.userAgent,
        status: "received",
        read: false,
      });

      return contact;
    } catch (error) {
      log(
        `❌ Error saving contact to database: ${error instanceof Error ? error.message : String(error)}`,
        "contactService"
      );
      throw error;
    }
  },

  /**
   * Send notification email to admin
   */
  async sendAdminNotification(data: ContactData) {
    try {
      const adminEmails = ["marinerefugestartup@gmail.com"];

      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0a4d3c 0%, #0d6a54 100%); padding: 30px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 24px;">🌊 New Contact Form Submission</h2>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0;">
            <div style="background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-left: 4px solid #07EBE1;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #0a4d3c; text-decoration: none;">${data.email}</a></p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>
              <p style="margin: 5px 0;"><strong>Submitted:</strong> ${data.timestamp.toLocaleString()}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #0a4d3c; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap; color: #333; line-height: 1.6;">${data.message}</p>
            </div>
            
            <div style="background: #f0faf9; padding: 15px; border-radius: 4px; margin-top: 20px;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong>Additional Info:</strong><br>
                IP: ${data.ip || "N/A"}<br>
                Source: ${data.source}
              </p>
            </div>
          </div>
        </div>
      `;

      const msg = {
        to: adminEmails,
        from: env.SENDGRID_SENDER_EMAIL || "noreply@marinerefuge.com",
        subject: `📬 New Contact: ${data.firstName} ${data.lastName} - ${data.email}`,
        html: emailContent,
        replyTo: data.email,
      };

      await sgMail.send(msg);
      log(`✉️ Admin notification sent for ${data.email}`, "contactService");
    } catch (error) {
      log(
        `⚠️ Error sending admin notification: ${error instanceof Error ? error.message : String(error)}`,
        "contactService"
      );
      // Don't throw - continue even if admin email fails
    }
  },

  /**
   * Send confirmation email to user
   */
  async sendUserConfirmation(data: ContactData) {
    try {
      const confirmationContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0a4d3c 0%, #0d6a54 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🌊 Marine Refuge</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 8px; font-size: 16px;">We've received your message</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <p style="color: #333; font-size: 16px;">Hi <strong>${data.firstName}</strong>,</p>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              Thank you for reaching out to Marine Refuge. We've received your message and truly appreciate you contacting us.
            </p>
            
            <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #07EBE1; margin: 20px 0;">
              <p style="color: #333; margin: 0 0 10px 0;"><strong>Your Message Summary:</strong></p>
              <p style="color: #666; margin: 0; font-size: 14px;"><strong>Subject:</strong> Contact Form Inquiry</p>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;"><strong>Submitted:</strong> ${data.timestamp.toLocaleString()}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              Our team will review your message and get back to you as soon as possible, typically within <strong>24-48 hours</strong>. 
              If your inquiry is urgent, please feel free to call us.
            </p>
            
            <div style="background: #f0faf9; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <p style="color: #333; margin: 0 0 10px 0;"><strong>📍 Contact Information:</strong></p>
              <p style="color: #666; margin: 5px 0;"><strong>📞 Phone:</strong> +92 444999332</p>
              <p style="color: #666; margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:marinerefuge@gmail.com" style="color: #0a4d3c; text-decoration: none;">marinerefuge@gmail.com</a></p>
              <p style="color: #666; margin: 5px 0;"><strong>📍 Address:</strong> NSTP, H-12 Islamabad, Pakistan</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              In the meantime, feel free to explore more about our mission at <a href="https://marinerefuge.com" style="color: #0a4d3c; text-decoration: none;">marinerefuge.com</a>
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>The Marine Refuge Team</strong><br>
              <em style="color: #999;">Building Resilient Futures 🌊</em>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p style="margin: 0;">This is an automated confirmation email. Please do not reply to this email.</p>
            <p style="margin: 5px 0 0 0;">&copy; 2025 Marine Refuge. All rights reserved.</p>
          </div>
        </div>
      `;

      const msg = {
        to: data.email,
        from: env.SENDGRID_SENDER_EMAIL || "noreply@marinerefuge.com",
        subject: "✅ We've Received Your Message - Marine Refuge",
        html: confirmationContent,
        replyTo: "marinerefuge@gmail.com",
      };

      await sgMail.send(msg);
      log(`📬 Confirmation email sent to ${data.email}`, "contactService");
    } catch (error) {
      log(
        `⚠️ Error sending confirmation email: ${error instanceof Error ? error.message : String(error)}`,
        "contactService"
      );
      // Don't throw - continue even if confirmation email fails
    }
  },

  /**
   * Get all contacts (admin)
   */
  async getAllContacts(limit = 50, offset = 0) {
    try {
      const contacts = await Contact.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .skip(offset);

      const total = await Contact.countDocuments();

      return {
        success: true,
        data: contacts,
        total,
        hasMore: offset + limit < total,
      };
    } catch (error) {
      log(
        `❌ Error fetching contacts: ${error instanceof Error ? error.message : String(error)}`,
        "contactService"
      );
      throw error;
    }
  },

  /**
   * Mark contact as read
   */
  async markAsRead(contactId: string) {
    try {
      const contact = await Contact.findByIdAndUpdate(
        contactId,
        { read: true, status: "read" },
        { new: true }
      );
      return contact;
    } catch (error) {
      log(
        `❌ Error marking contact as read: ${error instanceof Error ? error.message : String(error)}`,
        "contactService"
      );
      throw error;
    }
  },
};