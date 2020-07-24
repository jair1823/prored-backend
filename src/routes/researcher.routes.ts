import { Router } from 'express';
import Researcher_Controller from '../controllers/researcher.controller'

const router = Router();

router.get('/researcher', Researcher_Controller.getResearchers);
router.get('/researcher_all', Researcher_Controller.getResearchersAll);
router.get('/researcher_all/:dni', Researcher_Controller.getResearchersByIdAll);
router.get('/researcher_basic', Researcher_Controller.getResearchersBasic);
router.post('/researcher', Researcher_Controller.createResearcher);
router.put('/researcher/:dni', Researcher_Controller.updateResearcher);
router.get('/researcher/:dni', Researcher_Controller.getResearcherByDni);
router.put('/researcher/:dni/disable', Researcher_Controller.disableResearcher);
router.put('/researcher/:dni/enable', Researcher_Controller.enableResearcher);

export default router;

