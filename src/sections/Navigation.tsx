import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, ChevronDown, CircleDot, Gem, Heart, Calculator, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import CurrencyConverter from '@/components/CurrencyConverter';

const productCategories = [
  { label: 'All Products', href: '#products', icon: Sparkles },
  { label: 'Rudraksha', href: '#products', icon: CircleDot },
  { label: 'Gemstones', href: '#products', icon: Gem },
  { label: 'Jewelry', href: '#products', icon: Heart },
  { label: 'Numerology', href: '#products', icon: Calculator },
];

const rudrakshaTypes = [
  { label: '1 Mukhi', href: '#products' },
  { label: '3 Mukhi', href: '#products' },
  { label: '5 Mukhi', href: '#products' },
  { label: '7 Mukhi', href: '#products' },
  { label: '9 Mukhi', href: '#products' },
  { label: '11 Mukhi', href: '#products' },
];

const gemstoneTypes = [
  { label: 'Blue Sapphire', href: '#products' },
  { label: 'Ruby', href: '#products' },
  { label: 'Emerald', href: '#products' },
  { label: 'Yellow Sapphire', href: '#products' },
  { label: 'Coral', href: '#products' },
  { label: 'Pearl', href: '#products' },
  { label: 'Cat\'s Eye', href: '#products' },
  { label: 'Hessonite', href: '#products' },
];

const navLinks = [
  { label: 'Home', href: '#home', hasDropdown: false },
  { label: 'Products', href: '#products', hasDropdown: true },
  { label: 'About', href: '#about', hasDropdown: false },
  { label: 'Testimonials', href: '#testimonials', hasDropdown: false },
  { label: 'FAQ', href: '#faq', hasDropdown: false },
  { label: 'Contact', href: '#contact', hasDropdown: false },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-display font-bold text-lg">K</span>
            </div>
            <span
              className={`font-display font-semibold text-xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Kteena
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <DropdownMenu key={link.href} open={isProductsOpen} onOpenChange={setIsProductsOpen}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-sm font-medium transition-all duration-300 hover:text-purple-500 relative group flex items-center gap-1 ${
                        isScrolled ? 'text-gray-700' : 'text-white/90'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-96 bg-white/95 backdrop-blur-lg border border-gray-100 shadow-lg rounded-xl p-0 overflow-hidden">
                    {/* Main Categories */}
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Categories</p>
                      <div className="grid grid-cols-2 gap-1">
                        {productCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <DropdownMenuItem
                              key={category.label}
                              onClick={() => scrollToSection(category.href)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-gray-700 font-medium text-sm">{category.label}</span>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator className="bg-gray-100" />
                    
                    {/* Gemstones Submenu */}
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Gemstones</p>
                      <div className="grid grid-cols-2 gap-1">
                        {gemstoneTypes.map((gem) => (
                          <DropdownMenuItem
                            key={gem.label}
                            onClick={() => scrollToSection(gem.href)}
                            className="px-3 py-1.5 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors text-sm text-gray-600"
                          >
                            {gem.label}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator className="bg-gray-100" />
                    
                    {/* Rudraksha Submenu */}
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Rudraksha</p>
                      <div className="flex flex-wrap gap-2">
                        {rudrakshaTypes.map((rudra) => (
                          <DropdownMenuItem
                            key={rudra.label}
                            onClick={() => scrollToSection(rudra.href)}
                            className="px-3 py-1.5 rounded-full cursor-pointer hover:bg-purple-50 transition-colors text-sm text-gray-600 border border-gray-200"
                          >
                            {rudra.label}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium transition-all duration-300 hover:text-purple-500 relative group ${
                    isScrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
                </a>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Currency Converter - Desktop Only */}
            <div className="hidden lg:block">
              <CurrencyConverter amount={1000} showSelector={true} />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className={`relative transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-700 hover:text-purple-600'
                  : 'text-white hover:text-white/80'
              }`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-purple-600'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white overflow-y-auto">
                <div className="flex flex-col gap-6 mt-8">
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#home');
                    }}
                    className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300"
                  >
                    Home
                  </a>
                  
                  {/* Products Section in Mobile */}
                  <div className="space-y-4">
                    <span className="text-lg font-medium text-gray-700">Products</span>
                    
                    {/* Main Categories */}
                    <div className="pl-4 space-y-2 border-l-2 border-purple-100">
                      {productCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <a
                            key={category.label}
                            href={category.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(category.href);
                            }}
                            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
                          >
                            <Icon className="w-4 h-4" />
                            {category.label}
                          </a>
                        );
                      })}
                    </div>
                    
                    {/* Gemstones */}
                    <div className="pl-4">
                      <p className="text-sm font-semibold text-gray-500 mb-2">Gemstones</p>
                      <div className="flex flex-wrap gap-2">
                        {gemstoneTypes.map((gem) => (
                          <span
                            key={gem.label}
                            className="px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded-full"
                          >
                            {gem.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Rudraksha */}
                    <div className="pl-4">
                      <p className="text-sm font-semibold text-gray-500 mb-2">Rudraksha</p>
                      <div className="flex flex-wrap gap-2">
                        {rudrakshaTypes.map((rudra) => (
                          <span
                            key={rudra.label}
                            className="px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded-full"
                          >
                            {rudra.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {navLinks.filter(link => !link.hasDropdown).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
