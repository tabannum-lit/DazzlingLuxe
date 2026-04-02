import { useEffect, useState } from 'react';
import { Product } from '../types';

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export const useProducts = (): ProductState => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/products.json');

        if (!response.ok) {
          throw new Error('Unable to load product catalog.');
        }

        const data = (await response.json()) as Product[];

        if (alive) {
          setProducts(data);
        }
      } catch (caught) {
        if (alive) {
          setError(caught instanceof Error ? caught.message : 'Unknown error');
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      alive = false;
    };
  }, []);

  return { products, loading, error };
};
