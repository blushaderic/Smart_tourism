import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../constants/routes';
import { strings } from '../constants/strings';
import { colors } from '../constants/colors';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>{strings.welcome}</h1>
        {isAuthenticated && user && (
          <p style={styles.subtitle}>Welcome back, {user.name}!</p>
        )}
        <div style={styles.actions}>
          <button
            onClick={() => navigate(routes.RECOMMENDATIONS)}
            style={styles.button}
          >
            Get Recommendations
          </button>
          <button
            onClick={() => navigate(routes.TRIPS)}
            style={styles.button}
          >
            View My Trips
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate(routes.GROUP_PLANNING)}
              style={styles.button}
            >
              Group Planning
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '40px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '24px',
    color: colors.textSecondary,
    marginBottom: '40px',
  },
  actions: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default Home;

