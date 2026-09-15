import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  InstagramIcon,
  TikTokIcon,
  SearchIcon,
  BagIcon,
} from "./Icons.jsx";
import {
  getCart,
  getCartCount,
  removeCartItem,
  updateCartItemQuantity,
} from "../lib/cart.js";
import "./Navbar.css";
import { Trash2 } from "lucide-react";
import omoLogo from "../assets/omotee.jpg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => getCart());
  const [cartCount, setCartCount] = useState(0);

  // 👇 NEW: search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const syncCart = () => {
      const items = getCart();
      setCartItems(items);
      setCartCount(getCartCount());
    };

    syncCart();
    window.addEventListener("storage", syncCart);
    window.addEventListener("cart:updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("cart:updated", syncCart);
    };
  }, []);

  const refreshCartState = (items) => {
    setCartItems(items);
    setCartCount(items.reduce((total, item) => total + item.quantity, 0));
  };

  const handleQuantityChange = (productId, value) => {
    const nextItems = updateCartItemQuantity(productId, value);
    refreshCartState(nextItems);
    window.dispatchEvent(new Event("cart:updated"));
  };

  const handleRemoveItem = (productId) => {
    const nextItems = removeCartItem(productId);
    refreshCartState(nextItems);
    window.dispatchEvent(new Event("cart:updated"));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  // 👇 NEW: search submit handler
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    setSearchOpen(false);
    setSearchTerm("");
    navigate(`/shop?q=${encodeURIComponent(query)}`);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <>
      <header className="navbar">
       <Link to="/" className="navbar__logo">
  <img
    src={omoLogo}
    alt="OmoteeLuxe Shop - Fashion and Autogele"
    className="navbar__logo-image"
  />
</Link>

        <nav
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          {NAV_LINKS.map((link) => {
            // Special handling for email link
            if (link.href.startsWith('mailto:')) {
              return (
                <a key={link.label} href={link.href} className="navbar__link">
                  {link.label}
                </a>
              );
            }
            // Internal links using React Router
            return (
              <Link
                key={link.label}
                to={link.href}
                className="navbar__link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="navbar__icons">
          {/* Social media links - keep as external links */}
          <a
            href="https://www.instagram.com/shopteeluxe?igsh=YWo5NGE3dHhkejNm&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="navbar__icon"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@shopteeluxee?_r=1&_t=ZN-969uRwQB9fy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="navbar__icon"
          >
            <TikTokIcon />
          </a>

          {/* 👇 UPDATED: search button now toggles the panel */}
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            className="navbar__icon"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <SearchIcon />
          </button>

          <button
            type="button"
            aria-label="Cart"
            aria-expanded={cartOpen}
            className="navbar__icon navbar__icon--cart"
            onClick={() => setCartOpen((open) => !open)}
          >
            <BagIcon />
            {cartCount > 0 ? (
              <span className="navbar__cart-count">{cartCount}</span>
            ) : null}
          </button>

          <button
            type="button"
            className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* 👇 NEW: search panel */}
      {searchOpen && (
        <div className="navbar__search-panel">
          <form className="navbar__search-form" onSubmit={handleSearchSubmit}>
            <SearchIcon />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search pieces, fabrics, collections…"
              autoFocus
            />
            <button type="submit" className="navbar__search-submit">
              Search
            </button>
            <button
              type="button"
              className="navbar__search-close"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              ×
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="navbar__mobile-cart"
        aria-label="Open cart"
        onClick={() => setCartOpen(true)}
      >
        <BagIcon />
        {cartCount > 0 ? (
          <span className="navbar__mobile-cart-count">{cartCount}</span>
        ) : null}
      </button>

      <div
        className={`navbar__backdrop ${cartOpen ? "navbar__backdrop--open" : ""}`}
        onClick={() => setCartOpen(false)}
      />

      <aside
        className={`navbar__cart-drawer ${cartOpen ? "navbar__cart-drawer--open" : ""}`}
        aria-label="Shopping cart"
      >
        <div className="navbar__cart-header">
          <div>
            <p className="navbar__cart-title">Your bag</p>
            <p className="navbar__cart-subtitle">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            className="navbar__cart-close"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="navbar__cart-empty">
            <p>Your cart is empty.</p>
            <span>Add a few statement pieces to see them here.</span>
          </div>
        ) : (
          <div className="navbar__cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="navbar__cart-item">
                <div className="navbar__cart-item-info">
                  <p className="navbar__cart-item-name">{item.name}</p>
                  <div className="navbar__cart-controls">
                    <label className="navbar__cart-quantity">
                      <span>Qty</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          handleQuantityChange(item._id, event.target.value)
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="navbar__cart-delete"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <Trash2 size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <p className="navbar__cart-item-price">
                  ₦{(Number(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="navbar__cart-footer">
          <div className="navbar__cart-total">
            <span>Total</span>
            <strong>₦{subtotal.toLocaleString()}</strong>
          </div>
          <button
            type="button"
            className="navbar__pay-button"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Pay now
          </button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
