const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

router.use(authMiddleware);

router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getTripById);
router.post('/', validateRequest.createTrip, tripController.createTrip);
router.put('/:id', validateRequest.updateTrip, tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;

