import Invoice from '../models/Invoice.js';
import Product from '../models/Product.js';

const generateInvoiceNumber = async () => {
  const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
  let invoiceNumber = 'INV00001';
  
  if (lastInvoice && lastInvoice.invoiceNumber) {
    const lastNum = parseInt(lastInvoice.invoiceNumber.replace('INV', ''));
    invoiceNumber = `INV${String(lastNum + 1).padStart(5, '0')}`;
  }
  
  return invoiceNumber;
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({}).populate('createdBy', 'name email');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('items.product');
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    
    // Update product stock
    for (const item of req.body.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stockQuantity -= item.quantity;
        await product.save();
      }
    }
    
    const invoice = await Invoice.create({
      ...req.body,
      invoiceNumber,
      createdBy: req.userId
    });
    
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (invoice) {
      Object.assign(invoice, req.body);
      const updatedInvoice = await invoice.save();
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (invoice) {
      // Restore product stock
      for (const item of invoice.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockQuantity += item.quantity;
          await product.save();
        }
      }
      
      await invoice.deleteOne();
      res.json({ message: 'Invoice removed' });
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailySalesReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const invoices = await Invoice.find({
      createdAt: { $gte: today, $lt: tomorrow }
    });
    
    const totalSales = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
    const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    
    res.json({
      date: today,
      totalInvoices: invoices.length,
      totalSales,
      totalPaid,
      totalPending: totalSales - totalPaid,
      invoices
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
