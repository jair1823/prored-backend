import { Router } from 'express';
import Activity_Controller from '../controllers/activity.controller'

const router = Router();

router.post('/', Activity_Controller.createActivity);
router.post('/type', Activity_Controller.createActivityType);
router.put('/type/:id', Activity_Controller.updateActivityType);
router.put('/:id', Activity_Controller.updateActivity);
router.post('/assign/', Activity_Controller.assignPersonActivity);
router.get('/', Activity_Controller.getActivities);
router.get('/type', Activity_Controller.getActivityType);
router.get('/alone', Activity_Controller.getActivitiesNoProject);
router.get('/project/:id', Activity_Controller.getActivitybyProjectId);
router.get('/persons/:id', Activity_Controller.getPersonsActivity);
router.get('/persons/not/:id', Activity_Controller.getPersonsNotInActivity);
router.get('/:id', Activity_Controller.getActivitybyId);
router.put('/:id/enable', Activity_Controller.enableActivityType);
router.put('/:id/disable', Activity_Controller.disableActivityType);

export default router;