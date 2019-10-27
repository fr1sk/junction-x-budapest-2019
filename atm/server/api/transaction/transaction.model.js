const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  atm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Atm',
  },
  type: String,
  amount: Number,
  qr_code: String,
  is_used: {
    type: Boolean,
    default: false,
  },
  valid_until: Date,
  currency_type: String,
});


module.exports = mongoose.model('Transaction', TransactionSchema);