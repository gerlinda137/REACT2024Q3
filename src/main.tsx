import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Root from './routes/root';
import ErrorPage from './pages/errorPage/errorPage';
import DetailedCard, {
  loader as detailedCardLoader
} from './components/detailedCard/detailedCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/:detailedId',
        element: <DetailedCard />,
        loader: detailedCardLoader
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
  // </React.StrictMode>
);
