const Atm = require('./atm.model');

const fillAtms = async () => {
  const json = require('../../../atm_new.json');
  console.log(json);
  return Atm.insertMany(json);
}

// (async () => await fillAtms())();