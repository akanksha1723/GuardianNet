import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './module1/contexts/ThemeContext.jsx';
import { AuthProvider } from './module1/contexts/AuthContext.jsx';

// Bootstrap's JS bundle (Popper + Bootstrap) is needed for components
// like the collapsible navbar toggler used on mobile.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

