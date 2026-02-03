import type { Product, Testimonial, FAQ } from '@/types';

// Main Featured Products
export const products: Product[] = [
  {
    id: '1',
    name: '5 Mukhi Rudraksha Bracelet',
    description: 'Authentic Nepalese Rudraksha beads, spiritually energized for peace and prosperity. Each bead is hand-selected and blessed.',
    price: 1299,
    originalPrice: 1599,
    image: '/product-rudraksha.jpg',
    category: 'rudraksha',
    rating: 4.9,
    reviews: 128,
    inStock: true,
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Blue Sapphire (Neelam)',
    description: 'Premium quality natural Blue Sapphire gemstone, certified and energized. Brings clarity, focus, and spiritual growth.',
    price: 5999,
    originalPrice: 7499,
    image: '/product-sapphire.jpg',
    category: 'gemstones',
    rating: 4.8,
    reviews: 86,
    inStock: true,
    badge: 'Premium',
  },
  {
    id: '3',
    name: 'Rose Quartz Heart Pendant',
    description: 'Beautiful heart-shaped Rose Quartz crystal set in sterling silver. Promotes love, compassion, and emotional healing.',
    price: 2499,
    originalPrice: 2999,
    image: '/product-rosequartz.jpg',
    category: 'jewelry',
    rating: 4.7,
    reviews: 94,
    inStock: true,
  },
  {
    id: '4',
    name: 'Complete Numerology Report',
    description: 'Personalized numerology reading by expert numerologists. Discover your life path, destiny number, and spiritual guidance.',
    price: 1999,
    originalPrice: 2499,
    image: '/product-numerology.jpg',
    category: 'numerology',
    rating: 5.0,
    reviews: 156,
    inStock: true,
    badge: 'Popular',
  },
  {
    id: '5',
    name: 'Bridal Necklace Set',
    description: 'Exquisite bridal necklace with matching earrings and rings. Perfect for weddings and special occasions.',
    price: 24999,
    originalPrice: 29999,
    image: '/product-bridal-set.jpg',
    category: 'jewelry',
    rating: 4.9,
    reviews: 72,
    inStock: true,
    badge: 'New Arrival',
  },
  {
    id: '6',
    name: 'Designer Gold Necklace',
    description: 'Elegant floral design necklace with diamonds and pearls. A timeless piece for any occasion.',
    price: 8999,
    originalPrice: 10999,
    image: '/product-necklace.jpg',
    category: 'jewelry',
    rating: 4.8,
    reviews: 45,
    inStock: true,
  },
  {
    id: '7',
    name: 'Diamond Chandelier Earrings',
    description: 'Stunning diamond-studded chandelier earrings. Adds elegance and sparkle to any outfit.',
    price: 5999,
    originalPrice: 7499,
    image: '/product-earrings.jpg',
    category: 'jewelry',
    rating: 4.9,
    reviews: 38,
    inStock: true,
  },
  {
    id: '8',
    name: 'Pear Diamond Ring Set',
    description: 'Beautiful pear-shaped diamond ring with matching bands. Symbol of eternal love.',
    price: 12999,
    originalPrice: 15999,
    image: '/product-rings.jpg',
    category: 'jewelry',
    rating: 4.8,
    reviews: 52,
    inStock: true,
  },
];

// Gemstone Categories
export const gemstoneCategories = [
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire (Neelam)',
    description: 'For Saturn, brings prosperity and protection',
    image: '/gem-blue-sapphire.jpg',
    price: '₹5,999 onwards',
  },
  {
    id: 'ruby',
    name: 'Ruby (Manik)',
    description: 'For Sun, brings power and confidence',
    image: '/gem-ruby.jpg',
    price: '₹8,999 onwards',
  },
  {
    id: 'emerald',
    name: 'Emerald (Panna)',
    description: 'For Mercury, brings wisdom and success',
    image: '/gem-emerald.jpg',
    price: '₹6,499 onwards',
  },
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire (Pukhraj)',
    description: 'For Jupiter, brings wealth and fortune',
    image: '/gem-yellow-sapphire.jpg',
    price: '₹4,999 onwards',
  },
  {
    id: 'coral',
    name: 'Red Coral (Moonga)',
    description: 'For Mars, brings courage and energy',
    image: '/gem-coral.jpg',
    price: '₹2,999 onwards',
  },
  {
    id: 'pearl',
    name: 'Pearl (Moti)',
    description: 'For Moon, brings peace and calmness',
    image: '/gem-pearl.jpg',
    price: '₹1,999 onwards',
  },
  {
    id: 'catseye',
    name: "Cat's Eye (Lehsuniya)",
    description: 'For Ketu, brings protection and spirituality',
    image: '/gem-catseye.jpg',
    price: '₹3,499 onwards',
  },
  {
    id: 'hessonite',
    name: 'Hessonite (Gomed)',
    description: 'For Rahu, brings clarity and success',
    image: '/gem-hessonite.jpg',
    price: '₹2,499 onwards',
  },
  {
    id: 'opal',
    name: 'Opal',
    description: 'For Venus, brings love and creativity',
    image: '/gem-opal.jpg',
    price: '₹3,999 onwards',
  },
];

