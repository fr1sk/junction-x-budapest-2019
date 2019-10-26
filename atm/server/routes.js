const atm = require('./api/atm');

module.exports = app => {
  app.use('/atm', atm);

  app.get('/scan', (req, res) => {
    res.render('index', { });
  });
};
