import { Router } from 'express';
const router = Router();

import {
    getCampuses,
    getCampusbyId,
    createCampus,
    updateCampus,
    deleteCampus
} from '../controllers/campus.controller';

router.get('/campus', getCampuses);
router.get('/campus/:id', getCampusbyId);
router.post('/campus', createCampus);
router.put('/campus/:id', updateCampus);
router.delete('/campus/:id', deleteCampus);

export default router;