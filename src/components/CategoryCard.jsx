import './CategoryCard.css';
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${encodeURIComponent(category.id)}`} className="category-card">
      <div className="category-card__media">
        <img
          src={category.image}
          alt={category.label}
          className="category-card__img"
          loading="lazy"
        />
      </div>
      <span className="category-card__label">{category.label}</span>
    </Link>
  );
}

export default CategoryCard;
