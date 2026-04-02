type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
};

const RatingStars = ({ rating, reviewCount }: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-2" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <div className="flex text-amber-500">
        {stars.map((star) => (
          <span key={star} aria-hidden="true">
            {rating >= star ? '?' : '?'}
          </span>
        ))}
      </div>
      {reviewCount ? <span className="text-sm text-gray-500">({reviewCount})</span> : null}
    </div>
  );
};

export default RatingStars;
