const request = require('supertest');
const server = 'http://localhost:3000';

//using supertest to test the server functionality

describe('Route integration', () => {
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/jsx content type', () => {
                return request(server)
                .get('/')
                .expect('Content-Type', /text\/jsx/)
                .expect(200);
            })
        })
    })
    describe('/signup', () => {
        describe('POST', () => {
            it('responds with 200 status and JSON object with user data', () => {
                const newUser = { username: 'testing454', password: 'test123', city: 'h-town', };
                return request(server)
                .post('/signup')
                .send(newUser)
                .expect(200)
                .then((response) => {
                    expect(response.body).toHaveProperty('redirect');
                 })
                });

            it('responds to invalid request with 400 status and error message in body', () => {
                const newUser = { username: 'testing780', password: '', city: '', };
                return request(server)
                .post('/signup')
                .send(newUser)
                .expect(400)
                .then((response) => {
                    console.log('RES BODY: ', response.body)
                    expect(response.body.error).toBeDefined();
                 })
            })
            
            })
    
            })
            describe('/map', () => {
                describe('GET', () => {
                  it('responds with 200 status and application/javascript content type', () => {
                      return request(server)
                      .get('/map')
                      .expect('Content-Type', /application\/javascript/)
                      .expect(200);
        })
    })
            
 })
 })
