import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const MobileBottomNav = () => {
  const { totalQuantity } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-beige/40 bg-cream/95 backdrop-blur-md md:hidden" aria-label="Mobile bottom navigation" id="mobile-bottom-nav">
      <div className="flex items-center justify-around py-2">
        <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs ${isActive ? 'text-warmGold' : 'text-softBrown'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </NavLink>
        <NavLink to="/jewelry" className={({isActive}) => `flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs ${isActive ? 'text-warmGold' : 'text-softBrown'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Shop
        </NavLink>
        <NavLink to="/send-your-flowers" className={({isActive}) => `flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs ${isActive ? 'text-warmGold' : 'text-softBrown'}`}>
          <span className="text-lg">🌸</span>
          Send
        </NavLink>
        <NavLink to="/cart" className={({isActive}) => `flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs relative ${isActive ? 'text-warmGold' : 'text-softBrown'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute -top-0.5 right-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-warmGold text-[10px] font-bold text-white">
              {totalQuantity}
            </span>
          )}
          Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
