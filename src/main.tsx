import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './pages/errorPage/errorPage';
import DetailedCard /*, {
  loader as detailedCardLoader
}*/ from './components/detailedCard/detailedCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: [
      {
        path: '/:detailedId',
        element: (
          <DetailedCard
            title="Kek"
            year="1996"
            director="kek"
            description="kek"
            poster="kek"
          />
        )
      }
    ]
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
