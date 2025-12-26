# 🚀 EscrowAI - Decentralized Escrow Platform

A cutting-edge, premium React application for decentralized escrow payments powered by AI verification and blockchain technology.

![EscrowAI Banner](https://img.shields.io/badge/EscrowAI-Premium-00D4FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=for-the-badge&logo=framer)

## ✨ Features

### 🎨 **Premium UI/UX**
- Glassmorphism design with backdrop blur effects
- Smooth page transitions with Framer Motion
- Responsive design for all devices
- Dark theme with vibrant gradients
- Micro-interactions and hover effects

### 🔐 **Core Functionality**
- **Trustless Escrow Vault**: Smart contract-based fund management
- **AI-Powered Verification**: Automated work quality assessment (0-100% scoring)
- **Multi-Step Escrow Creation**: Intuitive project setup with milestones
- **Real-time Dashboard**: Track escrows, earnings, and statistics
- **Two-Level Dispute Resolution**:
  - Level 1: AI-powered mediation (free & fast)
  - Level 2: Kleros decentralized arbitration

### 📊 **Pages & Components**
1. **Home** - Hero section, features, stats, testimonials
2. **My Escrows** - Dashboard with filtering and search
3. **New Escrow** - 4-step form with validation
4. **Earnings** - Charts, payment history, analytics
5. **Profile** - User settings, skills, notifications
6. **Dispute** - Two-level resolution system

## 🛠️ Tech Stack

- **React 18.2** - Component-based UI
- **React Router 6** - Client-side routing
- **Framer Motion** - Advanced animations
- **React Icons** - Comprehensive icon library
- **Recharts** - Beautiful data visualization
- **React Hot Toast** - Elegant notifications
- **React CountUp** - Animated counters

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Quick Start

```bash
# Navigate to project directory
cd "c:\Users\HP\OneDrive\Desktop\New folder (2)"

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
c:\Users\HP\OneDrive\Desktop\New folder (2)\
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Home.css
│   │   ├── MyEscrows.jsx       # Escrow dashboard
│   │   ├── MyEscrows.css
│   │   ├── NewEscrow.jsx       # Create escrow form
│   │   ├── NewEscrow.css
│   │   ├── Earnings.jsx        # Earnings page
│   │   ├── Earnings.css
│   │   ├── Profile.jsx         # User profile
│   │   ├── Profile.css
│   │   ├── Dispute.jsx         # Dispute resolution
│   │   └── Dispute.css
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.js                  # Main app component
│   ├── App.css                 # Global styles
│   ├── index.js                # Entry point
│   └── index.css               # CSS variables & base styles
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
```css
--primary: #06F3FF (Cyan)
--secondary: #7C3AED (Purple)
--accent: #FF006E (Pink)
--success: #10B981 (Green)
--warning: #F59E0B (Orange)
--error: #EF4444 (Red)
```

### Gradients
- Primary: `linear-gradient(135deg, #06F3FF, #7C3AED)`
- Secondary: `linear-gradient(135deg, #FF006E, #7C3AED)`
- Accent: `linear-gradient(135deg, #06F3FF, #00D4FF, #7C3AED)`

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800, 900

## 🚀 Features Breakdown

### Navigation
- Sticky navbar with glassmorphism
- Active route highlighting
- Smooth scroll effects
- Mobile-responsive menu
- Wallet connection simulation

### Home Page
- Animated hero section with floating gradients
- Live statistics with CountUp animations
- Feature cards with hover effects
- Step-by-step how-it-works
- Customer testimonials
- Call-to-action section

### My Escrows
- Real-time filtering (All, Active, Pending, Completed, Disputed)
- Search functionality
- Progress bars with animations
- AI verification status
- Score visualization with SVG rings

### New Escrow
- 4-step multi-stage form
- Form validation
- Dynamic milestone management
- Real-time total calculation
- Comprehensive review step
- Success notifications

### Earnings
- Animated statistics cards
- Interactive area charts (Recharts)
- Payment history table
- Filterable transactions
- Export functionality

### Profile
- Avatar management
- Bio and contact information
- Skills tag system
- Notification preferences with toggles
- Security settings
- Account deletion (danger zone)

### Dispute Resolution
- Two-tier system visualization
- AI mediation form
- File upload area
- Evidence submission
- Kleros integration info
- Pricing breakdown

## 🎯 Key Interactions

### Animations
- Page transitions: Fade & slide
- Card hovers: Lift & glow
- Button interactions: Scale & shadow
- Progress bars: Shimmer effect
- Chart animations: Smooth draw
- Loading states: Spinner & pulse

### User Feedback
- Toast notifications (success, error, loading)
- Form validation messages
- Hover states on all interactive elements
- Disabled state handling
- Loading indicators

## 🔧 Customization

### Changing Colors
Edit `src/index.css`:
```css
:root {
  --primary: #YOUR_COLOR;
  --secondary: #YOUR_COLOR;
  /* ... */
}
```

### Adding Pages
1. Create component in `src/pages/`
2. Add route in `src/App.js`
3. Update navigation in `src/components/Navbar.jsx`

### Modifying Animations
Adjust Framer Motion settings:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
/>
```

## 🤖 n8n Workflow Configuration

### What is "Backend API URL"?

The **Backend API URL** is the base URL of your server that hosts the TrustVault backend API. n8n workflow nodes will make HTTP requests to this URL to:
- Fetch escrow details from your database
- Save dispute resolutions
- Execute blockchain settlements
- Retrieve chat logs and evidence

### Setting Up Backend API URL in n8n

#### Option 1: Using Environment Variables (Recommended)
1. In your n8n workflow, click the **Settings** (gear icon)
2. Go to **Workflow Settings** → **Environment Variables**
3. Add this variable:
   ```
   Key: BACKEND_API_URL
   Value: http://localhost:5000/api  (for local development)
   Value: https://api.trustvault.com  (for production)
   ```

#### Option 2: Direct Configuration in HTTP Nodes
For each HTTP Request node in the workflow:
1. Click the node (e.g., "Fetch Escrow Details")
2. In the **URL** field, enter:
   ```
   http://localhost:5000/api/escrow/{{$json.escrowId}}/full-details
   ```
3. Replace `http://localhost:5000/api` with your actual backend URL

### Backend API Endpoints Required

Your backend server must implement these endpoints for the n8n workflow:

```javascript
// Backend endpoints structure (Express.js example)

// 1. GET - Fetch complete escrow details
app.get('/api/escrow/:escrowId/full-details', async (req, res) => {
  const { escrowId } = req.params;
  
  // Return escrow data including:
  const data = {
    escrowId,
    projectTitle: "Website Design",
    projectDescription: "...",
    submittedWork: {...},
    chatLogs: [...],
    paymentHistory: [...],
    milestones: [...],
    clientEmail: "client@example.com",
    freelancerEmail: "freelancer@example.com"
  };
  
  res.json(data);
});

// 2. POST - Save dispute resolution
app.post('/api/dispute/level1/save-resolution', async (req, res) => {
  const {
    escrowId,
    resolutionId,
    completionScore,
    payoutPercentage,
    clientRefund,
    freelancerPayout,
    aiReasoning,
    evidenceAnalysis,
    contractBreachAnalysis,
    reportHtml,
    status,
    timestamp
  } = req.body;
  
  // Save to database
  await db.disputeResolutions.insert({...});
  
  res.json({ success: true, resolutionId });
});

// 3. POST - Execute blockchain settlement
app.post('/api/blockchain/execute-settlement', async (req, res) => {
  const {
    escrowId,
    clientRefundAmount,
    freelancerPayoutAmount,
    resolutionId
  } = req.body;
  
  // Call smart contract to release funds
  const txHash = await smartContract.settleFunds(
    escrowId,
    clientRefundAmount,
    freelancerPayoutAmount
  );
  
  res.json({ 
    success: true, 
    transactionHash: txHash,
    blockchainNetwork: "Ethereum Sepolia"
  });
});

// 4. POST - Log errors from n8n workflow
app.post('/api/errors/log', async (req, res) => {
  const { workflowId, error, nodeType, timestamp } = req.body;
  
  // Log to database/monitoring service
  await logger.error({...});
  
  res.json({ logged: true });
});
```

### Example Backend Setup (Quick Start)

Create a basic backend server for testing:

```bash
# Create backend folder
mkdir trustvault-backend
cd trustvault-backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv body-parser
```

Create `server.js`:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mock database (replace with MongoDB/PostgreSQL in production)
const mockEscrows = {
  'test-escrow-123': {
    escrowId: 'test-escrow-123',
    projectTitle: 'Website Landing Page',
    projectDescription: 'Modern landing page with hero, features, contact form',
    submittedWork: {
      description: 'Completed landing page',
      deliverableUrls: ['https://example.com/preview']
    },
    chatLogs: [
      { timestamp: '2024-01-10T10:00:00Z', sender: 'client', message: 'Can you add animations?' },
      { timestamp: '2024-01-10T11:00:00Z', sender: 'freelancer', message: 'Sure, will add them today' }
    ],
    clientEmail: 'client@test.com',
    freelancerEmail: 'freelancer@test.com'
  }
};

// Endpoints
app.get('/api/escrow/:escrowId/full-details', (req, res) => {
  const escrow = mockEscrows[req.params.escrowId];
  if (!escrow) {
    return res.status(404).json({ error: 'Escrow not found' });
  }
  res.json(escrow);
});

app.post('/api/dispute/level1/save-resolution', (req, res) => {
  console.log('Dispute resolution saved:', req.body);
  res.json({ success: true, resolutionId: req.body.resolutionId });
});

app.post('/api/blockchain/execute-settlement', (req, res) => {
  console.log('Blockchain settlement executed:', req.body);
  res.json({ 
    success: true, 
    transactionHash: '0x' + Math.random().toString(16).substring(2),
    blockchainNetwork: 'Ethereum Sepolia'
  });
});

app.post('/api/errors/log', (req, res) => {
  console.error('n8n workflow error:', req.body);
  res.json({ logged: true });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📡 n8n Backend API URL: http://localhost:${PORT}/api`);
});
```

Start the server:
```bash
node server.js
```

### n8n Configuration Summary

| Parameter | Value | Where to Set |
|-----------|-------|--------------|
| **Backend API URL** | `http://localhost:5000/api` (dev)<br>`https://api.trustvault.com` (prod) | Workflow Settings → Environment Variables |
| **API Token for Backend** | Generate secret token for authentication | Credentials → Header Auth |
| **Webhook URL** | Auto-generated by n8n | Copy from Webhook trigger node |
| **Gemini API Key** | Get from https://ai.google.dev/ | Credentials → Generic Credential |
| **Email API Key** | Get from SendGrid/Resend | Credentials → Header Auth |

### 🔐 API Token for Backend - Authentication Setup

#### **What is "API Token for Backend"?**

The **API Token** is a secret key that authenticates n8n when it makes requests to your backend API. This ensures only your n8n workflow can access your backend endpoints (not random users).

**Think of it as:**
```
n8n → "Hey backend, here's my secret token, let me in!"
Backend → "Token verified! ✅ Access granted"
```

#### **Step-by-Step: Generate & Configure API Token**

**Option 1: Simple Static Token (For Hackathon/Testing)**

**1. Generate a Random Token:**
```bash
# On Linux/Mac/Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output example:
# a7f3e2b9c4d8f1a2e5c7b3d9f4e8a1c2d5f7b9e3a6c8d1f4e7b2a5c9d3f6e8a1
```

Or use online generator:
```
https://www.uuidgenerator.net/api/version4
```

**2. Save Token in Your Backend:**
```javascript
// filepath: trustvault-backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// API Token Authentication Middleware
const API_TOKEN = process.env.API_TOKEN || 'your-secret-token-here';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (token !== API_TOKEN) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next(); // Token is valid, proceed
}

// Apply authentication to all /api routes
app.use('/api', authenticateToken);

// ...existing code (your endpoints)...

app.get('/api/escrow/:escrowId/full-details', (req, res) => {
  // This endpoint now requires valid token
  // ...existing code...
});

// ...existing code...
```

**3. Create `.env` file in backend folder:**
```env
# filepath: trustvault-backend/.env
PORT=5000
API_TOKEN=a7f3e2b9c4d8f1a2e5c7b3d9f4e8a1c2d5f7b9e3a6c8d1f4e7b2a5c9d3f6e8a1
```

**4. Add Token to n8n Credentials:**

In n8n:
1. Go to **Credentials** → **New**
2. Select **Header Auth**
3. Fill in:
   ```
   Credential Name: Backend API Token
   Header Name: Authorization
   Header Value: Bearer a7f3e2b9c4d8f1a2e5c7b3d9f4e8a1c2d5f7b9e3a6c8d1f4e7b2a5c9d3f6e8a1
   ```
4. Click **Save**

**5. Apply Credential to HTTP Request Nodes:**

For each HTTP Request node in your n8n workflow:
1. Click the node (e.g., "Fetch Escrow Details")
2. Scroll down to **Authentication** section
3. Select **Generic Credential Type** → **Header Auth**
4. Choose **Backend API Token** (the credential you just created)
5. Save the node

**Option 2: JWT Token (Production-Grade)**

**1. Install JWT library in backend:**
```bash
npm install jsonwebtoken
```

**2. Update backend with JWT authentication:**
```javascript
// filepath: trustvault-backend/server.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

// Middleware to verify JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Generate token endpoint (call this once to get token for n8n)
app.post('/api/generate-token', (req, res) => {
  const { secret } = req.body;
  
  // Simple verification (replace with real auth in production)
  if (secret === process.env.ADMIN_SECRET) {
    const token = jwt.sign(
      { service: 'n8n-workflow', permissions: ['dispute-resolution'] },
      JWT_SECRET,
      { expiresIn: '365d' } // Token valid for 1 year
    );
    return res.json({ token });
  }
  
  res.status(403).json({ error: 'Unauthorized' });
});

// Apply JWT auth to protected routes
app.use('/api/escrow', authenticateJWT);
app.use('/api/dispute', authenticateJWT);
app.use('/api/blockchain', authenticateJWT);

// ...existing code...
```

**3. Generate JWT token:**
```bash
# Start your backend
node server.js

# In another terminal, generate token:
curl -X POST http://localhost:5000/api/generate-token \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-admin-secret"}'

# Response:
# {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

**4. Add to n8n:**
```
Credentials → Header Auth
Header Name: Authorization
Header Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Testing Authentication**

**Test 1: Without Token (Should Fail):**
```bash
curl http://localhost:5000/api/escrow/test-escrow-123/full-details

# Expected Response:
# {"error":"No token provided"}
# Status: 401 Unauthorized
```

**Test 2: With Valid Token (Should Succeed):**
```bash
curl http://localhost:5000/api/escrow/test-escrow-123/full-details \
  -H "Authorization: Bearer a7f3e2b9c4d8f1a2e5c7b3d9f4e8a1c2..."

# Expected Response:
# {"escrowId":"test-escrow-123","projectTitle":"Website Landing Page",...}
# Status: 200 OK
```

**Test 3: With Invalid Token (Should Fail):**
```bash
curl http://localhost:5000/api/escrow/test-escrow-123/full-details \
  -H "Authorization: Bearer wrong-token"

# Expected Response:
# {"error":"Invalid token"}
# Status: 403 Forbidden
```

#### **Why You Need API Token:**

| Without Token | With Token |
|---------------|------------|
| ❌ Anyone can access your API | ✅ Only n8n workflow can access |
| ❌ Public endpoints vulnerable | ✅ Protected from unauthorized access |
| ❌ No request tracking | ✅ Can log which service made request |
| ❌ Cannot rate limit | ✅ Can implement rate limiting per token |

#### **Security Best Practices:**

**1. Never Hardcode Tokens:**
```javascript
// ❌ BAD - Token visible in code
const API_TOKEN = 'a7f3e2b9c4d8f1a2e5c7b3d9f4e8a1c2';

// ✅ GOOD - Token in environment variable
const API_TOKEN = process.env.API_TOKEN;
```

**2. Use Different Tokens for Dev/Prod:**
```env
# .env.development
API_TOKEN=dev-token-12345

# .env.production
API_TOKEN=prod-token-67890-super-secret
```

**3. Rotate Tokens Periodically:**
```javascript
// Generate new token every 90 days for production
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '90d' });
```

**4. Add Token to .gitignore:**
```bash
# filepath: trustvault-backend/.gitignore
node_modules/
.env
.env.local
.env.production
```

#### **Complete n8n Setup Checklist:**

```
✅ Step 1: Generate random token
   → node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

✅ Step 2: Add token to backend .env file
   → API_TOKEN=your-generated-token

✅ Step 3: Add authentication middleware to backend
   → authenticateToken function in server.js

✅ Step 4: Create credential in n8n
   → Credentials → Header Auth → Save as "Backend API Token"

✅ Step 5: Apply credential to all HTTP Request nodes
   → Authentication section → Select "Backend API Token"

✅ Step 6: Test authentication
   → Send test request with/without token

✅ Step 7: Save token securely
   → Never commit .env to git
   → Use password manager for production token
```

#### **Quick Copy-Paste Setup:**

**Backend (.env file):**
```env
PORT=5000
API_TOKEN=hackathon-secret-token-2024-trustvault-demo
```

**n8n Credential:**
```
Name: Backend API Token
Type: Header Auth
Header Name: Authorization
Header Value: Bearer hackathon-secret-token-2024-trustvault-demo
```

**Test Request:**
```bash
curl http://localhost:5000/api/escrow/test-escrow-123/full-details \
  -H "Authorization: Bearer hackathon-secret-token-2024-trustvault-demo"
```

### 🆓 Google Gemini API - Why It's FREE (No Billing Required)

#### **How Gemini API is Completely Free:**

**1. Free Tier Limits (More Than Enough for Hackathons):**
```
✅ gemini-1.5-flash (FREE forever)
   - 15 requests per minute
   - 1 million tokens per day
   - 1,500 requests per day
   
✅ gemini-1.5-pro (FREE forever)  
   - 2 requests per minute
   - 50 requests per day
```

**2. No Credit Card Required:**
- You can get an API key without adding any payment method
- Google provides this for free to encourage AI adoption
- Perfect for hackathons, demos, and small projects

**3. Your Hackathon Usage (Example):**
```
Average Dispute Analysis:
- 1 dispute = 3-4 API calls (completeness, evidence, breach analysis)
- Each call ≈ 2,000 tokens
- Total per dispute ≈ 8,000 tokens

With FREE tier (1 million tokens/day):
- You can process: 1,000,000 ÷ 8,000 = 125 disputes per day
- That's more than enough for any hackathon demo! 🎉
```

#### **Step-by-Step: Getting FREE Gemini API Key**

**1. Go to Google AI Studio:**
```
https://ai.google.dev/
```

**2. Click "Get API Key" (No credit card required):**
- Sign in with your Google account
- Click "Create API Key"
- Select "Create API key in new project" or use existing project
- Copy the key: `AIzaSy...` (starts with AIza)

**3. Test Your Free API Key:**
```bash
curl -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello, is this free?"}]}]}' \
  -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY'

# Response will confirm it's working - NO BILLING!
```

**4. Add to n8n:**
```
Credentials → New → Generic Credential
Name: GEMINI_API_KEY
Fields:
  - apiKey: AIzaSy... (paste your key)
```

#### **Why No Billing Happens:**

| Feature | Free Tier | Paid Tier (Not Needed) |
|---------|-----------|------------------------|
| **Model** | gemini-1.5-flash | gemini-1.5-pro-002 |
| **Rate Limit** | 15 RPM | 1,000 RPM |
| **Daily Tokens** | 1M tokens | Unlimited |
| **Cost** | $0.00 | $0.075 per 1M tokens |
| **Credit Card** | ❌ Not required | ✅ Required |
| **Billing Enabled** | ❌ Never charges | ✅ Can charge |

**You're using the FREE tier, so billing is IMPOSSIBLE even if you wanted it!**

### 🚀 How to Trigger the n8n Workflow

#### **Step 1: Get Your Webhook URL**

1. Open your n8n workflow
2. Click on the **Webhook trigger node** (first node)
3. You'll see two URLs:
   - **Test URL** (for testing): `https://your-n8n.app/webhook-test/abc123`
   - **Production URL** (for live use): `https://your-n8n.app/webhook/abc123`
4. **Copy the Production URL** - this is what you'll use

**Example webhook URL:**
```
https://n8n.yourdomain.com/webhook/dispute-level1-settlement
```

#### **Step 2: Trigger from Your React Frontend**

Add this code to your Dispute.jsx page to trigger the workflow when user submits Level 1 dispute:

**Create API utility file:**

```javascript
// filepath: c:\Users\HP\OneDrive\Desktop\TrustVault\src\utils\n8nApi.js
const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || 
  'https://your-n8n.app/webhook/dispute-level1-settlement';

export async function triggerLevel1Dispute(disputeData) {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(disputeData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error triggering n8n workflow:', error);
    throw error;
  }
}
```

**Update your .env file:**

```env
# filepath: c:\Users\HP\OneDrive\Desktop\TrustVault\.env
REACT_APP_N8N_WEBHOOK_URL=https://your-n8n.app/webhook/dispute-level1-settlement
```

**Update Dispute.jsx to trigger workflow:**

```jsx
// filepath: c:\Users\HP\OneDrive\Desktop\TrustVault\src\pages\Dispute.jsx
// ...existing code...
import { triggerLevel1Dispute } from '../utils/n8nApi';

const Dispute = () => {
  // ...existing code...

  const handleLevel1Submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare dispute data for n8n workflow
      const disputePayload = {
        escrowId: formData.escrowId || `escrow-${Date.now()}`,
        disputeInitiator: formData.role, // "client" or "freelancer"
        projectTitle: formData.projectTitle,
        projectDescription: formData.originalRequirements,
        submittedWork: {
          description: formData.workDescription,
          deliverableUrls: formData.evidenceFiles.map(f => f.url),
          completionClaim: formData.completionPercentage || 100
        },
        clientClaim: formData.role === 'client' ? formData.issue : 'No claim provided',
        freelancerDefense: formData.role === 'freelancer' ? formData.issue : 'No defense provided',
        evidenceLinks: formData.evidenceFiles.map(f => f.url),
        contractAmount: parseFloat(formData.amount) || 0,
        milestonesClaimed: formData.milestones || []
      };

      // Trigger n8n workflow
      const result = await triggerLevel1Dispute(disputePayload);

      toast.success('Dispute submitted! AI is analyzing now...');
      console.log('n8n workflow triggered:', result);

      // Optional: Poll for results or wait for webhook callback
      if (result.resolutionId) {
        // Store resolutionId to check status later
        localStorage.setItem('currentResolutionId', result.resolutionId);
        
        // Navigate to results page after a delay
        setTimeout(() => {
          navigate(`/dispute-resolution/${result.resolutionId}`);
        }, 3000);
      }

    } catch (error) {
      console.error('Error submitting dispute:', error);
      toast.error('Failed to submit dispute. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ...existing code...
};
```

#### **Step 3: Test the Workflow Trigger**

**Method 1: Using curl (Quick Test)**

```bash
curl -X POST https://your-n8n.app/webhook/dispute-level1-settlement \
  -H "Content-Type: application/json" \
  -d '{
    "escrowId": "test-escrow-123",
    "disputeInitiator": "client",
    "projectTitle": "Website Landing Page",
    "projectDescription": "Modern landing page with hero section, features grid, and contact form. Must be responsive and load under 2 seconds.",
    "submittedWork": {
      "description": "Completed landing page with all sections",
      "deliverableUrls": ["https://example.com/preview"],
      "completionClaim": 95
    },
    "clientClaim": "Missing contact form functionality and page loads in 5 seconds",
    "freelancerDefense": "Contact form is working, tested on Chrome. Load time is acceptable given image quality.",
    "evidenceLinks": [
      "https://example.com/screenshot1.png",
      "https://example.com/video-demo.mp4"
    ],
    "contractAmount": 0.5,
    "milestonesClaimed": [
      {"title": "Design", "description": "UI/UX design completed", "value": 0.2},
      {"title": "Development", "description": "Frontend code delivered", "value": 0.3}
    ]
  }'
```

**Method 2: Using Postman**

1. Open Postman
2. Create new POST request
3. URL: `https://your-n8n.app/webhook/dispute-level1-settlement`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
   ```json
   {
     "escrowId": "test-escrow-123",
     "disputeInitiator": "client",
     "projectTitle": "Website Landing Page",
     "clientClaim": "Work incomplete",
     "freelancerDefense": "Work is complete",
     "contractAmount": 0.5
   }
   ```
6. Click **Send**

**Method 3: From Browser Console**

Open your React app in browser, open Console (F12), paste:

```javascript
fetch('https://your-n8n.app/webhook/dispute-level1-settlement', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    escrowId: 'test-escrow-123',
    disputeInitiator: 'client',
    projectTitle: 'Website Landing Page',
    projectDescription: 'Modern responsive landing page',
    submittedWork: {
      description: 'Completed landing page',
      deliverableUrls: ['https://example.com/preview'],
      completionClaim: 95
    },
    clientClaim: 'Missing contact form',
    freelancerDefense: 'Contact form works fine',
    evidenceLinks: ['https://example.com/screenshot.png'],
    contractAmount: 0.5,
    milestonesClaimed: []
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

#### **Step 4: Verify Workflow Execution**

**In n8n:**
1. Go to **Executions** tab (left sidebar)
2. You should see new execution with timestamp
3. Click on it to see each node's output
4. Check for any errors in red nodes

**Expected Flow:**
```
✅ Webhook received data
✅ Validation passed
✅ Backend API called (escrow details fetched)
✅ AI completeness analysis done
✅ AI evidence verification done
✅ Contract breach check done
✅ Settlement calculated
✅ Saved to database
✅ Emails sent (if configured)
✅ Response returned
```

**Check Your Backend Logs:**
```bash
# In terminal where backend is running
# You should see:
✅ Dispute resolution saved: { escrowId: 'test-escrow-123', ... }
✅ Blockchain settlement executed: { transactionHash: '0x...' }
```

#### **Step 5: Handle Workflow Response**

The n8n workflow returns a response like this:

```json
{
  "success": true,
  "resolutionId": "uuid-v4-here",
  "payoutBreakdown": {
    "freelancerPayout": "0.75 ETH",
    "clientRefund": "0.25 ETH",
    "completionScore": 75
  },
  "reportUrl": "https://trustvault.com/disputes/report-xyz",
  "acceptanceDeadline": "2024-01-15T12:00:00Z",
  "status": "pending_acceptance"
}
```

**Use this response in your frontend:**

```jsx
// filepath: c:\Users\HP\OneDrive\Desktop\TrustVault\src\pages\Dispute.jsx
// ...existing code...

const handleLevel1Submit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const result = await triggerLevel1Dispute(disputePayload);

    if (result.success) {
      toast.success(`AI Analysis Complete! Score: ${result.payoutBreakdown.completionScore}%`);
      
      // Show resolution details
      setResolution({
        id: result.resolutionId,
        freelancerPayout: result.payoutBreakdown.freelancerPayout,
        clientRefund: result.payoutBreakdown.clientRefund,
        score: result.payoutBreakdown.completionScore,
        reportUrl: result.reportUrl,
        deadline: result.acceptanceDeadline
      });

      // Show results modal or navigate to results page
      setShowResults(true);
    }
  } catch (error) {
    toast.error('Workflow execution failed');
  } finally {
    setIsSubmitting(false);
  }
};

