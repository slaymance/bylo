import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { GlobalContextProvider } from './GlobalContext';
import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
