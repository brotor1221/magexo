import React from 'react';

function Pagination({ currentPage, onPageChange, hasNextPage, hasPreviousPage }) {
  return (
    <div className="pagination">
      {hasPreviousPage && 
        <button 
          className="pagination__button" 
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>}
      <span className="pagination__number pagination__number--active">
        Page: {currentPage}
      </span>
      {hasNextPage && 
        <button 
          className="pagination__button" 
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>}
    </div>
  );
}

export default Pagination;
