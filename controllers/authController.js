const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    const { name, email, phoneNumber, password } = req.body;

    try {
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        user = await User.create({
            name,
            email,
            phoneNumber,
            password 
        });


        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt
        };

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: userResponse
        });

    } catch (error) {
        console.error('Error in registerUser:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({success: false, message: messages.join(', ')});
        }
        res.status(500).json({success: false, message: 'Server Error during registration'});
    }
};

exports.loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({success: false, message: 'No email or password entered'});
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({success: false, message: 'Invalid credentials'});
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({success: false, message: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {id: user._id, name: user.name, email: user.email},
            process.env.JWT_SECRET,        
            { expiresIn: '1h' }            
        );

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token: token
        });

    } catch (error) {
        console.error('Error in User Login:', error);
        res.status(500).json({ success: false, message: 'Error during login' });
    }
};

