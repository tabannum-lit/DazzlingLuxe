import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';
import RatingStars from './RatingStars';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const metadata = [product.material, product.subcategory].filter(Boolean).join(' | ');

  return (
    <article className="group rounded-2xl border border-pink-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.newArrival ? (
            <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              New
            </span>
          ) : null}
        </div>
      </Link>

      <div className="mt-4">
        <Link to={`/product/${product.id}`} className="font-heading text-2xl text-gray-800 transition hover:text-pink-600">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-gray-500">{metadata}</p>
        <div className="mt-2">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <p className="mt-3 text-2xl font-semibold text-amber-500">{formatCurrency(product.price)}</p>
      </div>

      <button
        className="mt-4 w-full rounded-full bg-pink-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-pink-600"
        onClick={() => addToCart(product)}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
};

export default ProductCard;
