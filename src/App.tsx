import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import './App.scss';
import { BiblePage } from './features/Bible/pages/BiblePage';
import { NotFoundPage } from './features/shared/pages/NotFoundPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App container-fluid">
        <Router>
          <Routes>
            <Route index path="/" element={<BiblePage />} />
            <Route path="/bible/">
              <Route
                path=""
                element={<BiblePage />}
              />
              <Route
                path="/bible/:versionId"
                element={<BiblePage />}
              />
              <Route
                path="/bible/:versionId/:bookId"
                element={<BiblePage />}
              />
              <Route
                path="/bible/:versionId/:bookId/:chapter"
                element={<BiblePage />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Outlet key={window.location.pathname} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
