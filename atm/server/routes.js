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
      const x = await axios.post(`${process.env.API_URI}/api/transactions/withdraw`, { TRANSACTION_ID, QR_CODE, VALID_UNTIL: "2019-11-27T13:02:05.443Z" });
      console.log(x.data, TRANSACTION_ID, QR_CODE);
      let msg = '';
      if (x.data.success) {
        if (x.data.type === 'withdraw') {
          msg = `Success: You successfully witdraw ${x.data.amount} ${x.data.currency} 💰`
        } else {
          msg = `Success: You successfully deposit ${x.data.currency} 💸`
        }
      } else {
        msg = 'Sorry: QR code expired or already used 🚫💰'
      }
      return res.render('success', { msg });
    } catch (e) {
      console.log('error reddirecting', e);
    }
  });
};
