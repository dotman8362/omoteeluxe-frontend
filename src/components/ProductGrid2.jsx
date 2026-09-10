import ProductCard from './ProductCard.jsx';
import './ProductGrid2.css';

// Swap `imageGradient` for a real <img> inside ProductCard.jsx once you
// have product photography to drop in.
const PRODUCTS = [
  {
    id: 1,
    title: 'Premium straight raw wig (jet black)',
    price: '865.00',
    comparePrice: '910.00',
    saveAmount: '£45.00 GBP',
    rating: 5,
    reviewCount: 0,
    imageGradient: 'linear-gradient(160deg, #2a2a2a 0%, #141414 55%, #050505 100%)',
  },
  {
    id: 2,
    title: 'Premium raw fluffy bob wig (black root brown)',
    price: '450.00',
    comparePrice: '480.00',
    saveAmount: '£30.00 GBP',
    rating: 0,
    reviewCount: 0,
    imageGradient: 'linear-gradient(160deg, #3a2e26 0%, #241c17 55%, #100c09 100%)',
  },
  {
    id: 3,
    title: 'Premium raw wavy wig (burgundy)',
    price: '810.00',
    comparePrice: null,
    saveAmount: null,
    rating: 0,
    reviewCount: 0,
    imageGradient: 'linear-gradient(160deg, #5a2230 0%, #34141c 55%, #17090c 100%)',
  },
  {
    id: 4,
    title: 'Premium raw wavy wig (jet black)',
    price: '810.00',
    comparePrice: null,
    saveAmount: null,
    rating: 5,
    reviewCount: 0,
    imageGradient: 'linear-gradient(160deg, #262626 0%, #121212 55%, #040404 100%)',
  },
];

function ProductGrid() {
  return (
    <section className="product-grid">
      <div className="product-grid__list">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;