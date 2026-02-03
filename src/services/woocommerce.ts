import { WP_CONFIG, STORE_INFO, CURRENCY_CONFIG } from '@/config/wordpress';

// WordPress WooCommerce API Service
const BASE_URL = WP_CONFIG.baseURL;

// Helper to build API URL with authentication
function buildURL(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // Add WooCommerce authentication
  if (WP_CONFIG.consumerKey) {
    url.searchParams.append('consumer_key', WP_CONFIG.consumerKey);
    url.searchParams.append('consumer_secret', WP_CONFIG.consumerSecret);
  }
  
  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}

// Generic fetch function
async function fetchWP<T>(url: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('WooCommerce API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============ WOOCOMMERCE PRODUCT API ============

export const WCProductAPI = {
  // Get all products
  getAll: async (params: {
    per_page?: string;
    category?: string;
    search?: string;
    orderby?: string;
    order?: string;
    page?: string;
  } = {}) => {
    const url = buildURL(WP_CONFIG.endpoints.products, params);
    return fetchWP<any[]>(url);
  },

  // Get product by ID
  getById: async (id: number | string) => {
    const url = buildURL(`${WP_CONFIG.endpoints.products}/${id}`);
    return fetchWP<any>(url);
  },

  // Get products by category
  getByCategory: async (categoryId: number, perPage: number = 10) => {
    const url = buildURL(WP_CONFIG.endpoints.products, {
      category: categoryId.toString(),
      per_page: perPage.toString(),
    });
    return fetchWP<any[]>(url);
  },

  // Search products
  search: async (query: string) => {
    const url = buildURL(WP_CONFIG.endpoints.products, {
      search: query,
      per_page: '20',
    });
    return fetchWP<any[]>(url);
  },

  // Get featured products
  getFeatured: async (perPage: number = 8) => {
    const url = buildURL(WP_CONFIG.endpoints.products, {
      featured: 'true',
      per_page: perPage.toString(),
    });
    return fetchWP<any[]>(url);
  },

  // Get on-sale products
  getOnSale: async (perPage: number = 8) => {
    const url = buildURL(WP_CONFIG.endpoints.products, {
      on_sale: 'true',
      per_page: perPage.toString(),
    });
    return fetchWP<any[]>(url);
  },
};

// ============ WOOCOMMERCE CATEGORY API ============

export const WCCategoryAPI = {
  // Get all categories
  getAll: async (params: { per_page?: string; parent?: string } = {}) => {
    const url = buildURL(WP_CONFIG.endpoints.categories, {
      per_page: '100',
      ...params,
    });
    return fetchWP<any[]>(url);
  },

  // Get category by ID
  getById: async (id: number) => {
    const url = buildURL(`${WP_CONFIG.endpoints.categories}/${id}`);
    return fetchWP<any>(url);
  },
};

// ============ WOOCOMMERCE ORDER API ============

export const WCOrderAPI = {
  // Create order
  create: async (orderData: {
    payment_method: string;
    payment_method_title: string;
    set_paid: boolean;
    billing: any;
    shipping: any;
    line_items: any[];
    shipping_lines: any[];
    coupon_lines?: any[];
  }) => {
    const url = buildURL(WP_CONFIG.endpoints.orders);
    return fetchWP<any>(url, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Get order by ID
  getById: async (id: number) => {
    const url = buildURL(`${WP_CONFIG.endpoints.orders}/${id}`);
    return fetchWP<any>(url);
  },

  // Update order
  update: async (id: number, updates: any) => {
    const url = buildURL(`${WP_CONFIG.endpoints.orders}/${id}`);
    return fetchWP<any>(url, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// ============ WOOCOMMERCE CUSTOMER API ============

export const WCCustomerAPI = {
  // Create customer
  create: async (customerData: {
    email: string;
    first_name: string;
    last_name: string;
    username?: string;
    password: string;
    billing?: any;
    shipping?: any;
  }) => {
    const url = buildURL(WP_CONFIG.endpoints.customers);
    return fetchWP<any>(url, {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  },

  // Get customer by ID
  getById: async (id: number) => {
    const url = buildURL(`${WP_CONFIG.endpoints.customers}/${id}`);
    return fetchWP<any>(url);
  },

  // Update customer
  update: async (id: number, updates: any) => {
    const url = buildURL(`${WP_CONFIG.endpoints.customers}/${id}`);
    return fetchWP<any>(url, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// ============ WORDPRESS PAGE API ============

export const WPPageAPI = {
  // Get all pages
  getAll: async () => {
    const url = buildURL(WP_CONFIG.wpEndpoints.pages, { per_page: '100' });
    return fetchWP<any[]>(url);
  },

  // Get page by ID
  getById: async (id: number) => {
    const url = buildURL(`${WP_CONFIG.wpEndpoints.pages}/${id}`);
    return fetchWP<any>(url);
  },

  // Get page by slug
  getBySlug: async (slug: string) => {
    const url = buildURL(WP_CONFIG.wpEndpoints.pages, { slug });
    const result = await fetchWP<any[]>(url);
    if (result.success && result.data && result.data.length > 0) {
      return { success: true, data: result.data[0] };
    }
    return { success: false, error: 'Page not found' };
  },
};

// ============ CURRENCY CONVERTER API ============

export const CurrencyAPI = {
  // Get exchange rates
  getRates: async (base: string = 'INR') => {
    try {
      const response = await fetch(`${CURRENCY_CONFIG.baseURL}/${base}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Currency API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Convert amount
  convert: async (amount: number, from: string, to: string) => {
    if (from === to) return { success: true, data: amount };
    
    const result = await CurrencyAPI.getRates(from);
    if (result.success && result.data) {
      const rate = result.data.rates[to];
      if (rate) {
        return { success: true, data: amount * rate };
      }
    }
    return { success: false, error: 'Conversion failed' };
  },
};

// ============ STORE INFO API ============

export const StoreInfoAPI = {
  // Get all store info (this is local, not from WordPress)
  getInfo: () => STORE_INFO,
  
  // Get contact info
  getContact: () => ({
    address: STORE_INFO.address,
    phone: STORE_INFO.phone,
    email: STORE_INFO.email,
    hours: STORE_INFO.hours,
  }),
  
  // Get social links
  getSocial: () => STORE_INFO.social,
  
  // Get currency settings
  getCurrency: () => STORE_INFO.currency,
};

// Export all APIs
export default {
  Product: WCProductAPI,
  Category: WCCategoryAPI,
  Order: WCOrderAPI,
  Customer: WCCustomerAPI,
  Page: WPPageAPI,
  Currency: CurrencyAPI,
  Store: StoreInfoAPI,
};
