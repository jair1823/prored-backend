import { Router } from 'express';
import Career_Controller from '../controllers/activity.controller'

const router = Router();

router.post('/', Career_Controller.createActivity);
router.post('/assign/', Career_Controller.assignPersonActivity);
router.get('/', Career_Controller.getActivities);
router.get('/project/:id', Career_Controller.getActivitybyProjectId);
router.get('/persons/:id', Career_Controller.getPersonsActivity);
router.get('/:id', Career_Controller.getActivitybyId);

export default router;