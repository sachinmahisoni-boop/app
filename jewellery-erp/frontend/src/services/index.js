import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query, category) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (category) params.append('category', category);
    const response = await api.get(`/products/search?${params}`);
    return response.data;
  }
};

export const invoiceService = {
  getInvoices: async () => {
    const response = await api.get('/invoices');
    return response.data;
  },

  getInvoice: async (id) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  createInvoice: async (invoiceData) => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },

  updateInvoice: async (id, invoiceData) => {
    const response = await api.put(`/invoices/${id}`, invoiceData);
    return response.data;
  },

  deleteInvoice: async (id) => {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  },

  getDailyReport: async () => {
    const response = await api.get('/invoices/daily-report');
    return response.data;
  }
};

export const accountingService = {
  getLedgers: async () => {
    const response = await api.get('/accounting/ledgers');
    return response.data;
  },

  createLedger: async (ledgerData) => {
    const response = await api.post('/accounting/ledgers', ledgerData);
    return response.data;
  },

  getEntries: async () => {
    const response = await api.get('/accounting/entries');
    return response.data;
  },

  createEntry: async (entryData) => {
    const response = await api.post('/accounting/entries', entryData);
    return response.data;
  },

  getTrialBalance: async () => {
    const response = await api.get('/accounting/trial-balance');
    return response.data;
  },

  getProfitLoss: async () => {
    const response = await api.get('/accounting/profit-loss');
    return response.data;
  }
};
