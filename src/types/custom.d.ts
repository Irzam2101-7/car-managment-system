// custom.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      token_decoded?: any;
    }
  }
}