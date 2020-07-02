import { Router } from 'express';
import Unit from '../controllers/budget_unit.controller'
import SubUnit from '../controllers/budget_subunit.controller'


const router = Router();

router.get('/budget_unit/', Unit.getBudgetUnit);
router.get('/budget_unit/enabled', Unit.getBudgetUnitEnable);
router.get('/budget_unit/:id', Unit.getBudgetUnitbyId);
router.post('/budget_unit/', Unit.createBudgetUnit);
router.put('/budget_unit/:id', Unit.updateBudgetUnit);
router.put('/budget_unit/:id/disable', Unit.disableBudgetUnit);
router.put('/budget_unit/:id/enable', Unit.enableBudgetUnit);
router.get('/budget_unit/:id/exists', Unit.checkBudgetUnitExists);

router.get('/budget_subunit/', SubUnit.getBudgetSubUnit);
router.get('/budget_subunit/enabled', SubUnit.getBudgetSubUnitEnable);
router.get('/budget_subunit/:id', SubUnit.getBudgetSubUnitbyId);
router.post('/budget_subunit/', SubUnit.createBudgetSubUnit);
router.put('/budget_subunit/:id', SubUnit.updateBudgetSubUnit);
router.put('/budget_subunit/:id/disable', SubUnit.disableBudgetSubUnit);
router.put('/budget_subunit/:id/enable', SubUnit.enableBudgetSubUnit);

export default router;