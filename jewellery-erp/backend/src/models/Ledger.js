import mongoose from 'mongoose';

const ledgerSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountType: { 
    type: String, 
    enum: ['Asset', 'Liability', 'Income', 'Expense', 'Capital', 'Drawings'],
    required: true 
  },
  openingBalance: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
  description: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Ledger = mongoose.model('Ledger', ledgerSchema);
export default Ledger;
