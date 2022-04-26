const axios = require('axios');
const chai = require('chai');

describe('Route: Reviews:', () => {
  const URL = 'http://localhost:8080/api/review';
  let reviewId;

  describe('GET request to /api/reviews', () => {
    it('Should give back an array of all the reviews', (done) => {
      axios
        .get(URL)
        .then((res) => {
          chai.expect(res.status).to.equal(200);
          chai.expect(res.data).to.be.an('array');
        })
        .then(done, done);
    });
  });

  describe('POST request to /api/reviews', () => {
    it('should post a new review', (done) => {
      axios
        .post(URL, {
          title: 'This is a test review post',
          category: 'laptop',
          productName: 'Test Laptop',
          price: '1000',
          imgUrl: 'https://knowpathology.com.au/wp-content/uploads/2018/07/Happy-Test-Screen-01.png',
          review: 'lorem ipsum',
          postedBy: 'John Doe',
          createdAt: '27/04/2022',
        })
        .then((res) => {
          reviewId = res.data.insertedId;
          chai.expect(res.status).to.equal(200);
          chai.expect(res.data).to.be.an('object');
          chai.expect(res.data).to.have.property('message').to.equal('Your review has been posted!');
        })
        .then(done, done);
    });
  });
  describe('Delete review with ID /api/review/:id', () => {
    it('should delete the test review', (done) => {
      axios
        .delete(URL + '/' + reviewId)
        .then((res) => {
          chai.expect(res.status).to.equal(200);
          chai.expect(res.data).to.be.an('object');
          chai.expect(res.data).to.have.property('message').to.equal('Review deleted');
        })
        .then(done, done);
    });
  });
});
