import { Router } from 'express';
const router = Router();

import {getAsoCareerFromCenter,checkPersonExists,checkCareerExists,checkCampusExists} from '../controllers/consultas.controller';

router.get('/associated_career_from_center/:id', getAsoCareerFromCenter);

router.post('/person_exists', checkPersonExists);
router.post('/career_exists', checkCareerExists);
router.post('/campus_exists', checkCampusExists);

export default router;