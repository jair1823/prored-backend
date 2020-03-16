import { Router } from 'express';
const router = Router();

import {getAsoCareerFromCenter} from '../controllers/consultas.controller';

router.get('/associated_career_from_center', getAsoCareerFromCenter);

export default router;