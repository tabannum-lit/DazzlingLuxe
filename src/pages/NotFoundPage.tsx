import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="text-center py-20 max-w-md mx-auto">
    <div className="text-6xl mb-6">🌿</div>
    <h1 className="font-heading text-5xl text-charcoal">404</h1>
    <p className="mt-4 text-softBrown">The page you're looking for has bloomed elsewhere.</p>
    <Link to="/" className="inline-block mt-8 px-8 py-3 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider hover:bg-deepGold transition-colors">
      Return Home
    </Link>
  </div>
);

export default NotFoundPage;
