import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';

export interface AdminPayload {
  adminId: string;
  role: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthenticated', status: 401, data: null });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminPayload;
    prisma.adminUser.findUnique({ where: { id: payload.adminId } }).then(admin => {
      if (!admin || admin.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json({ success: false, message: 'Invalid session', status: 401, data: null });
      }
      req.admin = payload;
      next();
    }).catch(() => {
      return res.status(401).json({ success: false, message: 'Unauthenticated', status: 401, data: null });
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthenticated', status: 401, data: null });
  }
};

export const requireRole = (allowed: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Unauthenticated', status: 401, data: null });
    }
    if (!allowed.includes(req.admin.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden', status: 403, data: null });
    }
    next();
  };
};
