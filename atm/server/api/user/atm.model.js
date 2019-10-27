const mongoose = require('mongoose');

const AtmSchema = new mongoose.Schema({
  STREET_ADDRESS: String,
  LOCATION: {
    X: Number,
    Y: Number,
  },
  ZIP: Number,
  ATM_DEPOSIT: {
    type: Boolean,
  },
  TRANSACTIONS: {},
  CURRENCY: {

  }
});


module.exports = mongoose.model('Atm', AtmSchema);