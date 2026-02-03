import { useEffect, useRef } from 'react';
import { ArrowRight, Award, Heart, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every product is crafted with care and positive intentions',
  },
  {
    icon: Award,
    title: 'Certified Quality',
    description: 'All gemstones come with authenticity certificates',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'Ethically sourced materials and eco-friendly packaging',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: -60,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-gradient">Kteena</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/about-image.jpg"
                alt="Spiritual bracelet"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-w-[200px]">
              <div className="text-4xl font-display font-bold text-purple-600 mb-1">
                10+
              </div>
              <div className="text-gray-600 text-sm">Years of Experience</div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-60" />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Your Trusted Destination for Authentic Spiritual Products
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              For over a decade, Kteena has been dedicated to bringing you the
              finest collection of energized Rudraksha beads, authentic gemstones,
              and spiritual jewelry. Our journey began with a simple mission: to
              make ancient spiritual wisdom accessible to everyone.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Each product in our collection is carefully sourced, certified for
              authenticity, and blessed by experienced practitioners. We believe
              that spiritual wellness should be a harmonious blend of tradition
              and trust.
            </p>

            {/* Values */}
            <div className="space-y-4 mb-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              size="lg"
              className="gradient-purple text-white px-8 rounded-full hover:shadow-glow transition-all duration-300 group"
            >
              Read Our Story
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
