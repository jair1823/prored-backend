import { Router } from 'express';
import Direction_Controller from '../controllers/directions.controller'

const router = Router();

router.get('/province', Direction_Controller.getProvinces);
router.get('/province/:id/canton', Direction_Controller.getCantones);
router.get('/canton/:id/district', Direction_Controller.getDistrics);
router.get('/direction/:dni', Direction_Controller.getDirectionsByDni);
export default router;