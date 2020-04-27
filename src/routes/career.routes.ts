import { Router } from 'express';
import Career_Controller from '../controllers/career.controller'

const router = Router();

router.get('/', Career_Controller.getCareer);
router.get('/:id', Career_Controller.getCareerbyId);
router.post('/', Career_Controller.createCareer);
router.put('/:id', Career_Controller.updateCareer);
router.delete('/:id', Career_Controller.deleteCareer);

export default router;