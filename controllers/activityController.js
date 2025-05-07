const Activity = require('../models/Activity'); 

exports.listActivities = async (req, res, next) => {
    try {
        const activities = await Activity.find().sort({date: 1});

        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });
    } catch (error) {
        console.error('Error in Activities List:', error);
        res.status(500).json({success: false, message: 'Error fetching activities'});
    }
};