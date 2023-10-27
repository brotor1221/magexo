import React, { useState } from 'react';
import './styles/dropdownStyles.css';

function CustomDropdown({ categories, onCategoryChange }) {
    const [isOpen, setIsOpen] = useState(false);
    
        // eslint-disable-next-line no-unused-vars
    const [selectedCategory, setSelectedCategory] = useState({ id: '', title: 'All Products' });

    const handleItemClick = (category) => {
      setSelectedCategory(category);
      onCategoryChange(category.id);
      setIsOpen(false);
    };
  
    return (
<div className="dropdown" style={{ marginBottom: isOpen ? '300px' : '0' }}>
        <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        Select category 
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => handleItemClick({ id: '', title: 'All Products' })}>
              All Products
            </div>
            {categories.map(category => (
              <div 
                key={category.id} 
                className="dropdown-item" 
                onClick={() => handleItemClick(category)}
              >
                {category.title}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  

  export default CustomDropdown;