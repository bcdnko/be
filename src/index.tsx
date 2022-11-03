import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BiblePage } from './features/Bible/pages/BiblePage';
import { NotFoundPage } from './features/shared/pages/NotFoundPage';
import { ErrorPage } from './features/shared/pages/ErrorPage';

const errorElement = <ErrorPage />;
const biblePage = <BiblePage key={window.location.href} />;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement,
    children: [
      {
        path: '',
        element: biblePage,
        errorElement,
      },
      {
        path: '/bible',
        element: biblePage,
        errorElement,
      },
      {
        path: '/bible/:versionId',
        element: biblePage,
        errorElement,
      },
      {
        path: '/bible/:versionId/:bookId',
        element: biblePage,
        errorElement,
      },
      {
        path: '/bible/:versionId/:bookId/:chapter',
        element: biblePage,
        errorElement,
      },
      {
        path: '*',
        element: <NotFoundPage />,
        errorElement,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
