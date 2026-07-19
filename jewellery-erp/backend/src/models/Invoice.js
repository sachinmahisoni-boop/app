import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true, required: true },
  customer: {
    name: { type: String, required: true },
    phone: String,
    email: String,
    address: String,
    gstin: String
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    designCode: String,
    name: String,
    quantity: { type: Number, default: 1 },
    weight: Number,
    ratePerGram: Number,
    makingCharges: Number,
    gstRate: Number,
    amount: Number
  }],
  subtotal: { type: Number, required: true },
  totalMakingCharges: { type: Number, default: 0 },
  totalGst: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentMode: { 
    type: String, 
    enum: ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Cheque', 'Mixed'] 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Paid', 'Partial', 'Pending'], 
    default: 'Pending' 
  },
  paidAmount: { type: Number, default: 0 },
  balanceAmount: { type: Number, default: 0 },
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isOnline: { type: Boolean, default: false }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
