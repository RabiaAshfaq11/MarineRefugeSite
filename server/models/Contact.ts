// MongoDB Contact schema for storing contact form submissions

import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  status: "received" | "read" | "responded" | "spam";
  read: boolean;
  notes?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    source: {
      type: String,
      enum: ["website_contact_form", "api", "other"],
      default: "website_contact_form",
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    ipAddress: String,
    userAgent: String,
    status: {
      type: String,
      enum: ["received", "read", "responded", "spam"],
      default: "received",
    },
    read: {
      type: Boolean,
      default: false,
    },
    notes: String,
    respondedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
ContactSchema.index({ email: 1 });
ContactSchema.index({ timestamp: -1 });
ContactSchema.index({ status: 1 });

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);