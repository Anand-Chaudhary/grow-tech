import { Router } from 'express';
import authRouter from '../controllers/admin/auth.controller';
import usersRouter from '../controllers/admin/users.controller';
import leadsRouter from '../controllers/admin/leads.controller';
import contentRouter from '../controllers/admin/content.controller';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/leads', leadsRouter);
router.use('/content', contentRouter);

export default router;
