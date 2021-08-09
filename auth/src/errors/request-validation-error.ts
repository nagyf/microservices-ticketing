import { ValidationError } from 'express-validator';
import { ErrorResponse } from './error-response';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public reasons: ValidationError[]) {
        super('Validation Error');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    toErrorResponse(): ErrorResponse {
        const errorResponse = this.reasons.map((error) => {
            return {
                message: error.msg,
                field: error.param,
            };
        });

        return { errors: errorResponse };
    }
}
