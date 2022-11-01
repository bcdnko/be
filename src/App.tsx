import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet, ScrollRestoration } from "react-router-dom";
import './App.scss';
import { SettingsProvider } from './core/contexts/SettingsContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App container-fluid">
          <SettingsProvider>
            <Outlet key={window.location.pathname} />
          </SettingsProvider>
        </div>
      </QueryClientProvider>

      <ScrollRestoration />
    </>
  );
}

export default App;
