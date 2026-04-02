import { useMemo, useState } from 'react';
import { Product } from '../types';
import ProductCard from '../components/shared/ProductCard';
import EmptyState from '../components/shared/EmptyState';

type CategoryPageProps = {
  products: Product[];
  title: string;
  subtitle: string;
  category: string;
};

const CategoryPage = ({ products, title, subtitle, category }: CategoryPageProps) => {
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    const items = products.filter((p) => p.category === category);
    return items.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return Number(b.newArrival) - Number(a.newArrival);
      return Number(b.featured) - Number(a.featured);
    });
  }, [products, category, sortBy]);

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Collection</p>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-2">{title}</h1>
          <p className="mt-2 text-softBrown">{subtitle}</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-full border border-beige bg-white px-4 py-2.5 text-sm text-charcoal outline-none focus:border-warmGold cursor-pointer"
          id="sort-select"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Coming Soon"
          description="We're crafting beautiful new pieces for this collection. Check back soon!"
        />
      )}
    </section>
  );
};

export default CategoryPage;
