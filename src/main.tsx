import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './providers/AuthProvider';
import { ProductProvider } from './providers/ProductProvider'; 
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.css';
import { EventProvider } from './providers/EventProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <EventProvider> 
          <ProductProvider>
            <App />
          </ProductProvider>
        </EventProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
