import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { PreferencesProvider } from './context/PreferencesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TripProvider>
        <PreferencesProvider>
          <App />
        </PreferencesProvider>
      </TripProvider>
    </AuthProvider>
  </React.StrictMode>
);

