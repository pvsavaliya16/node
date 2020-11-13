const request = require("request");

const forecast = (latitude, longitude, location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=812090a447c92d11f58067faadcd98c8&query=${longitude},${latitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unabke to connect to location services", undefined);
    } else if (!response.body.current) {
      callback("Unable to find location. Try another", undefined);
    } else {
      callback(
        undefined,
        ` ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degreees out in ${location} with ${response.body.current.humidity}% humidity. It feels like ${response.body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;