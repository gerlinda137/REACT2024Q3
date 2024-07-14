import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevClick}
        disabled={isFirstPage}
        className="pagination__button"
      >
        Previous
      </button>
      <span className="pagination__page-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextClick}
        disabled={isLastPage}
        className="pagination__button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
