import React from 'react';
import { useEffect, useState } from 'react';
import './loader.scss';

interface LoaderProps {
  text?: string;
  isLoading: boolean;
}

const SearchLoader: React.FC<LoaderProps> = ({
  text = 'LOADING...',
  isLoading
}) => {
  const [internalLoading, setInternalLoading] = useState<boolean>(isLoading);

  useEffect(() => {
    if (isLoading !== internalLoading) {
      setInternalLoading(isLoading);
    }
  }, [isLoading, internalLoading]);

  if (internalLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>{text}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default SearchLoader;
