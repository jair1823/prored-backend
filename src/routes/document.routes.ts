import { Router } from 'express';
import Article_Controller from '../controllers/documentsControllers/article.controller'
import Endorsement_Controller from '../controllers/documentsControllers/endorsement.controller'
import Project_Form_Controller from '../controllers/documentsControllers/project_form.controller'
import Paper_Controller from '../controllers/documentsControllers/paper.controller'
import List_Of_Assistance from '../controllers/documentsControllers/list_of_assistance.controller'
import Photos_Controller from "../controllers/documentsControllers/photos.controller";
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
router.post('/article/nofile', Article_Controller.insertArticleNoFile);
router.put('/article/:id', Article_Controller.updateArticle);
router.delete('/article/:id', Article_Controller.deleteArticle);
router.delete('/article/file/:id', Article_Controller.deleteArticleFile);
router.post('/article/file/:id',upload, Article_Controller.insertArticleFile);
router.get('/article/:id', Article_Controller.getArticle);
router.get('/article/project/:id', Article_Controller.getArticleProject);

router.post('/paper',upload, Paper_Controller.insertPaper);
router.post('/paper/nofile', Paper_Controller.insertPaperNoFile);
router.put('/paper/:id', Paper_Controller.updatePaper);
router.delete('/paper/:id', Paper_Controller.deletePaper);
router.delete('/paper/file/:id', Paper_Controller.deletePaperFile);
router.post('/paper/file/:id',upload, Paper_Controller.insertPaperFile);
router.get('/paper/:id', Paper_Controller.getPaper);
router.get('/paper/project/:id', Paper_Controller.getPaperProject);

router.post('/list',upload, List_Of_Assistance.insertList);
router.delete('/list/:id', List_Of_Assistance.deleteList);
router.get('/list/:id', List_Of_Assistance.getList);
router.get('/list/activity/:id', List_Of_Assistance.getListActivity);

router.post("/photo/one", upload, Photos_Controller.insertPhotosAlone);
router.delete("/photo/:id", Photos_Controller.deletePhoto);
router.get("/photo/:id", Photos_Controller.getPhoto);
router.get("/photo/activity/:id", Photos_Controller.getPhotosActivity);

export default router;