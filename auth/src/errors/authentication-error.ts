import { CustomError } from "./custom-error";
import { ErrorResponse } from "./error-response";

export class AuthenticationError extends CustomError {
    statusCode = 403;

    constructor() {
        super('Invalid credentials');

        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }

    toErrorResponse(): ErrorResponse {
        return {
            errors: [
                {
                    message: this.message,
                },
            ],
        };
    }
}