export type ProductCategory =
  | 'Jewelry'
  | 'Coasters & Suncatchers'
  | 'Personalized Keepsakes';

export type RecipientTag = 'Mom' | 'Daughter' | 'Friend';

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  newArrival?: boolean;
  images: string[];
  description: string;
  story: string;
  details: string[];
  material?: string;
  size?: string;
  color?: string;
  recipientTags?: RecipientTag[];
  compatibleWith: number[];
};

export type CartItem = {
  productId: number;
  quantity: number;
};

export type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  product?: string;
  location?: string;
};

export type CustomRequest = {
  name: string;
  email: string;
  phone: string;
  flowerType: string;
  occasion: string;
  message: string;
};

export type Order = {
  id?: string;
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  total: number;
  createdAt?: string;
};

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
