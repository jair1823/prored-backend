import {Router} from 'express'
const router = Router();

import {getInvestigation_Units,getInvestigation_UnitbyId,createInvestigation_Unit,updateInvestigation_Unit,deleteInvestigation_Unit} from '../controllers/investigation_unit.controller'

router.get('/investigation_unit',getInvestigation_Units)
router.get('/investigation_unit/:id',getInvestigation_UnitbyId)
router.post('/investigation_unit',createInvestigation_Unit)
router.put('/investigation_unit/:id',updateInvestigation_Unit)
router.delete('/investigation_unit/:id',deleteInvestigation_Unit)

export default router;