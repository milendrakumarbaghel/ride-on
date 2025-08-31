import userModel from '../models/user.model.js';

export async function createUser({ firstName, lastName, email, password }) {
    if (!firstName || !email || !password) throw new Error('All fields are required');
    return userModel.create({ fullName: { firstName, lastName }, email, password });
}
