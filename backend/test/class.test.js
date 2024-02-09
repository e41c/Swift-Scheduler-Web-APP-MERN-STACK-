// test/class.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../app'); // Your Express app
const Class = require('../models/Class');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Class API', () => {
  let token;

  // Generate mock JWT token before tests
  before(() => {
    const payload = { userId: 'mockUserId', role: 'teacher' };
    token = jwt.sign(payload, process.env.JWT_SECRET);
  });

  // Test creating a class
  it('should create a new class', async () => {
    const res = await chai.request(app)
      .post('/api/classes')
      .set('Authorization', `Bearer ${token}`)
      .send({ /* class data */ });

    expect(res).to.have.status(201);
    // Add more assertions as needed
  });

  // Test fetching classes
  it('should fetch all classes', async () => {
    const res = await chai.request(app)
      .get('/api/classes')
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    // Add more assertions as needed
  });

  // Add more test cases for updating, deleting classes, etc.
});
