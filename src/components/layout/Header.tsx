import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const navItems = [
  { label: 'New & featured', to: '/' },
  { label: 'Shop by', to: '/jewelry' },
  { label: 'Charms', to: '/personalized-keepsakes' },
  { label: 'Bracelets', to: '/jewelry' },
  { label: 'Necklaces', to: '/jewelry' },
  { label: 'Rings', to: '/jewelry' },
  { label: 'Earrings', to: '/jewelry' },
  { label: 'Engraving', to: '/personalized-keepsakes' },
  { label: 'Lab-grown diamonds', to: '/sale' },
  { label: 'Gifts', to: '/send-your-flowers' },
  { label: 'Collections', to: '/jewelry' },
  { label: 'Sale', to: '/sale', highlight: true },
];

const BrandMark = ({ light }: { light: boolean }) => (
  <Link to="/" className="relative inline-flex items-start pt-2" aria-label="Dazzling Luxe home">
    <span
      className={`whitespace-nowrap font-heading text-[22px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[24px] lg:text-[26px] ${
        light ? 'text-white' : 'text-charcoal'
      }`}
    >
      Dazzling Luxe
    </span>
    <svg
      className={`absolute left-[42%] top-0 h-[10px] w-[10px] -translate-x-1/2 transition-colors duration-300 ${
        light ? 'text-white' : 'text-warmGold'
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16l-2-8-6 4-6-4-2 8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l2-4 3 5 3-5 2 4" />
    </svg>
  </Link>
);

const IconButton = ({
  label,
  light,
  children,
  to,
}: {
  label: string;
  light: boolean;
  children: ReactNode;
  to?: string;
}) => {
  const className = `inline-flex items-center justify-center transition-opacity duration-200 ${
    light ? 'text-white hover:opacity-70' : 'text-charcoal hover:opacity-65'
  }`;

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} aria-label={label}>
      {children}
    </button>
  );
};

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalQuantity } = useCart();
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const lightHeader = isHomePage;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileOpen(false);
    }
  };

  const shellClass = isHomePage
    ? 'absolute left-0 top-0 z-[100] w-full bg-gradient-to-b from-black/55 via-black/15 to-transparent'
    : 'fixed inset-x-0 top-0 z-50 border-b border-beige/35 bg-cream/95 shadow-[0_14px_40px_rgba(44,44,44,0.08)] backdrop-blur-xl';
  const textTone = lightHeader ? 'text-white' : 'text-charcoal';
  const searchBorderTone = lightHeader ? 'border-white/60 focus-within:border-white' : 'border-softBrown/35 focus-within:border-charcoal';
  const searchInputTone = lightHeader
    ? 'text-white placeholder:text-white/70'
    : 'text-charcoal placeholder:text-softBrown/70';
  const mobileDrawerTone = lightHeader ? 'border-white/12 bg-[rgba(24,20,18,0.92)] text-white' : 'border-beige/30 bg-cream/98 text-charcoal';

  return (
    <header ref={headerRef} className={shellClass} id="main-header">
      <div className="px-4 pt-4 sm:px-6 lg:px-12">
        <div className="flex h-14 items-center justify-between lg:hidden">
          <button
            type="button"
            className={`inline-flex items-center justify-center ${textTone} transition-opacity duration-200 hover:opacity-70`}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileOpen((open) => !open);
            }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <BrandMark light={lightHeader} />

          <div className="flex items-center gap-4">
            <IconButton label="Account" light={lightHeader} to="/account">
              <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </IconButton>

            <Link to="/cart" className={`relative inline-flex items-center justify-center ${lightHeader ? 'text-white hover:opacity-70' : 'text-charcoal hover:opacity-65'} transition-opacity duration-200`} aria-label="Cart">
              <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalQuantity > 0 ? (
                <span className="absolute -right-2 -top-2 text-[10px] font-medium text-current">
                  {totalQuantity}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="grid h-14 grid-cols-[minmax(0,1fr)_420px_minmax(0,1fr)] items-center gap-8">
            <div className="justify-self-start">
              <BrandMark light={lightHeader} />
            </div>

            <form className={`group relative w-[420px] border-b transition-colors duration-200 ${searchBorderTone}`} onSubmit={handleSearch}>
              <button
                type="submit"
                className={`absolute left-0 top-1/2 -translate-y-1/2 ${lightHeader ? 'text-white/80 hover:text-white' : 'text-softBrown hover:text-charcoal'} transition-colors duration-200`}
                aria-label="Submit search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className={`w-full border-0 bg-transparent pb-1.5 pl-7 text-sm tracking-[0.05em] outline-none ${searchInputTone}`}
              />
            </form>

            <div className="flex items-center justify-self-end gap-6">
              <IconButton label="Wishlist" light={lightHeader}>
                <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 8.5A4.75 4.75 0 019.5 3.75c1.58 0 3.02.77 3.9 2.03a4.74 4.74 0 013.85-2.03A4.75 4.75 0 0122 8.5c0 5.25-6.24 8.95-8.6 11.2a1 1 0 01-1.4 0C9.64 17.45 3.4 13.75 3.4 8.5z" />
                </svg>
              </IconButton>

              <IconButton label="Store Locator" light={lightHeader}>
                <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.4 6-11a6 6 0 10-12 0c0 5.6 6 11 6 11z" />
                  <circle cx="12" cy="10" r="2.3" />
                </svg>
              </IconButton>

              <IconButton label="Account" light={lightHeader} to="/account">
                <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </IconButton>

              <Link
                to="/cart"
                className={`relative inline-flex items-center justify-center transition-opacity duration-200 ${
                  lightHeader ? 'text-white hover:opacity-70' : 'text-charcoal hover:opacity-65'
                }`}
                aria-label="Cart"
              >
                <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalQuantity > 0 ? (
                  <span className="absolute -right-2 -top-2 text-[10px] font-medium text-current">
                    {totalQuantity}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>

          <nav className="flex h-10 items-center justify-start gap-5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:justify-center xl:gap-9" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`whitespace-nowrap border-b border-transparent pb-0.5 text-[13px] font-normal tracking-[0.04em] transition-opacity duration-200 hover:opacity-75 ${
                  item.highlight
                    ? 'text-[#E8A87C]'
                    : lightHeader
                      ? 'text-white'
                      : 'text-charcoal'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isMobileOpen ? (
        <div className={`border-t px-4 pb-6 pt-4 shadow-2xl lg:hidden ${mobileDrawerTone}`}>
          <form className={`mb-5 border-b ${lightHeader ? 'border-white/40' : 'border-softBrown/35'}`} onSubmit={handleSearch}>
            <div className="relative">
              <button
                type="submit"
                className={`absolute left-0 top-1/2 -translate-y-1/2 ${lightHeader ? 'text-white/80' : 'text-softBrown'}`}
                aria-label="Submit search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className={`w-full border-0 bg-transparent pb-2 pl-7 text-sm tracking-[0.05em] outline-none ${searchInputTone}`}
              />
            </div>
          </form>

          <nav className="grid gap-3" aria-label="Mobile menu">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm tracking-[0.08em] transition-opacity duration-200 hover:opacity-75 ${
                  item.highlight
                    ? 'text-[#E8A87C]'
                    : lightHeader
                      ? 'text-white'
                      : 'text-charcoal'
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
