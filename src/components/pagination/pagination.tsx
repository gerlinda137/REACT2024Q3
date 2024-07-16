import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate(`page=${newPage}`);
  };

  const handlePrevClick = () => {
    if (!isFirstPage) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      handlePageChange(currentPage + 1);
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
