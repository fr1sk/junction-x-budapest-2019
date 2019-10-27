const transactionService = require('./transaction.service');

const getTransaction = async (tid) => {
  const { type, amount, currency_type: currency } = await transactionService.getTransactionDetails(tid);
  return { 
    type,
    amount,
    currency
   }
};

module.exports = {
  getTransaction
};
