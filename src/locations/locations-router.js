
const path = require('path');
const express = require('express');
const locationsRouter = express.Router();
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');
const locationsService = require('./locations-service');



locationsRouter

    .route('/locations')
    .get(async (req,res,next) => {
        const db = req.app.get('db');
        try{
            const locations = await reviewService.list;
            res.json(reviews);
        }catch(err) {
            next (err)
        }
    })



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