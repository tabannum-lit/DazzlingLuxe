import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/currency';

type ProductCardProps = {
  product: Product;
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${filled ? 'text-warmGold' : 'text-beige'}`} fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <article className="group bg-white rounded-2xl border border-beige/40 overflow-hidden card-lift" id={`product-card-${product.id}`}>
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-beige/10 border-2 border-dashed border-beige flex items-center justify-center relative group-hover:bg-beige/20 transition-colors">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0 z-10"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-softBrown/70 z-0">
                <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Pic Later</span>
            </div>
          )}
        </div>
        {product.newArrival && (
          <span className="absolute top-3 left-3 bg-warmGold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            New
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-charcoal/80 text-white text-xs font-bold px-3 py-1 rounded-full">
            Save {formatCurrency(product.originalPrice - product.price)}
          </span>
        )}
      </Link>

      <div className="p-5">
        <p className="text-xs text-warmGold uppercase tracking-wider font-bold">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block mt-1">
          <h3 className="font-heading text-xl text-charcoal transition-colors hover:text-warmGold">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < Math.round(product.rating)} />
          ))}
          <span className="text-xs text-softBrown ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-charcoal">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-softBrown line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>
        <button
          className="mt-4 w-full py-3 rounded-full bg-warmGold text-white text-sm font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-md"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
          id={`add-to-cart-${product.id}`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
