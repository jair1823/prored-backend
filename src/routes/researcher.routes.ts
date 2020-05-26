import { Router } from 'express';
import Researcher_Controller from '../controllers/researcher.controller'


const router = Router();

router.get('/researcher', Researcher_Controller.getResearchers);
router.get('/researcher_all', Researcher_Controller.getResearchersAll);
router.post('/researcher', Researcher_Controller.createResearcher);
router.put('/researcher/:dni', Researcher_Controller.updateResearcher);



export default router;

