import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

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
    (req: Request, res: Response) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            throw new RequestValidationError(result.array());
        }

        const { email, password } = req.body;
        throw new DatabaseConnectionError();
        res.send({ status: 'OK' });
    }
);

export { router as signupRouter };
