const Atm = require('./atm.model');

const fillAtms = async () => {
  const json = require('../../../atm_new.json');
  console.log(json);
  return Atm.insertMany(json);
}

const addRecomendationParams = async () => {
  console.log('adding params');
  const atms = await Atm.find();
  await Promise.all(atms.map(async x => {
    x.weight = 0.3;
    await x.save();
  }));
}
// (async () => await fillAtms())();
(async () => await addRecomendationParams())();