// ...existing code...
```

#### **Step 6: Monitor and Debug**

**Enable Debug Mode in n8n:**
1. Click workflow settings (gear icon)
2. Enable "Save Execution Progress"
3. Enable "Save Manual Executions"
4. Now you can see real-time progress

**Check Logs:**
```bash
# n8n logs (if self-hosted)
docker logs n8n

# Your backend logs
node server.js
# Watch for incoming requests

# Check n8n execution details
# Go to n8n UI → Executions → Click on execution
# See input/output of each node
```

**Common Issues:**

| Issue | Solution |
|-------|----------|
| **Webhook not found** | Check URL is correct, workflow is activated |
| **401 Unauthorized** | Backend API token is wrong or missing |
| **Gemini API error** | Check API key is valid, not rate limited |
| **Backend unreachable** | Use ngrok if backend is localhost |
| **CORS error** | Add CORS headers to backend Express app |

#### **Complete Integration Example**

**Frontend Component:**

```jsx
// filepath: c:\Users\HP\OneDrive\Desktop\TrustVault\src\components\DisputeForm.jsx
import React, { useState } from 'react';
import { triggerLevel1Dispute } from '../utils/n8nApi';
import toast from 'react-hot-toast';

export default function DisputeForm() {
  const [loading, setLoading] = useState(false);
  const [resolution, setResolution] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    const loadingToast = toast.loading('AI is analyzing dispute...');

    try {
      const result = await triggerLevel1Dispute({
        escrowId: formData.escrowId,
        disputeInitiator: formData.role,
        projectTitle: formData.projectTitle,
        projectDescription: formData.description,
        submittedWork: formData.submittedWork,
        clientClaim: formData.clientClaim,
        freelancerDefense: formData.freelancerDefense,
        evidenceLinks: formData.evidenceLinks,
        contractAmount: formData.amount,
        milestonesClaimed: formData.milestones
      });

      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success('Dispute resolved by AI!');
        setResolution(result);
      } else {
        toast.error('Resolution failed');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Your form UI */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Submit to AI Arbitration'}
      </button>

      {resolution && (
        <div className="resolution-results">
          <h3>AI Resolution Complete</h3>
          <p>Completion Score: {resolution.payoutBreakdown.completionScore}%</p>
          <p>Freelancer Payout: {resolution.payoutBreakdown.freelancerPayout}</p>
          <p>Client Refund: {resolution.payoutBreakdown.clientRefund}</p>
          <a href={resolution.reportUrl}>View Full Report</a>
        </div>
      )}
    </div>
  );
}
```

### Testing the Full Integration
