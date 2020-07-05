
import { Router } from 'express';
import Financial_Controller from '../controllers/financialItem.controller'

const router = Router();

router.get('/financial_item/', Financial_Controller.getFinancialItem);
router.get('/financial_item/specific/', Financial_Controller.getFinancialItemSpecific);
router.get('/financial_item/:id', Financial_Controller.getFinancialItembyId);
router.post('/financial_item/', Financial_Controller.createFinancialItem);
router.put('/financial_item/:id', Financial_Controller.updateFinancialItem);

export default router;