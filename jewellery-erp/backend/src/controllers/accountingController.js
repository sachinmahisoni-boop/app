import Ledger from '../models/Ledger.js';
import AccountingEntry from '../models/AccountingEntry.js';

export const getLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find({});
    res.json(ledgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLedger = async (req, res) => {
  try {
    const ledger = await Ledger.create(req.body);
    res.status(201).json(ledger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLedger = async (req, res) => {
  try {
    const ledger = await Ledger.findById(req.params.id);
    if (ledger) {
      Object.assign(ledger, req.body);
      const updatedLedger = await ledger.save();
      res.json(updatedLedger);
    } else {
      res.status(404).json({ message: 'Ledger not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAccountingEntries = async (req, res) => {
  try {
    const entries = await AccountingEntry.find({})
      .populate('debitAccount', 'accountName')
      .populate('creditAccount', 'accountName');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateVoucherNumber = async () => {
  const lastEntry = await AccountingEntry.findOne().sort({ createdAt: -1 });
  let voucherNumber = 'VOU00001';
  
  if (lastEntry && lastEntry.voucherNumber) {
    const lastNum = parseInt(lastEntry.voucherNumber.replace('VOU', ''));
    voucherNumber = `VOU${String(lastNum + 1).padStart(5, '0')}`;
  }
  
  return voucherNumber;
};

export const createAccountingEntry = async (req, res) => {
  try {
    const voucherNumber = await generateVoucherNumber();
    
    const entry = await AccountingEntry.create({
      ...req.body,
      voucherNumber,
      createdBy: req.userId
    });
    
    // Update ledger balances
    const debitLedger = await Ledger.findById(req.body.debitAccount);
    const creditLedger = await Ledger.findById(req.body.creditAccount);
    
    if (debitLedger && creditLedger) {
      debitLedger.currentBalance += req.body.amount;
      creditLedger.currentBalance -= req.body.amount;
      
      await debitLedger.save();
      await creditLedger.save();
    }
    
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrialBalance = async (req, res) => {
  try {
    const ledgers = await Ledger.find({ isActive: true });
    
    const trialBalance = {
      assets: [],
      liabilities: [],
      income: [],
      expenses: [],
      capital: [],
      drawings: []
    };
    
    ledgers.forEach(ledger => {
      if (ledger.accountType === 'Asset') {
        trialBalance.assets.push(ledger);
      } else if (ledger.accountType === 'Liability') {
        trialBalance.liabilities.push(ledger);
      } else if (ledger.accountType === 'Income') {
        trialBalance.income.push(ledger);
      } else if (ledger.accountType === 'Expense') {
        trialBalance.expenses.push(ledger);
      } else if (ledger.accountType === 'Capital') {
        trialBalance.capital.push(ledger);
      } else if (ledger.accountType === 'Drawings') {
        trialBalance.drawings.push(ledger);
      }
    });
    
    res.json(trialBalance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfitLoss = async (req, res) => {
  try {
    const incomeLedgers = await Ledger.find({ accountType: 'Income', isActive: true });
    const expenseLedgers = await Ledger.find({ accountType: 'Expense', isActive: true });
    
    const totalIncome = incomeLedgers.reduce((sum, ledger) => sum + ledger.currentBalance, 0);
    const totalExpense = expenseLedgers.reduce((sum, ledger) => sum + Math.abs(ledger.currentBalance), 0);
    
    const profitOrLoss = totalIncome - totalExpense;
    
    res.json({
      totalIncome,
      totalExpense,
      profitOrLoss,
      isProfit: profitOrLoss >= 0,
      incomeDetails: incomeLedgers,
      expenseDetails: expenseLedgers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
