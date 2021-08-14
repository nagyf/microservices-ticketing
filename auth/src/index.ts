import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const mongoUrl = 'mongodb://auth-mongo-srv:27017/auth';
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log(`Connected to MongoDB at ${mongoUrl}`);

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (err) {
        console.error('Error connecting to auth mongodb', err);
    }
};

start();
