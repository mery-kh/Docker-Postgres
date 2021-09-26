class AppError extends Error{
    private statusCode: any;
    private status: string;
    private isOperational: boolean;
    constructor(message: string | undefined, statusCode: any) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor)
    }
}
export default AppError;