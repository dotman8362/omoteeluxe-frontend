import CategoryCard from './CategoryCard.jsx';
import './CategoryShowcase.css';

import autogeleImg from '../assets/photo_2026-10-01_05-13-04.jpg';
import luxuryImg from '../assets/photo_2026-10-01_05-14-40.jpg';
import shopteeluxeImg from '../assets/photo_2026-10-01_05-14-47.jpg';
import readyToWearImg from '../assets/IMG_8484.JPEG';
import readyToWearImg1 from '../assets/WhatsApp Image 2026-05-30 at 06.45.36.jpeg';
const CATEGORIES = [
  {
    id: 1,
    label: 'Autogele',
    image: autogeleImg,
  },
  {
    id: 2,
    label: 'The Luxe Edits',
    image: luxuryImg,
  },
  {
    id: 3,
    label: 'Handfans',
    image: shopteeluxeImg,
  },
  {
    
    id: 4,
    label: 'Fila',
    image: readyToWearImg,
  },
  {
    id: 5,
    label: 'Made-To-Order',
    image: readyToWearImg1,
  },
];


function CategoryShowcase() {
  return (
    <section className="category-showcase">
      <div className="category-showcase__banner">
        <h2 className="category-showcase__banner-text">Shop by Category</h2>
      </div>

      <div className="category-showcase__list">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CategoryShowcase;