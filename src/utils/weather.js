const request = require("request");

const getWeather = (location, callback) => {
   getCoordinates(location, geolocation => {
      const url =
         "https://api.darksky.net/forecast/243713d8a06c44ce75d13de08f45bd60/" +
         geolocation.lat +
         "," +
         geolocation.long +
         "?units=auto";

      request({ url: url, json: true }, (error, response) => {
         const { currently, daily } = response.body;
         const forecastSummary =
            daily.data[0].summary +
            " It is currently " +
            currently.temperature +
            " degrees out in " +
            geolocation.location +
            ". There is " +
            currently.precipProbability +
            "% chance of rain.";
         const forecast = {
            forecast: response.body,
            location: geolocation.location,
            forecastSummary
         };

         callback(forecast);

         // console.log(
         //    daily.data[0].summary +
         //       " It is currently " +
         //       currently.temperature +
         //       " degrees out in " +
         //       geolocation.location +
         //       ". There is " +
         //       currently.precipProbability +
         //       "% chance of rain."
         // );
      });
   });
};

const getCoordinates = (location, callback) => {
   const mapboxURL =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI(location) +
      ".json?access_token=pk.eyJ1IjoiYWlvbml1cyIsImEiOiJjazF1cnY4MWoxNHgyM2xwNDVybGhyZGQ4In0.hN1Dr0mZdI1xfjsXL-orWw";

   request({ url: mapboxURL, json: true }, (error, response) => {
      const { features } = response.body;
      const geolocation = {
         lat: features[0].geometry.coordinates[1],
         long: features[0].geometry.coordinates[0],
         location: features[0].place_name
      };

      callback(geolocation);
   });
};

module.exports = {
   getWeather: getWeather
};
