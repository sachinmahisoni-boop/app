# Jewellery ERP - Complete Accounting & Billing Software

A comprehensive jewellery ERP system with accounting, billing, inventory management, and multi-platform support (Office/Online, PC/Mobile).

## Features

### Core Modules
- **User Management** - Role-based access control (Admin, Manager, Sales, Accountant)
- **Product Management** - Jewellery inventory with categories (Gold, Silver, Diamond, etc.)
- **Billing System** - Invoice generation with GST calculation
- **Accounting** - Ledger management, trial balance, profit/loss statements
- **Dashboard** - Real-time business insights and analytics

### Technical Features
- **Responsive Design** - Works on PC, Tablet, and Mobile
- **Real-time Updates** - Socket.IO for live data synchronization
- **Offline/Online Support** - PWA-ready architecture
- **Secure Authentication** - JWT-based authentication
- **RESTful API** - Backend API for all operations
- **Modern UI** - React with Tailwind CSS

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO (real-time)
- JWT Authentication
- PDFKit (invoice generation)

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios
- Socket.IO Client
- React Toastify

## Project Structure

```
jewellery-erp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   ├── config/
│   │   └── db.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── store/
    │   └── App.jsx
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd jewellery-erp/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/jewellery_erp
# JWT_SECRET=your_secret_key
# NODE_ENV=development

# Start the server
npm run dev
```

### Frontend Setup

```bash
cd jewellery-erp/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users` - Get all users (Admin/Manager only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get invoice by ID
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice
- `GET /api/invoices/daily-report` - Daily sales report

### Accounting
- `GET /api/accounting/ledgers` - Get all ledgers
- `POST /api/accounting/ledgers` - Create ledger
- `GET /api/accounting/entries` - Get accounting entries
- `POST /api/accounting/entries` - Create entry
- `GET /api/accounting/trial-balance` - Get trial balance
- `GET /api/accounting/profit-loss` - Get profit/loss statement

## Default Credentials

For testing purposes:
- Email: admin@example.com
- Password: password123

(Note: You'll need to create this user via API or database seed)

## Mobile App Considerations

This application is built as a responsive web app that works on mobile devices. For native mobile apps:

### Option 1: Progressive Web App (PWA)
- Add service worker configuration
- Configure manifest.json
- Enable install prompt

### Option 2: React Native
- Reuse business logic from frontend
- Create native UI components
- Use same backend API

### Option 3: Capacitor/Ionic
- Wrap the React app in a native container
- Access device features
- Deploy to App Store/Play Store

## Deployment

### Backend (Production)
```bash
# Set NODE_ENV=production
# Configure MongoDB Atlas or production DB
# Set secure JWT_SECRET
npm start
```

### Frontend (Production)
```bash
npm run build
# Deploy dist/ folder to hosting service
# Options: Vercel, Netlify, AWS S3, etc.
```

## Security Considerations

- Change default JWT secret in production
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Enable CORS for specific domains only
- Regular security audits

## Future Enhancements

- [ ] Barcode/QR code scanning for products
- [ ] Customer relationship management (CRM)
- [ ] Purchase order management
- [ ] Multi-store/multi-branch support
- [ ] Advanced reporting and analytics
- [ ] Email/SMS notifications
- [ ] Payment gateway integration
- [ ] Inventory alerts and reordering
- [ ] Employee attendance tracking
- [ ] Tax compliance reports (GST returns)

## License

MIT License - Feel free to use this for commercial purposes.

## Support

For issues and feature requests, please create an issue in the repository.

---

**Built with ❤️ for Jewellery Businesses**
