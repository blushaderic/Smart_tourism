const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

router.use(authMiddleware);

router.post('/', validateRequest.createGroup, groupController.createGroup);
router.get('/:id', groupController.getGroupById);
router.post('/:id/members', validateRequest.addMember, groupController.addMember);
router.get('/:id/trips', groupController.getGroupTrips);

module.exports = router;

