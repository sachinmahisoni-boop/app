# WordPress WooCommerce Setup Guide for Kteena

## Overview
This guide helps you set up WordPress with WooCommerce to manage your Kteena spiritual jewelry store.

---

## Step 1: Install WordPress

### Option A: Local Development (XAMPP/WAMP)
1. Download and install XAMPP from https://www.apachefriends.org
2. Start Apache and MySQL services
3. Download WordPress from https://wordpress.org/download
4. Extract to `htdocs/kteena` folder
5. Create database `kteena_wp` in phpMyAdmin
6. Run WordPress installer at `http://localhost/kteena`

### Option B: Web Hosting
1. Purchase hosting from providers like:
   - Hostinger (₹149/month)
   - Bluehost ($2.95/month)
   - SiteGround ($2.99/month)
2. Use one-click WordPress installer
3. Or manually upload WordPress files

---

## Step 2: Install WooCommerce Plugin

1. Login to WordPress Admin (`yourdomain.com/wp-admin`)
2. Go to **Plugins > Add New**
3. Search for "WooCommerce"
4. Click **Install Now** then **Activate**
5. Follow the WooCommerce setup wizard:
   - Store Address: Shop No. 6, Saideep Plaza, DK2, Kolar, Bhopal, MP - 462042
   - Industry: Health & Beauty
   - Product Types: Physical products, Downloads
   - Business Details: Appropriate selections
   - Theme: Choose a theme or skip

---

## Step 3: Configure WooCommerce Settings

### General Settings
```
WordPress Admin > WooCommerce > Settings > General

Store Address:
- Address Line 1: Shop No. 6, Saideep Plaza
- Address Line 2: DK2, Kolar
- City: Bhopal
- State: Madhya Pradesh
- Postal Code: 462042
- Country: India

Currency: Indian Rupee (₹)
Currency Position: Left
Thousand Separator: ,
Decimal Separator: .
Number of Decimals: 0
```

### Payment Settings
```
WooCommerce > Settings > Payments

Enable:
- Cash on Delivery (COD)
- Razorpay (Install Razorpay plugin)
- PayU (Install PayU plugin)
- UPI (Install UPI plugin)
```

### Shipping Settings
```
WooCommerce > Settings > Shipping

Add Shipping Zone: India
- Free Shipping: Orders above ₹2000
- Flat Rate: ₹99 for standard delivery
- Express Delivery: ₹199
```

---

## Step 4: Create Product Categories

```
WordPress Admin > Products > Categories

Create these categories:
1. Rudraksha
   - Slug: rudraksha
   - Description: Sacred Rudraksha beads for spiritual growth

2. Gemstones
   - Slug: gemstones
   - Description: Certified gemstones for astrology

3. Jewelry
   - Slug: jewelry
   - Description: Exquisite spiritual jewelry
   
4. Numerology
   - Slug: numerology
   - Description: Personalized numerology services
```

---

## Step 5: Add Products

```
WordPress Admin > Products > Add New

Sample Product Structure:

Product Name: 5 Mukhi Rudraksha Bracelet
Category: Rudraksha
Price: ₹1,299
Sale Price: (optional)
SKU: RUD-5M-001
Stock: Manage stock (100 units)

Description:
Authentic Nepalese Rudraksha beads, spiritually energized for peace and prosperity.

Short Description:
5 Mukhi Rudraksha bracelet for health and meditation.

Product Image: Upload product image
Gallery: Additional images
```

### Add All Products:

**Rudraksha Products:**
- 1 Mukhi Rudraksha - ₹15,999
- 3 Mukhi Rudraksha - ₹999
- 5 Mukhi Rudraksha Bracelet - ₹1,299
- 7 Mukhi Rudraksha - ₹2,499
- 9 Mukhi Rudraksha - ₹3,999
- 11 Mukhi Rudraksha - ₹5,499

**Gemstone Products:**
- Blue Sapphire (Neelam) - ₹5,999
- Ruby (Manik) - ₹8,999
- Emerald (Panna) - ₹6,499
- Yellow Sapphire (Pukhraj) - ₹4,999
- Red Coral (Moonga) - ₹2,999
- Pearl (Moti) - ₹1,999
- Cat's Eye (Lehsuniya) - ₹3,499
- Hessonite (Gomed) - ₹2,499
- Opal - ₹3,999

