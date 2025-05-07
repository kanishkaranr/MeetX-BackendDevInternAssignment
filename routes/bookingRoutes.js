const express = require('express');
const {bookActivity, getMyBookings} = require('../controllers/bookingController'); 
const {protect} = require('../middleware/authMiddleware'); 
const {check, validationResult} = require('express-validator');

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ success: false, errors: errorMessages });
    }
    next();
};

router.post('/', protect, [ 
        check('activityId', 'Activity ID is required').not().isEmpty(),
        check('activityId', 'Invalid Activity ID format').isMongoId()
    ],
    handleValidationErrors,
    bookActivity
);

router.get('/mybookings', protect, getMyBookings);

module.exports = router;