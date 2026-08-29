import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../config/socials';
import SocialIcon from '../shared/SocialIcon';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="mt-24 border-t border-white/10 bg-emeraldDark" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex" aria-label="Dazzling Luxe home">
              <img
                src="/latest_logo.png"
                alt="Dazzling Luxe"
                className="h-48 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Handmade jewelry and displays from real dried flowers—plus respectful memorial work with hair, pet fur, and your own
              blooms. Studio craft rooted in Canada.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 transition-all hover:border-warmGold hover:text-warmGold hover:bg-warmGold/10"
                  aria-label={`Dazzling Luxe on ${social.name}`}
                >
                  <SocialIcon name={social.name} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/sale" className="hover:text-warmGold transition-colors">On Sale</Link></li>
              <li><Link to="/jewelry" className="hover:text-warmGold transition-colors">Jewelry</Link></li>
              <li><Link to="/personalized-keepsakes" className="hover:text-warmGold transition-colors">Personalised Jewelry</Link></li>
              <li><Link to="/wedding" className="hover:text-warmGold transition-colors">Wedding</Link></li>
              <li><Link to="/displays" className="hover:text-warmGold transition-colors">Displays</Link></li>
              <li><Link to="/funeral-wake" className="hover:text-warmGold transition-colors">Funeral &amp; Wake</Link></li>
              <li><Link to="/florals" className="hover:text-warmGold transition-colors">From Your Flowers</Link></li>
              <li><Link to="/memorial-keepsakes" className="hover:text-warmGold transition-colors">Memorial Keepsakes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/our-process" className="hover:text-warmGold transition-colors">Our Process</Link></li>
              <li><Link to="/send-your-flowers" className="hover:text-warmGold transition-colors">Preserve Your Flowers</Link></li>
              <li><Link to="/gifts/canadian" className="hover:text-warmGold transition-colors">Canadian Gifts</Link></li>
              <li><Link to="/about" className="hover:text-warmGold transition-colors">About Us</Link></li>
              <li><Link to="/reviews" className="hover:text-warmGold transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-warmGold transition-colors">Contact</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-warmGold transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-warmGold transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-warmGold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl text-white mb-4">Stay Connected</h4>
            <p className="text-sm text-white/70 mb-4">
              Join our newsletter for exclusive offers and floral inspiration.
            </p>
            {subscribed ? (
              <div className="bg-warmGold/10 rounded-xl p-4 text-center">
                <p className="text-warmGold font-bold text-sm">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 rounded-full border border-white/20 bg-white px-4 py-2.5 text-sm text-charcoal outline-none focus:border-warmGold transition-colors"
                  required
                  id="newsletter-email"
                />
                <button
                  type="submit"
                  className="rounded-full bg-warmGold px-5 py-2.5 text-sm font-bold text-charcoal hover:bg-deepGold transition-colors"
                  id="newsletter-submit"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Dazzling Luxe. All rights reserved.</p>
          <p className="text-xs text-white/60">Handmade botanical jewelry · Canada</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
