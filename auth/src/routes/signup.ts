import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
    BadRequestError,
    validationHandler,
} from '@microservices-course/ticketing-common';
import { User } from '../models/user';

if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
}

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 30 })
            .withMessage('Password length must be between 4 and 30 characters'),
    ],
    validationHandler,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!!existingUser) {
            throw new BadRequestError('User already exists');
        }

        const user = User.build({ email, password });
        const savedUser = await user.save();

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY!
        );
        req.session = {
            jwt: token,
        };

        return res.status(201).send(savedUser);
    }
);

export { router as signupRouter };
