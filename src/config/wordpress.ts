// WordPress WooCommerce Configuration
export const WP_CONFIG = {
  // WordPress Site URL - Change this to your WordPress site URL
  baseURL: import.meta.env.VITE_WP_URL || 'https://kteena.com',
  
  // WooCommerce API Credentials
  // Generate these from WordPress Admin > WooCommerce > Settings > Advanced > REST API
  consumerKey: import.meta.env.VITE_WC_CONSUMER_KEY || '',
  consumerSecret: import.meta.env.VITE_WC_CONSUMER_SECRET || '',
  
  // API Endpoints
  endpoints: {
    products: '/wp-json/wc/v3/products',
    categories: '/wp-json/wc/v3/products/categories',
    orders: '/wp-json/wc/v3/orders',
    customers: '/wp-json/wc/v3/customers',
    cart: '/wp-json/wc/v3/cart',
    coupons: '/wp-json/wc/v3/coupons',
  },
  
  // WordPress REST API for pages/posts
  wpEndpoints: {
    pages: '/wp-json/wp/v2/pages',
    posts: '/wp-json/wp/v2/posts',
    media: '/wp-json/wp/v2/media',
    menus: '/wp-json/wp/v2/menus',
  }
};

// Store Information - EDITABLE FROM WORDPRESS
export const STORE_INFO = {
  name: 'Kteena',
  tagline: 'Spiritual Jewelry & Wellness',
  description: 'Your trusted destination for authentic spiritual products, gemstones, and Rudraksha beads.',
  
  // Contact Information - UPDATED
  address: {
    shop: 'Shop No. 6',
    building: 'Saideep Plaza',
    area: 'DK2',
    city: 'Kolar',
    state: 'Madhya Pradesh',
    pincode: '462042',
    full: 'Shop No. 6, Saideep Plaza, DK2, Kolar, Bhopal, Madhya Pradesh - 462042',
  },
  
  phone: {
    primary: '+91 6261875619',
    secondary: '',
    whatsapp: '916261875619',
  },
  
  email: {
    support: 'support@kteena.com',
    sales: 'support@kteena.com',
    info: 'support@kteena.com',
  },
  
  // Social Media Links
  social: {
    facebook: 'https://facebook.com/kteena',
    instagram: 'https://instagram.com/kteena',
    twitter: 'https://twitter.com/kteena',
    youtube: 'https://youtube.com/kteena',
  },
  
  // Business Hours
  hours: {
    monday: '10:00 AM - 7:00 PM',
    tuesday: '10:00 AM - 7:00 PM',
    wednesday: '10:00 AM - 7:00 PM',
    thursday: '10:00 AM - 7:00 PM',
    friday: '10:00 AM - 7:00 PM',
    saturday: '10:00 AM - 7:00 PM',
    sunday: 'Closed',
  },
  
  // Currency Settings
  currency: {
    code: 'INR',
    symbol: '₹',
    position: 'before', // 'before' or 'after'
    decimals: 0,
    thousand_separator: ',',
    decimal_separator: '.',
  },
  
  // Shipping Settings
  shipping: {
    freeThreshold: 2000,
    standardRate: 99,
    expressRate: 199,
  },
};

// Currency Converter API Configuration
export const CURRENCY_CONFIG = {
  // Using exchangerate-api.com (free tier available)
  apiKey: import.meta.env.VITE_EXCHANGE_RATE_API_KEY || '',
  baseURL: 'https://api.exchangerate-api.com/v4/latest',
  
  // Supported Currencies
  supportedCurrencies: [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
  ],
  
  // Default Currency
  defaultCurrency: 'INR',
};

export default WP_CONFIG;
