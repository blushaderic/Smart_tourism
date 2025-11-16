import React, { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { colors } from '../constants/colors';

const PreferencesForm = ({ onSubmit }) => {
  const { preferences, updatePreferences } = usePreferences();
  const [formData, setFormData] = useState(preferences);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePreferences(formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Budget</label>
        <input
          type="text"
          value={formData.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
          style={styles.input}
          placeholder="e.g., $1000-$2000"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Duration (days)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          style={styles.input}
          placeholder="e.g., 7"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Interests</label>
        <input
          type="text"
          value={formData.interests.join(', ')}
          onChange={(e) =>
            handleChange(
              'interests',
              e.target.value.split(',').map((i) => i.trim())
            )
          }
          style={styles.input}
          placeholder="e.g., beaches, mountains, culture"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Accommodation Type</label>
        <select
          value={formData.accommodation}
          onChange={(e) => handleChange('accommodation', e.target.value)}
          style={styles.input}
        >
          <option value="">Select...</option>
          <option value="hotel">Hotel</option>
          <option value="resort">Resort</option>
          <option value="hostel">Hostel</option>
          <option value="airbnb">Airbnb</option>
        </select>
      </div>

      <button type="submit" style={styles.button}>
        Save Preferences
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: colors.text,
  },
  input: {
    width: '100%',
    padding: '10px',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default PreferencesForm;

