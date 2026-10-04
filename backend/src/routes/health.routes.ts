import { Router } from 'express';
import { buildResponse } from '../utils/response';

const router = Router();

router.get('/', (_, res) => {
  const payload = {
    success: true,
    message: 'OK',
    status: 200,
    data: null,
  };
  return res.status(200).json(buildResponse(payload));
});

export default router;