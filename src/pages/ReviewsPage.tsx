import { useEffect, useState } from 'react';
import { Review } from '../types';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" className={`w-4 h-4 ${filled ? 'text-warmGold' : 'text-beige'}`} fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/data/reviews.json')
      .then((res) => res.json())
      .then(setReviews)
      .catch(() => setReviews([]));
  }, []);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <section>
      <div className="text-center mb-12">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Customer Love</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Reviews</h1>
        <p className="mt-4 text-softBrown">Real stories from our cherished customers</p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-beige/40 p-8 text-center mb-12 max-w-md mx-auto">
        <div className="text-5xl font-bold text-charcoal">{avgRating}</div>
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < Math.round(Number(avgRating))} />
          ))}
        </div>
        <p className="mt-2 text-sm text-softBrown">Based on {reviews.length} reviews</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="bg-white rounded-2xl border border-beige/40 p-6 card-lift">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < review.rating} />
              ))}
            </div>
            <p className="text-softBrown text-sm leading-relaxed italic mb-4">"{review.text}"</p>
            <div className="pt-4 border-t border-beige/30">
              <p className="font-bold text-charcoal text-sm">{review.name}</p>
              {review.location && <p className="text-xs text-softBrown mt-0.5">{review.location}</p>}
              {review.product && <p className="text-xs text-warmGold mt-1">Purchased: {review.product}</p>}
              <p className="text-xs text-softBrown/60 mt-1">{new Date(review.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsPage;
