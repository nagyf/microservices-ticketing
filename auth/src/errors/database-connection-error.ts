import { ErrorResponse } from './error-response';
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to the database';
    statusCode = 500;

    constructor() {
        super('Error connecting to the database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    toErrorResponse(): ErrorResponse {
        return {
            errors: [
                {
                    message: this.reason,
                },
            ],
        };
    }
}
