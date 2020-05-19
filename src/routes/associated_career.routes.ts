import { Router } from 'express';
import AssociatedCareer_Controller from '../controllers/associated_career.controller'
const router = Router();

router.get('/associated_career_from_center/:id', AssociatedCareer_Controller.getAsoCareerFromCenter);
router.get('/associated_career_from_center/enabled/:id', AssociatedCareer_Controller.getAsoCareerFromCenterEnable);
router.get('/associated_career', AssociatedCareer_Controller.getAssoCareer);
router.get('/associated_career/:id', AssociatedCareer_Controller.getAssoCareerbyId);
router.post('/associated_career', AssociatedCareer_Controller.createAssoCareer);
router.put('/associated_career/:id', AssociatedCareer_Controller.updateAssoCareer);
router.delete('/associated_career/:id', AssociatedCareer_Controller.deleteAssoCareer);
router.get('/associated_career_center/', AssociatedCareer_Controller.getAssoCareerWithCenter);
router.put('/associated_career/:id/disable', AssociatedCareer_Controller.disableAssociatedCareer);
router.put('/associated_career/:id/enable', AssociatedCareer_Controller.enableAssociatedCareer);

export default router;