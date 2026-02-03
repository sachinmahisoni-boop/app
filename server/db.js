import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const dbPath = path.join(__dirname, '..', 'data', 'database.json');

// Default data structure
const defaultData = {
  products: [],
  categories: [],
  orders: [],
  customers: [],
  cart: [],
  testimonials: [],
  settings: {
    storeName: 'Kteena',
    currency: 'INR',
    taxRate: 0.18,
    shippingFreeThreshold: 2000,
  }
};

// Initialize database
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, defaultData);

// Initialize database with default data
export async function initDB() {
  await db.read();
  
  // Ensure all default keys exist
  if (!db.data) {
    db.data = defaultData;
  }
  
  // Initialize missing keys
  Object.keys(defaultData).forEach(key => {
    if (!db.data[key]) {
      db.data[key] = defaultData[key];
    }
  });
  
  await db.write();
  return db;
}

// Product operations
export const ProductDB = {
  getAll() {
    return db.data.products;
  },
  
  getById(id) {
    return db.data.products.find(p => p.id === id);
  },
  
  getByCategory(category) {
    return db.data.products.filter(p => p.category === category);
  },
  
  create(product) {
    const newProduct = {
      id: nanoid(),
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.data.products.push(newProduct);
    db.write();
    return newProduct;
  },
  
  update(id, updates) {
    const index = db.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    db.data.products[index] = {
      ...db.data.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.write();
    return db.data.products[index];
  },
  
  delete(id) {
    const index = db.data.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    db.data.products.splice(index, 1);
    db.write();
    return true;
  },
  
  search(query) {
    const lowerQuery = query.toLowerCase();
    return db.data.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
};

// Category operations
export const CategoryDB = {
  getAll() {
    return db.data.categories;
  },
  
  getById(id) {
    return db.data.categories.find(c => c.id === id);
  },
  
  create(category) {
    const newCategory = {
      id: nanoid(),
      ...category,
      createdAt: new Date().toISOString(),
    };
    db.data.categories.push(newCategory);
    db.write();
    return newCategory;
  },
  
  update(id, updates) {
    const index = db.data.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    db.data.categories[index] = {
      ...db.data.categories[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.write();
    return db.data.categories[index];
  },
  
  delete(id) {
    const index = db.data.categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    db.data.categories.splice(index, 1);
    db.write();
    return true;
  }
};

// Order operations
export const OrderDB = {
  getAll() {
    return db.data.orders;
  },
  
  getById(id) {
    return db.data.orders.find(o => o.id === id);
  },
  
  getByCustomer(customerId) {
    return db.data.orders.filter(o => o.customerId === customerId);
  },
  
  create(order) {
    const newOrder = {
      id: nanoid(),
      orderNumber: `ORD${Date.now()}`,
      status: 'pending',
      ...order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.data.orders.push(newOrder);
    db.write();
    return newOrder;
  },
  
  updateStatus(id, status) {
    const index = db.data.orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    db.data.orders[index].status = status;
    db.data.orders[index].updatedAt = new Date().toISOString();
    db.write();
    return db.data.orders[index];
  },
  
  delete(id) {
    const index = db.data.orders.findIndex(o => o.id === id);
    if (index === -1) return false;
    
    db.data.orders.splice(index, 1);
    db.write();
    return true;
  }
};

// Customer operations
export const CustomerDB = {
  getAll() {
    return db.data.customers;
  },
  
  getById(id) {
    return db.data.customers.find(c => c.id === id);
  },
  
  getByEmail(email) {
    return db.data.customers.find(c => c.email === email);
  },
  
  create(customer) {
    // Check if email already exists
    const existing = this.getByEmail(customer.email);
    if (existing) {
      throw new Error('Email already registered');
    }
    
    const newCustomer = {
      id: nanoid(),
      ...customer,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.data.customers.push(newCustomer);
    db.write();
    return newCustomer;
  },
  
  update(id, updates) {
    const index = db.data.customers.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    db.data.customers[index] = {
      ...db.data.customers[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.write();
    return db.data.customers[index];
  },
  
  delete(id) {
    const index = db.data.customers.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    db.data.customers.splice(index, 1);
    db.write();
    return true;
  }
};

// Cart operations
export const CartDB = {
  getAll() {
    return db.data.cart;
  },
  
  getBySession(sessionId) {
    return db.data.cart.filter(c => c.sessionId === sessionId);
  },
  
  addItem(item) {
    const existingIndex = db.data.cart.findIndex(
      c => c.sessionId === item.sessionId && c.productId === item.productId
    );
    
    if (existingIndex > -1) {
      db.data.cart[existingIndex].quantity += item.quantity;
      db.data.cart[existingIndex].updatedAt = new Date().toISOString();
    } else {
      db.data.cart.push({
        id: nanoid(),
        ...item,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    db.write();
    return this.getBySession(item.sessionId);
  },
  
  updateQuantity(id, quantity) {
    const index = db.data.cart.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    if (quantity <= 0) {
      db.data.cart.splice(index, 1);
    } else {
      db.data.cart[index].quantity = quantity;
      db.data.cart[index].updatedAt = new Date().toISOString();
    }
    
    db.write();
    return db.data.cart;
  },
  
  removeItem(id) {
    const index = db.data.cart.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    db.data.cart.splice(index, 1);
    db.write();
    return true;
  },
  
  clearSession(sessionId) {
    db.data.cart = db.data.cart.filter(c => c.sessionId !== sessionId);
    db.write();
    return true;
  }
};

// Seed initial data
export async function seedData() {
  const products = [
    {
      id: '1',
      name: '5 Mukhi Rudraksha Bracelet',
      description: 'Authentic Nepalese Rudraksha beads, spiritually energized for peace and prosperity.',
      price: 1299,
      originalPrice: 1599,
      image: '/product-rudraksha.jpg',
      category: 'rudraksha',
      subcategory: '5-mukhi',
      rating: 4.9,
      reviews: 128,
      inStock: true,
      badge: 'Bestseller',
    },
    {
      id: '2',
      name: 'Blue Sapphire (Neelam)',
      description: 'Premium quality natural Blue Sapphire gemstone, certified and energized.',
      price: 5999,
      originalPrice: 7499,
      image: '/gem-blue-sapphire.jpg',
      category: 'gemstones',
      subcategory: 'blue-sapphire',
      rating: 4.8,
      reviews: 86,
      inStock: true,
      badge: 'Premium',
    },
    {
      id: '3',
      name: 'Rose Quartz Heart Pendant',
      description: 'Beautiful heart-shaped Rose Quartz crystal set in sterling silver.',
      price: 2499,
      originalPrice: 2999,
      image: '/product-rosequartz.jpg',
      category: 'jewelry',
      subcategory: 'pendants',
      rating: 4.7,
      reviews: 94,
      inStock: true,
    },
    {
      id: '4',
      name: 'Complete Numerology Report',
      description: 'Personalized numerology reading by expert numerologists.',
      price: 1999,
      originalPrice: 2499,
      image: '/product-numerology.jpg',
      category: 'numerology',
      rating: 5.0,
      reviews: 156,
      inStock: true,
      badge: 'Popular',
    },
    {
      id: '5',
      name: 'Bridal Necklace Set',
      description: 'Exquisite bridal necklace with matching earrings and rings.',
      price: 24999,
      originalPrice: 29999,
      image: '/product-bridal-set.jpg',
      category: 'jewelry',
      subcategory: 'bridal',
      rating: 4.9,
      reviews: 72,
      inStock: true,
      badge: 'New Arrival',
    },
    {
      id: '6',
      name: 'Designer Gold Necklace',
      description: 'Elegant floral design necklace with diamonds and pearls.',
      price: 8999,
      originalPrice: 10999,
      image: '/product-necklace.jpg',
      category: 'jewelry',
      subcategory: 'necklaces',
      rating: 4.8,
      reviews: 45,
      inStock: true,
    },
    {
      id: '7',
      name: 'Diamond Chandelier Earrings',
      description: 'Stunning diamond-studded chandelier earrings.',
      price: 5999,
      originalPrice: 7499,
      image: '/product-earrings.jpg',
      category: 'jewelry',
      subcategory: 'earrings',
      rating: 4.9,
      reviews: 38,
      inStock: true,
    },
    {
      id: '8',
      name: 'Pear Diamond Ring Set',
      description: 'Beautiful pear-shaped diamond ring with matching bands.',
      price: 12999,
      originalPrice: 15999,
      image: '/product-rings.jpg',
      category: 'jewelry',
      subcategory: 'rings',
      rating: 4.8,
      reviews: 52,
      inStock: true,
    },
    // Gemstones
    {
      id: 'gem-1',
      name: 'Ruby (Manik)',
      description: 'For Sun, brings power and confidence',
      price: 8999,
      image: '/gem-ruby.jpg',
      category: 'gemstones',
      subcategory: 'ruby',
      rating: 4.8,
      reviews: 65,
      inStock: true,
    },
    {
      id: 'gem-2',
      name: 'Emerald (Panna)',
      description: 'For Mercury, brings wisdom and success',
      price: 6499,
      image: '/gem-emerald.jpg',
      category: 'gemstones',
      subcategory: 'emerald',
      rating: 4.7,
      reviews: 48,
      inStock: true,
    },
    {
      id: 'gem-3',
      name: 'Yellow Sapphire (Pukhraj)',
      description: 'For Jupiter, brings wealth and fortune',
      price: 4999,
      image: '/gem-yellow-sapphire.jpg',
      category: 'gemstones',
      subcategory: 'yellow-sapphire',
      rating: 4.9,
      reviews: 72,
      inStock: true,
    },
    {
      id: 'gem-4',
      name: 'Red Coral (Moonga)',
      description: 'For Mars, brings courage and energy',
      price: 2999,
      image: '/gem-coral.jpg',
      category: 'gemstones',
      subcategory: 'coral',
      rating: 4.6,
      reviews: 38,
      inStock: true,
    },
    {
      id: 'gem-5',
      name: 'Pearl (Moti)',
      description: 'For Moon, brings peace and calmness',
      price: 1999,
      image: '/gem-pearl.jpg',
      category: 'gemstones',
      subcategory: 'pearl',
      rating: 4.8,
      reviews: 55,
      inStock: true,
    },
    {
      id: 'gem-6',
      name: "Cat's Eye (Lehsuniya)",
      description: 'For Ketu, brings protection and spirituality',
      price: 3499,
      image: '/gem-catseye.jpg',
      category: 'gemstones',
      subcategory: 'catseye',
      rating: 4.5,
      reviews: 28,
      inStock: true,
    },
    {
      id: 'gem-7',
      name: 'Hessonite (Gomed)',
      description: 'For Rahu, brings clarity and success',
      price: 2499,
      image: '/gem-hessonite.jpg',
      category: 'gemstones',
      subcategory: 'hessonite',
      rating: 4.7,
      reviews: 42,
      inStock: true,
    },
    {
      id: 'gem-8',
      name: 'Opal',
      description: 'For Venus, brings love and creativity',
      price: 3999,
      image: '/gem-opal.jpg',
      category: 'gemstones',
      subcategory: 'opal',
      rating: 4.6,
      reviews: 35,
      inStock: true,
    },
    // Rudraksha
    {
      id: 'rud-1',
      name: '1 Mukhi Rudraksha',
      description: 'Lord Shiva himself, ultimate spiritual growth',
      price: 15999,
      image: '/rudra-1mukhi.jpg',
      category: 'rudraksha',
      subcategory: '1-mukhi',
      rating: 5.0,
      reviews: 25,
      inStock: true,
      badge: 'Rare',
    },
    {
      id: 'rud-2',
      name: '3 Mukhi Rudraksha',
      description: 'Lord Agni, burns past karma, boosts confidence',
      price: 999,
      image: '/rudra-3mukhi.jpg',
      category: 'rudraksha',
      subcategory: '3-mukhi',
      rating: 4.7,
      reviews: 48,
      inStock: true,
    },
    {
      id: 'rud-3',
      name: '7 Mukhi Rudraksha',
      description: 'Goddess Lakshmi, wealth and abundance',
      price: 2499,
      image: '/rudra-7mukhi.jpg',
      category: 'rudraksha',
      subcategory: '7-mukhi',
      rating: 4.8,
      reviews: 62,
      inStock: true,
    },
    {
      id: 'rud-4',
      name: '9 Mukhi Rudraksha',
      description: 'Goddess Durga, power and protection',
      price: 3999,
      image: '/rudra-9mukhi.jpg',
      category: 'rudraksha',
      subcategory: '9-mukhi',
      rating: 4.9,
      reviews: 38,
      inStock: true,
    },
    {
      id: 'rud-5',
      name: '11 Mukhi Rudraksha',
      description: 'Lord Hanuman, strength and courage',
      price: 5499,
      image: '/rudra-11mukhi.jpg',
      category: 'rudraksha',
      subcategory: '11-mukhi',
      rating: 4.8,
      reviews: 32,
      inStock: true,
    },
  ];

  const categories = [
    { id: 'cat-1', name: 'Rudraksha', slug: 'rudraksha', icon: 'CircleDot', description: 'Sacred beads for spiritual growth' },
    { id: 'cat-2', name: 'Gemstones', slug: 'gemstones', icon: 'Gem', description: 'Certified gemstones for astrology' },
    { id: 'cat-3', name: 'Jewelry', slug: 'jewelry', icon: 'Heart', description: 'Exquisite jewelry collections' },
    { id: 'cat-4', name: 'Numerology', slug: 'numerology', icon: 'Calculator', description: 'Personalized numerology services' },
  ];

  const testimonials = [
    {
      id: 'test-1',
      name: 'Priya Mehta',
      avatar: '/avatar-1.jpg',
      rating: 5,
      text: 'The Rudraksha bracelet transformed my meditation practice. I feel more centered and peaceful since I started wearing it. The quality is exceptional!',
      date: '2 weeks ago',
    },
    {
      id: 'test-2',
      name: 'Rahul Kapoor',
      avatar: '/avatar-2.jpg',
      rating: 5,
      text: 'The numerology reading was incredibly accurate and insightful. It helped me understand my life path and make better decisions. Highly recommend!',
      date: '1 month ago',
    },
    {
      id: 'test-3',
      name: 'Ananya Sharma',
      avatar: '/avatar-3.jpg',
      rating: 5,
      text: 'Beautiful, authentic gemstones with amazing energy. The packaging was elegant and the customer service was outstanding. Will definitely order again!',
      date: '3 weeks ago',
    },
  ];

  // Only seed if data doesn't exist
  if (db.data.products.length === 0) {
    db.data.products = products;
  }
  if (db.data.categories.length === 0) {
    db.data.categories = categories;
  }
  if (db.data.testimonials.length === 0) {
    db.data.testimonials = testimonials;
  }
  
  await db.write();
  console.log('Database seeded successfully!');
}

export { db };
export default db;
