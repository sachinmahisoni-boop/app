import { useState, useEffect, useRef } from 'react';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { STORE_INFO } from '@/config/wordpress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Contact info using updated store information
const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      STORE_INFO.address.full,
    ],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      STORE_INFO.phone.primary,
      STORE_INFO.phone.whatsapp ? `WhatsApp: ${STORE_INFO.phone.whatsapp}` : '',
    ].filter(Boolean),
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      STORE_INFO.email.support,
    ],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: [
      'Mon - Sat: 10:00 AM - 7:00 PM',
      'Sunday: Closed',
    ],
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    details: [
      `+${STORE_INFO.phone.whatsapp}`,
      'Message us anytime!',
    ],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          x: -40,
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
        infoRef.current,
        {
          opacity: 0,
          x: 40,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or need guidance? We're here to help you on your
            spiritual journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-purple-50/50 rounded-3xl p-8 lg:p-10"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h3>

                <div className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 mb-2 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 mb-2 block">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      rows={4}
                      className="bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-purple text-white rounded-xl hover:shadow-glow transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={`tel:${STORE_INFO.phone.primary}`}
                className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${STORE_INFO.phone.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`mailto:${STORE_INFO.email.support}`}
                className="flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
