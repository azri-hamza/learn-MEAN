const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);

        callback();
    });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./location');
const openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true,
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true,
    },
});

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    reviewText: String,
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: String,
    ratign: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    facilities: [String],
    coords: {
        type: { type: String },
        coordinates: [Number],
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema],
});

// add index to mangodb
locationSchema.index({ coords: '2dshpere' });
