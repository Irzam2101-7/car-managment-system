import { Response } from 'express';
import { ResponseBuilder } from '../utils/responseBuilder';

export class BaseController {
  // Common error handler
  handleError(res: Response, error: any) {
    // Optionally, you can log the error here before sending the response.
    return ResponseBuilder.error(res, 500, error.message || 'Something went wrong.');
  }
}
