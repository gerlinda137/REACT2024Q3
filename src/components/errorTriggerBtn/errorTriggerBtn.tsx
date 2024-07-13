import React, { useState, useEffect, useRef } from 'react';

const ErrorTrigger: React.FC = () => {
  const [throwError, setThrowError] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const triggerError = () => {
    if (isMounted.current) {
      setThrowError(true);
    }
  };

  if (throwError) {
    throw new Error('Intentional Error');
  }

  return (
    <button className="error-btn" onClick={triggerError}>
      Click to trigger error
    </button>
  );
};

export default ErrorTrigger;
