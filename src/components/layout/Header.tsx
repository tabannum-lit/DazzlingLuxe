import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalQuantity } = useCart();
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/feature-this-season', label: 'Feature This Season' },
    { to: '/earring', label: 'Earring' },
    { to: '/pendant', label: 'Pendant' },
    { to: '/rings', label: 'Rings' },
    { to: '/suncatchers', label: 'Suncatchers' },
    { to: '/send-your-flowers', label: 'Send Your Flowers' },
    { to: '/personalization-a-gift', label: 'Personalization A Gift' },
  ];

  const linkBase =
    'block rounded-lg px-2 py-2 text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap';
  const linkIdle = 'text-softBrown hover:bg-warmGold/5 hover:text-warmGold';
  const linkActive = 'text-warmGold bg-warmGold/5';

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 glass border-b border-beige/30"
      id="main-header"
    >
      <div className="mx-auto flex h-[72px] lg:h-[84px] max-w-[1600px] items-center justify-between gap-4 px-3 sm:px-6 lg:px-8">
        
        {/* LEFT: Mobile Menu Toggle & Logo */}
        <div className="flex flex-1 lg:flex-none items-center gap-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-beige text-charcoal lg:hidden"
            aria-label="Toggle menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileOpen((o) => !o);
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link
            to="/"
            className="min-w-0 flex items-center gap-2 lg:gap-3 shrink-0"
            aria-label="Dazzling Luxe home"
          >
            <img src="/logo.png" alt="Dazzling Luxe" className="h-8 md:h-10 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-heading text-lg lg:text-xl font-semibold tracking-widest text-charcoal uppercase leading-none">
                Dazzling
              </span>
              <span className="font-serif text-[10px] lg:text-xs tracking-widest text-warmGold uppercase">
                Luxe
              </span>
            </div>
          </Link>
        </div>

        {/* MIDDLE: Search */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-auto px-4">
          <form className="relative w-full group" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search our jewelry collection..."
              className="w-full rounded-full border border-beige/60 bg-cream/50 px-5 py-2.5 pl-11 text-sm text-charcoal transition-all placeholder:text-softBrown/60 focus:border-warmGold focus:bg-white focus:outline-none focus:ring-2 focus:ring-warmGold/20"
            />
            <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-softBrown transition-colors group-focus-within:text-warmGold">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* RIGHT: Navigation & Cart */}
        <div className="flex shrink-0 items-center justify-end gap-2 lg:gap-4">
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-2 pl-2 lg:border-l lg:border-beige/40 lg:ml-2 text-right justify-end ml-auto">
            <Link
              to="/account"
              className="hidden rounded-full border border-beige/60 p-2.5 text-softBrown transition-all hover:border-warmGold hover:text-warmGold hover:bg-warmGold/5 lg:inline-flex"
              aria-label="Account"
            >
              <svg className="h-4 w-4 xl:h-5 xl:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link
              to="/cart"
              className="relative inline-flex h-10 w-10 xl:h-11 xl:w-11 shrink-0 items-center justify-center rounded-full border border-beige/60 text-softBrown transition-all hover:border-warmGold hover:text-warmGold hover:bg-warmGold/5"
              aria-label="Open cart"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 xl:h-5 xl:w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] xl:h-5 xl:min-w-[20px] items-center justify-center rounded-full bg-warmGold px-1 text-[10px] xl:text-xs font-bold text-white shadow-sm">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>

      </div>

      {/* Mobile Menu Content */}
      {isMobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-beige/30 bg-cream/98 px-4 pb-6 pt-4 backdrop-blur-md lg:hidden shadow-xl">
          
          <form className="relative w-full mb-6" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-beige bg-white/50 px-4 py-3 pl-10 text-sm focus:border-warmGold focus:outline-none focus:ring-1 focus:ring-warmGold"
            />
            <svg className="absolute left-3 top-3.5 h-4 w-4 text-softBrown" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          <nav className="grid gap-1.5" aria-label="Mobile menu">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? 'bg-warmGold/10 text-warmGold' : 'text-softBrown hover:bg-warmGold/5 hover:text-warmGold'}`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            
            <div className="mt-4 pt-4 border-t border-beige/40">
              <Link
                to="/account"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide text-softBrown hover:bg-warmGold/5 hover:text-warmGold"
                onClick={() => setIsMobileOpen(false)}
              >
                <svg className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

