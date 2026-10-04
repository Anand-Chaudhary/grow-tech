import { Router } from 'express';
import { buildResponse } from '../utils/response';
import { readJson, writeJson } from '../utils/fileStore';

// Define type for landing page content (flexible structure)
export type LandingContent = Record<string, unknown>;

const router = Router();
const fileName = 'landing.json';

// Get the full landing page content
router.get('/', (_, res) => {
  const data = readJson<LandingContent>(fileName, {});
  return res.success(buildResponse({ success: true, message: 'Landing content fetched', status: 200, data }));
});

// Replace the entire landing content (idempotent)
router.put('/', (req, res) => {
  const payload = req.body as LandingContent;
  writeJson<LandingContent>(fileName, payload);
  return res.success(buildResponse({ success: true, message: 'Landing content updated', status: 200, data: payload }));
});

export default router;
