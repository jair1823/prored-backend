import { Router } from 'express';
import Center_Controller from '../controllers/center.controller'

const router = Router();

router.get('/', Center_Controller.getCenter);
router.get('/:id', Center_Controller.getCenterbyId);
router.post('/', Center_Controller.createCenter);
router.put('/:id', Center_Controller.updateCenter);
router.delete('/:id', Center_Controller.deleteCenter);

export default router;