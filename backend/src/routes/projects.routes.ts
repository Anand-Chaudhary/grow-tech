import { Router } from 'express';
import { buildResponse } from '../utils/response';
import { readJson, writeJson } from '../utils/fileStore';

export type Project = {
  id: string;
  name: string;
  industry?: string;
  challenge: string;
  whatWeBuilt: string;
  result: string;
  link?: string;
};

const router = Router();
const fileName = 'projects.json';

// List all projects
router.get('/', (_, res) => {
  const data = readJson<Project[]>(fileName, []);
  return res.success(buildResponse({ success: true, message: 'Projects fetched', status: 200, data }));
});

// Create a new project
router.post('/', (req, res) => {
  const data = readJson<Project[]>(fileName, []);
  const newItem: Project = { id: Date.now().toString(), ...req.body };
  data.push(newItem);
  writeJson<Project[]>(fileName, data);
  return res.success(buildResponse({ success: true, message: 'Project created', status: 201, data: newItem }));
});

// Get a specific project
router.get('/:id', (req, res) => {
  const data = readJson<Project[]>(fileName, []);
  const item = data.find(p => p.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  return res.success(buildResponse({ success: true, message: 'Project fetched', status: 200, data: item }));
});

// Update a project
router.put('/:id', (req, res) => {
  const data = readJson<Project[]>(fileName, []);
  const index = data.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  const updated = { ...data[index], ...req.body, id: req.params.id };
  data[index] = updated;
  writeJson<Project[]>(fileName, data);
  return res.success(buildResponse({ success: true, message: 'Project updated', status: 200, data: updated }));
});

// Delete a project
router.delete('/:id', (req, res) => {
  const data = readJson<Project[]>(fileName, []);
  const filtered = data.filter(p => p.id !== req.params.id);
  if (filtered.length === data.length) {
    return res.status(404).json({ success: false, message: 'Not found', status: 404, data: null });
  }
  writeJson<Project[]>(fileName, filtered);
  return res.success(buildResponse({ success: true, message: 'Project deleted', status: 200, data: null }));
});

export default router;
