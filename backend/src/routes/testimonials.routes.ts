import { Router } from 'express';
import { buildResponse } from '../utils/response';
import { readJson, writeJson } from '../utils/fileStore';

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
};

const router = Router();
const fileName = 'testimonials.json';

// List all testimonials
router.get('/', (_, res) => {
  const data = readJson<Testimonial[]>(fileName, []);
  return res.success(buildResponse({ success: true, message: 'Testimonials fetched', status: 200, data }));
});

// Create a new testimonial
router.post('/', (req, res) => {
  const data = readJson<Testimonial[]>(fileName, []);
  const newItem: Testimonial = { id: Date.now().toString(), ...req.body };
  data.push(newItem);
  writeJson<Testimonial[]>(fileName, data);
  return res.success(buildResponse({ success: true, message: 'Testimonial created', status: 201, data: newItem }));
});

// Get a single testimonial by id
router.get('/:id', (req, res) => {
  const data = readJson<Testimonial[]>(fileName, []);
  const item = data.find(t => t.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  return res.success(buildResponse({ success: true, message: 'Testimonial fetched', status: 200, data: item }));
});

// Update a testimonial
router.put('/:id', (req, res) => {
  const data = readJson<Testimonial[]>(fileName, []);
  const index = data.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  const updated = { ...data[index], ...req.body, id: req.params.id };
  data[index] = updated;
  writeJson<Testimonial[]>(fileName, data);
  return res.success(buildResponse({ success: true, message: 'Testimonial updated', status: 200, data: updated }));
});

// Delete a testimonial
router.delete('/:id', (req, res) => {
  const data = readJson<Testimonial[]>(fileName, []);
  const filtered = data.filter(t => t.id !== req.params.id);
  if (filtered.length === data.length) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  writeJson<Testimonial[]>(fileName, filtered);
  return res.success(buildResponse({ success: true, message: 'Testimonial deleted', status: 200, data: null }));
});

export default router;
