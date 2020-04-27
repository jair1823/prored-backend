import { Router } from 'express';
import Network_Controller from '../controllers/network.controller'

const router = Router();

router.get('/', Network_Controller.getNetworks);
router.get('/:id', Network_Controller.getNetworkbyId);
router.post('/', Network_Controller.createNetwork);
router.put('/:id', Network_Controller.updateNetwork);
router.delete('/:id', Network_Controller.deleteNetwork);

export default router;