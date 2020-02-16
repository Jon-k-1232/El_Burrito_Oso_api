

const express = require('express');
const locationsRouter = express.Router();
const https = require('https');




locationsRouter

    .route('/:location')
    .get(async (req,res) => {
        let loc = req.params.location;
        let userLocation = loc.toString();


// postman test endpoint:    http://localhost:8000/api/locations/16421+North+tatum+Blvd,+Glendale,+Az,+85032

        // setting geoCode variables
        const geo = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation +
            '&key=AIzaSyB3NE69ANz_b5ciRwN0D8PalZYy353pqS4';

// api call for Geo Code to get the Lat/Long.
        const googleGeo = () => {
            https.get(geo, (resp) => {
                let geoData = '';

                resp.on('data', (response) => {
                   geoData += response;
                });

                resp.on('end', () => {
                    return places(JSON.parse(geoData))
                });
            })
                .on('error', (err) => {
                    res.send('There was and error: ' + err.message)
                });
        };



// api call taking in Lat Long from googleGeo and making a new api to Google Places for restaurant location data.
        const places = (geoData) => {
                const latitude = geoData.results[0].geometry.location.lat;
                const longitude = geoData.results[0].geometry.location.lng;


            const burritoRain = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
                latitude + ',' + longitude + '&radius=32186.88&type=restaurant' +
                '&keyword=burrito&key=AIzaSyB3NE69ANz_b5ciRwN0D8PalZYy353pqS4';

            https.get(burritoRain, (resp) => {
                let burritoLoco = '';

                resp.on('data', (response) => {
                    burritoLoco += response;
                });

                resp.on('end', () => {
                    return doMaths(JSON.parse(burritoLoco))
                });
            })
                .on('error', (err) => {
                    res.send('There was and error: ' + err.message)
                });
        };



// filter restaurant data and return new Json array of objects to frontend.
        const doMaths = (burritoLoco) => {
            const db = req.app.get("db");

            let filteredResData = [
                {
                    id: '',
                    name: '',
                    vicinity: '',
                    reviews: '',
                    rating: '',
                    average_Rate: '',
                },
            ];




        };




        return googleGeo();
    });



module.exports = locationsRouter;


/*

-need to accept user address from Front end
-Address needs to be ran through GeoCode to get the latitude/ longitude
-Output of Geo code must me passed to Google Places API in order to form endpoint
-Response of Google Api to be stored into new array

-pull restaurant id from Google Places Api Array and compare to restaurant Id's in DB
    -If matches found then select db elements, Create a new array of DB review finds for that restaurant ID.
        -join DB finds array of objects, and Google Places Api Object into a new object.
        -Basic data to be in new array.

    -else return Google Place's Api array object with basic data.



-Json Element that should be returned to front end should contain basic Data.
-Ratings will need averaged on the front end to give restaurant an overall average score but also display each users rating.

[{
restaurantData = {
    Restaurant Id: some number,
    Name: "some name",
    Address: "some address",
    Phone: "phone number",
    },

reviewsData = {
    review1: "blah blah blah some review text",
    rating1: 8.2
    },
    {
    review2: "blah blah blah some review text",
    rating2: 8.4
    },
}]


 */
