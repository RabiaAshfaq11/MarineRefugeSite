// Frontend Integration Example for Marine Refuge Email System

import { useState } from 'react';

interface SubscribeFormProps {
  onSuccess?: (email: string) => void;
  onError?: (error: string) => void;
}

export function NewsletterSubscribe({ onSuccess, onError }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message);
        setEmail(''); // Clear the input
        onSuccess?.(email);
      } else {
        setMessage(data.error || 'Something went wrong');
        setIsError(true);
        onError?.(data.error);
      }
    } catch (error) {
      const errorMessage = 'Failed to subscribe. Please try again.';
      setMessage(errorMessage);
      setIsError(true);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-subscribe">
      <h3>Subscribe to Our Newsletter 🌊</h3>
      <p>Get the latest updates on marine conservation</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loading}
          className="email-input"
        />
        <button type="submit" disabled={loading} className="subscribe-button">
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// Alternative: Simple function for API calls
export async function subscribeToNewsletter(email: string) {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to subscribe');
  }

  return response.json();
}

// Usage example:
// 
// try {
//   const result = await subscribeToNewsletter('user@example.com');
//   console.log('Subscribed:', result);
// } catch (error) {
//   console.error('Subscription error:', error.message);
// }
