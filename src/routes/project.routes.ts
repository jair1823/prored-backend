import { Router } from 'express';
import Project_Controller from '../controllers/project.controller'

const router = Router();

router.post('/', Project_Controller.createProject);
router.put('/:id', Project_Controller.updateProject);
router.get('/', Project_Controller.getProjects);
router.get('/:id', Project_Controller.getProjectbyId);

export default router;