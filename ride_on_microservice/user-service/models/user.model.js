import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true, minlength: 3 },
        lastName: { type: String, minlength: 3 }
    },
    email: { type: String, required: true, minlength: 5, unique: true },
    password: { type: String, required: true, select: false },
    socketId: { type: String }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_USER, { expiresIn: '24h' });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

export default mongoose.model('user', userSchema);
