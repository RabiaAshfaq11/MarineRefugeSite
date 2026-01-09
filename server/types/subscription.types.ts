// Type definitions for the email system

export interface SubscriptionRequest {
  email: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    subscribedAt: Date;
  };
  warning?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: string;
}

export interface SubscriberCountResponse {
  success: boolean;
  data?: {
    count: number;
  };
  error?: string;
}
