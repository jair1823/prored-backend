import { Router } from 'express';
import Article_Controller from '../controllers/documentsControllers/article.controller'
import Endorsement_Controller from '../controllers/documentsControllers/endorsement.controller'
import Project_Form_Controller from '../controllers/documentsControllers/project_form.controller'
import upload from "../lib/saveFile";

const router = Router();

router.post('/project_form',upload, Project_Form_Controller.insertProjectForm);
router.delete('/project_form/:id', Project_Form_Controller.deleteProjectForm);
router.get('/project_form/:id', Project_Form_Controller.getProjectForm);
router.post('/endorsement',upload, Endorsement_Controller.insertEndorsement);
router.delete('/endorsement/:id', Endorsement_Controller.deleteEndorsement);
router.get('/endorsement/:id', Endorsement_Controller.getEndorsement);
router.get('/endorsement/project/:id', Endorsement_Controller.getEndorsementsProject);
router.post('/article',upload, Article_Controller.insertArticle);
router.delete('/article/:id', Article_Controller.deleteArticle);
router.get('/article/:id', Article_Controller.getArticle);
router.get('/article/project/:id', Article_Controller.getArticleProject);

export default router;