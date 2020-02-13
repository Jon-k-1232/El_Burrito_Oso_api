require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const reviewRouter = require('./reviews/review-router.js');





const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';


//middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());
app.use(cors());


/* ///////////////////////////\\\\  KEY VALIDATION  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/


/*
app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
});
*/



/* ///////////////////////////\\\\  ENDPOINTS  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/


//---- app.use('/api/locations', locationsRouter);

/*   ^^^  "get" request, takes city and state from front end, then runs through GeoCode to get lat long, then pass's
lat/long response to google places. Google places will then run against DB for user reviews/ ratings and merge into
response JSON object which then returns a list of restaurant names, address's, phone's, user rating, and user reviews.

Front end this return data will be kept in context.
 */




app.use('/api/reviews', reviewRouter);
/*   ^^^   "post" request, new user review. User review will be stored into data base. Accepts restaurant ID from google
places, user review, and rating.
 */



app.use(errorHandler);


/* ///////////////////////////\\\\  ERROR HANDLER  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/


function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'development') {
        response = { error: 'server error' }
    } else {
        console.error(error);
        response = { message: error.message, error }
    }
    res.status(500).json(response)
}





module.exports = app;