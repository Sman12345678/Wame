const mongoose = require('mongoose');
const logger = require('./logger'); // Assuming you have a logger

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Failed to connect to MongoDB', error);
        process.exit(1);  // Stop the bot if the DB connection fails
    }
};

module.exports = connectDB;
