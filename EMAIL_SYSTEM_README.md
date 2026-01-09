# Marine Refuge Email System

A TypeScript backend email system using SendGrid for newsletter subscriptions.

## 📁 Project Structure

```
server/
├── config/
│   ├── database.ts          # MongoDB connection setup
│   └── env.ts               # Environment variable validation
├── controllers/
│   └── subscriptionController.ts  # Handles subscription logic
├── models/
│   └── Subscriber.ts        # MongoDB subscriber schema
├── services/
│   └── emailService.ts      # SendGrid email service
├── routes/
│   └── subscriptionRoutes.ts # API route definitions
├── lib/
│   └── utils.ts             # Helper functions
└── app.ts                   # Express app configuration
```

## 🚀 Features

- ✅ Email validation and sanitization
- ✅ MongoDB subscriber storage with unique email constraint
- ✅ SendGrid integration for welcome emails
- ✅ Comprehensive error handling
- ✅ TypeScript type safety
- ✅ Reactivation support for previously unsubscribed users
- ✅ Beautiful HTML welcome emails with plain text fallback
- ✅ Subscriber count endpoint

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local or MongoDB Atlas)
3. **SendGrid Account** with API key

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory (use `.env.example` as template):

```env
PORT=5000
NODE_ENV=development

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_SENDER_EMAIL="Marine Refuge Updates <marinerefugestartup@gmail.com>"

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/marinerefuge
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marinerefuge?retryWrites=true&w=majority
```

### 2. Get SendGrid API Key

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Navigate to Settings → API Keys
3. Create a new API key with "Mail Send" permissions
4. Copy the key to your `.env` file

### 3. Verify Sender Email

Before sending emails, you must verify your sender email in SendGrid:

1. Go to Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Fill in the form with `marinerefugestartup@gmail.com`
4. Check your email and verify

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and start the service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to `.env`

### 5. Install Dependencies

Dependencies are already installed. If needed:
```bash
npm install
```

### 6. Start the Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Subscribe to Newsletter

**POST** `/api/subscribe`

Subscribe a new email to the newsletter.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully subscribed to the newsletter",
  "data": {
    "email": "user@example.com",
    "subscribedAt": "2025-12-14T10:30:00.000Z"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Missing or invalid email
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

- **409 Conflict** - Email already subscribed
```json
{
  "success": false,
  "error": "This email is already subscribed"
}
```

- **500 Internal Server Error** - Server error
```json
{
  "success": false,
  "error": "An error occurred while processing your subscription"
}
```

### Get Subscriber Count

**GET** `/api/subscribers/count`

Get the total count of active subscribers.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "count": 42
  }
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Subscribe to newsletter
curl -X POST http://localhost:5000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get subscriber count
curl http://localhost:5000/api/subscribers/count
```

### Using JavaScript Fetch

```javascript
// Subscribe
const response = await fetch('http://localhost:5000/api/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com'
  })
});

const data = await response.json();
console.log(data);
```

## 📧 Email Template

The welcome email includes:
- 🌊 Ocean-themed branding
- 📋 List of what subscribers can expect
- 💌 Professional HTML design
- 📱 Mobile-responsive layout
- 📝 Plain text fallback

## 🗄️ Database Schema

### Subscriber Collection

```typescript
{
  email: string;          // Unique, lowercase, validated
  subscribedAt: Date;     // Subscription timestamp
  isActive: boolean;      // Active subscription status
  createdAt: Date;        // Auto-generated
  updatedAt: Date;        // Auto-generated
}
```

## 🔒 Security Features

- ✅ Email format validation
- ✅ Email sanitization (lowercase, trimmed)
- ✅ Duplicate email prevention
- ✅ MongoDB injection protection
- ✅ Environment variable validation
- ✅ Error message sanitization

## 🛠️ Error Handling

The system handles:
- Invalid email formats
- Duplicate subscriptions
- SendGrid API failures
- MongoDB connection errors
- Missing environment variables
- Race conditions

## 📝 Development Notes

### Service Layer Pattern

The email functionality is isolated in `emailService.ts`:
- Handles all SendGrid interactions
- Contains email templates
- Provides reusable email methods
- Centralized error handling

### Utility Functions

Keep `lib/utils.ts` for generic helpers:
- Email validation
- Email sanitization
- Date formatting
- Delay functions

### Environment Configuration

`config/env.ts` validates all required variables on startup and provides type-safe access throughout the application.

## 🚧 Future Enhancements

- [ ] Unsubscribe endpoint
- [ ] Email verification with confirmation link
- [ ] Admin dashboard for subscriber management
- [ ] Email templates for different occasions
- [ ] Rate limiting for API endpoints
- [ ] Email bounce handling
- [ ] GDPR compliance features
- [ ] Newsletter scheduling system

## 📚 Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database
- **SendGrid** - Email delivery
- **dotenv** - Environment variables

## 🐛 Troubleshooting

### SendGrid Email Not Sending

1. Verify API key is correct in `.env`
2. Check sender email is verified in SendGrid
3. Review SendGrid dashboard for rejected emails
4. Check server logs for detailed error messages

### MongoDB Connection Failed

1. Ensure MongoDB is running (if local)
2. Check connection string format
3. Verify network access in MongoDB Atlas
4. Check firewall settings

### Port Already in Use

```bash
# Windows: Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## 📄 License

MIT

## 👥 Support

For issues or questions, contact the Marine Refuge development team.

---

Built with 💙 by Marine Refuge Team
