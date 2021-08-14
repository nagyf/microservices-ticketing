import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validationHandler } from '../middlewares/validation-handler';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/authentication-error';

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

        const matchingPassword = await Password.compare(
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

        res.send(existingUser);
    }
);

export { router as signinRouter };
