const express = require('express');
const {registerUser} = require('../controllers/authController'); 
const {loginUser} = require('../controllers/authController');
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

router.post('/register', [ 
        check('name', 'Name is required').not().isEmpty().trim().escape(),
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('phoneNumber').not().isEmpty().withMessage('Phone number is required').isMobilePhone('any', { strictMode: false }).withMessage('Please provide a valid phone number'),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
    ], 
    handleValidationErrors, 
    registerUser            
);


router.post('/login', [
        check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
        check('password', 'Password is required').exists()
    ], 
    handleValidationErrors, 
    loginUser               
);

module.exports = router;