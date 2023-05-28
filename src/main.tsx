import React from 'react';
import ReactDOM from 'react-dom/client';

import { GlobalContextProvider } from './GlobalContext';
import App from './App';
import './index.css';
import './assets/bylo-mobile.png';
import './assets/bylo.png';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
)
