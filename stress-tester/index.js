const axios = require('axios');
const _ = require('lodash');

async function main() {

    const backendUrl = process.env.BACKEND_URL;

    const lat = 47.480829799999995;
    const long = 19.0790687;

    const recommendations = await Promise.all(
        _.range(0, 100)
            .map(async i => {
                const request = {
                    location: {
                        X: lat,
                        Y: long
                    },
                    deposit: i % 2 === 0
                };

                if (!request.deposit) {
                    request.amount = randomAmount();
                    request.currency = randomCurrency();
                }
                // console.log(`req: ${i} - ${JSON.stringify(request)}`);
                const r = await axios.post(`${backendUrl}/api/atms/recommend`, request);
                // console.log(r.data[0]);
                return r.data[0];
            })
    );

    const r = _.groupBy(recommendations, x => x._id);
    Object.keys(r).forEach(key => {
        const values = r[key];
        const totalTime = _.sumBy(values, v => v.EST_TIME_IN_MINS);
        console.log(`Id: ${key} // count: ${values.length} // total time: ${totalTime}`)
    })
}

function randomBetween(exclusiveMin, inclusiveMax) {
    return Math.floor(Math.random() * (inclusiveMax - exclusiveMin + 1)) + exclusiveMin;
}

const MAGNITUDE = 1000000;

const randomLat = () => randomBetween(47.480129799999995 * MAGNITUDE, 47.480929799999995 * MAGNITUDE) / MAGNITUDE;

const randomLong = () => randomBetween(19.0790687 * MAGNITUDE, 19.0799687 * MAGNITUDE) / MAGNITUDE;

const randomCurrency = () => randomBetween(0, 2) ? 'HUF' : 'EUR';

const randomAmount = () => randomBetween(10, 200);

main();
