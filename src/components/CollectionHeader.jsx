import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { fetchProducts } from "../lib/sanity.js";
import "./CollectionHeader.css";

const CATEGORIES = ["Luxury", "Autogele", "ShopTeeluxe"];

function normalizeCategory(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function CollectionHeader() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        if (!isMounted) return;

        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load categories right now.");
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
  }, []);

  const visibleProducts = useMemo(() => {
    if (!activeTab) {
      return products;
    }

    return products.filter((product) => {
      const productCategory = normalizeCategory(product.collection?.name);
      return productCategory === normalizeCategory(activeTab);
    });
  }, [activeTab, products]);

  return (
    <section className="collection-section">
      <header className="collection-header">
        <h1 className="collection-header__title">
          Omoteeluxe <em>Collection</em>
        </h1>

        <nav className="collection-header__tabs" aria-label="Category filters">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`collection-header__tab ${category === activeTab ? "collection-header__tab--active" : ""}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </header>

      <div className="collection-header__content">
        <p className="collection-header__summary">
          {/* Showing products for {activeTab}. */}
        </p>

        {loading ? (
          <p className="collection-header__status">Loading products...</p>
        ) : error ? (
          <p className="collection-header__status collection-header__status--error">
            {error}
          </p>
        ) : visibleProducts.length === 0 ? (
          <p className="collection-header__status">
            No products are available in this category yet.
          </p>
        ) : (
          <div className="collection-header__products">
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CollectionHeader;
