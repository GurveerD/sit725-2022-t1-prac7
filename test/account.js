const axios = require('axios');
const chai = require('chai');

describe('Route: Account:', () => {
  const URL = 'http://localhost:8080/api/account';
  let accountId;

  describe('GET request to /api/account', () => {
    it('Should give back an array of all the account', (done) => {
      axios
        .get(URL)
        .then((res) => {
          chai.expect(res.status).to.equal(200);
          chai.expect(res.data).to.be.an('array');
        })
        .then(done, done);
    });
  });

  describe('POST request to /api/accounts', () => {
    it('should create a new account', (done) => {
      axios
        .post(URL, {
          userName: 'Lucy Lucine',
          email: 'test@user.com',
          password: '123',
          createdAt: 'Tue, 27 Apr 2022 02:11:29 GMT',
        })
        .then((res) => {
          console.log(res.data._id);
          accountId = res.data.insertedId;
          console.log(accountId);
          chai.expect(res.status).to.equal(200);
          chai.expect(res.data).to.be.an('object');
          chai.expect(res.data).to.have.property('message').to.equal('Account created');
        })
        .then(done, done);
    });
  });

  describe('POST request to /api/accounts/auth', () => {
    it('should authorize the test user', (done) => {
      axios
        .post(URL+'/auth', {
          email: 'test@user.com',
          password: '123',
        })
        .then((res) => {
          chai.expect(res.status).to.equal(200);
          chai.expect(res.data).to.be.an('object');
          chai.expect(res.data).to.have.property('success').to.equal(true);
        })
        .then(done, done);
    });
  });

  describe('Delete Account with ID /api/review/:id', () => {
    it('should delete the test account', (done) => {
      axios
        .delete(URL + '/' + accountId)
        .then((res) => {
          chai.expect(res.status).to.equal(200);
          chai.expect(res.data).to.be.an('object');
          chai.expect(res.data).to.have.property('message').to.equal('Account deleted');
        })
        .then(done, done);
    });
  });
});
