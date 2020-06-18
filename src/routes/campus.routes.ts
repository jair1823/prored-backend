import { Router } from 'express';
import Campus_Controller from '../controllers/campus.controller';

const router = Router();

router.get('/', Campus_Controller.getCampuses);
router.get('/enabled/', Campus_Controller.getCampusesEnable);
router.get('/:id', Campus_Controller.getCampusbyId);
router.post('/', Campus_Controller.createCampus);
router.put('/:id', Campus_Controller.updateCampus);
router.delete('/:id', Campus_Controller.deleteCampus);
router.put('/:id/disable', Campus_Controller.disableCampus);
router.put('/:id/enable', Campus_Controller.enableCampus);
router.get('/exists/:id', Campus_Controller.checkCampusExists);

export default router;