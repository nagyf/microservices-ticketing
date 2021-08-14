import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface CurrentUserPayload {
    id: string;
    email: string;
}

// Extend the Express.js Request interface with a new property
declare global {
    namespace Express {
        interface Request {
            currentUser?: CurrentUserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.session?.jwt;

    if (!token) {
        return next();
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_KEY!
        ) as CurrentUserPayload;

        req.currentUser = payload;
    } catch (err) {}

    next();
};
