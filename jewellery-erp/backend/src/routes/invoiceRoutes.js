import express from 'express';
import { 
  getInvoices, 
  getInvoiceById, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice,
  getDailySalesReport
} from '../controllers/invoiceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getInvoices);
router.get('/daily-report', protect, getDailySalesReport);
router.get('/:id', protect, getInvoiceById);
router.post('/', protect, createInvoice);
router.put('/:id', protect, updateInvoice);
router.delete('/:id', protect, deleteInvoice);

export default router;
