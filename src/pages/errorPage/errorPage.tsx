import React from 'react';
import { ErrorResponse, useRouteError } from 'react-router-dom';
import './errorPage.scss';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText ? error.statusText : 'Not Found'}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
