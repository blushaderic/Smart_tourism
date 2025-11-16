import api from './api';

export const tripService = {
  getAllTrips: async () => {
    const response = await api.get('/api/trips');
    return response.data.data || response.data;
  },

  getTripById: async (id) => {
    const response = await api.get(`/api/trips/${id}`);
    return response.data.data || response.data;
  },

  createTrip: async (tripData) => {
    const response = await api.post('/api/trips', tripData);
    return response.data.data || response.data;
  },

  updateTrip: async (id, tripData) => {
    const response = await api.put(`/api/trips/${id}`, tripData);
    return response.data.data || response.data;
  },

  deleteTrip: async (id) => {
    const response = await api.delete(`/api/trips/${id}`);
    return response.data;
  },

  getGroupTrips: async (groupId) => {
    const response = await api.get(`/api/groups/${groupId}/trips`);
    return response.data.data || response.data;
  },
};

