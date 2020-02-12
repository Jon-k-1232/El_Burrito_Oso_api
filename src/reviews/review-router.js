


const path = require('path');
const express = require('express');
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');
const reviewRouter = express.Router();
const reviewService = require('./review-service.js');




reviewRouter

    .route('/')
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

        for (const [key, value] of Object.entries(newReview)) {
            if (value === null) {
                return next({status: 400, message: `Missing '${key}' in request body`});
            }
        }

        newReview = sanitizeFields(newReview);
        try {
            const review = await reviewService.insert(db, newReview);
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${review.id}`))
                .json(review);
        } catch(err){
            next(err);
        }
    });




// find the restaurant ID
    reviewRouter
        .route('/:id')
        .all(async (req, res, next) => {
            try {
                const review = await reviewService.findById(req.app.get('db'), req.params.id);
                if (!review) {
                    return next({status: 404, message: 'review doesn\'t exist'});
                }
                res.review = review;
                next();
            } catch(err) {
                next(err);
            }
        })
        .get((req, res, next) => {
            res.json(res.review);
        });



module.exports = reviewRouter;


