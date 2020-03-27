import { Router } from 'express';
const router = Router();

import {
    getCenter,
    getCenterbyId,
    createCenter,
    updateCenter,
    deleteCenter
} from '../controllers/center.controller';

router.get('/center', getCenter);
router.get('/center/:id', getCenterbyId);
router.post('/center', createCenter);
router.put('/center/:id', updateCenter);
router.delete('/center/:id', deleteCenter);

export default router;