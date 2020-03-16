import { Router } from 'express';
const router = Router();

import { getAssoCareer, getAssoCareerbyId, createAssoCareer, updateAssoCareer, deleteAssoCareer, getAssoCareerWithCenter } from '../controllers/associated_career.controller';

router.get('/associated_career', getAssoCareer);
router.get('/associated_career/:id', getAssoCareerbyId);
router.post('/associated_career', createAssoCareer);
router.put('/associated_career/:id', updateAssoCareer);
router.delete('/associated_career/:id', deleteAssoCareer);
router.get('/associated_career_center/', getAssoCareerWithCenter);

export default router;