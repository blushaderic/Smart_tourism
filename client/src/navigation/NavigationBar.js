import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../constants/routes';
import { strings } from '../constants/strings';
import { colors } from '../constants/colors';

const NavigationBar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: routes.HOME, label: strings.home },
    { path: routes.TRIPS, label: strings.trips },
    { path: routes.RECOMMENDATIONS, label: strings.recommendations },
    { path: routes.PREFERENCES, label: strings.preferences },
    { path: routes.GROUP_PLANNING, label: strings.groupPlanning },
    { path: routes.PROFILE, label: strings.profile },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to={routes.HOME} style={styles.logo}>
          {strings.appName}
        </Link>
        <div style={styles.links}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.link,
                ...(location.pathname === item.path && styles.activeLink),
              }}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={logout} style={styles.logoutButton}>
            {strings.logout}
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    padding: '15px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: colors.primary,
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: colors.text,
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  activeLink: {
    backgroundColor: colors.primary,
    color: 'white',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: colors.error,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default NavigationBar;

