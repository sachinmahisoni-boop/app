import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB, seedData, ProductDB, CategoryDB, OrderDB, CustomerDB, CartDB } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initDB();
await seedData();

// ============ PRODUCT ROUTES ============

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const { category, search, limit } = req.query;
    let products = ProductDB.getAll();
    
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    if (search) {
      const lowerSearch = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (limit) {
      products = products.slice(0, parseInt(limit));
    }
    
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const product = ProductDB.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create product (Admin only - add auth later)
app.post('/api/products', (req, res) => {
  try {
    const product = ProductDB.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update product
app.put('/api/products/:id', (req, res) => {
  try {
    const product = ProductDB.update(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const deleted = ProductDB.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ CATEGORY ROUTES ============

// Get all categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = CategoryDB.getAll();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get category by ID
app.get('/api/categories/:id', (req, res) => {
  try {
    const category = CategoryDB.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ CART ROUTES ============

// Get cart by session
app.get('/api/cart/:sessionId', (req, res) => {
  try {
    const cart = CartDB.getBySession(req.params.sessionId);
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add item to cart
app.post('/api/cart', (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;
    
    // Get product details
    const product = ProductDB.getById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    const cartItem = {
      sessionId,
      productId,
      quantity: parseInt(quantity) || 1,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }
    };
    
    const cart = CartDB.addItem(cartItem);
    res.status(201).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update cart item quantity
app.put('/api/cart/:id', (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = CartDB.updateQuantity(req.params.id, parseInt(quantity));
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  try {
    CartDB.removeItem(req.params.id);
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear cart
app.delete('/api/cart/session/:sessionId', (req, res) => {
  try {
    CartDB.clearSession(req.params.sessionId);
    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ ORDER ROUTES ============

// Get all orders
app.get('/api/orders', (req, res) => {
  try {
    const orders = OrderDB.getAll();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  try {
    const order = OrderDB.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create order
app.post('/api/orders', (req, res) => {
  try {
    const order = OrderDB.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status
app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const order = OrderDB.updateStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ CUSTOMER ROUTES ============

// Get all customers
app.get('/api/customers', (req, res) => {
  try {
    const customers = CustomerDB.getAll();
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get customer by ID
app.get('/api/customers/:id', (req, res) => {
  try {
    const customer = CustomerDB.getById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create customer
app.post('/api/customers', (req, res) => {
  try {
    const customer = CustomerDB.create(req.body);
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update customer
app.put('/api/customers/:id', (req, res) => {
  try {
    const customer = CustomerDB.update(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ HEALTH CHECK ============

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Kteena API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Kteena Server running on port ${PORT}`);
  console.log(`📦 API Base URL: http://localhost:${PORT}/api`);
});

export default app;
