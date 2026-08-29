type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  className?: string;
};

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

/**
 * Filled and empty stars differ in SHAPE (solid vs hollow), not only in hue —
 * a gold-vs-beige pair sits at ~1.9:1 and is unreadable for low-vision users.
 * The filled star keeps a goldInk outline so its silhouette clears AA on white.
 */
export const StarIcon = ({ filled, className = 'w-3.5 h-3.5' }: { filled: boolean; className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    className={className}
    fill={filled ? '#C4E1C5' : 'none'}
    stroke={filled ? '#265E28' : '#A79A90'}
    strokeWidth={1.2}
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d={STAR_PATH} />
  </svg>
);

const RatingStars = ({ rating, reviewCount, className = 'w-3.5 h-3.5' }: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5${reviewCount ? ` from ${reviewCount} reviews` : ''}`}
    >
      <div className="flex items-center gap-1">
        {stars.map((star) => (
          <StarIcon key={star} filled={rating >= star} className={className} />
        ))}
      </div>
      {reviewCount ? <span className="text-xs text-softBrown">({reviewCount})</span> : null}
    </div>
  );
};

export default RatingStars;
