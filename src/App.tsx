import { useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Products from '@/sections/Products';
import About from '@/sections/About';
import Testimonials from '@/sections/Testimonials';
import Consultation from '@/sections/Consultation';
import FAQ from '@/sections/FAQ';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import CartDrawer from '@/sections/CartDrawer';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Hero />
          <Features />
          <Products />
          <About />
          <Testimonials />
          <Consultation />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
