import { ErrorResponse } from './error-response';

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract toErrorResponse(): ErrorResponse;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
