import { Router, Request, Response } from 'express';
import * as authService from '../../services/admin/auth.service';
import { validate } from '../../middleware/validation';
import { registerSchema, loginSchema, changePasswordSchema } from '../../validation/adminAuth.schema';
import prisma from '../../db/prisma';

const router = Router();

router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
  try {
    const admin = await authService.registerFirstAdmin(req.body);
    return res.status(201).json({ success: true, message: 'Admin registered', status: 201, data: { id: admin.id, email: admin.email, role: admin.role } });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
  try {
    const { admin, token } = await authService.login(req.body.email, req.body.password);
    res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' });
    return res.json({ success: true, message: 'Logged in', status: 200, data: { id: admin.id, email: admin.email, role: admin.role } });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  const admin = (req as any).admin;
  if (!admin?.adminId) {
    return res.status(401).json({ success: false, message: 'Unauthenticated', status: 401, data: null });
  }
  await authService.logout(admin.adminId);
  res.clearCookie('auth_token');
  return res.json({ success: true, message: 'Logged out', status: 200, data: null });
});

router.get('/me', async (req: Request, res: Response) => {
  const admin = (req as any).admin;
  if (!admin?.adminId) {
    return res.status(401).json({ success: false, message: 'Unauthenticated', status: 401, data: null });
  }
  const user = await prisma.adminUser.findUnique({ where: { id: admin.adminId } });
  if (!user) {
    return res.status(404).json({ success: false, message: 'Admin not found', status: 404, data: null });
  }
  return res.json({ success: true, message: 'Current admin', status: 200, data: { id: user.id, email: user.email, role: user.role, isActive: user.isActive } });
});

router.post('/change-password', validate(changePasswordSchema), async (req: Request, res: Response) => {
  const admin = (req as any).admin;
  if (!admin?.adminId) {
    return res.status(401).json({ success: false, message: 'Unauthenticated', status: 401, data: null });
  }
  try {
    await authService.changePassword(admin.adminId, req.body.currentPassword, req.body.newPassword);
    return res.json({ success: true, message: 'Password changed', status: 200, data: null });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

export default router;
