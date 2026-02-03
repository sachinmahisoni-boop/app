const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============ PRODUCT API ============

export const ProductAPI = {
  getAll: (params?: { category?: string; search?: string; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    return fetchAPI<any[]>(`/products?${queryParams.toString()}`);
  },

  getById: (id: string) => fetchAPI<any>(`/products/${id}`),

  create: (product: any) =>
    fetchAPI<any>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  update: (id: string, updates: any) =>
    fetchAPI<any>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  delete: (id: string) =>
    fetchAPI<void>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// ============ CATEGORY API ============

export const CategoryAPI = {
  getAll: () => fetchAPI<any[]>('/categories'),
  getById: (id: string) => fetchAPI<any>(`/categories/${id}`),
};

// ============ CART API ============

export const CartAPI = {
  getBySession: (sessionId: string) =>
    fetchAPI<any[]>(`/cart/${sessionId}`),

  addItem: (sessionId: string, productId: string, quantity: number = 1) =>
    fetchAPI<any[]>('/cart', {
      method: 'POST',
      body: JSON.stringify({ sessionId, productId, quantity }),
    }),

  updateQuantity: (itemId: string, quantity: number) =>
    fetchAPI<any[]>(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),

  removeItem: (itemId: string) =>
    fetchAPI<void>(`/cart/${itemId}`, {
      method: 'DELETE',
    }),

  clearSession: (sessionId: string) =>
    fetchAPI<void>(`/cart/session/${sessionId}`, {
      method: 'DELETE',
    }),
};

// ============ ORDER API ============

export const OrderAPI = {
  getAll: () => fetchAPI<any[]>('/orders'),
  getById: (id: string) => fetchAPI<any>(`/orders/${id}`),

  create: (order: {
    customerId: string;
    items: any[];
    total: number;
    shipping: any;
    payment: any;
  }) =>
    fetchAPI<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),

  updateStatus: (id: string, status: string) =>
    fetchAPI<any>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ============ CUSTOMER API ============

export const CustomerAPI = {
  getAll: () => fetchAPI<any[]>('/customers'),
  getById: (id: string) => fetchAPI<any>(`/customers/${id}`),

  create: (customer: {
    name: string;
    email: string;
    phone?: string;
    address?: any;
  }) =>
    fetchAPI<any>('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    }),

  update: (id: string, updates: any) =>
    fetchAPI<any>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

// ============ HEALTH CHECK ============

export const HealthAPI = {
  check: () => fetchAPI<{ message: string; timestamp: string; version: string }>('/health'),
};

export default {
  ProductAPI,
  CategoryAPI,
  CartAPI,
  OrderAPI,
  CustomerAPI,
  HealthAPI,
};
