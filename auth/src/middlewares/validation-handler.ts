import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export function validationHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log('Executing validation middleware');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    next();
}
