const express = require("express");
const restaurantRouter = express.Router();
const https = require("https");




restaurantRouter.route("/:location").get(async (req, res) => {
    let loc = req.params.location;
    let userLocation = loc.toString();
    const places = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${userLocation}&key=${process.env.API_TOKEN}`;

    // gets google places api data. Takes place_id from params on front end. Place-id passed to api for data.
    const googlePlaces = () => {
        https
            .get(places, resp => {
                let placeData = "";

                resp.on("data", response => {
                    placeData += response;
                });

                resp.on("end", () => {
                    return placesDb(JSON.parse(placeData));
                });
            })
            .on("error", err => {
                res.send("There was an error: " + err.message);
            });
    };

    //searches data base for matching reviews, then returns matching reviews along with restaurant data.
    const placesDb = (placeData) => {
        const db = req.app.get("db");
        console.log('db hit')
        db.select()
            .from("userreviews")
            .whereIn("restaurantId", [placeData.result.place_id])
            .then(reviews => res.send({ results: placeData.result, reviews, message:200 }))
    };


    return googlePlaces();
    });


module.exports = restaurantRouter;

