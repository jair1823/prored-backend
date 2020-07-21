import { Router } from 'express';
import Inv_Unit_Controller from '../controllers/investigation_unit.controller'

const router = Router();

router.get('/investigation_unit', Inv_Unit_Controller.getInvestigation_Units);
router.get('/investigation_unit/:id', Inv_Unit_Controller.getInvestigation_UnitbyId);
router.post('/investigation_unit', Inv_Unit_Controller.createInvestigation_Unit);
router.put('/investigation_unit/:id', Inv_Unit_Controller.updateInvestigation_Unit);
router.put('/investigation_unit/:id/enable', Inv_Unit_Controller.enableInvestigation_Unit);
router.put('/investigation_unit/:id/disable', Inv_Unit_Controller.disableInvestigation_Unit);

export default router;