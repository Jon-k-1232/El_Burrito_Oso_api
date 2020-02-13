


const path = require('path');
const express = require('express');
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');
const reviewRouter = express.Router();
const reviewService = require('./review-service.js');





reviewRouter

    .route('/submit')
    .get(async (req,res,next) => {
        const db = req.app.get('db');
        try{
            const reviews = await reviewService.list(db);
            res.json(reviews);
        }catch(err) {
            next (err)
        }
    })

    .post(jsonParser, async (req, res, next) => {
        const db = req.app.get('db');
        const { restaurantId, review, rating } = req.body;
        let newReview = {restaurantId, review, rating};

        newReview = sanitizeFields(newReview);
        try {
            const review = await reviewService.insert(db, newReview);
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${review}`))
                .json(review);
        } catch(err){
            next(err);
        }
    });



module.exports = reviewRouter;