**Jewelry Products:**
- Bridal Necklace Set - ₹24,999
- Designer Gold Necklace - ₹8,999
- Diamond Chandelier Earrings - ₹5,999
- Pear Diamond Ring Set - ₹12,999
- Rose Quartz Heart Pendant - ₹2,499

**Numerology:**
- Complete Numerology Report - ₹1,999

---

## Step 6: Generate WooCommerce API Keys

```
WordPress Admin > WooCommerce > Settings > Advanced > REST API

Click "Add Key"
- Description: Kteena Website API
- User: Select admin user
- Permissions: Read/Write

Click "Generate API Key"

Save these credentials:
- Consumer Key: (copy this)
- Consumer Secret: (copy this)
```

---

## Step 7: Update Frontend Configuration

Edit `/src/config/wordpress.ts`:

```typescript
export const WP_CONFIG = {
  baseURL: 'https://your-wordpress-site.com', // Your WordPress URL
  
  consumerKey: 'ck_your_consumer_key_here',     // From Step 6
  consumerSecret: 'cs_your_consumer_secret_here', // From Step 6
  
  // ... rest of config
};
```

---

## Step 8: Install Additional Plugins

### Required Plugins:
1. **WooCommerce** - E-commerce functionality
2. **Elementor** (Optional) - Page builder for custom designs
3. **Yoast SEO** - SEO optimization
4. **WP Super Cache** - Performance optimization
5. **Wordfence Security** - Security

### For Currency Converter:
1. **WooCommerce Currency Switcher** OR
2. Use built-in currency API (already configured)

### For Payment:
1. **Razorpay for WooCommerce**
2. **PayU India for WooCommerce**

---

## Step 9: Customize WordPress Theme

### Recommended Themes:
1. **Astra** - Lightweight, customizable
2. **Flatsome** - Great for e-commerce
3. **Divi** - Visual builder
4. **OceanWP** - Free, feature-rich

### Customizations:
```
WordPress Admin > Appearance > Customize

Site Identity:
- Site Title: Kteena
- Tagline: Spiritual Jewelry & Wellness
- Logo: Upload your logo

Colors:
- Primary: #9370db (Purple)
- Secondary: #663399 (Dark Purple)

Menus:
Create menu with links to:
- Home
- Shop
- About Us
- Contact
- FAQ
```

---

## Step 10: Connect Frontend to WordPress

### Environment Variables
Create `.env` file in project root:

```env
# WordPress WooCommerce API
VITE_WP_URL=https://your-wordpress-site.com
VITE_WC_CONSUMER_KEY=ck_your_key_here
VITE_WC_CONSUMER_SECRET=cs_your_secret_here

# Currency API (Free from exchangerate-api.com)
VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
```

### Build and Deploy
```bash
npm run build
# Deploy dist folder to your hosting
```

---

## Managing Your Store

### Daily Operations:
1. **Check Orders**: `WooCommerce > Orders`
2. **Update Stock**: `Products > All Products`
3. **Add New Products**: `Products > Add New`
4. **Process Refunds**: `WooCommerce > Orders > Refund`

### Customer Management:
1. **View Customers**: `WooCommerce > Customers`
2. **Customer Notes**: Add notes to customer profiles
3. **Email Marketing**: Export customer list

### Reports:
1. **Sales Reports**: `WooCommerce > Reports`
2. **Product Performance**: See best-selling products
3. **Revenue Tracking**: Daily/Monthly/Yearly sales

---

## Contact Information (Already Configured)

```
Store Name: Kteena
Address: Shop No. 6, Saideep Plaza, DK2, Kolar, Bhopal, MP - 462042
Phone: +91 6261875619
WhatsApp: +91 6261875619
Email: support@kteena.com

Business Hours:
- Monday-Saturday: 10:00 AM - 7:00 PM
- Sunday: Closed
```

---

## Support & Help

- **WooCommerce Docs**: https://docs.woocommerce.com
- **WordPress Support**: https://wordpress.org/support
- **Kteena Developer**: Contact for technical assistance

---

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start backend server
npm run server

# Preview production build
npm run preview
```
