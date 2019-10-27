const atm = require('./api/atm');
const transaction = require('./api/transaction/transaction.controller');
const axios = require('axios');

module.exports = app => {
  app.use('/atm', atm);

  app.get('/scan', (req, res) => {
    res.render('index', { });
  });

  app.get('/QrHandler/:data', async (req, res) => {
    try {
      const { data } = req.params;
      const [ TRANSACTION_ID, QR_CODE ] = data.split('_');
      const x = await axios.post(`${process.env.API_URI}/api/transactions/withdraw`, { TRANSACTION_ID, QR_CODE });
      console.log(x, TRANSACTION_ID, QR_CODE);
      let msg = '';
      if (x.success) {
        if (x.type === 'witdraw') {
          msg = `Success: You successfully witdraw ${x.amount} ${x.currency} 💰`
        } else {
          msg = `Success: You successfully deposit ${x.currency} 💸`
        }
      } else {
        msg = 'Error: QR code expired or already used 🚫💰'
      }
      return res.render('success', { msg });
    } catch (e) {
      console.log('error reddirecting', e);
    }
  });
};
