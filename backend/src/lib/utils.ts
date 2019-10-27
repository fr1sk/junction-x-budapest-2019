// import * as fs from 'fs';

// function addDataToJson(): void {
//   const data: any = fs.readFileSync('../../atm.json');
//   const key: string = 'ISO-8859-2';
//   console.log('🗽', JSON.parse(data, key));
// }

// (async () => {
//   await addDataToJson();
// })();

import { CronJob } from 'cron';
import { transactionRepository, atmRepository } from 'gateways'

const checkCron = new CronJob('1 * * * * * *', (async () => {
  try {
    console.log('⌚ cron checker');
    const allTransactions = await transactionRepository.findAllActiveTransactions();
    const currDate = new Date();
    await Promise.all(allTransactions.map(async x => {
      if (x.valid_until && currDate.getTime() > x.valid_until.getTime()) {
        x.is_used = true;
        await atmRepository.incrementBalance(x.atm, x.currency_type, x.amount);
        await x.save();
      }
    }));
  } catch (e) {
    console.log('⌚error in cron: ', e);
  }
}), null, false, 'America/Los_Angeles');

export default checkCron;




