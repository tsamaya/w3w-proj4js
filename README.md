# w3w-proj4

This repository show how to use [what3words](https://what3words.com) [API](https://what3words.com/api) and project coordinates into a specific coordinate system with [Proj4js](http://proj4js.org/).

This sample projects the coordinates into [EPSG:2154](http://spatialreference.org/ref/epsg/2154/) (RGF93 - Lambert93).

## prerequisite
  - [node](https://nodejs.org/en/) and npm installed
  - Get your what3owrds API key :
    - create your free account : [register](https://accounts.what3words.com/)
    - get your key

## usage
  - clone this repo

  - then

    `$ cd /path/to/repo`

  - setup the environment

    `$ npm i`

  - set the environment variable `W3W_API_KEY` with your key

    `$ export W3W_API_KEY=YOUR-API-KEY`

  - run the sample

    ```shell
    $ node index.js
    what3words.forward("ombrer.prédestiner.glucide")
    lat: 47.87124 lng: -4.104408
    RGF3 x: 169585.18686671508 y: 6776193.512560901
    ```

## code

1.  import dependencies

  ```javascript
  const what3words = require('what3words-api-nodejs-client');
  const proj4 = require('proj4');

  ```

1. define the target coordinate system.

  what3words uses the standard WGS84 (EPSG:4326), it is predefined on proj4.

  ```javascript
  const RGF93 = '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';

  proj4.defs['EPSG:2154'] = RGF93;
  ```

1. geocode the address

  ```javascript
  const p = what3words.forward({
    addr: address
  });
  ```

1. treat the response or error

  this what3words node [client](https://www.npmjs.com/package/what3words-api-nodejs-client) returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  ```javascript
  p.then((response) => {    
    ...
  ).catch((error) => {
    ...
  });
  ```

    - log error

      just log it here
      ```javascript
      console.error(error);
      ```

    - process the response

      get coordinates from what3words API response
      ```javascript
      const data = JSON.parse(response);
      const lat = data.geometry.lat;
      const lng = data.geometry.lng;
      console.log('lat:', lat, 'lng:', lng);
      ```

    - project the coordinates into the target system (here RFG93)

      ```javascript
      const coords = proj4(proj4.defs['EPSG:4326'], proj4.defs['EPSG:2154'], [lng, lat]);
      let x = coords[0];
      let y = coords[1];
      console.log('RGF3 x:', x, 'y:', y);
      ```

## license

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE.md) file.
