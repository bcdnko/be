import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { MarksStorageProvider } from './ui/context/MarksStorageContext';
import { SettingsProvider } from './ui/context/SettingsContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <SettingsProvider>
            <MarksStorageProvider>
              <Outlet key={window.location.pathname} />
            </MarksStorageProvider>
          </SettingsProvider>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
