import { StarIcon } from './Icons.jsx';
import './ProductCard2.css';

function ProductCard({ product }) {
  const { title, price, comparePrice, rating, reviewCount, saveAmount, imageGradient } = product;
  const stars = [1, 2, 3, 4, 5];

  return (
    <article className="product-card">
      <div className="product-card__image" style={{ background: imageGradient }}>
        {saveAmount && <span className="product-card__badge">Save {saveAmount}</span>}
      </div>

      <h3 className="product-card__title">
        <a href="#product">{title}</a>
      </h3>

      <div className="product-card__rating">
        <div className="product-card__stars" aria-label={`${rating} out of 5 stars`}>
          {stars.map((star) => (
            <StarIcon
              key={star}
              filled={star <= rating}
              className={`product-card__star ${star <= rating ? 'product-card__star--filled' : 'product-card__star--empty'}`}
            />
          ))}
        </div>
        <span className="product-card__review-count">({reviewCount})</span>
      </div>

      <p className="product-card__price">
        <span className="product-card__price-current">£{price}</span>
        {comparePrice && <span className="product-card__price-compare">£{comparePrice}</span>}
      </p>
    </article>
  );
}

export default ProductCard;