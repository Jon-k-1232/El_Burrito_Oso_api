const chai = require('chai')
let chaiHttp = require('chai-http');
const app = require('../src/app.js');
const should = chai.should();
const { TEST_DATABASE_URL, API_TOKEN2 } = require('../src/config.js');
const  knex = require('knex');





chai.use(chaiHttp);




describe('Express App', () => {

    let db;

    before('make knex instance', () => {
        db = knex({
                client: 'pg',
                connection: TEST_DATABASE_URL,
            });
        return app.set('db', db)
    });



    it('should return a 200 status message from POST /', () => {                // Testing POST
        let fakeData = {
            restaurantID: '123456',
            review: 'this is a test of the post route',
            rating: 5.5,
        };

        chai.request(app)
            .post('/reviews/submit',{
                headers: {
                    Authorization: `Bearer ${API_TOKEN2}`
                }
            })
            .send(fakeData)
            .end((err,res)=>{
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a('object')
            })
    });



    it.only('should return a message from GET /', (done) => {               // Testing GET
        chai.request(app)
            .get('/locations/16421+North+tatum+Blvd,+Glendale,+Az,+85032')
            .set('Authorization',`Bearer ${API_TOKEN2}`)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a('object');
                done();
            });
    });
});

