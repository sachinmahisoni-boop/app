import { Facebook, Instagram, Twitter, Youtube, Heart, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '@/config/wordpress';

const footerLinks = {
  shop: [
    { label: 'Rudraksha', href: '#products' },
    { label: 'Gemstones', href: '#products' },
    { label: 'Jewelry', href: '#products' },
    { label: 'Numerology', href: '#products' },
  ],
  support: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Track Order', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: STORE_INFO.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: STORE_INFO.social.instagram, label: 'Instagram' },
  { icon: Twitter, href: STORE_INFO.social.twitter, label: 'Twitter' },
  { icon: Youtube, href: STORE_INFO.social.youtube, label: 'YouTube' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">
                    K
                  </span>
                </div>
                <span className="font-display font-semibold text-2xl">
                  Kteena
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                Your trusted destination for authentic spiritual products.
                Bringing ancient wisdom and positive energy into your life since
                2014.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{STORE_INFO.address.full}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <a href={`tel:${STORE_INFO.phone.primary}`} className="text-sm hover:text-white transition-colors">
                    {STORE_INFO.phone.primary}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <a href={`mailto:${STORE_INFO.email.support}`} className="text-sm hover:text-white transition-colors">
                    {STORE_INFO.email.support}
                  </a>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-purple-500 group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-purple-500 group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-purple-500 group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Kteena. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={`https://wa.me/${STORE_INFO.phone.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <span className="text-gray-600">|</span>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for
                spiritual seekers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
