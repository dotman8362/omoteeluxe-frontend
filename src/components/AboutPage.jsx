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
    title: "Crafted with intention",
    text: "Every piece is shaped by hand, with care taken at every stitch and finish.",
    icon: Heart,
  },
  {
    title: "Rooted in heritage",
    text: "Our designs draw from Nigerian artistry and the timeless detail of modern luxury.",
    icon: Award,
  },
  {
    title: "Made to be worn",
    text: "We create pieces that feel effortless, elevated, and lasting in your wardrobe.",
    icon: Star,
  },
];

const MILESTONES = [
  {
    year: "2019",
    title: "Slow-made beginnings",
    text: "The studio began with a love of tactile, expressive pieces and the belief that beauty should feel personal.",
  },
  {
    year: "2021",
    title: "Signature detailing",
    text: "From sculptural silhouettes to rich textures, each design balances softness with confidence.",
  },
  {
    year: "2023",
    title: "A modern luxury house",
    text: "Today, Omoteeluxee brings  elegance to clients who appreciate timeless style.",
  },
];

const STATS = [
  { number: "30+", label: "Hours per piece", icon: Clock },
  { number: "100%", label: "Handcrafted", icon: Sparkles },
  { number: "50+", label: "Unique designs", icon: Gem },
  { number: "1000+", label: "Happy clients", icon: Users },
];

function AboutPage() {
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="about-page__hero">
        <div className="about-page__hero-content">
          <div className="about-page__hero-badge">
            <span className="about-page__hero-badge-dot" />
            Established 2019
          </div>
          <p className="about-page__eyebrow">About Omoteeluxee</p>
          <h1 className="about-page__hero-title">
            Luxury, crafted by hand and styled with intention.
          </h1>
          <p className="about-page__hero-text">
            We design pieces that feel intimate and elevated — rooted in
            Nigerian craft, shaped by modern elegance, and made to be treasured.
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
            <p className="about-page__hero-card-label">Crafted in Nigeria</p>
            <h2 className="about-page__hero-card-title">
              Every creation begins with texture, story, and purpose.
            </h2>
            <p className="about-page__hero-card-text">
              From the first stitch to the final finish, each product is shaped
              with a balance of artistry and precision.
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
            <span className="about-page__story-label">Our story</span>
            <h2 className="about-page__story-title">
              Born from tradition. Refined for the modern wardrobe.
            </h2>
            <div className="about-page__story-divider" />
            <p className="about-page__story-text">
              Omoteeluxee is a celebration of slow craftsmanship and elevated
              everyday beauty. Our work honours heritage while embracing the
              confidence and ease of contemporary luxury.
            </p>
            <p className="about-page__story-text">
              We believe the finest fashion should feel personal — tactile,
              expressive, and built to last beyond a single season.
            </p>
          </div>

          <div className="about-page__story-quote">
            <div className="about-page__quote-mark">"</div>
            <blockquote className="about-page__quote-text">
              Beauty is not loud. It is intentional, thoughtful, and made to endure.
            </blockquote>
            <cite className="about-page__quote-author">— Omoteeluxee</cite>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-page__values-section">
        <div className="about-page__values-header">
          <span className="about-page__values-label">Our values</span>
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
          <span className="about-page__craft-label">The process</span>
          <h2 className="about-page__craft-title">Made slowly, worn forever.</h2>
          <p className="about-page__craft-description">
            Each piece is shaped through a careful process of handwork, detail,
            and quality control, resulting in pieces that feel elevated and enduring.
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
          <h2 className="about-page__cta-title">Experience the craft</h2>
          <p className="about-page__cta-text">
            Discover pieces that tell a story of heritage, artistry, and timeless elegance.
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
