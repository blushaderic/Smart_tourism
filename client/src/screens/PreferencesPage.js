import React from 'react';
import PreferencesForm from '../components/PreferencesForm';
import { colors } from '../constants/colors';

const PreferencesPage = () => {
  const handleSave = (preferences) => {
    console.log('Preferences saved:', preferences);
    alert('Preferences saved successfully!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Travel Preferences</h1>
      <p style={styles.subtitle}>
        Tell us about your travel preferences to get personalized recommendations
      </p>
      <PreferencesForm onSubmit={handleSave} />
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: colors.text,
  },
  subtitle: {
    fontSize: '18px',
    color: colors.textSecondary,
    marginBottom: '30px',
  },
};

export default PreferencesPage;

