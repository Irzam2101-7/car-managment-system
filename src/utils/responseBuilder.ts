// utils/responseBuilder.ts
export class ResponseBuilder {
    static success(res: any, data: any, message: string = 'Success') {
      return res.status(200).json({
        success: true,
        message,
        data,
      });
    }
  
    static error(res: any, status: number, message: string, errorDetails?: any) {
      return res.status(status).json({
        success: false,
        message,
        error: errorDetails || null,
      });
    }
  }
  