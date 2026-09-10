import { 
  Award, 
  Truck, 
  Percent, 
  CheckCircle
} from 'lucide-react';
import './TrustFeatures.css';

const FEATURES = [
  {
    id: 1,
    Icon: Award,
    title: 'Premium Craftsmanship',
    description: 'Carefully selected fabrics & expert tailoring',
    iconProps: { size: 24, strokeWidth: 1.5 }
  },
  {
    id: 2,
    Icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Fast and secure shipping across Nigeria',
    iconProps: { size: 24, strokeWidth: 1.5 }
  },
  {
    id: 3,
    Icon: Percent,
    title: 'Exclusive Collections',
    description: "Unique styles you won't find everywhere",
    iconProps: { size: 24, strokeWidth: 1.5 }
  },
  {
    id: 4,
    Icon: CheckCircle,
    title: 'Authentic Luxury Pieces',
    description: 'Quality fashion designed to stand out',
    iconProps: { size: 24, strokeWidth: 1.5 }
  },
];

function TrustFeatures() {
  return (
    <section className="trust-features">
      <ul className="trust-features__list">
        {FEATURES.map(({ id, Icon, title, description, iconProps }) => (
          <li className="trust-features__item" key={id}>
            <span className="trust-features__icon">
              <Icon {...iconProps} />
            </span>
            <span className="trust-features__copy">
              <span className="trust-features__title">{title}</span>
              <span className="trust-features__description">{description}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TrustFeatures;
