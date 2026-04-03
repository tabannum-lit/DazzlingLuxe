import { Link } from 'react-router-dom';
import { Product } from '../../types';
import ProductCard from '../shared/ProductCard';

type FeaturedProductsProps = {
  products: Product[];
};

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="mt-24" id="featured-products-section">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Handpicked</p>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Featured Jewelry Pieces</h2>
        </div>
        <Link
          to="/jewelry"
          className="text-warmGold text-sm font-bold uppercase tracking-wider hover:text-deepGold transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
