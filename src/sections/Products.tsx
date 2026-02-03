import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Sparkles, Gem, Heart, CircleDot, Calculator, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { categories, gemstoneCategories, rudrakshaCategories } from '@/data/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ProductAPI } from '@/services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  CircleDot,
  Gem,
  Heart,
  Calculator,
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [, setActiveSubCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const gemRef = useRef<HTMLDivElement>(null);
  const rudraRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await ProductAPI.getAll(
          activeCategory === 'all' ? undefined : { category: activeCategory }
        );
        if (result.success && result.data) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          }
        );
      });

      // Gemstone categories animation
      if (gemRef.current) {
        gsap.fromTo(
          gemRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gemRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Rudraksha categories animation
      if (rudraRef.current) {
        gsap.fromTo(
          rudraRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rudraRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-b from-white to-purple-50/50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            Our Collection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover Our <span className="text-gradient">Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked spiritual items, energized and blessed for your journey.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveSubCategory(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'gradient-purple text-white shadow-hover'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Gemstone Categories Section */}
        {(activeCategory === 'all' || activeCategory === 'gemstones') && (
          <div ref={gemRef} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-2xl font-bold text-gray-900">
                <span className="text-gradient">Gemstones</span> Collection
              </h3>
              <a href="#" className="text-purple-600 font-medium flex items-center gap-1 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {gemstoneCategories.map((gem) => (
                <div
                  key={gem.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={gem.image}
                      alt={gem.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-purple-600 transition-colors">
                      {gem.name}
                    </h4>
                    <p className="text-gray-500 text-xs mb-2 line-clamp-2">{gem.description}</p>
                    <p className="text-purple-600 font-semibold text-sm">{gem.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rudraksha Categories Section */}
        {(activeCategory === 'all' || activeCategory === 'rudraksha') && (
          <div ref={rudraRef} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-2xl font-bold text-gray-900">
                <span className="text-gradient">Rudraksha</span> Collection
              </h3>
              <a href="#" className="text-purple-600 font-medium flex items-center gap-1 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
              {rudrakshaCategories.map((rudra) => (
                <div
                  key={rudra.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={rudra.image}
                      alt={rudra.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-purple-600 transition-colors">
                      {rudra.name}
                    </h4>
                    <p className="text-gray-500 text-xs mb-2 line-clamp-2">{rudra.description}</p>
                    <p className="text-purple-600 font-semibold text-sm">{rudra.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Products Grid */}
        <div>
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-8">
            {activeCategory === 'all' ? 'Featured Products' : `${categories.find(c => c.id === activeCategory)?.name} Products`}
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 gradient-purple text-white border-0">
                        {product.badge}
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </Badge>
                    )}

                    {/* Quick Add Button */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full gradient-purple text-white rounded-xl hover:shadow-glow transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.reviews || 0})
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl font-bold text-purple-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
