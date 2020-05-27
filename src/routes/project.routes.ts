import { Router } from 'express';
import Project_Controller from '../controllers/project.controller'

const router = Router();

router.post('/project', Project_Controller.createProject);
router.put('/project/:id', Project_Controller.updateProject);
router.get('/project', Project_Controller.getProjects);
router.get('/project/:id', Project_Controller.getProjectbyId);
router.post('/project/assign', Project_Controller.assignPersonProject);
router.get('/project_persons/:id', Project_Controller.getPersonsProject);

export default router;