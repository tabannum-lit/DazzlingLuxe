import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';

type BundleSectionProps = {
  products: Product[];
};

const BundleSection = ({ products }: BundleSectionProps) => {
  const bundles = [
    products.slice(0, 2),
    products.slice(2, 4),
  ].filter((bundle) => bundle.length === 2);

  return (
    <section className="mt-16" aria-labelledby="complete-look">
      <h2 id="complete-look" className="font-heading text-4xl text-gray-800">
        Complete The Look
      </h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {bundles.map((bundle, index) => {
          const total = bundle.reduce((sum, item) => sum + item.price, 0);

          return (
            <article key={index} className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                {bundle.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="overflow-hidden rounded-xl">
                    <img src={product.images[0]} alt={product.name} className="h-44 w-full object-cover" loading="lazy" />
                  </Link>
                ))}
              </div>
              <h3 className="mt-4 font-heading text-3xl text-gray-800">Studio Pair {index + 1}</h3>
              <p className="mt-1 text-sm text-gray-600">Includes two artisan favorites styled together.</p>
              <p className="mt-3 text-xl font-semibold text-amber-600">Bundle total: {formatCurrency(total)}</p>
              <Link
                to="/shop?bundle=true"
                className="mt-4 inline-flex rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-pink-600"
              >
                Shop Bundle
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BundleSection;
