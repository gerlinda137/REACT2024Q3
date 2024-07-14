import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Root from './routes/root';
import ErrorPage from './pages/errorPage/errorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <RouterProvider router={router} />
    {/* <App /> */}
  </ErrorBoundary>
  // </React.StrictMode>
);
