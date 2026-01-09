import { Router } from "express";
import { SubscriptionController } from "../controllers/subscriptionController";
import { contactController } from "../controllers/contactController";

const router = Router();

/**
 * SUBSCRIPTION ROUTES
 */

/**
 * POST /api/subscribe
 * Subscribe to newsletter with email validation and welcome email
 */
router.post("/subscribe", SubscriptionController.subscribe);

/**
 * GET /api/subscribers/count
 * Get count of active subscribers (optional utility endpoint)
 */
router.get("/subscribers/count", SubscriptionController.getSubscriberCount);

/**
 * CONTACT ROUTES
 */

/**
 * POST /api/contact
 * Handle contact form submissions
 */
router.post("/contact", (req, res) =>
  contactController.handleContactForm(req, res)
);

/**
 * GET /api/contacts
 * Get all contact submissions (admin only)
 */
router.get("/contacts", (req, res) =>
  contactController.getAllContacts(req, res)
);

export default router;
