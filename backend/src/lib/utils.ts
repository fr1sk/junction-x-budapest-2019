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
import { transactionRepository } from 'gateways'

const checkCron = new cronJob('5 * * * * *', (async () => {
  try {
    console.log('⏲ cron checker');
    const allTransactions = await transactionRepository.findAllActiveTransactions();
    const currDate = new Date();
    await Promise.all(allTransactions.map(async x => {
      if (currDate.getTime() > x.valid_until.getTime()) {
        x.is_used = true;
        await x.save();
        
      }
    }));
  } catch (e) {
    console.log('⌚🛑 Error in wheelWeeklyCron', e);
  }
}), null, false, 'America/Los_Angeles');