// Rudraksha Categories
export const rudrakshaCategories = [
  {
    id: '1-mukhi',
    name: '1 Mukhi Rudraksha',
    description: 'Lord Shiva himself, ultimate spiritual growth',
    image: '/rudra-1mukhi.jpg',
    price: '₹15,999 onwards',
  },
  {
    id: '3-mukhi',
    name: '3 Mukhi Rudraksha',
    description: 'Lord Agni, burns past karma, boosts confidence',
    image: '/rudra-3mukhi.jpg',
    price: '₹999 onwards',
  },
  {
    id: '5-mukhi',
    name: '5 Mukhi Rudraksha',
    description: 'Lord Kalagni, health, peace, and prosperity',
    image: '/rudra-5mukhi.jpg',
    price: '₹1,299 onwards',
  },
  {
    id: '7-mukhi',
    name: '7 Mukhi Rudraksha',
    description: 'Goddess Lakshmi, wealth and abundance',
    image: '/rudra-7mukhi.jpg',
    price: '₹2,499 onwards',
  },
  {
    id: '9-mukhi',
    name: '9 Mukhi Rudraksha',
    description: 'Goddess Durga, power and protection',
    image: '/rudra-9mukhi.jpg',
    price: '₹3,999 onwards',
  },
  {
    id: '11-mukhi',
    name: '11 Mukhi Rudraksha',
    description: 'Lord Hanuman, strength and courage',
    image: '/rudra-11mukhi.jpg',
    price: '₹5,499 onwards',
  },
];

// Jewelry Categories
export const jewelryCategories = [
  { id: 'necklaces', name: 'Necklaces', image: '/product-necklace.jpg' },
  { id: 'earrings', name: 'Earrings', image: '/product-earrings.jpg' },
  { id: 'rings', name: 'Rings', image: '/product-rings.jpg' },
  { id: 'bridal', name: 'Bridal Sets', image: '/product-bridal-set.jpg' },
  { id: 'bracelets', name: 'Bracelets', image: '/product-rudraksha.jpg' },
  { id: 'pendants', name: 'Pendants', image: '/product-rosequartz.jpg' },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Mehta',
    avatar: '/avatar-1.jpg',
    rating: 5,
    text: 'The Rudraksha bracelet transformed my meditation practice. I feel more centered and peaceful since I started wearing it. The quality is exceptional!',
    date: '2 weeks ago',
  },
  {
    id: '2',
    name: 'Rahul Kapoor',
    avatar: '/avatar-2.jpg',
    rating: 5,
    text: 'The numerology reading was incredibly accurate and insightful. It helped me understand my life path and make better decisions. Highly recommend!',
    date: '1 month ago',
  },
  {
    id: '3',
    name: 'Ananya Sharma',
    avatar: '/avatar-3.jpg',
    rating: 5,
    text: 'Beautiful, authentic gemstones with amazing energy. The packaging was elegant and the customer service was outstanding. Will definitely order again!',
    date: '3 weeks ago',
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I know your Rudraksha beads are authentic?',
    answer: 'All our Rudraksha beads are sourced directly from Nepal and come with a certificate of authenticity. Each bead undergoes rigorous quality checks and is blessed by experienced priests before shipping.',
  },
  {
    id: '2',
    question: 'What is the process for numerology consultation?',
    answer: 'After booking, you will receive a detailed questionnaire. Our expert numerologists analyze your birth date and name to create a comprehensive report covering life path, destiny, and personalized guidance.',
  },
  {
    id: '3',
    question: 'How should I cleanse and energize my gemstones?',
    answer: 'We provide detailed care instructions with each purchase. Generally, you can cleanse gemstones by placing them under moonlight, using sage smoke, or rinsing with clean water (for water-safe stones).',
  },
  {
    id: '4',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for unused items in original packaging. For energized products, returns are accepted only if the seal is unbroken.',
  },
  {
    id: '5',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship worldwide! International orders typically arrive within 10-15 business days. Free shipping is available for orders above ₹2000 within India.',
  },
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'rudraksha', name: 'Rudraksha', icon: 'CircleDot' },
  { id: 'gemstones', name: 'Gemstones', icon: 'Gem' },
  { id: 'jewelry', name: 'Jewelry', icon: 'Heart' },
  { id: 'numerology', name: 'Numerology', icon: 'Calculator' },
] as const;

export const features = [
  {
    id: '1',
    title: 'Authentic Products',
    description: '100% genuine Rudraksha and gemstones, certified and blessed',
    icon: 'ShieldCheck',
  },
  {
    id: '2',
    title: 'Expert Guidance',
    description: 'Personalized numerology consultations with experienced practitioners',
    icon: 'Users',
  },
  {
    id: '3',
    title: 'Energized Items',
    description: 'All products are spiritually activated for maximum benefit',
    icon: 'Zap',
  },
  {
    id: '4',
    title: 'Secure Shopping',
    description: 'Safe payment options and fast, reliable delivery',
    icon: 'Lock',
  },
];
