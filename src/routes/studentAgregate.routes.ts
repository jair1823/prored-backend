import { Router } from 'express';
const router = Router();

import {getPersons,getPersonbyId,getPersonBasic,getPersonInvited} from '../controllers/studentAgregate.controller';

router.get('/person', getPersons);
router.get('/person/:dni', getPersonbyId);
router.get('/person-basic', getPersonBasic);
router.get('/person-invited', getPersonInvited);

export default router;