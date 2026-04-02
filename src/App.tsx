import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/shared/LoadingSpinner';
import EmptyState from './components/shared/EmptyState';
import { CartProvider } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import HomePage from './pages/HomePage';
import JewelryPage from './pages/JewelryPage';
import CoastersSuncatchersPage from './pages/CoastersSuncatchersPage';
import PersonalizedKeepsakesPage from './pages/PersonalizedKeepsakesPage';
import SendYourFlowersPage from './pages/SendYourFlowersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import SalePage from './pages/SalePage';
import GiftOccasionPage from './pages/GiftOccasionPage';
import StoryLanePage from './pages/StoryLanePage';
import OurProcessPage from './pages/OurProcessPage';
import MemorialKeepsakesPage from './pages/MemorialKeepsakesPage';
import AccountPage from './pages/AccountPage';

const pageTitles: Record<string, string> = {
  '/': 'Aethelgard Blooms — Handmade Botanical Jewelry',
  '/sale': 'On Sale | Aethelgard Blooms',
  '/jewelry': 'Floral Jewelry | Aethelgard Blooms',
  '/coasters-suncatchers': 'Displays — Coasters & Suncatchers | Aethelgard Blooms',
  '/displays': 'Displays | Aethelgard Blooms',
  '/personalized-keepsakes': 'Personalised Jewelry | Aethelgard Blooms',
  '/send-your-flowers': 'Preserve Your Flowers | Aethelgard Blooms',
  '/memorial-keepsakes': 'Memorial Keepsakes | Aethelgard Blooms',
  '/our-process': 'Our Process | Aethelgard Blooms',
  '/wedding': 'Wedding | Aethelgard Blooms',
  '/funeral-wake': 'Funeral & Wake Flowers | Aethelgard Blooms',
  '/florals': 'From Your Flowers | Aethelgard Blooms',
  '/about': 'About | Aethelgard Blooms',
  '/reviews': 'Reviews | Aethelgard Blooms',
  '/contact': 'Contact | Aethelgard Blooms',
  '/cart': 'Your Cart | Aethelgard Blooms',
  '/account': 'Account | Aethelgard Blooms',
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RoutedExperience = () => {
  const { products, loading, error } = useProducts();
  const location = useLocation();

  useEffect(() => {
    const p = location.pathname;
    if (p.startsWith('/gifts/')) {
      document.title = 'Gifts | Aethelgard Blooms';
      return;
    }
    document.title = pageTitles[p] ?? 'Aethelgard Blooms';
  }, [location.pathname]);

  return (
    <CartProvider products={products}>
      <Layout>
        <ScrollToTop />
        {loading ? <LoadingSpinner label="Loading botanical jewelry..." /> : null}

        {!loading && error ? (
          <EmptyState title="Unable To Load" description={error} />
        ) : null}

        {!loading && !error ? (
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/sale" element={<SalePage products={products} />} />
            <Route path="/jewelry" element={<JewelryPage products={products} />} />
            <Route path="/coasters-suncatchers" element={<CoastersSuncatchersPage products={products} />} />
            <Route path="/displays" element={<CoastersSuncatchersPage products={products} />} />
            <Route path="/personalized-keepsakes" element={<PersonalizedKeepsakesPage products={products} />} />
            <Route path="/send-your-flowers" element={<SendYourFlowersPage />} />
            <Route path="/memorial-keepsakes" element={<MemorialKeepsakesPage />} />
            <Route path="/our-process" element={<OurProcessPage />} />
            <Route path="/wedding" element={<StoryLanePage />} />
            <Route path="/funeral-wake" element={<StoryLanePage />} />
            <Route path="/florals" element={<StoryLanePage />} />
            <Route path="/gifts/:occasion" element={<GiftOccasionPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage products={products} />} />
            <Route path="/cart" element={<CartPage products={products} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        ) : null}
      </Layout>
    </CartProvider>
  );
};

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RoutedExperience />
    </BrowserRouter>
  );
}

export default App;
