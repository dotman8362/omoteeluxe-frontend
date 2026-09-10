import "./ProductCard.css";
import { urlFor } from "../lib/imageUrl";
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { _id, name, price, image } = product;
  const imageUrl = image ? urlFor(image).width(600).height(750).fit("crop").auto("format").url() : null;

  return (
    <Link to={`/product/${_id}`} className="product-card__link">
      <article className="product-card">
        <div className="product-card__image-wrapper">
          <div className="product-card__image">
            {imageUrl ? (
              <img className="product-card__photo" src={imageUrl} alt={name} loading="lazy" decoding="async" width="600" height="750" />
            ) : (
              <>
                <div
                  className="product-card__swatch"
                  style={{
                    background:
                      "linear-gradient(160deg, #e08a94 0%, #c96b78 55%, #b5505f 100%)",
                  }}
                />
                <div className="product-card__handle" />
              </>
            )}
          </div>
        </div>
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__price">
          <span className="product-card__currency">₦</span>
          {Number(price).toLocaleString()}
        </p>
      </article>
    </Link>
  );
}

export default ProductCard;
