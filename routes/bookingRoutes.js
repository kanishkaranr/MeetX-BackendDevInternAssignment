const express = require('express');
const {bookActivity, getMyBookings} = require('../controllers/bookingController'); 
const {protect} = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/', protect, bookActivity);
router.get('/mybookings', protect, getMyBookings);

module.exports = router;