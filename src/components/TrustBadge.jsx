import './TrustBadge.css';

function TrustBadge({ badge }) {
  const { Icon, title, description } = badge;

  return (
    <div className="trust-badge">
      <div className="trust-badge__icon-wrap">
        <Icon className="trust-badge__icon" />
      </div>
      <h3 className="trust-badge__title">{title}</h3>
      <p className="trust-badge__description">{description}</p>
    </div>
  );
}

export default TrustBadge;