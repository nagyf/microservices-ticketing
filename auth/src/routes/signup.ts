import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

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
    async (req: Request, res: Response) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            throw new RequestValidationError(result.array());
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!!existingUser) {
            throw new BadRequestError('User already exists');
        }

        const user = User.build({ email, password });
        const savedUser = await user.save();

        return res.status(201).send(savedUser);
    }
);

export { router as signupRouter };
