import { Router } from 'express';
import User_Controller from '../controllers/user.controller'

const router = Router();

router.post('/user', User_Controller.CreateUser);
router.post('/user/test', User_Controller.testUser);
router.get('/user', User_Controller.getUsers);

export default router;