import { Router } from 'express';
import Gantt_Controller from '../controllers/gantt.controller'

const router = Router();

/*Period*/
router.post('/period', Gantt_Controller.createPeriod);
router.put('/period/:id', Gantt_Controller.updatePeriod);
router.get('/period', Gantt_Controller.getPeriods);
/*Gantt*/
router.post('/gantt',Gantt_Controller.createGantt );
router.get('/gantt/:id', Gantt_Controller.getGantts);
/*Gantt Tasks*/
router.post('/gantt_task', Gantt_Controller.createGantt_Task);
router.put('/gantt_task/:id', Gantt_Controller.updateGantt_Task);
router.get('/gantt_task/:id', Gantt_Controller.getGantt_Tasks);


export default router;