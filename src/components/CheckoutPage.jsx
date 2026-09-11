import { useMemo, useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { getCart, removeCartItem, clearCart } from "../lib/cart.js";
import { urlFor } from "../lib/imageUrl";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import { Link } from 'react-router-dom';
import { apiUrl, readJson } from "../lib/api.js";

const DELIVERY_OPTIONS = [
  {
    id: "lagos",
    label: "Lagos delivery",
    detail: "1-3 business days",
    fee: 3000,
  },
  {
    id: "nationwide",
    label: "Nationwide delivery",
    detail: "3-7 business days",
    fee: 6000,
  },
  {
    id: "pickup",
    label: "Store pickup",
    detail: "Pickup after confirmation",
    fee: 0,
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "paystack",
    label: "Paystack",
    detail: "Card, transfer, USSD, or mobile money",
  },
  {
    id: "bank",
    label: "Bank transfer",
    detail: "Account details are sent after order review",
  },
];

function formatMoney(value) {
  return `NGN ${Number(value || 0).toLocaleString()}`;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => getCart());
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_OPTIONS[0].id);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].id);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [paymentInitialized, setPaymentInitialized] = useState(false);
  const formRef = useRef(null);
  const backendReferenceRef = useRef(null);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price || 0) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const selectedDelivery = DELIVERY_OPTIONS.find(
    (option) => option.id === deliveryMethod,
  );
  const deliveryFee = cartItems.length > 0 ? selectedDelivery?.fee || 0 : 0;
  const total = subtotal + deliveryFee;

  // Load Paystack script
  useEffect(() => {
    if (window.PaystackPop) {
      setPaystackLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (existingScript) {
      const checkLoaded = setInterval(() => {
        if (window.PaystackPop) {
          setPaystackLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      setPaystackLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Paystack script');
      setStatusMessage('Payment system failed to load. Please try again later.');
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Initialize payment with backend
  const initializePaymentWithBackend = async (orderData) => {
    try {
      const response = await fetch(apiUrl('/api/payment/initialize'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await readJson(response);

      if (!result.success) throw new Error(result.message || 'Payment initialization failed');

      return result.data;
    } catch (error) {
      console.error('❌ Backend payment initialization error:', error);
      throw error;
    }
  };

  // Verify payment with backend
  const verifyPaymentWithBackend = async (reference) => {
    try {
      const response = await fetch(apiUrl(`/api/payment/verify/${encodeURIComponent(reference)}`));
      const result = await readJson(response);

      if (!result.success) throw new Error(result.message || 'Payment verification failed');

      return result.data;
    } catch (error) {
      console.error('❌ Backend payment verification error:', error);
      throw error;
    }
  };

  // ✅ FIXED: Create Paystack handler with reference and formData passed directly
  const createPaystackHandler = (reference, customerData) => {
    if (!paystackLoaded || !window.PaystackPop) {
      console.warn('Paystack not loaded yet');
      setStatusMessage("Payment system is loading. Please wait...");
      return null;
    }

    if (!reference) {
      console.error('No reference provided');
      setStatusMessage("Payment reference not found. Please try again.");
      return null;
    }

    if (!customerData) {
      console.error('No customer data provided');
      setStatusMessage("Please fill in your contact and delivery details.");
      return null;
    }

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      console.error('Paystack public key is missing');
      setStatusMessage("Payment configuration error. Please contact support.");
      return null;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: customerData.email,
        amount: Math.round(total * 100),
        currency: "NGN",
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Order Details",
              variable_name: "order_details",
              value: cartItems.map(item => `${item.name} x${item.quantity}`).join(", "),
            },
            {
              display_name: "Delivery Method",
              variable_name: "delivery_method",
              value: selectedDelivery?.label || "",
            },
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: `${customerData.firstName || ''} ${customerData.lastName || ''}`,
            },
          ],
        },
        callback: function(response) {
          setStatusMessage("Verifying payment...");
          
          verifyPaymentWithBackend(response.reference)
            .then((verifiedData) => {
              localStorage.setItem("lastOrder", JSON.stringify(verifiedData.order));
              clearCart();
              setCartItems([]);
              setIsProcessing(false);
              setPaymentInitialized(false);
              backendReferenceRef.current = null;
              navigate("/order-success");
            })
            .catch((error) => {
              console.error('❌ Payment verification error:', error);
              setStatusMessage(error.message || "Payment succeeded but verification failed. Please contact support.");
              setIsProcessing(false);
              setPaymentInitialized(false);
            });
        },
        onClose: function() {
          setStatusMessage("Payment was cancelled. You can try again.");
          setIsProcessing(false);
          setPaymentInitialized(false);
        },
      });

      return handler;
    } catch (error) {
      console.error('Paystack handler creation error:', error);
      setStatusMessage("An error occurred while initializing payment. Please try again.");
      setIsProcessing(false);
      setPaymentInitialized(false);
      return null;
    }
  };

  // ✅ FIXED: Open Paystack with reference and formData
  const openPaystack = (reference, customerData) => {
    if (!reference) {
      console.error('No reference to open Paystack');
      setStatusMessage("Payment reference not found. Please try again.");
      setIsProcessing(false);
      setPaymentInitialized(false);
      return;
    }

    if (!customerData) {
      console.error('No customer data to open Paystack');
      setStatusMessage("Please fill in your contact and delivery details.");
      setIsProcessing(false);
      setPaymentInitialized(false);
      return;
    }

    if (!paystackLoaded) {
      setStatusMessage("Payment system is loading. Please wait and try again.");
      setIsProcessing(false);
      setPaymentInitialized(false);
      return;
    }

    // Create handler with the reference and customer data
    const handler = createPaystackHandler(reference, customerData);
    
    if (handler) {
      try {
        handler.openIframe();
        setPaymentInitialized(true);
        setIsProcessing(false);
        setStatusMessage("Payment window opening...");
      } catch (error) {
        console.error('Error opening Paystack:', error);
        setStatusMessage("An error occurred. Please try again.");
        setIsProcessing(false);
        setPaymentInitialized(false);
      }
    } else {
      setIsProcessing(false);
      setPaymentInitialized(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions
    if (isProcessing || paymentInitialized) {
      console.log('Already processing payment...');
      return;
    }

    // Validate cart has items
    if (cartItems.length === 0) {
      setStatusMessage("Add items to your bag before checking out.");
      return;
    }

    // Get form data
    const form = event.currentTarget;
    const formDataObj = new FormData(form);
    
    // Validate required fields
    const email = formDataObj.get("email");
    const phone = formDataObj.get("phone");
    const firstName = formDataObj.get("firstName");
    const lastName = formDataObj.get("lastName");
    const address = formDataObj.get("address");
    const city = formDataObj.get("city");
    const state = formDataObj.get("state");

    if (!email || !phone || !firstName || !lastName || !address || !city || !state) {
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    // ✅ Create customer data object
    const customerData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      country: formDataObj.get("country") || "Nigeria",
      postalCode: formDataObj.get("postalCode") || "",
      notes: formDataObj.get("notes") || "",
    };

    // ✅ Store form data in both state and ref

    // Prepare order data for backend
    const orderData = {
      cartItems: cartItems.map(item => ({
        _id: item._id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        image: item.image,
      })),
      customerDetails: customerData,
      total: total,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      deliveryMethod: deliveryMethod,
      paymentMethod: paymentMethod,
    };

    setIsProcessing(true);
    setStatusMessage("Processing your order...");

    try {
      // Send order to backend
      const paymentData = await initializePaymentWithBackend(orderData);
      
      // Store the reference in ref
      const reference = paymentData.reference;
      backendReferenceRef.current = reference;

      console.log('✅ Payment reference received:', reference);

      // If payment method is bank transfer, redirect to success
      if (paymentMethod === 'bank') {
        localStorage.setItem("lastOrder", JSON.stringify(paymentData.order));
        clearCart();
        setCartItems([]);
        setIsProcessing(false);
        navigate("/order-success");
        return;
      }

      // ✅ For Paystack, open payment directly with the reference and customer data
      setStatusMessage("Initializing payment...");
      
      // Open Paystack with the reference and customer data
      setTimeout(() => {
        openPaystack(reference, customerData);
      }, 300);

    } catch (error) {
      console.error('❌ Checkout error:', error);
      setStatusMessage(error.message || "An error occurred. Please try again.");
      setIsProcessing(false);
      setPaymentInitialized(false);
    }
  };

  const handleRemoveItem = (productId) => {
    const nextItems = removeCartItem(productId);
    setCartItems(nextItems);
    window.dispatchEvent(new Event("cart:updated"));
    setStatusMessage("");
  };

  return (
    <main className="checkout-page">
      {isProcessing && (
  <div className="checkout-page__overlay" role="alert" aria-live="polite">
    <div className="checkout-page__overlay-spinner" />
    <p className="checkout-page__overlay-text">
      {statusMessage || "Processing..."}
    </p>
  </div>
)}
      <header className="checkout-page__header">
        <div>
          <p className="checkout-page__eyebrow">Secure checkout</p>
          <h1>Complete your order</h1>
        </div>
        <Link to="/shop" className="checkout-page__continue">
          Continue shopping
        </Link>
      </header>

      <form className="checkout-page__layout" onSubmit={handleSubmit} ref={formRef}>
        <div className="checkout-page__main">
          <section className="checkout-section">
            <div className="checkout-section__heading">
              <span>1</span>
              <div>
                <h2>Contact</h2>
                <p>Where should we send order updates?</p>
              </div>
            </div>

            <div className="checkout-form__grid">
              <label className="checkout-field">
                <span>Email address *</span>
                <input 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                />
              </label>
              <label className="checkout-field">
                <span>Phone number *</span>
                <input 
                  name="phone" 
                  type="tel" 
                  autoComplete="tel" 
                  required 
                />
              </label>
            </div>
          </section>

          <section className="checkout-section">
            <div className="checkout-section__heading">
              <span>2</span>
              <div>
                <h2>Delivery details</h2>
                <p>Use the address where your handmade piece should arrive.</p>
              </div>
            </div>

            <div className="checkout-form__grid">
              <label className="checkout-field">
                <span>First name *</span>
                <input
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                />
              </label>
              <label className="checkout-field">
                <span>Last name *</span>
                <input
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                />
              </label>
              <label className="checkout-field checkout-field--full">
                <span>Address *</span>
                <input
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  required
                />
              </label>
              <label className="checkout-field">
                <span>City *</span>
                <input name="city" type="text" autoComplete="address-level2" required />
              </label>
              <label className="checkout-field">
                <span>State *</span>
                <input
                  name="state"
                  type="text"
                  autoComplete="address-level1"
                  required
                />
              </label>
              <label className="checkout-field">
                <span>Country</span>
                <select name="country" autoComplete="country-name" defaultValue="Nigeria">
                  <option>Nigeria</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Ghana</option>
                </select>
              </label>
              <label className="checkout-field">
                <span>Postal code</span>
                <input name="postalCode" type="text" autoComplete="postal-code" />
              </label>
            </div>
          </section>

          <section className="checkout-section">
            <div className="checkout-section__heading">
              <span>3</span>
              <div>
                <h2>Delivery method</h2>
                <p>Choose the option that fits your location.</p>
              </div>
            </div>

            <div className="checkout-choice-group">
              {DELIVERY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`checkout-choice ${deliveryMethod === option.id ? "checkout-choice--selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={option.id}
                    checked={deliveryMethod === option.id}
                    onChange={() => setDeliveryMethod(option.id)}
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.detail}</small>
                  </span>
                  <b>{option.fee === 0 ? "Free" : formatMoney(option.fee)}</b>
                </label>
              ))}
            </div>
          </section>

          <section className="checkout-section">
            <div className="checkout-section__heading">
              <span>4</span>
              <div>
                <h2>Payment</h2>
                <p>Select how you want to pay for your order.</p>
              </div>
            </div>

            <div className="checkout-choice-group">
              {PAYMENT_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`checkout-choice ${paymentMethod === option.id ? "checkout-choice--selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={() => setPaymentMethod(option.id)}
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.detail}</small>
                  </span>
                </label>
              ))}
            </div>

            <label className="checkout-checkbox">
              <input
                type="checkbox"
                checked={billingSameAsShipping}
                onChange={(event) =>
                  setBillingSameAsShipping(event.target.checked)
                }
              />
              <span>Billing address is the same as delivery address</span>
            </label>
          </section>

          <section className="checkout-section">
            <div className="checkout-section__heading">
              <span>5</span>
              <div>
                <h2>Order notes</h2>
                <p>Add sizing, color, delivery, or gifting details.</p>
              </div>
            </div>

            <label className="checkout-field">
              <span>Notes</span>
              <textarea
                name="notes"
                rows="4"
                placeholder="Anything we should know before preparing your order?"
              />
            </label>
          </section>
        </div>

        <aside className="checkout-summary" aria-label="Order summary">
          <h2>Order summary</h2>

          {cartItems.length === 0 ? (
            <div className="checkout-summary__empty">
              <p>Your bag is empty.</p>
              <Link to="/shop">Shop products</Link>
            </div>
          ) : (
            <div className="checkout-summary__items">
              {cartItems.map((item) => {
                const imageUrl = item.image
                  ? urlFor(item.image).width(160).height(160).url()
                  : null;

                return (
                  <div key={item._id} className="checkout-summary__item">
                    <div className="checkout-summary__image">
                      {imageUrl ? (
                        <img src={imageUrl} alt={item.name} />
                      ) : (
                        <span aria-hidden="true" />
                      )}
                    </div>
                    <div className="checkout-summary__item-info">
                      <p>{item.name}</p>
                      <small>Qty {item.quantity}</small>
                    </div>
                    <strong>
                      {formatMoney(Number(item.price) * item.quantity)}
                    </strong>
                    <button
                      type="button"
                      className="checkout-summary__delete"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <label className="checkout-summary__promo">
            <span>Promo code</span>
            <div>
              <input
                type="text"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                placeholder="Enter code"
              />
              <button type="button">Apply</button>
            </div>
          </label>

          <div className="checkout-summary__totals">
            <p>
              <span>Subtotal</span>
              <strong>{formatMoney(subtotal)}</strong>
            </p>
            <p>
              <span>Delivery</span>
              <strong>{deliveryFee === 0 ? "Free" : formatMoney(deliveryFee)}</strong>
            </p>
            <p className="checkout-summary__total">
              <span>Total</span>
              <strong>{formatMoney(total)}</strong>
            </p>
          </div>

          <button
            type="submit"
            className="checkout-summary__submit"
            disabled={cartItems.length === 0 || isProcessing || paymentInitialized}
          >
            {isProcessing 
              ? "Processing..." 
              : paymentInitialized 
                ? "Opening Payment..." 
                : paymentMethod === "paystack" 
                  ? `Pay ${formatMoney(total)}` 
                  : "Place order"}
          </button>

          {statusMessage ? (
            <p className={`checkout-summary__status ${isProcessing ? "checkout-summary__status--processing" : ""}`}>
              {statusMessage}
            </p>
          ) : null}

          <p className="checkout-summary__fine-print">
            Payment is confirmed after order review. Custom pieces may require
            extra preparation time.
          </p>
        </aside>
      </form>
    </main>
  );
}

export default CheckoutPage;
