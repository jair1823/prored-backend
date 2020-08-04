import { Router } from 'express';
import Consultas_Controller from '../controllers/consultas.controller'

const router = Router();

router.get('/person/exists/:id', Consultas_Controller.checkPersonExists);
router.get('/person/basic/', Consultas_Controller.getPersonsBasic);
router.get('/logs/', Consultas_Controller.getLogs);
router.post('/report/students', Consultas_Controller.studentsReport);
router.post('/report/projects', Consultas_Controller.projectsReport);

export default router;