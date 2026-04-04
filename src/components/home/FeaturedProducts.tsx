import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/currency';

type FeaturedProductsProps = {
  products: Product[];
};

type FeaturedShowcaseCardProps = {
  product: Product;
  large?: boolean;
};

const FeaturedShowcaseCard = ({ product, large = false }: FeaturedShowcaseCardProps) => {
  const badge = product.newArrival
    ? 'New arrival'
    : product.originalPrice && product.originalPrice > product.price
      ? `Save ${formatCurrency(product.originalPrice - product.price)}`
      : product.subcategory;

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group relative block overflow-hidden rounded-[2rem] bg-[#efe3d6] ${
        large ? 'min-h-[28rem] md:min-h-[36rem]' : 'min-h-[17rem] md:min-h-[17.5rem]'
      }`}
    >
      {product.images[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/5 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />

      <div className={`relative z-10 flex h-full flex-col justify-between ${large ? 'p-6 md:p-8' : 'p-5 md:p-6'}`}>
        <div>
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm">
            {badge}
          </span>
        </div>

        <div className={large ? 'max-w-md' : 'max-w-xs'}>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
            {product.category}
          </p>
          <h3
            className={`mt-3 font-heading leading-[0.92] text-white transition-transform duration-500 group-hover:translate-y-[-2px] ${
              large ? 'text-4xl md:text-5xl' : 'text-[2rem] md:text-[2.2rem]'
            }`}
          >
            {product.name}
          </h3>
          <p className={`mt-3 text-sm leading-relaxed text-white/78 ${large ? 'max-w-sm' : 'max-w-[18rem]'}`}>
            {product.description}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-warmGold">
              {formatCurrency(product.price)}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/25 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-charcoal">
              Explore Piece
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const featured = products.filter((product) => product.featured).slice(0, 3);
  const [primaryProduct, ...supportingProducts] = featured;

  if (!primaryProduct) return null;

  return (
    <section className="mt-24 px-4 sm:px-6 lg:px-8" id="featured-products-section">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-warmGold">Handpicked</p>
            <h2 className="mt-3 font-heading text-4xl leading-none text-charcoal md:text-5xl">
              Featured Jewelry Pieces
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-softBrown">
              A curated edit of our most-loved keepsakes, arranged in an editorial showcase that lets the craftsmanship and floral detail take the lead.
            </p>
          </div>

          <Link
            to="/jewelry"
            className="text-sm font-bold uppercase tracking-[0.2em] text-warmGold transition-colors hover:text-deepGold"
          >
            View All {'->'}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <div className={supportingProducts.length > 0 ? 'md:col-span-8' : 'md:col-span-12'}>
            <FeaturedShowcaseCard product={primaryProduct} large />
          </div>

          {supportingProducts.length > 0 ? (
            <div className="flex flex-col gap-6 md:col-span-4">
              {supportingProducts.map((product) => (
                <FeaturedShowcaseCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
