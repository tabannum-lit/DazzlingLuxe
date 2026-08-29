import { Link } from 'react-router-dom';
import EmptyState from '../components/shared/EmptyState';
import SocialIcon from '../components/shared/SocialIcon';
import { ORDER_CHANNELS } from '../config/socials';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';

type CartPageProps = {
  products: Product[];
};

const CartPage = ({ products }: CartPageProps) => {
  const { items, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const cartLines = items
    .map((item) => ({
      item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((line): line is { item: (typeof items)[number]; product: Product } => Boolean(line.product));

  if (cartLines.length === 0) {
    return (
      <EmptyState
        title="Your Cart Is Empty"
        description="Start by exploring our beautiful floral keepsakes."
        action={
          <Link to="/shop" className="rounded-full bg-warmGold px-6 py-3 text-sm font-bold text-charcoal hover:bg-deepGold transition-colors">
            Browse Collection
          </Link>
        }
      />
    );
  }

  return (
    <section>
      <h1 className="font-heading text-4xl md:text-5xl text-charcoal">Shopping Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cartLines.map(({ item, product }) => (
            <article key={product.id} className="grid gap-4 rounded-2xl border border-beige/40 bg-white p-4 sm:grid-cols-[120px_1fr]">
              <img src={product.images[0]} alt={product.name} className="h-28 w-full rounded-xl object-cover" loading="lazy" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Link to={`/product/${product.id}`} className="font-heading text-xl text-charcoal hover:text-warmGold transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-xs text-warmGold uppercase tracking-wider mt-1">{product.category}</p>
                  <p className="mt-2 text-lg font-bold text-charcoal">{formatCurrency(product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="h-9 w-9 rounded-full border border-beige hover:border-warmGold transition-colors flex items-center justify-center"
                    onClick={() => updateQuantity(product.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >−</button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    className="h-9 w-9 rounded-full border border-beige hover:border-warmGold transition-colors flex items-center justify-center"
                    onClick={() => updateQuantity(product.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>
                <button className="text-sm text-softBrown underline hover:text-warmGold transition-colors" onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-beige/40 bg-white p-6 lg:sticky lg:top-28">
          <h2 className="font-heading text-2xl text-charcoal">Order Summary</h2>
          <div className="mt-5 space-y-2 text-sm text-softBrown">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-beige/30 flex justify-between items-center">
            <span className="font-bold text-charcoal">Total</span>
            <span className="text-2xl font-bold text-charcoal">{formatCurrency(subtotal)}</span>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <p className="rounded-xl border border-warmGold/40 bg-warmGold/10 p-4 text-sm font-medium leading-relaxed text-charcoal">
              Online payment is coming soon. To order, message us on any channel below and quote your order summary —
              we'll confirm availability and take payment there.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {ORDER_CHANNELS.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-beige bg-cream py-2.5 text-sm font-bold text-charcoal transition-colors hover:border-warmGold hover:bg-warmGold/10"
                >
                  <SocialIcon name={channel.name} className="h-4 w-4" />
                  {channel.name}
                </a>
              ))}
            </div>
          </div>
          <button className="mt-4 w-full text-sm text-softBrown underline hover:text-warmGold transition-colors" onClick={clearCart}>
            Clear Cart
          </button>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
