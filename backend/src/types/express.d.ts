import { ApiResponse } from '../utils/response';

declare module 'express-serve-static-core' {
  interface Response {
    /**
     * Sends a standardized API response.
     */
    success: (payload: ApiResponse<unknown>) => import('express').Response;
  }
}
