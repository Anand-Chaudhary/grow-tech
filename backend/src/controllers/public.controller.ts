import { Router, Request, Response } from 'express';
import * as publicService from '../services/public.service';

const router = Router();

router.get('/landing', async (_req: Request, res: Response) => {
  const data = await publicService.getLandingData();
  return res.success({ success: true, message: 'Landing data', status: 200, data });
});

router.get('/packages', async (_req: Request, res: Response) => {
  const data = await publicService.listPackages();
  return res.success({ success: true, message: 'Packages', status: 200, data });
});

router.get('/services', async (_req: Request, res: Response) => {
  const data = await publicService.listServices();
  return res.success({ success: true, message: 'Services', status: 200, data });
});

router.get('/faqs', async (_req: Request, res: Response) => {
  const data = await publicService.listFaqs();
  return res.success({ success: true, message: 'FAQs', status: 200, data });
});

router.get('/testimonials', async (_req: Request, res: Response) => {
  const data = await publicService.listTestimonials();
  return res.success({ success: true, message: 'Testimonials', status: 200, data });
});

router.get('/case-studies', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await publicService.listCaseStudies(page, limit);
  return res.success({ success: true, message: 'Case studies', status: 200, data: result });
});

router.get('/case-studies/:slug', async (req: Request, res: Response) => {
  const cs = await publicService.getCaseStudyBySlug(req.params.slug as string);
  if (!cs) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  return res.success({ success: true, message: 'Case study', status: 200, data: cs });
});

router.get('/posts', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const result = await publicService.listPosts(page, limit);
  return res.success({ success: true, message: 'Posts', status: 200, data: result });
});

router.get('/posts/:slug', async (req: Request, res: Response) => {
  const post = await publicService.getPostBySlug(req.params.slug as string);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  return res.success({ success: true, message: 'Post', status: 200, data: post });
});

export default router;
