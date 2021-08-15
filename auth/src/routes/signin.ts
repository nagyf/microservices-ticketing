import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    BadRequestError,
    validationHandler,
    AuthenticationError,
} from '@microservices-course/ticketing-common';
import { User } from '../models/user';
import { PasswordUtils } from '../services/password-utils';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must provide a password'),
    ],
    validationHandler,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new AuthenticationError();
        }

        const matchingPassword = await PasswordUtils.compare(
            existingUser.password,
            password
        );

        if (!matchingPassword) {
            throw new AuthenticationError();
        }

        const token = jwt.sign(
            { id: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY!
        );
        req.session = {
            jwt: token,
        };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };
