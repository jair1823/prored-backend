import { Router } from 'express';
import Consultas_Controller from '../controllers/consultas.controller'

const router = Router();

router.get('/associated_career_from_center/:id', Consultas_Controller.getAsoCareerFromCenter);
router.post('/person_exists', Consultas_Controller.checkPersonExists);
router.post('/career_exists', Consultas_Controller.checkCareerExists);
router.post('/campus_exists', Consultas_Controller.checkCampusExists);

export default router;