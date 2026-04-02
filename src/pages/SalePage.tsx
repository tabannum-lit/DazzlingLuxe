import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/shared/ProductCard';
import EmptyState from '../components/shared/EmptyState';

type Props = { products: Product[] };

const SalePage = ({ products }: Props) => {
  const [sortBy, setSortBy] = useState('featured');

  const saleItems = useMemo(() => {
    const items = products.filter((p) => p.originalPrice != null && p.originalPrice > p.price);
    return [...items].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      const da = (a.originalPrice ?? 0) - a.price;
      const db = (b.originalPrice ?? 0) - b.price;
      return db - da;
    });
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-10 rounded-2xl border border-warmGold/25 bg-gradient-to-br from-paleRose/40 to-cream p-8 text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-warmGold">Limited time</p>
        <h1 className="font-heading mt-2 text-4xl text-charcoal md:text-5xl">On Sale</h1>
        <p className="mx-auto mt-3 max-w-2xl text-softBrown md:mx-0">
          Real dried-flower jewelry and home keepsakes—hand-set in resin and precious metals. These
          pieces are reduced while supplies last.
        </p>
        <Link
          to="/jewelry"
          className="mt-6 inline-block rounded-full border-2 border-warmGold px-6 py-3 text-xs font-bold uppercase tracking-widest text-warmGold transition-colors hover:bg-warmGold hover:text-white"
        >
          Browse full jewelry
        </Link>
      </div>

      <div className="mb-6 flex flex-col justify-end gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-softBrown">
          {saleItems.length} piece{saleItems.length === 1 ? '' : 's'} on offer
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-full border border-beige bg-white px-4 py-2.5 text-sm text-charcoal outline-none focus:border-warmGold"
        >
          <option value="featured">Best savings</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {saleItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saleItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No sale items right now"
          description="Join the newsletter to hear first when we run seasonal offers on botanical heirlooms."
        />
      )}
    </section>
  );
};

export default SalePage;
