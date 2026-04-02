import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import MobileBottomNav from './MobileBottomNav';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
