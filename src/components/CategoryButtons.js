import React from 'react';
import './styles/buttonStyles.css';

function CategoryButtons({ categories, onCategoryChange }) {
  const handleButtonClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className="button-container">
      <button
        className="category-button"
        onClick={() => handleButtonClick('')}
      >
        All Products
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className="category-button"
          onClick={() => handleButtonClick(category.id)}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
