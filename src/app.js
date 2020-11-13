const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static dir
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Parth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Parth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Parth",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide Search term",
    });
  } else {
    let resData;
    let location;
    geocode(req.query.address, (error, data) => {
      if (error) {
        res.send({
            error
        })
      } else {
          location = data.location
        forecast(data.latitude, data.longitude, data.location, (error, data) => {
            if (error) {
                res.send({
                    error
                })
            } else {
              resData = data;
              res.send({
                forecast: resData,
                location,
                address: req.query.address
              });
            }
          }
        );
      }
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You mus provide address ",
    });
  } else {
    res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Parth",
    message: "Error 404: Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Parth",
    message: "Error 404: Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!!");
});
