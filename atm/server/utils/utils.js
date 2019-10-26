const fs = require('fs');

const addDataToJson = () => {
  const data = JSON.parse(fs.readFileSync('../../atm.json'));
  // console.log('🗽', JSON.parse(data, 'ISO-8859-2'));
  data.forEach(x => {
    const shouldHaveEur = !!Math.round(Math.random())
    x.currency = {
      huf: Math.floor(Math.random() * 10000000) + 1000000,
      eur: shouldHaveEur ? Math.floor(Math.random() * 15000) + 5000 : undefined
    }
    x.GEO_Y = x.GEO_Y.replace(',', '.');
    x.GEO_X = x.GEO_X.replace(',', '.');
  })
  console.log(data);
  fs.writeFileSync('../../atm_new.json', JSON.stringify(data));
}

// (async () => {
//   await addDataToJson();
// })();

