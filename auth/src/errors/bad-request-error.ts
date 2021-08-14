import { CustomError } from './custom-error';
import { ErrorResponse } from './error-response';

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public reason: string) {
        super(reason);

        Object.setPrototypeOf(this, BadRequestError.prototype);
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
