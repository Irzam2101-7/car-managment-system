import { ErrorRequestHandler } from 'express';
import logger from '../utils/logger';

// Define the error handler middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Default error details
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';

    // Log the error details
    logger.error('Error occurred', {
        status,
        message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
    });

    // Handle specific error types
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: 'Unauthorized',
            message: err.message,
        });
        return;
    }

    // Generic error response
    res.status(status).json({
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message,
        },
    });

    // Ensure the next middleware is called only when necessary
    next();
};

export default errorHandler;
