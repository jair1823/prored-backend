import { Router } from 'express';
import Project_Controller from '../controllers/project.controller'

const router = Router();

router.post('/project', Project_Controller.createProject);
router.put('/project/:id', Project_Controller.updateProject);
router.get('/project', Project_Controller.getProjects);
router.get('/project/:id', Project_Controller.getProjectbyId);
router.post('/project/assign', Project_Controller.assignPersonProject);
router.get('/project_persons/:id', Project_Controller.getPersonsProject);
router.get('/project_persons_not_in/:id', Project_Controller.getPersonsNotInProject);
router.get('/project/students/:id', Project_Controller.getStudentsProject);
router.get('/projectstudents/:id', Project_Controller.getProjectStudents);

export default router;