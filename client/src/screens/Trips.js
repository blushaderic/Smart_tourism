import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import TripCard from '../components/TripCard';
import { routes } from '../constants/routes';
import { strings } from '../constants/strings';
import { colors } from '../constants/colors';

const Trips = () => {
  const navigate = useNavigate();
  const { trips, loading, error, deleteTrip } = useTrip();

  const handleTripClick = (trip) => {
    navigate(`${routes.TRIP_DETAIL.replace(':id', trip._id)}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      await deleteTrip(id);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p>{strings.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{strings.trips}</h1>
        <button
          onClick={() => navigate(routes.TRIPS + '/new')}
          style={styles.createButton}
        >
          {strings.createTrip}
        </button>
      </div>
      {trips.length === 0 ? (
        <div style={styles.empty}>
          <p>{strings.noTrips}</p>
          <button
            onClick={() => navigate(routes.TRIPS + '/new')}
            style={styles.createButton}
          >
            {strings.createTrip}
          </button>
        </div>
      ) : (
        <div style={styles.tripsList}>
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onClick={() => handleTripClick(trip)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px',
    backgroundColor: colors.background,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: colors.text,
  },
  createButton: {
    padding: '12px 24px',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  tripsList: {
    display: 'flex',
    flexDirection: 'column',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: colors.textSecondary,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
  },
};

export default Trips;

