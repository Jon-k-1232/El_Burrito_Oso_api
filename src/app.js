require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const bodyParser = require('body-parser');
const reviewRouter = require('./reviews/review-router.js');





const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';


//middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


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






/*
//test connection Get
app.get('/api/test/get', (req, res) => {
    res.send('Hello, world!' + req.body)
});


// test connection Post
app.post('/api/test/post', function (req,res) {
 res.send("Hello world this is post" + req.body)
});
*/

/* ///////////////////////////\\\\  ERROR HANDLER  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/







module.exports = app;