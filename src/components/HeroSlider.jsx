import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./Icons.jsx";
import "./HeroSlider.css";
import heroImage from "../assets/IMG_9726.JPEG";
import heroImage1 from "../assets/IMG_8484.JPEG";
import heroImage2 from "../assets/IMG_8482.JPEG";

// Fixed SLIDES with proper gradient properties
const SLIDES = [
  {
    id: 1,
    image: heroImage,
    eyebrow: "New Season",
    heading: "OmoteeLuxe: Define Your Elegance.",
    subheading: "Designed for the woman who commands the room.",
    cta: "Shop Now",
   
  },
  {
    id: 2,
    image: heroImage1, // You should use different images for each slide
    eyebrow: "Limited Drop",
    heading: "Not Just Fashion. A Statement of Prestige.",
    subheading: "Where Heritage Meets Modern Glamour",
    cta: "Buy Now"
  },
  {
    id: 3,
    image: heroImage2, // Use different images here too
    eyebrow: "Made To Order",
    heading: "OmoteeLuxe: The New Standard",
    subheading: "Rooted in Nigerian craft, styled for every wardrobe.",
    cta: "View Collection"
  },
];

const AUTOPLAY_MS = 6000;

function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Autoplay, paused while a pointer is over the slider.
  const restartAutoplay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restartAutoplay();
    return () => clearInterval(timerRef.current);
  }, [restartAutoplay]);

  const pauseAutoplay = () => clearInterval(timerRef.current);

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={restartAutoplay}
    >
      <div className="hero-slider__track">
        {SLIDES.map((slide, index) => {
          // Fixed background styling
          const backgroundImage = slide.image 
            ? `url(${slide.image})` 
            : 'none';
          
          const backgroundStyle = {
            backgroundImage: backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          };

          return (
            <div
              key={slide.id}
              className={`hero-slide ${index === activeIndex ? "hero-slide--active" : ""}`}
              style={backgroundStyle}
              aria-hidden={index !== activeIndex}
            >
              {/* Optional: Add overlay gradient inside the slide */}
              <div 
                className="hero-slide__overlay"
                style={{ 
                  background: slide.gradient || 'rgba(0,0,0,0.3)'
                }}
              />
              <div
                className="hero-slide__swatch"
                style={{ background: slide.accentGradient }}
              />
            </div>
          );
        })}
      </div>

      <div className="hero-slider__overlay">
        <div className="hero-slider__copy">
          <span className="hero-slider__eyebrow">
            {SLIDES[activeIndex].eyebrow}
          </span>
          <h1 className="hero-slider__heading">
            {SLIDES[activeIndex].heading}
          </h1>
          <p className="hero-slider__subheading">
            {SLIDES[activeIndex].subheading}
          </p>

          <div className="hero-slider__actions">
            <button className="hero-slider__cta">
              {SLIDES[activeIndex].cta}
            </button>
          </div>
        </div>
      </div>

      <button
        className="hero-slider__arrow hero-slider__arrow--prev"
        aria-label="Previous slide"
        onClick={goPrev}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        className="hero-slider__arrow hero-slider__arrow--next"
        aria-label="Next slide"
        onClick={goNext}
      >
        <ArrowIcon direction="right" />
      </button>

      <div className="hero-slider__dots">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            className={`hero-slider__dot ${index === activeIndex ? "hero-slider__dot--active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
