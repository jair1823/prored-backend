import { Router } from 'express';
import Document_Controller from '../controllers/document.controller'
import upload from "../lib/saveFile";

const router = Router();

router.post('/project_form',upload, Document_Controller.insertProjectForm);
router.delete('/project_form/:id', Document_Controller.deleteProjectForm);
router.get('/project_form/:id', Document_Controller.getProjectForm);
router.post('/endorsement',upload, Document_Controller.insertEndorsement);
router.delete('/endorsement/:id', Document_Controller.deleteEndorsement);
router.get('/endorsement/:id', Document_Controller.getEndorsement);
router.get('/endorsement/project/:id', Document_Controller.getEndorsementsProject);

export default router;