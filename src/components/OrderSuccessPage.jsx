import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Calendar, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  ShoppingBag,
  AlertCircle,
  Printer,
  Check,
  Loader,
  Home,
  ShoppingCart,
} from 'lucide-react';
import './OrderSuccessPage.css';

function OrderSuccessPage() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Retrieve order data from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderData(parsedOrder);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  // Auto-redirect after 5 seconds (optional)
  useEffect(() => {
    if (!loading && !orderData) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading, orderData, navigate]);

  if (loading) {
    return (
      <div className="order-success__loading">
        <Loader size={48} className="order-success__spinner-icon" />
        <p>Loading your order details...</p>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="order-success__error">
        <div className="order-success__error-icon">
          <AlertCircle size={64} />
        </div>
        <h2>Order Not Found</h2>
        <p>We couldn't find your order details. This might be because:</p>
        <ul className="order-success__error-list">
          <li>You haven't placed an order yet</li>
          <li>The order confirmation was lost</li>
          <li>You're accessing this page directly</li>
        </ul>
        <div className="order-success__error-actions">
          <Link to="/" className="order-success__button order-success__button--primary">
            <Home size={18} />
            Return to Home
          </Link>
          <Link to="/shop" className="order-success__button order-success__button--secondary">
            <ShoppingCart size={18} />
            Browse Products
          </Link>
        </div>
        <p className="order-success__error-countdown">
          Redirecting to home in {countdown} seconds...
        </p>
      </div>
    );
  }

  const { 
    orderId, 
    items, 
    total, 
    deliveryMethod, 
    paymentMethod, 
    customerDetails, 
    orderDate,
    status,
    subtotal,
    deliveryFee
  } = orderData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDeliveryLabel = (method) => {
    const methods = {
      'lagos': 'Lagos Delivery (1-3 days)',
      'nationwide': 'Nationwide Delivery (3-7 days)',
      'pickup': 'Store Pickup'
    };
    return methods[method] || method;
  };

  return (
    <div className="order-success">
      {/* Success Header */}
      <div className="order-success__header">
        <div className="order-success__icon-wrapper">
          <CheckCircle size={64} className="order-success__icon" />
        </div>
        <div className="order-success__header-content">
          <h1 className="order-success__title">Order Confirmed!</h1>
          <p className="order-success__subtitle">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div className="order-success__order-id">
            <span>Order #</span>
            <strong>{orderId || 'Pending'}</strong>
          </div>
          <div className="order-success__status-badge">
            <span className="order-success__status-dot"></span>
            {status === 'confirmed' ? 'Confirmed' : 'Processing'}
          </div>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="order-success__details">
        <div className="order-success__detail-card">
          <div className="order-success__detail-icon">
            <Package size={20} />
          </div>
          <h3>Order Status</h3>
          <p className="order-success__status-text">
            <Check size={16} className="order-success__inline-icon" />
            {status === 'confirmed' ? 'Confirmed' : 'Processing'}
          </p>
        </div>

        <div className="order-success__detail-card">
          <div className="order-success__detail-icon">
            <Truck size={20} />
          </div>
          <h3>Delivery Method</h3>
          <p>{getDeliveryLabel(deliveryMethod)}</p>
        </div>

        <div className="order-success__detail-card">
          <div className="order-success__detail-icon">
            <Calendar size={20} />
          </div>
          <h3>Order Date</h3>
          <p>{orderDate ? formatDate(orderDate) : 'Today'}</p>
        </div>

        <div className="order-success__detail-card">
          <div className="order-success__detail-icon">
            <CreditCard size={20} />
          </div>
          <h3>Payment Method</h3>
          <p>{paymentMethod === 'paystack' ? 'Paystack' : 'Bank Transfer'}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="order-success__summary">
        <div className="order-success__summary-header">
          <h2 className="order-success__summary-title">
            <ShoppingBag size={20} />
            Order Summary
          </h2>
          <span className="order-success__summary-items">
            {items?.length || 0} {items?.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        <div className="order-success__items">
          {items && items.map((item, index) => (
            <div key={index} className="order-success__item">
              <div className="order-success__item-info">
                <span className="order-success__item-name">{item.name}</span>
                <span className="order-success__item-quantity">× {item.quantity}</span>
              </div>
              <span className="order-success__item-price">
                ₦{Number(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="order-success__totals">
          <div className="order-success__total-row">
            <span>Subtotal</span>
            <span>₦{subtotal?.toLocaleString() || '0'}</span>
          </div>
          <div className="order-success__total-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? 'Free' : `₦${deliveryFee?.toLocaleString() || '0'}`}</span>
          </div>
          <div className="order-success__total-row order-success__total-row--grand">
            <span>Total</span>
            <span>₦{total?.toLocaleString() || '0'}</span>
          </div>
        </div>

        {/* Shipping Address */}
        {customerDetails && (
          <div className="order-success__address">
            <div className="order-success__address-header">
              <MapPin size={18} />
              <h3>Shipping Address</h3>
            </div>
            <div className="order-success__address-content">
              <p>
                <strong>{customerDetails.firstName} {customerDetails.lastName}</strong><br />
                {customerDetails.address}<br />
                {customerDetails.city}, {customerDetails.state}<br />
                {customerDetails.country || 'Nigeria'}
              </p>
              <div className="order-success__address-contact">
                <span><Mail size={14} /> {customerDetails.email}</span>
                <span><Phone size={14} /> {customerDetails.phone}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Instructions for Bank Transfer */}
        {paymentMethod === 'bank' && (
          <div className="order-success__bank-transfer">
            <div className="order-success__bank-header">
              <Clock size={18} />
              <h3>Bank Transfer Instructions</h3>
            </div>
            <div className="order-success__bank-details">
              <div className="order-success__bank-row">
                <span className="order-success__bank-label">Bank:</span>
                <span className="order-success__bank-value">GTBank</span>
              </div>
              <div className="order-success__bank-row">
                <span className="order-success__bank-label">Account Name:</span>
                <span className="order-success__bank-value">Hooked by Lade</span>
              </div>
              <div className="order-success__bank-row">
                <span className="order-success__bank-label">Account Number:</span>
                <span className="order-success__bank-value order-success__bank-highlight">0123456789</span>
              </div>
              <div className="order-success__bank-row">
                <span className="order-success__bank-label">Amount:</span>
                <span className="order-success__bank-value order-success__bank-highlight">₦{total?.toLocaleString()}</span>
              </div>
              <div className="order-success__bank-row">
                <span className="order-success__bank-label">Reference:</span>
                <span className="order-success__bank-value order-success__bank-highlight">{orderId}</span>
              </div>
            </div>
            <p className="order-success__bank-note">
              <AlertCircle size={16} className="order-success__bank-note-icon" />
              Please use your Order ID as the payment reference. 
              We'll confirm your payment within 24 hours.
            </p>
          </div>
        )}
      </div>

      {/* What's Next Section */}
      <div className="order-success__next">
        <h3 className="order-success__next-title">What's Next?</h3>
        <div className="order-success__next-grid">
          <div className="order-success__next-item">
            <div className="order-success__next-number">1</div>
            <div>
              <h4>Order Confirmation</h4>
              <p>You'll receive a confirmation email with your order details.</p>
            </div>
          </div>
          <div className="order-success__next-item">
            <div className="order-success__next-number">2</div>
            <div>
              <h4>Processing</h4>
              <p>We'll prepare your items with care and attention to detail.</p>
            </div>
          </div>
          <div className="order-success__next-item">
            <div className="order-success__next-number">3</div>
            <div>
              <h4>Shipping</h4>
              <p>You'll receive a tracking number once your order ships.</p>
            </div>
          </div>
          <div className="order-success__next-item">
            <div className="order-success__next-number">4</div>
            <div>
              <h4>Delivery</h4>
              <p>Your handmade piece will arrive at your doorstep.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="order-success__actions">
        <Link to="/" className="order-success__button order-success__button--primary">
          <Home size={18} />
          Continue Shopping
          <ArrowRight size={18} />
        </Link>
        <Link to="/shop" className="order-success__button order-success__button--secondary">
          <ShoppingBag size={18} />
          Browse More Collections
        </Link>
        <button 
          className="order-success__button order-success__button--outline"
          onClick={() => window.print()}
        >
          <Printer size={18} />
          Print Order
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
