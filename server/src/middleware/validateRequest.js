const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

exports.register = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

exports.login = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

exports.createTrip = [
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Please provide a valid start date'),
  body('endDate').isISO8601().withMessage('Please provide a valid end date'),
  body('budget').isNumeric().withMessage('Budget must be a number'),
  handleValidationErrors,
];

exports.updateTrip = [
  body('destination').optional().trim().notEmpty(),
  body('startDate').optional().isISO8601(),
  body('endDate').optional().isISO8601(),
  body('budget').optional().isNumeric(),
  handleValidationErrors,
];

exports.createGroup = [
  body('name').trim().notEmpty().withMessage('Group name is required'),
  handleValidationErrors,
];

exports.addMember = [
  body('userId').notEmpty().withMessage('User ID is required'),
  handleValidationErrors,
];

