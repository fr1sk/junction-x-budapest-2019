import * as fs from 'fs';

async function addDataToJson(): Promise<Response> {
  const data: any = fs.readFileSync('../../atm.json');
  const key: string = 'ISO-8859-2';
  console.log('🗽', JSON.parse(data, key));
  return;
}

(async () => {
  await addDataToJson();
})();