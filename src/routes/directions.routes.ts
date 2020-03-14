import { Router } from 'express'
const router = Router();

import { getProvinces, getCantones, getDistrics } from '../controllers/directions.controller'

router.get('/province', getProvinces);
router.get('/province/:id/canton', getCantones);
router.get('/canton/:id/district', getDistrics);

export default router;