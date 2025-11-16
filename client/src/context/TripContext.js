import React, { createContext, useState, useContext, useEffect } from 'react';
import { tripService } from '../services/tripService';

const TripContext = createContext();

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tripService.getAllTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (tripData) => {
    setLoading(true);
    setError(null);
    try {
      const newTrip = await tripService.createTrip(tripData);
      setTrips([...trips, newTrip]);
      return { success: true, trip: newTrip };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = async (id, tripData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTrip = await tripService.updateTrip(id, tripData);
      setTrips(trips.map((trip) => (trip._id === id ? updatedTrip : trip)));
      return { success: true, trip: updatedTrip };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await tripService.deleteTrip(id);
      setTrips(trips.filter((trip) => trip._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    trips,
    currentTrip,
    loading,
    error,
    loadTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    setCurrentTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

