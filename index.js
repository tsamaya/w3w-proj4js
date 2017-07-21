const what3words = require('what3words-api-nodejs-client');
const proj4 = require('proj4');

const RGF93 = '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
proj4.defs['EPSG:2154'] = RGF93;

const address = 'ombrer.prédestiner.glucide';

const p = what3words.forward({
  addr: address
});
p.then((response) => {
    console.log(`what3words.forward("${address}")`);
    const data = JSON.parse(response);
    const lat = data.geometry.lat;
    const lng = data.geometry.lng;
    console.log('lat:', lat, 'lng:', lng);
    const coords = proj4(proj4.defs['EPSG:4326'], proj4.defs['EPSG:2154'], [lng, lat]);
    let x = coords[0];
    let y = coords[1];
    console.log('RGF3 x:', x, 'y:', y);
  }
).catch((error) => {
  console.error(error);
});
