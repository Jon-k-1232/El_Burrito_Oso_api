const chai = require('chai')
let chaiHttp = require('chai-http');
let should = chai.should();
const app = require('../src/app.js');


chai.use(chaiHttp);



// POST END POINT TEST, CONFIRMED WORKS, Must note out validation
describe('Express App', () => {
    it('should return a 200 status message from POST /', () => {

        let fakeData = {
            restaurantID: '123456',
            review: 'this is a test of the post route',
            rating: 5.5,
        };
        chai.request(app)
            .post('/reviews/submit')
            .send(fakeData)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object')

            })
    });
});



// GET END POINT, Must turn off validation
describe('Express App', (err,res) => {
    it('should return a message from GET /', (done) => {
        chai.request(app)
            .get('/locations/16421+North+tatum+Blvd,+Glendale,+Az,+85032')
            .end((err, res) => {
                expect(res.body.status).to.equals("status: 200");
                res.body.should.be.a('array');
                done();
            });
    });
});

