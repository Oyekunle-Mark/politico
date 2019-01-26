import request from 'supertest';

import app from '../routes/api';

describe('POST /parties', function () {
  it('respond with json containing the newly created party', function (done) {
    request(app)
      .post('/parties')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


describe('GET /parties/1', function () {
  it('fetch a specific party record', function (done) {
    request(app)
      .get('/parties/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /parties/', function () {
  it('fetch all political parties records', function (done) {
    request(app)
      .get('/parties/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('PATCH /parties/1/name', function () {
  it('edit the name of a specific political party', function (done) {
    request(app)
      .patch('/parties/1/name')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('DELETE /parties/1', function () {
  it('delete a specific political party', function (done) {
    request(app)
      .del('/parties/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /offices', function () {
  it('create a political office', function (done) {
    request(app)
      .post('/offices')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /offices', function () {
  it('fetch all offices records', function (done) {
    request(app)
      .get('/offices')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /offices/1', function () {
  it('fetch all offices records', function (done) {
    request(app)
      .get('/offices/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
