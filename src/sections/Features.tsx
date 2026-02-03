import { useEffect, useRef } from 'react';
import { ShieldCheck, Users, Zap, Lock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: '1',
    title: 'Authentic Products',
    description: '100% genuine Rudraksha and gemstones, certified and blessed',
    icon: ShieldCheck,
  },
  {
    id: '2',
    title: 'Expert Guidance',
    description: 'Personalized numerology consultations with experienced practitioners',
    icon: Users,
  },
  {
    id: '3',
    title: 'Energized Items',
    description: 'All products are spiritually activated for maximum benefit',
    icon: Zap,
  },
  {
    id: '4',
    title: 'Secure Shopping',
    description: 'Safe payment options and fast, reliable delivery',
    icon: Lock,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-gradient">Kteena?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We combine ancient wisdom with modern convenience to bring you the
            finest spiritual products and guidance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                style={{ perspective: '1000px' }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl gradient-purple flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
