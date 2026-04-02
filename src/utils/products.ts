import { Product } from '../types';

export const uniqueValues = (products: Product[], key: keyof Product): string[] => {
  return Array.from(new Set(products.map((product) => String(product[key])))).sort();
};
