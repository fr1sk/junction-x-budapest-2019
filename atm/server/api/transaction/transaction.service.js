const Transaction = require('./transaction.model');

const getTransactionDetails = async (tid) => Transaction.findOne({ _id: tid });

module.exports = {
  getTransactionDetails
}