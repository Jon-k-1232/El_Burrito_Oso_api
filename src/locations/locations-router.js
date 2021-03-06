const express = require("express");
const locationsRouter = express.Router();
const https = require("https");




locationsRouter.route("/:location").get(async (req, res) => {
  let loc = req.params.location;
  let userLocation = loc.toString();
  const geo = `https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=${process.env.API_TOKEN}`;
  let userLatLong=''; // this is being set in order to send the user latitude and Long back to front for map centering




  // api call for Geo Code to get the Lat/Long.
  const googleGeo = () => {
    https
      .get(geo, resp => {
        let geoData = "";

        resp.on("data", response => {
          geoData += response;
        });

        resp.on("end", () => {
          return places(JSON.parse(geoData));
        });
      })
      .on("error", err => {
        res.send("There was an error: " + err.message);
      });
  };





  // api call taking in Lat Long from googleGeo and making a new api to Google Places for restaurant location data.
  const places = geoData => {

    const latitude = geoData.results[0].geometry.location.lat;
    const longitude = geoData.results[0].geometry.location.lng;
    userLatLong= geoData          //setting of a global var in order to send geo location back to front with other data


      // search radius im meters, conversion = 3.5 miles, keyword is set to burrito
    const burritoRain =
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
      ${latitude},${longitude}&radius=5632&type=food&keyword=burrito&key=${process.env.API_TOKEN}`;

    https
      .get(burritoRain, resp => {
        let burritoLoco = "";

        resp.on("data", response => {
          burritoLoco += response;
        });

        resp.on("end", () => {
            return dbSearch(JSON.parse(burritoLoco));
        });
      })
      .on("error", err => {
        res.send("There was an error: " + err.message);
      });
  };





  /*
  searches the DB for restaurant id comparision, returns db hits in array of objects, then joins with Google
  places to send back to front end.
   */
  const dbSearch = (burritoLoco) => {
    const db = req.app.get("db");
    const restIds = [];
    burritoLoco.results.forEach(res => restIds.push(res.place_id));
    db.select()
      .from("userreviews")
      .whereIn("restaurantId", restIds)
      .then(reviews => res.send({ results: burritoLoco.results, reviews, userLatLong, message:200 }));
  };




  return googleGeo();
});

module.exports = locationsRouter;
