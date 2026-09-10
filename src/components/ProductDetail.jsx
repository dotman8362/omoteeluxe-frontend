import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProductGallery from "./ProductGallery.jsx";
import StarRating from "./StarRating.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import ShareLinks from "./ShareLinks.jsx";
import { WhatsAppIcon } from "./Icons.jsx";
import { fetchProductById } from "../lib/sanity.js";
import { urlFor } from "../lib/imageUrl";
import { addToCart, saveCart } from "../lib/cart.js";
import "./ProductDetail.css";

const WHATSAPP_ORDER_NUMBER = "2340000000000";

function ProductDetail({ productId, onBack }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setFeedback("");

    if (!productId) {
      setError("Product not found.");
      setLoading(false);
      return;
    }

    fetchProductById(productId)
      .then((data) => {
        if (!isMounted) return;
        if (!data) {
          setError("Product not found.");
          return;
        }
        setProduct(data);
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load product details.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
    window.dispatchEvent(new Event("cart:updated"));
    setFeedback(`Added ${quantity} x ${product.name} to your cart.`);
  };

  const handleBuyNow = () => {
    if (!product) return;

    saveCart([
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      },
    ]);
    window.dispatchEvent(new Event("cart:updated"));
    
    navigate('/checkout', { 
      state: { 
        product: product,
        quantity: quantity 
      } 
    });
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;

    const productUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const message = encodeURIComponent(
      `Hi, I would like to order ${quantity} x ${product.name} for NGN ${Number(product.price).toLocaleString()} each.${productUrl ? `\n\nProduct link: ${productUrl}` : ""}`,
    );

    window.open(
      `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
    setFeedback("Your WhatsApp order message is ready.");
  };

  const imageUrl = product?.image
    ? urlFor(product.image).width(1200).height(1500).fit("crop").auto("format").url()
    : null;
  const fallbackGradient =
    "linear-gradient(160deg, #e7cf9e 0%, #dcb96f 45%, #c99a4a 100%)";
  const categories = product?.categories || [
    "Handmade Craft",
    "Limited Edition",
  ];

  if (loading) {
    return (
      <section className="product-page">
        {/* 🆕 Loading Spinner instead of text */}
        <div className="product-page__loading">
          <div className="product-page__spinner"></div>
          <p className="product-page__loading-text">Loading product...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="product-page">
        <p className="product-page__message product-page__message--error">
          {error || "Product not found."}
        </p>
      </section>
    );
  }

  return (
    <section className="product-page">
      <div className="product-page__gallery-panel">
        <button type="button" className="product-page__back" onClick={onBack}>
          Back to shop
        </button>

        <ProductGallery
          imageUrl={imageUrl}
          alt={product.name}
          fallbackGradient={fallbackGradient}
        />
      </div>

      <div className="product-page__info">
        <h1 className="product-page__title">{product.name}</h1>

        <StarRating rating={0} reviewCount={0} />

        <p className="product-page__price">
          NGN {Number(product.price).toLocaleString()}
        </p>

        <div className="product-page__actions">
          <QuantitySelector onChange={setQuantity} />
          <button
            type="button"
            className="product-page__add-to-cart"
            onClick={handleAddToCart}
          >
            + Add to Cart
          </button>
          <button
            type="button"
            className="product-page__buy-now"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button
            type="button"
            className="product-page__whatsapp-order"
            onClick={handleWhatsAppOrder}
          >
            <WhatsAppIcon /> Order through WhatsApp
          </button>
        </div>

        {feedback ? <p className="product-page__feedback">{feedback}</p> : null}

        <div className="product-page__divider" />

        {product.description ? (
          <p className="product-page__description">{product.description}</p>
        ) : null}

        <p className="product-page__categories">
          <span className="product-page__categories-label">Categories:</span>{" "}
          {categories.map((category, index) => (
            <span key={category}>
              <span>{category}</span>
              {index < categories.length - 1 && ", "}
            </span>
          ))}
        </p>

        <ShareLinks
          title={product.name}
          url={typeof window !== "undefined" ? window.location.href : ""}
        />
      </div>
    </section>
  );
}

export default ProductDetail;
