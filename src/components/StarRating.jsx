import { StarIcon } from './Icons.jsx';
import './StarRating.css';

function StarRating({ rating = 0, reviewCount = 0 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      <div className="star-rating__stars" aria-label={`${rating} out of 5 stars`}>
        {stars.map((star) => (
          <StarIcon key={star} filled={star <= rating} className="star-rating__star" />
        ))}
      </div>
      <span className="star-rating__count">({reviewCount} Reviews)</span>
      <a href="#write-review" className="star-rating__write-link">
        Write a review
      </a>
    </div>
  );
}

export default StarRating;