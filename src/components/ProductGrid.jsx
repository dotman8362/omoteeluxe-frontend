import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "./ProductCard.jsx";
import { ArrowIcon } from "./Icons.jsx";
import { fetchProducts } from "../lib/sanity.js";
import "./ProductGrid.css";
import { Link } from 'react-router-dom';

function ProductGrid({
  collection,
  emptyMessage = "No products available yet.",
  heading = "Ready To Wear",
  showMoreHref = "/shop",
  autoSlideInterval = 3000, // Auto-slide interval in ms
  enableAutoSlide = true,
}) {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 640 ? 2 : 4,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const trackRef = useRef(null);
  const autoSlideTimerRef = useRef(null);
  const viewportRef = useRef(null);

  // Fetch products
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchProducts({ collection })
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProducts([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [collection]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 640 ? 2 : 4);
      setActiveIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset active index when products or items per page change
  useEffect(() => {
    setActiveIndex(0);
  }, [products.length, itemsPerPage]);

  // Auto-slide functionality
  useEffect(() => {
    if (!enableAutoSlide || isLoading || products.length === 0 || isPaused) {
      return;
    }

    autoSlideTimerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % Math.ceil(products.length / itemsPerPage));
    }, autoSlideInterval);

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [enableAutoSlide, isLoading, products.length, itemsPerPage, activeIndex, isPaused, autoSlideInterval]);

  // Prepare slides
  const slides = [];
  for (let i = 0; i < products.length; i += itemsPerPage) {
    slides.push(products.slice(i, i + itemsPerPage));
  }

  const totalSlides = slides.length;

  // Navigation functions
  const goToPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? totalSlides - 1 : current - 1,
    );
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Mouse drag for horizontal scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch support for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeaveCarousel = () => {
    setIsPaused(false);
  };

  return (
    <section 
      className="product-grid"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveCarousel}
    >
      <div className="product-grid__header">
        <h2 className="product-grid__heading">{heading}</h2>
        <Link to={showMoreHref} className="product-grid__show-more">
          Show more <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="product-grid__carousel">
        <div 
          className="product-grid__viewport"
          ref={viewportRef}
        >
          {isLoading ? (
            <div className="product-grid__loading">
              <div className="product-grid__spinner"></div>
              <p className="product-grid__loading-text">Loading products...</p>
            </div>
          ) : slides.length === 0 ? (
            <p className="product-grid__empty">{emptyMessage}</p>
          ) : (
            <div
              className="product-grid__track"
              ref={trackRef}
              style={{ 
                transform: `translateX(-${activeIndex * 100}%)`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {slides.map((slideProducts, index) => (
                <div key={index} className="product-grid__slide">
                  {slideProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Controls - Now below the grid */}
        {!isLoading && totalSlides > 1 && (
          <div className="product-grid__controls">
            <div className="product-grid__arrows">
              <button
                className="product-grid__arrow product-grid__arrow--prev"
                aria-label="Previous products"
                onClick={goToPrev}
              >
                <ArrowIcon direction="left" />
              </button>

              <button
                className="product-grid__arrow product-grid__arrow--next"
                aria-label="Next products"
                onClick={goToNext}
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="product-grid__dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`product-grid__dot ${
                    index === activeIndex ? 'product-grid__dot--active' : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
