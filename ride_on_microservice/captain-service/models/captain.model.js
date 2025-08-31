import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true, minlength: 3 },
        lastName: { type: String, minlength: 3 }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    socketId: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    vehicle: {
        color: { type: String, required: true, minlength: 3 },
        plate: { type: String, required: true, minlength: 3 },
        capacity: { type: Number, required: true, min: 1 },
        vehicleType: { type: String, enum: ['car', 'motorcycle', 'auto'], required: true }
    },
    // GeoJSON Point for geo queries
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [lng, lat]
            default: [0, 0]
        }
    }
});

// 2dsphere index for location queries
captainSchema.index({ location: '2dsphere' });

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_CAPTAIN, { expiresIn: '24h' });
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

export default mongoose.model('captain', captainSchema);
