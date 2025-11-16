import React, { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { aiService } from '../services/aiService';
import PreferencesForm from '../components/PreferencesForm';
import RecommendationsList from '../components/RecommendationsList';
import { colors } from '../constants/colors';

const RecommendationsPage = () => {
  const { preferences } = usePreferences();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetRecommendations = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiService.getRecommendations(formData || preferences);
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Get Personalized Recommendations</h1>
      <div style={styles.content}>
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Your Preferences</h2>
          <PreferencesForm onSubmit={handleGetRecommendations} />
        </div>
        <div style={styles.recommendationsSection}>
          <h2 style={styles.sectionTitle}>Recommendations</h2>
          {loading ? (
            <p style={styles.loading}>Loading recommendations...</p>
          ) : error ? (
            <p style={styles.error}>{error}</p>
          ) : (
            <RecommendationsList
              recommendations={recommendations}
              onSelect={(rec) => console.log('Selected:', rec)}
            />
          )}
        </div>
      </div>
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
    marginBottom: '30px',
    color: colors.text,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '40px',
  },
  formSection: {
    backgroundColor: colors.surface,
    padding: '30px',
    borderRadius: '8px',
  },
  recommendationsSection: {
    backgroundColor: colors.surface,
    padding: '30px',
    borderRadius: '8px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: colors.text,
  },
  loading: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: '40px',
  },
  error: {
    textAlign: 'center',
    color: colors.error,
    padding: '40px',
  },
};

export default RecommendationsPage;

