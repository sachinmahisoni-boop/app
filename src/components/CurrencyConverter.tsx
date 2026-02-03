import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { CURRENCY_CONFIG } from '@/config/wordpress';
import { CurrencyAPI } from '@/services/woocommerce';

interface CurrencyConverterProps {
  amount: number;
  showSelector?: boolean;
  className?: string;
}

export default function CurrencyConverter({ 
  amount, 
  showSelector = true,
  className = '' 
}: CurrencyConverterProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved currency
  useEffect(() => {
    const saved = localStorage.getItem('kteena_selected_currency');
    if (saved && CURRENCY_CONFIG.supportedCurrencies.find(c => c.code === saved)) {
      setSelectedCurrency(saved);
    }
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      const result = await CurrencyAPI.getRates('INR');
      if (result.success && result.data) {
        setExchangeRates(result.data.rates);
      }
      setLoading(false);
    };

    fetchRates();
  }, []);

  // Save currency selection
  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    localStorage.setItem('kteena_selected_currency', currency);
    setIsOpen(false);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: currency }));
  };

  // Convert amount
  const convertedAmount = selectedCurrency === 'INR' 
    ? amount 
    : Math.round(amount * (exchangeRates[selectedCurrency] || 1));

  // Format currency
  const formatCurrency = (value: number, code: string) => {
    const formatter = new Intl.NumberFormat(
      code === 'INR' ? 'en-IN' : 'en-US',
      {
        style: 'currency',
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    );
    return formatter.format(value);
  };

  const selectedCurrencyInfo = CURRENCY_CONFIG.supportedCurrencies.find(
    c => c.code === selectedCurrency
  );

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="font-semibold text-purple-600">
        {formatCurrency(convertedAmount, selectedCurrency)}
      </span>
      
      {showSelector && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={loading}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {selectedCurrencyInfo?.flag}
            {selectedCurrency}
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-1 max-h-60 overflow-y-auto">
                {CURRENCY_CONFIG.supportedCurrencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-purple-50 transition-colors ${
                      selectedCurrency === currency.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{currency.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{currency.code}</div>
                      <div className="text-xs text-gray-500">{currency.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Global Currency Provider Hook
export function useGlobalCurrency() {
  const [currency, setCurrency] = useState<string>('INR');
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load saved currency
    const saved = localStorage.getItem('kteena_selected_currency');
    if (saved) setCurrency(saved);

    // Fetch rates
    CurrencyAPI.getRates('INR').then(result => {
      if (result.success && result.data) {
        setRates(result.data.rates);
      }
    });

    // Listen for currency changes
    const handleChange = (e: CustomEvent<string>) => {
      setCurrency(e.detail);
    };
    
    window.addEventListener('currencyChange', handleChange as EventListener);
    return () => window.removeEventListener('currencyChange', handleChange as EventListener);
  }, []);

  const convert = (amount: number) => {
    if (currency === 'INR') return amount;
    return Math.round(amount * (rates[currency] || 1));
  };

  const format = (amount: number) => {
    const converted = convert(amount);
    
    return new Intl.NumberFormat(
      currency === 'INR' ? 'en-IN' : 'en-US',
      {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    ).format(converted);
  };

  return { currency, convert, format, rates };
}
