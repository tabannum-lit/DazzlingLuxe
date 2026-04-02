import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';
import ProductCard from '../components/shared/ProductCard';
import EmptyState from '../components/shared/EmptyState';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" className={`w-4 h-4 ${filled ? 'text-warmGold' : 'text-beige'}`} fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

type ProductDetailPageProps = {
  products: Product[];
};

const ProductDetailPage = ({ products }: ProductDetailPageProps) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === Number(productId));
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const related = useMemo(() => {
    if (!product) return [];
    return product.compatibleWith
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [product, products]);

  if (!product) {
    return (
      <EmptyState
        title="Product Not Found"
        description="The keepsake you're looking for isn't available."
        action={<Link to="/jewelry" className="rounded-full bg-warmGold px-6 py-3 text-sm font-bold text-white">Browse Collection</Link>}
      />
    );
  }

  return (
    <article>
      <section className="grid gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-paleRose aspect-square">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? 'border-warmGold shadow-md' : 'border-beige/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">{product.category}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-2 leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < Math.round(product.rating)} />
              ))}
            </div>
            <span className="text-sm text-softBrown">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-charcoal">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-softBrown line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <p className="text-softBrown leading-relaxed">{product.description}</p>

          {/* Story */}
          <div className="bg-warmGold/5 rounded-2xl border border-warmGold/15 p-5">
            <p className="text-sm font-bold text-charcoal mb-2">✨ The Story Behind This Piece</p>
            <p className="text-sm text-softBrown italic leading-relaxed">{product.story}</p>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-bold text-charcoal text-sm mb-3">Details</h3>
            <ul className="space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-softBrown">
                  <span className="w-1.5 h-1.5 rounded-full bg-warmGold shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 pt-2">
            <button
              className="py-4 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg"
              onClick={() => addToCart(product)}
              id={`add-to-cart-detail-${product.id}`}
            >
              Add to Cart — {formatCurrency(product.price)}
            </button>
            <Link
              to="/send-your-flowers"
              className="py-4 rounded-full border-2 border-warmGold text-warmGold font-bold uppercase tracking-wider text-center transition-all hover:bg-warmGold hover:text-white"
            >
              Customize This Piece
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-heading text-3xl text-charcoal mb-8">You May Also Love</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ProductDetailPage;
