const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {fullName, email, password} = req.body;

            const isUserAlready = await userModel.findOne({ email });

            if (isUserAlready) {
                return res.status(400).json({ message: 'User already exist' });
            }

            const hashedPassword = await userModel.hashPassword(password);

            const user = await userService.createUser({
                firstName: fullName.firstName,
                lastName: fullName.lastName,
                email,
                password: hashedPassword
            });

            const token = user.generateAuthToken();

            res.status(201).json({ token, user , message: 'User created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = user.generateAuthToken();

        res.cookie('token', token);

        // Return response
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}
