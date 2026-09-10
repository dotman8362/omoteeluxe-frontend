import CategoryCard from './CategoryCard.jsx';
import './CategoryShowcase.css';

import autogeleImg from '../assets/front-view-smiley-woman-outdoors.jpg';
import luxuryImg from '../assets/picture-details-long-green-dress-made-dense-fabric-with-neat-tailoring-white-buttons.jpg';
import shopteeluxeImg from '../assets/smiling-pretty-elegant-lady-white-hat-black-dress-walking-street-fashion-street-concept.jpg';
import readyToWearImg from '../assets/IMG_8484.JPEG';
const CATEGORIES = [
  {
    id: 1,
    label: 'Autogele',
    image: autogeleImg,
  },
  {
    id: 2,
    label: 'Luxury',
    image: luxuryImg,
  },
  {
    id: 3,
    label: 'Shopteeluxe',
    image: shopteeluxeImg,
  },
  {
    id: 4,
    label: 'Ready To Wear',
    image: readyToWearImg,
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