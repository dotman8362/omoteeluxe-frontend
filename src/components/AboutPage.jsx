import "./AboutPage.css";
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  Heart, 
  Star,
  Sparkles,
  Clock,
  Users,
  Gem,
} from 'lucide-react';

const VALUES = [
  {
    title: "Effortless by design",
    text: "Getting dressed should feel effortless — pieces curated so you never have to overthink what to wear.",
    icon: Heart,
  },
  {
    title: "Refined, not loud",
    text: "Luxury is how you feel when you wear it. Every detail is chosen to help you feel completely put together.",
    icon: Award,
  },
  {
    title: "Made to move with you",
    text: "From work to church, brunch, celebrations, and everyday moments — designed to move beautifully with you.",
    icon: Star,
  },
];

const MILESTONES = [
  {
    year: "Our Philosophy",
    title: "Luxury is how you feel",
    text: "Luxury is more than what you wear. It is how you feel when you wear it — polished, elegant, and effortlessly expensive.",
  },
  {
    year: "The Founder",
    title: "The woman behind the brand",
    text: "Founded by Omotee, Omoteeluxe was born from a love for fashion and a desire to make elevated dressing feel simpler and more accessible.",
  },
  {
    year: "Our Promise",
    title: "Your presence should speak",
    text: "Every woman who shops with Omoteeluxe should feel beautiful, confident, and completely put together — your presence should speak before you do.",
  },
];

const STATS = [
  { number: "100%", label: "Curated with care", icon: Sparkles },
  { number: "Effortless", label: "Everyday elegance", icon: Heart },
  { number: "Timeless", label: "Refined pieces", icon: Gem },
  { number: "1000+", label: "Women styled", icon: Users },
];

function AboutPage() {
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="about-page__hero">
        <div className="about-page__hero-content">
          <div className="about-page__hero-badge">
            <span className="about-page__hero-badge-dot" />
            Luxury Ready-To-Wear
          </div>
          <p className="about-page__eyebrow">About Omoteeluxe</p>
          <h1 className="about-page__hero-title">
            Polished, elegant, and effortlessly expensive.
          </h1>
          <p className="about-page__hero-text">
            Created for the modern woman who wants to look refined without
            overthinking what to wear — pieces that move beautifully with you,
            wherever the day takes you.
          </p>
          <div className="about-page__actions">
            <Link to="/shop" className="about-page__primary-btn">
              Explore the collection
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link 
              to="/product/909df4b1-145a-4782-82dd-0c319a07158f" 
              className="about-page__secondary-btn"
            >
              View featured piece
            </Link>
          </div>
        </div>

        <div className="about-page__hero-visual">
          <div className="about-page__hero-card">
            <div className="about-page__hero-card-icon">
              <Sparkles size={28} strokeWidth={1.5} />
            </div>
            <p className="about-page__hero-card-label">For the modern woman</p>
            <h2 className="about-page__hero-card-title">
              Style that speaks before you do.
            </h2>
            <p className="about-page__hero-card-text">
              Beautiful details, refined versatility, and the quiet confidence
              that comes from feeling completely put together.
            </p>
            <div className="about-page__hero-card-decoration" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="about-page__stats">
        {STATS.map((stat, index) => (
          <div key={index} className="about-page__stat-item">
            <stat.icon 
              className="about-page__stat-icon" 
              size={24} 
              strokeWidth={1.5} 
            />
            <span className="about-page__stat-number">{stat.number}</span>
            <span className="about-page__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="about-page__story">
        <div className="about-page__story-content">
          <div className="about-page__story-copy">
            <span className="about-page__story-label">Our philosophy</span>
            <h2 className="about-page__story-title">
              Getting dressed should feel effortless.
            </h2>
            <div className="about-page__story-divider" />
            <p className="about-page__story-text">
              Omoteeluxe is a luxury ready-to-wear brand created for the modern
              woman who wants to look polished, elegant, and effortlessly
              expensive — without overthinking what to wear.
            </p>
            <p className="about-page__story-text">
              From everyday sophistication to work, church, brunch, celebrations,
              and special occasions, our pieces are designed to move beautifully
              with you — making it easier to show up with confidence and intention.
            </p>
          </div>

          <div className="about-page__story-quote">
            <div className="about-page__quote-mark">"</div>
            <blockquote className="about-page__quote-text">
              Luxury is more than what you wear. It is how you feel when you wear it.
            </blockquote>
            <cite className="about-page__quote-author">— Omoteeluxe</cite>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-page__values-section">
        <div className="about-page__values-header">
          <span className="about-page__values-label">Our promise</span>
          <h2 className="about-page__values-title">What we stand for</h2>
        </div>
        <div className="about-page__values-grid">
          {VALUES.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <article key={index} className="about-page__value-card">
                <div className="about-page__value-icon-wrapper">
                  <IconComponent 
                    className="about-page__value-icon" 
                    size={24} 
                    strokeWidth={1.5} 
                  />
                </div>
                <h3 className="about-page__value-title">{value.title}</h3>
                <p className="about-page__value-text">{value.text}</p>
              </article>
            );
          })}
        </div>
      </div>

      {/* Craft Section */}
      <div className="about-page__craft">
        <div className="about-page__craft-header">
          <span className="about-page__craft-label">The woman behind the brand</span>
          <h2 className="about-page__craft-title">Founded by Omotee.</h2>
          <p className="about-page__craft-description">
            Omoteeluxe was born from a love for fashion and a desire to make
            beautiful, elevated dressing feel simpler and more accessible — every
            collection reflecting a simple belief: your presence should speak
            before you do.
          </p>
        </div>

        <div className="about-page__timeline">
          {MILESTONES.map((milestone, index) => (
            <div key={index} className="about-page__timeline-item">
              <div className="about-page__timeline-connector">
                <span className="about-page__timeline-year">{milestone.year}</span>
                {index < MILESTONES.length - 1 && (
                  <div className="about-page__timeline-line" />
                )}
              </div>
              <div className="about-page__timeline-content">
                <h3 className="about-page__timeline-title">{milestone.title}</h3>
                <p className="about-page__timeline-text">{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-page__cta">
        <div className="about-page__cta-content">
          <h2 className="about-page__cta-title">Show up with confidence</h2>
          <p className="about-page__cta-text">
            Discover pieces designed to make you feel beautiful, confident, and
            completely put together — every single time.
          </p>
          <Link to="/shop" className="about-page__cta-btn">
            Shop the collection
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;