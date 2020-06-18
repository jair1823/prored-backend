import { Router } from 'express';
import Language_Controller from '../controllers/language.controller'

const router = Router();

router.get('/', Language_Controller.getLanguages);

export default router;