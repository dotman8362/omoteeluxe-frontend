import TrustBadge from './TrustBadge.jsx';
import { ShippingIcon, PhoneIcon, PadlockIcon } from './TrustIcons.jsx';
import './TrustBadges.css';

const BADGES = [
  {
    id: 1,
    Icon: ShippingIcon,
    title: 'Fast shipping',
    description: 'Fast Worldwide shipping.',
  },
  {
    id: 2,
    Icon: PhoneIcon,
    title: 'Customer service',
    description: 'We are always online to answer your questions.',
  },
  {
    id: 3,
    Icon: PadlockIcon,
    title: 'Secure payment',
    description: 'Your payment information is processed securely.',
  },
];

function TrustBadges() {
  return (
    <section className="trust-badges">
      <div className="trust-badges__list">
        {BADGES.map((badge) => (
          <TrustBadge key={badge.id} badge={badge} />
        ))}
      </div>
    </section>
  );
}

export default TrustBadges;