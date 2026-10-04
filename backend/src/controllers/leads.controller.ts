import { Router, Request, Response } from 'express';
import { createLead } from '../services/lead.service';
import { validate } from '../middleware/validation';
import { leadSchema } from '../validation/lead.schema';
import { toLeadDto } from '../dto/lead.dto';

const router = Router();

router.post(
  '/',
  validate(leadSchema),
  async (req: Request, res: Response) => {
    try {
      const lead = await createLead(req.body);
      const payload = {
        success: true,
        message: 'Lead created',
        status: 201,
        data: toLeadDto(lead),
      };
      return res.status(201).json(payload);
    } catch (err: any) {
      const status = err.status || 500;
      const message = err.message || 'Internal Server Error';
      return res.status(status).json({ success: false, message, status, data: null });
    }
  }
);

export default router;
