import { Router, Request, Response } from 'express';
import * as contentService from '../../services/admin/content.service';
import { authMiddleware, requireRole } from '../../middleware/auth';
import { validate } from '../../middleware/validation';
import { genericCreateSchema, genericUpdateSchema } from '../../validation/content.schema';

const router = Router();

router.use(authMiddleware);
router.use(requireRole(['OWNER', 'EDITOR']));

// List resources
router.get('/:resource', async (req: Request, res: Response) => {
  const resource = req.params.resource as string;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  try {
    switch (resource) {
      case 'packages': {
        const pkgs = await contentService.listPackages();
        return res.json({ success: true, message: 'Packages', status: 200, data: pkgs });
      }
      case 'services': {
        const svcs = await contentService.listServices();
        return res.json({ success: true, message: 'Services', status: 200, data: svcs });
      }
      case 'faqs': {
        const faqs = await contentService.listFaqs();
        return res.json({ success: true, message: 'FAQs', status: 200, data: faqs });
      }
      case 'testimonials': {
        const tms = await contentService.listTestimonials();
        return res.json({ success: true, message: 'Testimonials', status: 200, data: tms });
      }
      case 'case-studies': {
        const cs = await contentService.listCaseStudies(page, limit);
        return res.json({ success: true, message: 'Case studies', status: 200, data: cs });
      }
      case 'posts': {
        const posts = await contentService.listPosts(page, limit);
        return res.json({ success: true, message: 'Posts', status: 200, data: posts });
      }
      default:
        return res.status(404).json({ success: false, message: 'Resource not found', status: 404, data: null });
    }
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

// Get one
router.get('/:resource/:id', async (req: Request, res: Response) => {
  const resource = req.params.resource as string;
  const id = req.params.id as string;
  try {
    let item;
    switch (resource) {
      case 'packages':
        item = await contentService.getPackage(id);
        break;
      case 'services':
        item = await contentService.getService(id);
        break;
      case 'faqs':
        item = await contentService.getFaq(id);
        break;
      case 'testimonials':
        item = await contentService.getTestimonial(id);
        break;
      case 'case-studies':
        item = await contentService.getCaseStudy(id);
        break;
      case 'posts':
        item = await contentService.getPost(id);
        break;
      default:
        return res.status(404).json({ success: false, message: 'Resource not found', status: 404, data: null });
    }
    if (!item) {
      return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
    }
    return res.json({ success: true, message: `${resource} details`, status: 200, data: item });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

// Create
router.post('/:resource', validate(genericCreateSchema), async (req: Request, res: Response) => {
  const resource = req.params.resource as string;
  try {
    let created;
    switch (resource) {
      case 'packages':
        created = await contentService.createPackage(req.body);
        break;
      case 'services':
        created = await contentService.createService(req.body);
        break;
      case 'faqs':
        created = await contentService.createFaq(req.body);
        break;
      case 'testimonials':
        created = await contentService.createTestimonial(req.body);
        break;
      case 'case-studies':
        created = await contentService.createCaseStudy(req.body);
        break;
      case 'posts':
        created = await contentService.createPost(req.body);
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid resource', status: 400, data: null });
    }
    return res.status(201).json({ success: true, message: `${resource} created`, status: 201, data: created });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

// Update
router.patch('/:resource/:id', validate(genericUpdateSchema), async (req: Request, res: Response) => {
  const resource = req.params.resource as string;
  const id = req.params.id as string;
  try {
    let updated;
    switch (resource) {
      case 'packages':
        updated = await contentService.updatePackage(id, req.body);
        break;
      case 'services':
        updated = await contentService.updateService(id, req.body);
        break;
      case 'faqs':
        updated = await contentService.updateFaq(id, req.body);
        break;
      case 'testimonials':
        updated = await contentService.updateTestimonial(id, req.body);
        break;
      case 'case-studies':
        updated = await contentService.updateCaseStudy(id, req.body);
        break;
      case 'posts':
        updated = await contentService.updatePost(id, req.body);
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid resource', status: 400, data: null });
    }
    return res.json({ success: true, message: `${resource} updated`, status: 200, data: updated });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

// Delete
router.delete('/:resource/:id', async (req: Request, res: Response) => {
  const resource = req.params.resource as string;
  const id = req.params.id as string;
  try {
    switch (resource) {
      case 'packages':
        await contentService.deletePackage(id);
        break;
      case 'services':
        await contentService.deleteService(id);
        break;
      case 'faqs':
        await contentService.deleteFaq(id);
        break;
      case 'testimonials':
        await contentService.deleteTestimonial(id);
        break;
      case 'case-studies':
        await contentService.deleteCaseStudy(id);
        break;
      case 'posts':
        await contentService.deletePost(id);
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid resource', status: 400, data: null });
    }
    return res.json({ success: true, message: `${resource} deleted`, status: 200, data: null });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

// Publish / Unpublish post endpoints
router.post('/posts/:id/publish', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const publishedAt = req.body.publishedAt;
  try {
    const post = await contentService.publishPost(id, publishedAt);
    return res.json({ success: true, message: 'Post published', status: 200, data: post });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

router.post('/posts/:id/unpublish', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const post = await contentService.unpublishPost(id);
    return res.json({ success: true, message: 'Post unpublished', status: 200, data: post });
  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message, status, data: null });
  }
});

export default router;
