import { useEffect, useState } from 'react';
import { Review } from '../../types';
import { StarIcon } from '../RatingStars';

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/data/reviews.json')
      .then((res) => res.json())
      .then((data) => setReviews(data.slice(0, 6)))
      .catch(() => setReviews([]));
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="mt-24 mb-12" id="testimonials-section">
      <div className="text-center mb-12">
        <p className="text-goldInk uppercase tracking-[0.2em] text-sm font-bold">Love Letters</p>
        <h2 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">What Our Customers Say</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="bg-white rounded-2xl p-6 border border-beige/50 card-lift"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon className="w-4 h-4" key={i} filled={i < review.rating} />
              ))}
            </div>
            <p className="text-softBrown text-sm leading-relaxed italic">
              "{review.text}"
            </p>
            <div className="mt-5 pt-4 border-t border-beige/30">
              <p className="font-bold text-charcoal text-sm">{review.name}</p>
              {review.location && (
                <p className="text-xs text-softBrown mt-0.5">{review.location}</p>
              )}
              {review.product && (
                <p className="text-xs text-goldInk mt-1">Purchased: {review.product}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
