import React from 'react';
import { colors } from '../constants/colors';

const RecommendationsList = ({ recommendations, onSelect }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No recommendations available. Update your preferences to get personalized suggestions.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {recommendations.map((rec, index) => (
        <div
          key={index}
          style={styles.card}
          onClick={() => onSelect && onSelect(rec)}
        >
          <h3 style={styles.title}>{rec.destination}</h3>
          <p style={styles.description}>{rec.description}</p>
          <div style={styles.meta}>
            <span style={styles.badge}>${rec.estimatedCost}</span>
            <span style={styles.badge}>{rec.duration} days</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: colors.text,
  },
  description: {
    color: colors.textSecondary,
    marginBottom: '15px',
    lineHeight: '1.5',
  },
  meta: {
    display: 'flex',
    gap: '10px',
  },
  badge: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: colors.textSecondary,
  },
};

export default RecommendationsList;

