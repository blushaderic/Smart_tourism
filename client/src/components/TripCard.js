import React from 'react';
import { formatDateRange } from '../utils/formatDate';
import { colors } from '../constants/colors';

const TripCard = ({ trip, onClick, onEdit, onDelete }) => {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.header}>
        <h3 style={styles.title}>{trip.destination}</h3>
        <div style={styles.actions}>
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(trip);
              }}
              style={styles.actionButton}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(trip._id);
              }}
              style={{ ...styles.actionButton, ...styles.deleteButton }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <p style={styles.description}>{trip.description}</p>
      <div style={styles.meta}>
        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
        <span style={styles.budget}>${trip.budget}</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: colors.text,
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  actionButton: {
    padding: '5px 10px',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  description: {
    color: colors.textSecondary,
    marginBottom: '15px',
    lineHeight: '1.5',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: colors.textSecondary,
  },
  budget: {
    fontWeight: 'bold',
    color: colors.primary,
  },
};

export default TripCard;

