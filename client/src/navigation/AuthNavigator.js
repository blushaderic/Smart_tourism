import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../constants/routes';
import { colors } from '../constants/colors';

const AuthNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const isLogin = location.pathname === routes.LOGIN;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate(routes.HOME);
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        const result = await register(formData);
        if (result.success) {
          navigate(routes.HOME);
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          )}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p style={styles.switch}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <a
            href={isLogin ? routes.REGISTER : routes.LOGIN}
            style={styles.link}
          >
            {isLogin ? 'Register' : 'Login'}
          </a>
        </p>
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
  card: {
    backgroundColor: colors.surface,
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
    color: colors.text,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
    padding: '12px',
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
    marginTop: '10px',
  },
  error: {
    color: colors.error,
    marginBottom: '20px',
    textAlign: 'center',
  },
  switch: {
    textAlign: 'center',
    marginTop: '20px',
    color: colors.textSecondary,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default AuthNavigator;

