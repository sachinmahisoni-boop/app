import { useState, useEffect, useCallback } from 'react';
import { CURRENCY_CONFIG } from '@/config/wordpress';
import { CurrencyAPI } from '@/services/woocommerce';

// Storage key for selected currency
const CURRENCY_STORAGE_KEY = 'kteena_selected_currency';

// Get saved currency or default
function getSavedCurrency(): string {
  if (typeof window === 'undefined') return CURRENCY_CONFIG.defaultCurrency;
  return localStorage.getItem(CURRENCY_STORAGE_KEY) || CURRENCY_CONFIG.defaultCurrency;
}

// Save selected currency
function saveCurrency(currency: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }
}

// Format currency
export function formatCurrency(amount: number, currencyCode: string = 'INR'): string {
  const formatter = new Intl.NumberFormat(
    currencyCode === 'INR' ? 'en-IN' : 'en-US',
    {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  );
  
  return formatter.format(amount);
}

// Convert and format
export function useCurrency() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>(getSavedCurrency());
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  // Fetch exchange rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const result = await CurrencyAPI.getRates('INR');
        if (result.success && result.data) {
          setExchangeRates(result.data.rates);
        }
      } catch (err) {
        console.error('Failed to fetch exchange rates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Convert amount from INR to selected currency
  const convert = useCallback((amountInINR: number): number => {
    if (selectedCurrency === 'INR') return amountInINR;
    
    const rate = exchangeRates[selectedCurrency];
    if (!rate) return amountInINR;
    
    return Math.round(amountInINR * rate);
  }, [selectedCurrency, exchangeRates]);

  // Format converted amount
  const format = useCallback((amountInINR: number): string => {
    const converted = convert(amountInINR);
    return formatCurrency(converted, selectedCurrency);
  }, [convert, selectedCurrency]);

  // Change currency
  const setCurrency = useCallback((currency: string) => {
    if (CURRENCY_CONFIG.supportedCurrencies.find(c => c.code === currency)) {
      setSelectedCurrency(currency);
      saveCurrency(currency);
    }
  }, []);

  // Get currency info
  const currencyInfo = CURRENCY_CONFIG.supportedCurrencies.find(
    c => c.code === selectedCurrency
  );

  return {
    selectedCurrency,
    setCurrency,
    convert,
    format,
    currencyInfo,
    exchangeRates,
    loading,
    supportedCurrencies: CURRENCY_CONFIG.supportedCurrencies,
  };
}

export default useCurrency;
