import { Router, Request, Response } from 'express';
import * as userService from '../../services/admin/user.service';
import { authMiddleware, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validation';
import { adminUserPatchSchema } from '../../validation/adminUser.schema';

const router = Router();

router.use(authMiddleware);
router.use(requireRole(['OWNER']));

router.get('/', async (_req: Request, res: Response) => {
  const users = await userService.listAdmins();
  return res.json({ success: true, message: 'Admin users', status: 200, data: users });
});

router.patch('/:id', validate(adminUserPatchSchema), async (req: Request, res: Response) => {
  try {
    const updated = await userService.updateAdmin(req.params.id as string, req.body);
    return res.json({ success: true, message: 'Admin updated', status: 200, data: { id: updated.id, name: updated.name, email: updated.email, role: updated.role, isActive: updated.isActive } });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

export default router;
