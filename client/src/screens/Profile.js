import React from 'react';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div style={styles.container}>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Profile</h1>
        <div style={styles.info}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <p style={styles.value}>{user.name}</p>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <p style={styles.value}>{user.email}</p>
          </div>
        </div>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px',
    backgroundColor: colors.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: '8px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: colors.text,
  },
  info: {
    marginBottom: '30px',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: colors.textSecondary,
    marginBottom: '5px',
  },
  value: {
    fontSize: '18px',
    color: colors.text,
    margin: 0,
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: colors.error,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Profile;

