// import * as fs from 'fs';

// function addDataToJson(): void {
//   const data: any = fs.readFileSync('../../atm.json');
//   const key: string = 'ISO-8859-2';
//   console.log('🗽', JSON.parse(data, key));
// }

// (async () => {
//   await addDataToJson();
// })();

import { cronJob } from 'cron';

const checkCron = new cronJob('5 * * * * *', (async () => {
  try {
    console.log('⏲ cron checker');
    const allTransactions = await Cards.find({ 'config.wheel_card.limit': 'WEEKLY'});
    await Promise.all(allWeeklyWheelCard.map(async x => {
      await WheelUsage.deleteMany({ card: x._id });
    }));
  } catch (e) {
    console.log('⌚🛑 Error in wheelWeeklyCron', e);
  }
}), null, false, 'America/Los_Angeles');




