import {Router} from 'express'
const router = Router();

import {getAcademic_Units,getAcademic_UnitbyId,createAcademic_Unit,updateAcademic_Unit,deleteAcademic_Unit} from '../controllers/academic_unit.controller'

router.get('/academic_unit',getAcademic_Units)
router.get('/academic_unit/:id',getAcademic_UnitbyId)
router.post('/academic_unit',createAcademic_Unit)
router.put('/academic_unit/:id',updateAcademic_Unit)
router.delete('/academic_unit/:id',deleteAcademic_Unit)

export default router;