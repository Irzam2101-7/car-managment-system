import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseBuilder } from '../utils/responseBuilder';

// Middleware to authenticate JWT token
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization');
  if (!authorization) {
    return ResponseBuilder.error(res, 401, 'No token provided. Please provide a valid token.');
  }

  const token = authorization.split(' ')[1]; // Token is after "Bearer"
  if (!token) {
    return ResponseBuilder.error(res, 401, 'Token is missing. Please provide a valid token.');
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return ResponseBuilder.error(res, 401, 'Failed to authenticate token.');
    }

    req.token_decoded = decoded;  // Attach decoded token to the request object
    next();  // Proceed to the next middleware or route handler
  });
};