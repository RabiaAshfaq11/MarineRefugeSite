import mongoose, { Document, Schema } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster email lookups
subscriberSchema.index({ email: 1, unique: true });

export const Subscriber = mongoose.model<ISubscriber>(
  "Subscriber",
  subscriberSchema
);
