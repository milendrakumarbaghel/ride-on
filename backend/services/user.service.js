const userModel = require('../models/user.model');

exports.createUser = async ({
    firstName, lastName, email, password
}) => {
    if(!firstName || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = new userModel({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
}
