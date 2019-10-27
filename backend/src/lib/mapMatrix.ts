require('dotenv').config()
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS
});

const mapDistance = async (origin, destination) => {
  const origins = [origin];
  console.log(origins)
  // console.log(origins, codes, info, destination);
  // debugger;
  return new Promise(async (res, rej) => {
    googleMapsClient.distanceMatrix({
      origins,
      destinations: [destination],
      mode: 'transit',
      units: 'metric'
    }, (response, status) => {
      console.log('mapping - status:', status);
      console.log('response: ', response);
      if (status.status !== 200) {
        console.log('Error was: ', status);
        rej(new Error('Error was STATUS'));
      } else {
        // console.log(status);
        // console.log(response);
        const finalArray = [];
        status.json.rows.map((r, i) => {
          if (r.elements[0].status === 'OK') {
            // console.log(r.elements[0].distance, '', r.elements[0].duration);
            // console.log('🦄', info[i], codes[i], r.elements[0].distance);
            return finalArray.push({
              distance: r.elements[0].distance,
              duration: r.elements[0].duration,
              mapFound: true,
              address: status.json.origin_addresses[i]
            });
          }
          return finalArray.push({ distance: {}, duration: {}, mapFound: false, address: origins[i] });
        });
        console.log('🍯 FINAL ARRAY: ', finalArray);
        return res(finalArray);
      }
    });
  });
};

// (async () => mapDistance({lat: 47.480829799999995, lng: 19.0790687}, {lat: 47.584129799999995, lng: 19.0790687}))();
export default mapDistance