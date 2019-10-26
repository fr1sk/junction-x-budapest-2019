const atmService = require('./atm.service');

const atmResponse = async (req, res) => res.sendStatus(200);

const atmAction = async (req, res) => {
  const { base64 } = req.params;
  res.json({ base64 });
};

module.exports = {
  atmResponse,
  atmAction
};
