const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch place details from Google Maps');
  }
};

exports.searchPlaces = async (query) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to search places from Google Maps');
  }
};

exports.getDirections = async (origin, destination) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin,
          destination,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get directions from Google Maps');
  }
};

