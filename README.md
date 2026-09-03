# 1Fi SDE Intern 


A full-stack web application that displays products with multiple EMI plans backed by mutual funds, built with React, Express.js, and MongoDB.

## Features

- **Product Marketplace**: Browse products with dynamic data from MongoDB
- **Product Details**: Unique URLs for each product with variant selection
- **EMI Plans**: Multiple EMI options with monthly payment, tenure, interest rate, and cashback
- **Variant Selection**: Choose between storage/color variants with dynamic price/image updates
- **EMI Selection**: Visual selection state for EMI plans with summary
- **Proceed Flow**: Confirmation modal and confirmation page
- **Responsive Design**: Works on desktop, tablet, and mobile
- **1Fi Design Language**: Purple/white theme, rounded cards, clean typography

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Project Structure

```
1Fi/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── models/
│   │   │   └── Product.js      # Mongoose schema
│   │   ├── routes/
│   │   │   └── productRoutes.js
│   │   ├── seed.js             # Database seeding script
│   │   └── index.js            # Express entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── VariantSelector.jsx
│   │   │   ├── EMIPlanCard.jsx
│   │   │   ├── ProceedButton.jsx
│   │   │   └── ConfirmationModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── Confirmation.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/1fi
   PORT=5000
   ```

5. Seed the database:
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the frontend dev server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000` and will proxy API requests to `http://localhost:5000`.

## Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/1fi |
| PORT | Server port | 5000 |

### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:5000/api |

## MongoDB Setup

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Database will be created automatically on first seed

### MongoDB Atlas (Cloud)
1. Create a free cluster at https://www.mongodb.com/atlas
2. Get connection string
3. Update `MONGODB_URI` in backend `.env`
4. Whitelist your IP address in Atlas Network Access

## Seed Instructions

The seed script creates 3 products with variants and EMI plans:

```bash
cd backend
npm run seed
```

### Seed Data

**Products:**
1. **iPhone 17 Pro** (Apple)
   - 256 GB Natural Titanium - ₹134,900
   - 512 GB Blue Titanium - ₹154,900
   - 1 TB White Titanium - ₹174,900

2. **Samsung Galaxy S24 Ultra** (Samsung)
   - 256 GB Titanium Gray - ₹129,999
   - 512 GB Titanium Violet - ₹139,999
   - 1 TB Titanium Black - ₹159,999

3. **MacBook Air M3** (Apple)
   - 256 GB Space Gray - ₹114,900
   - 512 GB Starlight - ₹134,900
   - 1 TB Midnight - ₹154,900

**EMI Plans (per variant):**
- 3 months - 0% interest - ₹7,500 cashback
- 6 months - 0% interest - ₹7,500 cashback
- 12 months - 0% interest - ₹5,000 cashback
- 24 months - 0% interest - ₹3,000 cashback
- 36 months - 10.5% interest - ₹2,000 cashback
- 48 months - 10.5% interest - ₹1,500 cashback
- 60 months - 10.5% interest - ₹1,000 cashback

## How to Run

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## API Endpoints

### GET /api/products
Returns list of all products with basic info.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "variants": [
        {
          "name": "256 GB",
          "price": 134900,
          "image": "https://..."
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### GET /api/products/slug/:slug
Returns detailed product data including all variants and EMI plans.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "description": "The latest flagship iPhone...",
    "variants": [
      {
        "name": "256 GB",
        "storage": "256 GB",
        "color": "Natural Titanium",
        "price": 134900,
        "image": "https://...",
        "emiPlans": [
          {
            "tenure": 3,
            "monthlyAmount": 44967,
            "interestRate": 0,
            "cashback": 7500
          }
        ]
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /api/products/:id
Returns product by MongoDB ObjectId.

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Database Schema

### Product
```javascript
{
  name: String,           // Required, unique product name
  slug: String,           // Required, unique URL-friendly identifier
  brand: String,          // Required, brand name
  description: String,    // Optional product description
  variants: [Variant],    // Array of product variants
  createdAt: Date,
  updatedAt: Date
}
```

### Variant (subdocument)
```javascript
{
  name: String,           // Required, variant label (e.g., "256 GB")
  storage: String,        // Optional storage size
  color: String,          // Optional color
  price: Number,          // Required, MRP in INR
  image: String,          // Optional product image URL
  emiPlans: [EMIPlan]     // Array of EMI plans for this variant
}
```

### EMIPlan (subdocument)
```javascript
{
  tenure: Number,         // Required, tenure in months
  monthlyAmount: Number,  // Required, monthly EMI amount
  interestRate: Number,   // Required, interest rate percentage
  cashback: Number        // Optional, cashback amount (default: 0)
}
```

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero and features |
| `/shop` | Shop page with three tabs |
| `/shop/marketplace` | 1Fi Marketplace product listing |
| `/products/:slug` | Product detail page |
| `/confirmation` | Order confirmation page |

## Design System

The UI follows the 1Fi design language:
- **Primary Color**: Purple (#7c4df9 / #6d3bf0)
- **Backgrounds**: White / Gray-50
- **Cards**: Rounded-2xl with subtle borders and shadows
- **Buttons**: Rounded-xl with hover/active states
- **Typography**: System font stack, clean hierarchy
- **Spacing**: Generous but controlled (4px base unit)
- **Components**: Compact information cards, clear visual hierarchy

## Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables in platform dashboard
2. Build command: `npm install`
3. Start command: `npm start`
4. Ensure MongoDB URI is accessible from deployment platform

### Frontend (Vercel/Netlify)
1. Connect repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url/api`
5. Configure rewrites for SPA routing

### Docker (Optional)
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Assignment Compliance

✅ React + Tailwind CSS frontend  
✅ Node.js + Express.js backend  
✅ MongoDB with Mongoose  
✅ Dynamic data from database via APIs  
✅ No hardcoded product/EMI data in frontend  
✅ Unique URLs for each product (/products/:slug)  
✅ At least 3 products with 2+ variants each  
✅ Multiple EMI plans with monthly amount, tenure, interest rate, cashback  
✅ Selectable EMI plans with visual state  
✅ Proceed button with confirmation flow  
✅ Shop page with 3 tabs (Top Brands, Nearby Stores, 1Fi Marketplace)  
✅ 1Fi Marketplace fully implemented  
✅ Top Brands and Nearby Stores as placeholder tabs  
✅ Responsive design (desktop, tablet, mobile)  
✅ 1Fi visual language (purple/white, rounded cards, clean typography)  
✅ Loading and error states  
✅ Environment variables for configuration  
✅ Seed data script  
✅ Comprehensive README  
✅ .env.example files  

## License

MIT License - Assignment project for 1Fi SDE Intern position.
