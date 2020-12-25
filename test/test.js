const supertest = require('supertest');
const app = require('../index');

const request = supertest(app);

describe('Calculating the current weather.....', () => {
    it('Searching for weather of the city', (done) => {
        request.post('/')
        .send({ city: 'Pune' })
          .then(data => {
              if(data && data.status === 200) {
                done();
              }       
          })
          .catch(err => {
            throw new Error(`Error --> ${err}`);
        })
    })
});