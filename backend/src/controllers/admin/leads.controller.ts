import { Router, Request, Response } from 'express';
import * as adminLeadService from '../../services/admin/lead.service';
import { authMiddleware, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validation';
import { leadPatchSchema } from '../../validation/leadPatch.schema';

const router = Router();

router.use(authMiddleware);
router.use(requireRole(['OWNER', 'EDITOR']));

router.get('/', async (req: Request, res: Response) => {
  const filters = {
    status: req.query.status as any,
    packageTier: req.query.packageTier as any,
    q: req.query.q as any,
    from: req.query.from as any,
    to: req.query.to as any,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
  };
  const result = await adminLeadService.listLeads(filters);
  return res.json({ success: true, message: 'Leads', status: 200, data: result });
});

router.get('/:id', async (req: Request, res: Response) => {
  const lead = await adminLeadService.getLeadById(req.params.id);
  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found', status: 404, data: null });
  }
  return res.json({ success: true, message: 'Lead', status: 200, data: lead });
});

router.patch('/:id', validate(leadPatchSchema), async (req: Request, res: Response) => {
  try {
    const updated = await adminLeadService.updateLead(req.params.id, req.body);
    return res.json({ success: true, message: 'Lead updated', status: 200, data: updated });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await adminLeadService.deleteLead(req.params.id);
    return res.json({ success: true, message: 'Lead deleted', status: 200, data: null });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

export default router;
