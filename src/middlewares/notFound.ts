import { Request, Response } from 'express';

// Middleware to handle unmatched routes (404)
export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: `The route ${req.originalUrl} does not exist.`,
        },
    });
};