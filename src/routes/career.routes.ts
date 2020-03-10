import { Router } from 'express';
const router = Router();

import { getCareer, getCareerbyId, createCareer, updateCareer, deleteCareer } from '../controllers/career.controller';

router.get('/career', getCareer);
router.get('/career/:id', getCareerbyId);
router.post('/career', createCareer);
router.put('/career/:id', updateCareer);
router.delete('/career/:id', deleteCareer);

export default router;