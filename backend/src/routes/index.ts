import { Router } from 'express';
import healthRouter from './health.routes';
import leadsRouter from './leads.routes';
import publicRouter from './public.routes';
import adminRouter from './admin.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/leads', leadsRouter);
router.use('/', publicRouter);
router.use('/admin', adminRouter);

export default router;
