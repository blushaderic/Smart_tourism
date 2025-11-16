const Trip = require('../models/Trip');

exports.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if user owns the trip
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    const tripData = {
      ...req.body,
      userId: req.user.id,
    };

    const trip = await Trip.create(tripData);

    res.status(201).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if user owns the trip
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if user owns the trip
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

