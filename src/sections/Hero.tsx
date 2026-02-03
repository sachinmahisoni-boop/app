import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set(subheadingRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonsRef.current, { opacity: 0, scale: 0.8 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          subheadingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 5, y: y * 5 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Spiritual crystals"
          className="w-full h-full object-cover scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span className="text-white/90 text-sm font-medium">
            Authentic Spiritual Products
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Discover the Power of{' '}
          <span className="text-gradient bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Spiritual Healing
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light"
        >
          Explore our collection of energized Rudraksha, gemstones, and spiritual
          products designed to bring peace, prosperity, and positive energy into
          your life.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="gradient-purple text-white px-8 py-6 text-lg font-medium rounded-full hover:shadow-glow transition-all duration-300 hover:scale-105 group"
            onClick={() => scrollToSection('#products')}
          >
            Shop Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 px-8 py-6 text-lg font-medium rounded-full hover:bg-white/20 transition-all duration-300"
            onClick={() => scrollToSection('#contact')}
          >
            Book Consultation
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '10K+', label: 'Happy Customers' },
            { value: '500+', label: 'Products' },
            { value: '4.9', label: 'Rating' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
