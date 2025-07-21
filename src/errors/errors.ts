class BusinessError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class AuthenticationError extends Error {
    constructor(message: string = "Unauthorized") {
        super(message);
    }
}


export { BusinessError, AuthenticationError };