import { Router } from 'express';
import User_Controller from '../controllers/user.controller';
import TokenValidator from '../lib/tokenValidator';

const router = Router();

router.post('/user',TokenValidator, User_Controller.createUser);
router.post('/user/email/exists', User_Controller.checkUserEmailExists);
router.post('/user/authenticate', User_Controller.authenticateUser);
router.get('/user', User_Controller.getUsers);
router.post('/forgotPassword', User_Controller.forgotPassword);
router.post('/validatePasswordToken', User_Controller.validatePasswordToken);
router.post('/resetPassword', User_Controller.resetPassword);
router.put('/updatePassword',TokenValidator, User_Controller.updatePassword);

export default router;