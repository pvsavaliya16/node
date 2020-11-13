const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicGFydGhzYXZhbGl5YSIsImEiOiJja2hkY2dtam0wNjAzMnJvZjMxbHc1MmQzIn0.uKU_euDo1XK3Wg-vM1TrYQ&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unabke to connect to location services", undefined);
    } else if (response.body.features.length == 0) {
      callback("Unable to find location. Try another", undefined);
    } else {
      const latitude = response.body.features[0].center[0];
      const longitude = response.body.features[0].center[1];
      const location = response.body.features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};


module.exports = geocode 