import React, { createContext, useState, useContext } from 'react';

const PreferencesContext = createContext();

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    budget: '',
    duration: '',
    interests: [],
    accommodation: '',
    transportation: '',
    activities: [],
    climate: '',
    season: '',
  });

  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  const resetPreferences = () => {
    setPreferences({
      budget: '',
      duration: '',
      interests: [],
      accommodation: '',
      transportation: '',
      activities: [],
      climate: '',
      season: '',
    });
  };

  const value = {
    preferences,
    updatePreferences,
    resetPreferences,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

