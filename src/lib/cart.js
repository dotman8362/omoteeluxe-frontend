const CART_KEY = "omotee-cart";

export function getCart() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find((item) => item._id === product._id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  }

  saveCart(cart);
  return cart;
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function updateCartItemQuantity(productId, quantity) {
  const cart = getCart()
    .map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
        : item,
    )
    .filter((item) => item.quantity > 0);

  saveCart(cart);
  return cart;
}

export function removeCartItem(productId) {
  const cart = getCart().filter((item) => item._id !== productId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
  return [];
}
