import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Root from './routes/root';
import ErrorPage from './pages/errorPage/errorPage';
import { Provider } from 'react-redux';
import MainPage, { mainPageLoader } from './pages/main/mainPage';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
        loader: mainPageLoader
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </Provider>
  // </React.StrictMode>
);
