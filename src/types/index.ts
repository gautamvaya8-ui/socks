export type Page = 'home' | 'shop' | 'product' | 'lookbook' | 'cart' | 'admin';

export interface OrderItem {
  productId: string;
  name: string;
  size: 'S' | 'M' | 'L' | 'XL';
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'CARD' | 'COD' | 'NETBANKING' | 'WALLET';
  paymentStatus: 'Paid' | 'Pending COD' | 'Refunded';
  orderStatus: 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface PaymentSettings {
  upiEnabled: boolean;
  upiId: string;
  codEnabled: boolean;
  cardEnabled: boolean;
  netBankingEnabled: boolean;
  walletsEnabled: boolean;
  freeShippingThreshold: number;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  active: boolean;
  description: string;
}

export type Vibe = 'MINIMAL' | 'STREET' | 'PLAYFUL' | 'CUTE' | 'CHAOTIC' | 'LOUD';

export type Category = 'ALL' | 'NEW DROP' | 'BESTSELLERS' | 'GRAPHIC' | 'SPORTY' | 'CUTE' | 'MINIMAL' | 'FUN';

export type PatternType =
  | 'cherry'
  | 'checker'
  | 'flames'
  | 'clouds'
  | 'matcha'
  | 'pixel-heart'
  | 'blue-hour'
  | 'strawberry'
  | 'acid'
  | 'cloud-nine'
  | 'off-duty'
  | 'neon-wave';

export interface ProductGalleryItem {
  id: string;
  title: string;
  type: 'sock' | 'sneaker' | 'fit' | 'fabric' | 'packaging';
  label: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'GRAPHIC' | 'SPORTY' | 'CUTE' | 'MINIMAL' | 'FUN';
  vibe: Vibe;
  color: string;
  colorHex: string;
  accentColorHex: string;
  bgColor: string;
  rating: number;
  reviewCount: number;
  description: string;
  vibeDescription: string;
  badge: 'NEW' | 'BESTSELLER' | 'LIMITED' | 'HOT' | null;
  sizes: ('S' | 'M' | 'L' | 'XL')[];
  inStock: boolean;
  patternType: PatternType;
  gallery: ProductGalleryItem[];
  material: string;
  fit: string;
  care: string;
}

export interface CartItem {
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL';
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  date: string;
  verified: boolean;
  text: string;
  fitFeedback: string;
  hasPhoto?: boolean;
}

export interface VibeQuizAnswers {
  fit: 'CLEAN' | 'STREET' | 'CUTE' | 'CHAOTIC';
  color: 'BLACK' | 'PINK' | 'BLUE' | 'GREEN' | 'ORANGE' | 'PURPLE';
  loudness: 'LOWKEY' | 'MEDIUM' | 'LOUD AF';
}
