import express from 'express';
import { 
  getLedgers, 
  createLedger, 
  updateLedger,
  getAccountingEntries,
  createAccountingEntry,
  getTrialBalance,
  getProfitLoss
} from '../controllers/accountingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/ledgers', protect, getLedgers);
router.post('/ledgers', protect, createLedger);
router.put('/ledgers/:id', protect, updateLedger);
router.get('/entries', protect, getAccountingEntries);
router.post('/entries', protect, createAccountingEntry);
router.get('/trial-balance', protect, getTrialBalance);
router.get('/profit-loss', protect, getProfitLoss);

export default router;
