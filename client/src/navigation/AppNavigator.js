import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../constants/routes';
import Home from '../screens/Home';
import Trips from '../screens/Trips';
import Profile from '../screens/Profile';
import RecommendationsPage from '../screens/RecommendationsPage';
import PreferencesPage from '../screens/PreferencesPage';
import GroupTripPlanning from '../screens/GroupTripPlanning';
import AuthNavigator from './AuthNavigator';
import NavigationBar from './NavigationBar';

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated && <NavigationBar />}
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route
          path={routes.LOGIN}
          element={
            isAuthenticated ? <Navigate to={routes.HOME} /> : <AuthNavigator />
          }
        />
        <Route
          path={routes.REGISTER}
          element={
            isAuthenticated ? <Navigate to={routes.HOME} /> : <AuthNavigator />
          }
        />
        <Route
          path={routes.TRIPS}
          element={
            isAuthenticated ? <Trips /> : <Navigate to={routes.LOGIN} />
          }
        />
        <Route
          path={routes.PROFILE}
          element={
            isAuthenticated ? <Profile /> : <Navigate to={routes.LOGIN} />
          }
        />
        <Route path={routes.RECOMMENDATIONS} element={<RecommendationsPage />} />
        <Route path={routes.PREFERENCES} element={<PreferencesPage />} />
        <Route
          path={routes.GROUP_PLANNING}
          element={
            isAuthenticated ? (
              <GroupTripPlanning />
            ) : (
              <Navigate to={routes.LOGIN} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default AppNavigator;

