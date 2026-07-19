import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  voucherNumber: { type: String, unique: true, required: true },
  voucherType: { 
    type: String, 
    enum: ['Receipt', 'Payment', 'Journal', 'Contra', 'Sales', 'Purchase'],
    required: true 
  },
  debitAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Ledger', required: true },
  creditAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Ledger', required: true },
  amount: { type: Number, required: true },
  description: String,
  referenceNumber: String,
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const AccountingEntry = mongoose.model('AccountingEntry', entrySchema);
export default AccountingEntry;
