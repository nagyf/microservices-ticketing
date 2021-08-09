export interface ErrorDetails {
    readonly message: string;
    readonly field?: string;
}

export interface ErrorResponse {
    readonly errors: ErrorDetails[];
}
