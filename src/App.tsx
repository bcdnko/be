import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { SettingsProvider } from './features/shared/contexts/SettingsContext';
import { UserStorageProvider } from './features/shared/contexts/UserStorageContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <SettingsProvider>
            <UserStorageProvider>
              <Outlet key={window.location.pathname} />
            </UserStorageProvider>
          </SettingsProvider>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
