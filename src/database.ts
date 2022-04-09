import mongoose from 'mongoose';
import config from './config';
mongoose.connect(`${config.db}`);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
connection.once('error', (err) => {
    console.log('MongoDB database connection error:', err);
    process.exit(0);
});
