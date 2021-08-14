import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors'; // This needs to be before any other routes

import mongoose from 'mongoose';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
        httpOnly: true,
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const port = 3000;
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
