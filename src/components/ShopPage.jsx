import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { SearchIcon } from "./Icons.jsx";
import { fetchProducts } from "../lib/sanity.js";
import "./ShopPage.css";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setFilteredProducts(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load products.");
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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        (product.description &&
          product.description.toLowerCase().includes(query)),
    );

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <section className="shop-page">
      <div className="shop-page__header">
        <div className="shop-page__title-block">
          <h1>Shop</h1>
          <p>Explore our full collection of handcrafted pieces.</p>
        </div>

        <div className="shop-page__search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shop-page__search-input"
            aria-label="Search products"
          />
        </div>
      </div>

      {loading ? (
        <p className="shop-page__status">Loading products...</p>
      ) : error ? (
        <p className="shop-page__status shop-page__status--error">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="shop-page__status">
          {searchQuery
            ? `No products match "${searchQuery}".`
            : "No products available yet."}
        </p>
      ) : (
        <div className="shop-page__grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {filteredProducts.length > 0 && (
        <p className="shop-page__count">
          Showing {filteredProducts.length} of {products.length} product
          {products.length !== 1 ? "s" : ""}
        </p>
      )}
    </section>
  );
}

export default ShopPage;
