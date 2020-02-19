const express = require("express");
const locationsRouter = express.Router();
const https = require("https");



// postman test endpoint:    http://localhost:8000/api/locations/16421+North+tatum+Blvd,+Glendale,+Az,+85032



locationsRouter.route("/:location").get(async (req, res) => {
  let loc = req.params.location;
  let userLocation = loc.toString();

  // setting geoCode variables
  const geo =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    userLocation +
    "&key=AIzaSyB3NE69ANz_b5ciRwN0D8PalZYy353pqS4";




  // api call for Geo Code to get the Lat/Long.
  const googleGeo = () => {
    https
      .get(geo, resp => {
        let geoData = "";

        resp.on("data", response => {
          geoData += response;
        });

        resp.on("end", () => {
            console.log("GET --- Geo Hit")
          return places(JSON.parse(geoData));
        });
      })
      .on("error", err => {
        res.send("There was and error: " + err.message);
      });
  };





  // api call taking in Lat Long from googleGeo and making a new api to Google Places for restaurant location data.
  const places = geoData => {
    const latitude = geoData.results[0].geometry.location.lat;
    const longitude = geoData.results[0].geometry.location.lng;

    const burritoRain =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      latitude +
      "," +
      longitude +
      "&radius=32186.88&type=restaurant" +
      "&keyword=burrito&key=AIzaSyB3NE69ANz_b5ciRwN0D8PalZYy353pqS4";

    https
      .get(burritoRain, resp => {
        let burritoLoco = "";

        resp.on("data", response => {
          burritoLoco += response;
        });

        resp.on("end", () => {
          console.log("GET --- Burrito Rain Hit")
            return dbSearch(JSON.parse(burritoLoco));
        });
      })
      .on("error", err => {
        res.send("There was and error: " + err.message);
      });
  };





  // searches the DB for restaurant id comparision, returns db hits in array of objects, then joins with Google places to send back to front end.
  const dbSearch = burritoLoco => {
    const db = req.app.get("db");
    const restIds = [];
    burritoLoco.results.forEach(res => restIds.push(res.id));
    db.select()
      .from("userreviews")
      .whereIn("restaurantId", restIds)
      .then(reviews => res.send({ results: burritoLoco.results, reviews }));
  };




  return googleGeo();
});

module.exports = locationsRouter;
