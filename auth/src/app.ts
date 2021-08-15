import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors'; // This needs to be before any other routes

import { NotFoundError, errorHandler } from '@microservices-course/ticketing-common';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const isTestEnvironment = process.env.NODE_ENV === 'test';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: !isTestEnvironment,
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

export default app;
