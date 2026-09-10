import { useState } from "react";
import { ExpandIcon } from "./Icons.jsx";
import "./ProductGallery.css";

function ProductGallery({ imageUrl, alt, fallbackGradient }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="product-gallery">
        {imageUrl ? (
          <img className="product-gallery__image" src={imageUrl} alt={alt} decoding="async" width="1200" height="1500" />
        ) : (
          <div
            className="product-gallery__image product-gallery__image--fallback"
            style={{ background: fallbackGradient }}
            role="img"
            aria-label={alt}
          />
        )}

        {imageUrl ? (
          <button
            type="button"
            className="product-gallery__expand"
            aria-label="View full size image"
            onClick={() => setIsOpen(true)}
          >
            <ExpandIcon />
          </button>
        ) : null}
      </div>

      {isOpen && imageUrl ? (
        <div
          className="product-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded product image"
        >
          <button
            type="button"
            className="product-gallery__lightbox-close"
            aria-label="Close image"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <img
            className="product-gallery__lightbox-image"
            src={imageUrl}
            alt={alt}
            decoding="async"
          />
        </div>
      ) : null}
    </>
  );
}

export default ProductGallery;
