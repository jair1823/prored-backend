import { Router } from 'express';
import Career_Controller from '../controllers/activity.controller'

const router = Router();

router.post('/', Career_Controller.createActivity);
router.post('/type', Career_Controller.createActivityType);
router.put('/:id', Career_Controller.updateActivity);
router.post('/assign/', Career_Controller.assignPersonActivity);
router.get('/', Career_Controller.getActivities);
router.get('/type', Career_Controller.getActivityType);
router.get('/alone', Career_Controller.getActivitiesNoProject);
router.get('/project/:id', Career_Controller.getActivitybyProjectId);
router.get('/persons/:id', Career_Controller.getPersonsActivity);
router.get('/persons/not/:id', Career_Controller.getPersonsNotInActivity);
router.get('/:id', Career_Controller.getActivitybyId);

export default router;