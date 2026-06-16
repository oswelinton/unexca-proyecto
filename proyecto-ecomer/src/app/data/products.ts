export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
  badge?: string;
  colors?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Fitbit Sense Advanced Smartwatch',
    category: 'Wearables',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop',
    ],
    description:
      'Advanced health smartwatch with EDA scan, skin temperature sensor, and heart rate tracking. Built-in GPS, 6+ day battery life, and water resistant to 50 meters.',
    specs: [
      { label: 'Display', value: '1.58" AMOLED' },
      { label: 'Battery Life', value: '6+ days' },
      { label: 'Water Resistance', value: '50 meters' },
      { label: 'Connectivity', value: 'Bluetooth 5.0, Wi-Fi' },
    ],
    inStock: true,
    badge: '-33%',
    colors: ['#1a1a2e', '#c4c4c4', '#e8b4b4'],
  },
  {
    id: 2,
    name: 'Apple iPhone 15 Pro Max 256GB',
    category: 'Smartphones',
    price: 1099.0,
    originalPrice: 1199.0,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop',
    ],
    description:
      'iPhone 15 Pro Max with A17 Pro chip, titanium design, 48MP camera system, and Action button. The most powerful iPhone ever.',
    specs: [
      { label: 'Chip', value: 'A17 Pro' },
      { label: 'Display', value: '6.7" Super Retina XDR' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra Wide' },
      { label: 'Storage', value: '256GB' },
    ],
    inStock: true,
    badge: 'New',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Audio',
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviewCount: 256,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    ],
    description:
      'Industry-leading noise canceling with Auto NC Optimizer. Exceptional sound quality with 30mm drivers and DSEE Extreme upscaling.',
    specs: [
      { label: 'Driver Size', value: '30mm' },
      { label: 'Battery Life', value: '30 hours' },
      { label: 'Noise Canceling', value: 'Industry-leading ANC' },
      { label: 'Weight', value: '250g' },
    ],
    inStock: true,
    badge: '-30%',
    colors: ['#1a1a2e', '#c4c4c4'],
  },
  {
    id: 4,
    name: 'MacBook Pro 16" M3 Pro',
    category: 'Laptops',
    price: 2499.0,
    originalPrice: 2499.0,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop',
    ],
    description:
      'Supercharged by M3 Pro chip. Up to 18 hours battery life. Liquid Retina XDR display. Pro performance with incredible efficiency.',
    specs: [
      { label: 'Chip', value: 'Apple M3 Pro' },
      { label: 'RAM', value: '18GB Unified Memory' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '16.2" Liquid Retina XDR' },
    ],
    inStock: true,
  },
  {
    id: 5,
    name: 'Samsung Galaxy Tab S9 Ultra',
    category: 'Tablets',
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.6,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1561154464-82e9aab73f26?w=600&h=600&fit=crop',
    ],
    description:
      'The biggest Galaxy Tab display ever. 14.6" Dynamic AMOLED 2X. Snapdragon 8 Gen 2. IP68 water and dust resistance.',
    specs: [
      { label: 'Display', value: '14.6" Dynamic AMOLED 2X' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 2' },
      { label: 'RAM', value: '12GB' },
      { label: 'Battery', value: '11,200 mAh' },
    ],
    inStock: true,
    badge: '-25%',
  },
  {
    id: 6,
    name: 'DJI Mini 4 Pro Drone',
    category: 'Drones',
    price: 759.0,
    originalPrice: 959.0,
    rating: 4.5,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&h=600&fit=crop',
    ],
    description:
      'Under 249g. 4K/60fps HDR video. Omnidirectional obstacle sensing. 34-min max flight time. ActiveTrack 360°.',
    specs: [
      { label: 'Weight', value: '< 249g' },
      { label: 'Video', value: '4K/60fps HDR' },
      { label: 'Flight Time', value: '34 min' },
      { label: 'Range', value: '20 km' },
    ],
    inStock: true,
    badge: '-21%',
  },
  {
    id: 7,
    name: 'Canon EOS R6 Mark II Camera',
    category: 'Cameras',
    price: 2299.0,
    originalPrice: 2499.0,
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600&h=600&fit=crop',
    ],
    description:
      '24.2MP Full-Frame CMOS Sensor. 4K 60p video. Up to 40 fps continuous shooting. Dual Pixel CMOS AF II.',
    specs: [
      { label: 'Sensor', value: '24.2MP Full-Frame CMOS' },
      { label: 'Video', value: '4K 60p / 6K RAW' },
      { label: 'AF Points', value: '1,053' },
      { label: 'ISO Range', value: '100-102,400' },
    ],
    inStock: true,
  },
  {
    id: 8,
    name: 'Nintendo Switch OLED Model',
    category: 'Gaming',
    price: 349.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585184394271-4c0a47dc59c7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop',
    ],
    description:
      '7-inch OLED screen with vibrant colors. Wide adjustable stand. Wired LAN port. 64GB internal storage. Enhanced audio.',
    specs: [
      { label: 'Screen', value: '7" OLED' },
      { label: 'Storage', value: '64GB' },
      { label: 'Battery Life', value: '4.5-9 hours' },
      { label: 'Resolution', value: '1280x720 (handheld)' },
    ],
    inStock: true,
    badge: 'Popular',
  },
];

export const CATEGORIES = [
  {
    name: 'Smartphones',
    icon: 'fa-mobile-screen',
    color: '#3874ff',
    count: 24,
  },
  {
    name: 'Laptops',
    icon: 'fa-laptop',
    color: '#25b003',
    count: 18,
  },
  {
    name: 'Audio',
    icon: 'fa-headphones',
    color: '#e5780b',
    count: 32,
  },
  {
    name: 'Wearables',
    icon: 'fa-clock',
    color: '#0097eb',
    count: 15,
  },
  {
    name: 'Gaming',
    icon: 'fa-gamepad',
    color: '#9528ea',
    count: 21,
  },
  {
    name: 'Cameras',
    icon: 'fa-camera',
    color: '#fa3b1d',
    count: 12,
  },
];
