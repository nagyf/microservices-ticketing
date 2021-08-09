import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send(err.toErrorResponse());
    } else {
        console.error(err.stack);

        res.status(500).send({
            message: 'Something went wrong...',
        });
    }
}
