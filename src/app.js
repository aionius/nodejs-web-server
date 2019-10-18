const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const weatherUtil = require("./utils/weather");

// initialize and set handlebars for HTML templating
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// easy access to the public folder
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
   res.render("index", {
      title: "Weather App", // send data to the template accessed by {{ title }}
      name: "Gilbert Macabuag"
   });
});

app.get("/help", (req, res) => {
   res.render("help", {
      helpText: "This is a helpful text.",
      title: "Help Page",
      name: "Gilbert Macabuag"
   });
});

app.get("/about", (req, res) => {
   res.render("about", {
      title: "About Page",
      name: "Gilbert Macabuag"
   });
});

app.get("/weather", (req, res) => {
   if (!req.query.location) {
      return res.send({ error: "Please enter location" });
   }

   weatherUtil.getWeather(req.query.location, location => {
      // res.send(location);
      const { currently } = location.forecast;

      const weatherForecast = {
         forecast: currently.summary,
         temperature: currently.temperature,
         windSpeed: currently.windSpeed,
         windGust: currently.windGust,
         visibility: currently.visibility,
         chanceOfRain: currently.precipProbability,
         uvIndex: currently.uvIndex,
         location: location.location,
         forecastSummary: location.forecastSummary
      };
      res.send(weatherForecast);
   });
});

app.get("/products", (req, res) => {
   if (!req.query.search) {
      return res.send({ error: "You must provide a search term" });
   }

   console.log(req.query);
   res.send({
      products: []
   });
});

app.get("/help/*", (req, res) => {
   res.render("notfound", {
      title: "404",
      errorMessage: "Help article not found.",
      name: "Gilbert Macabuag"
   });
});

app.get("*", (req, res) => {
   res.render("notfound", {
      title: "404",
      errorMessage: "Page not found.",
      name: "Gilbert Macabuag"
   });
});

app.listen(port, () => {
   console.log("Server is up on port 3000.");
});
