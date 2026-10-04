import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.parseAsync(req.body);
      req.body = result;
      next();
    } catch (e: any) {
      const errors = e.errors?.map((err: any) => ({
        path: err.path.join('.'),
        message: err.message,
      })) ?? [{ path: '', message: 'Invalid request' }];
      return res.status(422).json({
        success: false,
        message: 'Validation error',
        status: 422,
        data: errors,
      });
    }
  };
};
