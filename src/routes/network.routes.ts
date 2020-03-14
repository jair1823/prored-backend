import {Router} from 'express'
const router = Router();

import {getNetworks, getNetworkbyId, createNetwork,deleteNetwork, updateNetwork} from '../controllers/network.controller'

router.get('/network',getNetworks)
router.get('/network/:id',getNetworkbyId)
router.post('/network',createNetwork)
router.put('/network/:id',updateNetwork)
router.delete('/network/:id',deleteNetwork)

export default router;