import { Router } from 'express';
import Document_Controller from '../controllers/document.controller'
import upload from "../lib/saveFile";

const router = Router();

router.post('/project_form',upload, Document_Controller.insertProjectForm);
router.delete('/project_form/:id', Document_Controller.deleteProjectForm);
router.get('/project_form/:id', Document_Controller.getProjectForm);

export default router;