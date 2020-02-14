
const express = require("express");
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");
const reviewRouter = express.Router();


reviewRouter
  .route("/submit")
  .post(jsonParser, async (req, res, next) => {
    const db = req.app.get("db");
    const { restaurantId, review, rating } = req.body;
    let newReview = { restaurantId, review, rating };

    newReview = sanitizeFields(newReview);

    db.insert(newReview)
      .returning("*")
      .into("userreviews")
      .then(function(newReview) {
        res.send('confirmed received');
      });

  });

module.exports = reviewRouter;
