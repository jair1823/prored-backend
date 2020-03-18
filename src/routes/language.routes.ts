import { Router } from 'express';
const router = Router();

import {
    getLanguages
} from '../controllers/language.controller';

router.get('/language', getLanguages);

export default router;