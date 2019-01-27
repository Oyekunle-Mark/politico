import request from 'supertest';

import app from '../index';

describe('POST /parties', function () {
  it('respond with json containing the newly created party', function (done) {
    request(app)
      .post('/api/v1/parties')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});


describe('GET /parties/1', function () {
  it('fetched a specific political party', function (done) {
    request(app)
      .get('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET /parties/', function () {
  it('fetch all political parties records', function (done) {
    request(app)
      .get('/api/v1/parties/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('PATCH /parties/1/name', function () {
  it('edit the name of a specific political party', function (done) {
    request(app)
      .patch('/api/v1/parties/1/name')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('DELETE /parties/1', function () {
  it('delete a specific political party', function (done) {
    request(app)
      .del('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('POST /offices', function () {
  it('create a political office', function (done) {
    request(app)
      .post('/api/v1/offices')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET /offices', function () {
  it('fetch all offices records', function (done) {
    request(app)
      .get('/api/v1/offices')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET /offices/1', function () {
  it('fetch all offices records', function (done) {
    request(app)
      .get('/api/v1/offices/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});
