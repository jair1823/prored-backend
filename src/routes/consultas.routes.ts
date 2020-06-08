import { Router } from 'express';
import Consultas_Controller from '../controllers/consultas.controller'

const router = Router();

router.get('/person/exists/:id', Consultas_Controller.checkPersonExists);
router.get('/person/basic/', Consultas_Controller.getPersonsBasic);

export default router;