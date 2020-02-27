const knex = require('knex');
const app = require('../src/app.js');
const { makeReviewArray, makeMaliciousReview } = require('./testReviews.fixtures.js');

describe('Review Endpoints', function() {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());

    before('clean the table', () => db('userreviews').truncate());

    afterEach('cleanup',() => db('userreviews').truncate());



// XSS attack on POST
    context(`Given an XSS attack review`, () => {
        const { maliciousReview, expectedReview } = makeMaliciousReview();

        beforeEach('insert malicious review', () => {
            return db
                .into('userreviews')
                .insert([ maliciousReview ])
        });

        it('removes XSS attack content', () => {
            return supertest(app)
                .get(`/reviews/submit`)
                .expect(200)
                .expect(res => {
                    expect(res.body[0].restaurantId).to.eql(expectedReview.restaurantId);
                    expect(res.body[0].review).to.eql(expectedReview.review);
                    expect(res.body[0].rating).to.eql(expectedReview.rating)
                })
        })
    });




    //XSS Attack on GET
    describe(`GET /locations/:location`, () => {

        context(`Given an XSS attackreview`, () => {
            const { maliciousReview, expectedReview } = makeMaliciousReview();

            beforeEach('insert maliciousreview', () => {
                return db
                    .into('userreviews')
                    .insert([ maliciousReview ])
            });

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/locations/:location`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].restaurantId).to.eql(expectedReview.restaurantId);
                        expect(res.body[0].review).to.eql(expectedReview.review);
                        expect(res.body[0].rating).to.eql(expectedReview.rating)
                    })
            })
        })
    })









});

