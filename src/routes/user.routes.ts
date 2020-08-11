import { Router } from 'express';
import User_Controller from '../controllers/user.controller';
import TokenValidator from '../lib/tokenValidator';

const router = Router();

router.post('/user',TokenValidator, User_Controller.createUser);
router.post('/user/email/exists', User_Controller.checkUserEmailExists);
router.post('/user/authenticate', User_Controller.authenticateUser);
router.get('/user', User_Controller.getUsers);
router.put('/updatePassword',TokenValidator, User_Controller.updatePassword);
router.get('/validateToken',TokenValidator, User_Controller.validateToken);
router.post('/restorePassword',TokenValidator, User_Controller.restorePassword);
router.put('/user/:id/disable',TokenValidator, User_Controller.disableUser);
router.put('/user/:id/enable',TokenValidator, User_Controller.enableUser);

export default router;