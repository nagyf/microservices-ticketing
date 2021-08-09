import { CustomError } from './custom-error';
import { ErrorResponse } from './error-response';

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    toErrorResponse(): ErrorResponse {
        return {
            errors: [
                {
                    message: 'Not Found',
                },
            ],
        };
    }
}
