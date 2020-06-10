import { Router } from 'express';
import Filter from '../controllers/filter.controller'

const router = Router();

router.post('/project', Filter.getProjectsFilter);
router.post('/student', Filter.getStudentFilter);
router.post('/researcher', Filter.getResearcherFilter);
router.post('/activity/no_project', Filter.getActivityNoProjectFilter);
router.post('/activity/project', Filter.getActivityFilter);

export default router;