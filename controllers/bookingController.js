const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

exports.bookActivity = async (req, res, next) => {
    const {activityId} = req.body;
    const userId = req.user.id;

    try {
        if (!activityId) {
            return res.status(400).json({success: false, message: 'Please provide an activity ID'});
        }

        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({success: false, message: 'Activity not found'});
        }

        const existingBooking = await Booking.findOne({ user: userId, activity: activityId });
        if (existingBooking) {
            return res.status(400).json({success: false, message: 'Existing booking for this activity found'});
        }

        const booking = await Booking.create({
            user: userId,
            activity: activityId
        });

        res.status(201).json({
            success: true,
            message: 'Activity booked successfully',
            data: booking
        });

    } catch (error) {
        console.error('Error in bookActivity:', error);
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
             return res.status(400).json({success: false, message: 'Invalid Activity ID format'});
        }
        res.status(500).json({success: false, message: 'Error during Booking'});
    }
};

exports.getMyBookings = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const bookings = await Booking.find({ user: userId })
            .populate({
                path: 'activity',
                select: 'title description location date time'
            })
            .populate({
                path: 'user',
                select: 'name email'
            })
            .sort({bookingDate: -1});

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error('Error in Get Bookings:', error);
        res.status(500).json({success: false, message: 'Error fetching bookings'});
    }
};