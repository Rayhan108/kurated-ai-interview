/**
 * http status code
 */
export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOO_MANY_REQUEST = 429,
    SERVER_ERROR = 500,
}

/**
 * error code defined in server
 */
export enum ErrorCode {
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    ALREADY_USED = "ALREADY_USED",
    WRONG_CREDENTIALS = "WRONG_CREDENTIALS",
}
