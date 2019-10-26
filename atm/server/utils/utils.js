const fs = require('fs');

const addDataToJson = () => {
  const data = JSON.parse(fs.readFileSync('../../atm.json'));
  // console.log('🗽', JSON.parse(data, 'ISO-8859-2'));

  const newJson = [];
  for(atm of data) {
    if (!newJson.some(x => x.STREET_ADDRESS === atm.STREET_ADDRESS)) {
      newJson.push({
        STREET_ADDRESS: atm.STREET_ADDRESS,
        ZIP: atm.ZIP_CD,
        ATM_DEPOSIT: atm.ATM_DEPOSIT_FL === 'Y',
        LOCATION: {
          Y: atm.GEO_Y,
          X: atm.GEO_X
        },
        TRANSACTIONS: {
          [atm.TRX_DAY.trim()]: [atm.TRAN_CNT_0000_0030,	atm.TRAN_CNT_0030_0100,	atm.TRAN_CNT_0100_0130,	atm.TRAN_CNT_0130_0200,	atm.TRAN_CNT_0200_0230,	atm.TRAN_CNT_0230_0300,	atm.TRAN_CNT_0300_0330,	atm.TRAN_CNT_0330_0400,	atm.TRAN_CNT_0400_0430,	atm.TRAN_CNT_0430_0500,	atm.TRAN_CNT_0500_0530,	atm.TRAN_CNT_0530_0600,	atm.TRAN_CNT_0600_0630,	atm.TRAN_CNT_0630_0700,	atm.TRAN_CNT_0700_0730,	atm.TRAN_CNT_0730_0800,	atm.TRAN_CNT_0800_0830,	atm.TRAN_CNT_0830_0900,	atm.TRAN_CNT_0900_0930,	atm.TRAN_CNT_0930_1000,	atm.TRAN_CNT_1000_1030,	atm.TRAN_CNT_1030_1100,	atm.TRAN_CNT_1100_1130,	atm.TRAN_CNT_1130_1200,	atm.TRAN_CNT_1200_1230,	atm.TRAN_CNT_1230_1300,	atm.TRAN_CNT_1300_1330,	atm.TRAN_CNT_1330_1400,	atm.TRAN_CNT_1400_1430,	atm.TRAN_CNT_1430_1500,	atm.TRAN_CNT_1500_1530,	atm.TRAN_CNT_1530_1600,	atm.TRAN_CNT_1600_1630,	atm.TRAN_CNT_1630_1700,	atm.TRAN_CNT_1700_1730,	atm.TRAN_CNT_1730_1800,	atm.TRAN_CNT_1800_1830,	atm.TRAN_CNT_1830_1900,	atm.TRAN_CNT_1900_1930,	atm.TRAN_CNT_1930_2000,	atm.TRAN_CNT_2000_2030,	atm.TRAN_CNT_2030_2100,	atm.TRAN_CNT_2100_2130,	atm.TRAN_CNT_2130_2200,	atm.TRAN_CNT_2200_2230,	atm.TRAN_CNT_2230_2300,	atm.TRAN_CNT_2300_2330,	atm.TRAN_CNT_2330_2400
          ]
        }
      });
    } else {
      newJson.find(x => x.STREET_ADDRESS === atm.STREET_ADDRESS).TRANSACTIONS[atm.TRX_DAY.trim()] = [
        atm.TRAN_CNT_0000_0030,	atm.TRAN_CNT_0030_0100,	atm.TRAN_CNT_0100_0130,	atm.TRAN_CNT_0130_0200,	atm.TRAN_CNT_0200_0230,	atm.TRAN_CNT_0230_0300,	atm.TRAN_CNT_0300_0330,	atm.TRAN_CNT_0330_0400,	atm.TRAN_CNT_0400_0430,	atm.TRAN_CNT_0430_0500,	atm.TRAN_CNT_0500_0530,	atm.TRAN_CNT_0530_0600,	atm.TRAN_CNT_0600_0630,	atm.TRAN_CNT_0630_0700,	atm.TRAN_CNT_0700_0730,	atm.TRAN_CNT_0730_0800,	atm.TRAN_CNT_0800_0830,	atm.TRAN_CNT_0830_0900,	atm.TRAN_CNT_0900_0930,	atm.TRAN_CNT_0930_1000,	atm.TRAN_CNT_1000_1030,	atm.TRAN_CNT_1030_1100,	atm.TRAN_CNT_1100_1130,	atm.TRAN_CNT_1130_1200,	atm.TRAN_CNT_1200_1230,	atm.TRAN_CNT_1230_1300,	atm.TRAN_CNT_1300_1330,	atm.TRAN_CNT_1330_1400,	atm.TRAN_CNT_1400_1430,	atm.TRAN_CNT_1430_1500,	atm.TRAN_CNT_1500_1530,	atm.TRAN_CNT_1530_1600,	atm.TRAN_CNT_1600_1630,	atm.TRAN_CNT_1630_1700,	atm.TRAN_CNT_1700_1730,	atm.TRAN_CNT_1730_1800,	atm.TRAN_CNT_1800_1830,	atm.TRAN_CNT_1830_1900,	atm.TRAN_CNT_1900_1930,	atm.TRAN_CNT_1930_2000,	atm.TRAN_CNT_2000_2030,	atm.TRAN_CNT_2030_2100,	atm.TRAN_CNT_2100_2130,	atm.TRAN_CNT_2130_2200,	atm.TRAN_CNT_2200_2230,	atm.TRAN_CNT_2230_2300,	atm.TRAN_CNT_2300_2330,	atm.TRAN_CNT_2330_2400
      ]
    }
  }
  console.log(newJson.length);
  newJson.forEach(x => {
    const shouldHaveEur = !!Math.round(Math.random())
    x.CURRENCY = {
      HUF: Math.floor(Math.random() * 10000000) + 1000000,
      EUR: shouldHaveEur ? Math.floor(Math.random() * 15000) + 5000 : undefined
    }
    x.LOCATION.X = parseFloat(x.LOCATION.X.replace(',', '.'))
    x.LOCATION.Y = parseFloat(x.LOCATION.Y.replace(',', '.'))
  });
  // console.log(data);
  fs.writeFileSync('../../atm_new.json', JSON.stringify(newJson));
}


(async () => {
  await addDataToJson();
})();

