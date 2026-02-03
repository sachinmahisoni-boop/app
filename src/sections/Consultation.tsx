import { useEffect, useRef } from 'react';
import { ArrowRight, Check, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Personalized life path analysis',
  'Career and relationship guidance',
  'Lucky numbers and dates',
  'Name correction suggestions',
  'Yearly forecast report',
];

export default function Consultation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            Consultation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get <span className="text-gradient">Personalized Guidance</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Book a Consultation with Our Expert Numerologist
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Discover the hidden patterns in your life through the ancient science
              of numerology. Our experienced practitioners provide personalized
              readings that can help you understand your life path, make better
              decisions, and unlock your true potential.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-purple-50 rounded-2xl p-6 mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-4xl font-bold text-purple-600">
                  ₹1,999
                </span>
                <span className="text-gray-500 line-through">₹2,499</span>
              </div>
              <p className="text-gray-600 text-sm">
                Complete numerology report + 30-min consultation call
              </p>
            </div>

            <Button
              size="lg"
              className="gradient-purple text-white px-8 rounded-full hover:shadow-glow transition-all duration-300 group"
              onClick={scrollToContact}
            >
              Book Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/consultation-image.jpg"
                alt="Numerology consultation"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
            </div>

            {/* Contact Cards */}
            <div className="absolute -bottom-4 -left-4 right-4 flex flex-col gap-3">
              <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Flexible Timing</div>
                  <div className="text-sm text-gray-600">Book at your convenience</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Call or Video</div>
                  <div className="text-sm text-gray-600">Choose your preferred mode</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-200 rounded-full blur-2xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
