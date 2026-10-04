import { Router } from 'express';
import healthRouter from './health.routes';
import landingRouter from './landing.routes';
import testimonialsRouter from './testimonials.routes';
import projectsRouter from './projects.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/landing', landingRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/projects', projectsRouter);

export default router;
