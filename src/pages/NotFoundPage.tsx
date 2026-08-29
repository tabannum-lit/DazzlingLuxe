import { Link } from 'react-router-dom';
import Icon from '../components/shared/Icon';

const NotFoundPage = () => (
  <div className="text-center py-20 max-w-md mx-auto">
    <Icon name="leaf" className="mx-auto mb-6 h-16 w-16 text-goldInk" />
    <h1 className="font-heading text-5xl text-charcoal">404</h1>
    <p className="mt-4 text-softBrown">The page you're looking for has bloomed elsewhere.</p>
    <Link to="/" className="inline-block mt-8 px-8 py-3 rounded-full bg-warmGold text-charcoal font-bold uppercase tracking-wider hover:bg-deepGold transition-colors">
      Return Home
    </Link>
  </div>
);

export default NotFoundPage;
