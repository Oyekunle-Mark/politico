import request from 'supertest';

import app from '../index';

describe('POST /parties',() => {
  it('respond with json containing the newly created party', (done) => {
    request(app)
      .post('/api/v1/parties')
      .send({
        "name": "party",
        "hqAddress": "address",
        "logoUrl": "url",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});


describe('GET /parties/1',() => {
  it('fetched a specific political party', (done) => {
    request(app)
      .get('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET /parties/',() => {
  it('fetch all political parties records', (done) => {
    request(app)
      .get('/api/v1/parties/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('PATCH /parties/1/name', () => {
  it('edit the name of a specific political party', (done) => {
    request(app)
      .patch('/api/v1/parties/1/name')
      .send({
        "name": "name",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('DELETE /parties/1', () => {
  it('delete a specific political party', (done) => {
    request(app)
      .del('/api/v1/parties/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('POST /offices', () => {
  it('create a political office', (done) => {
    request(app)
      .post('/api/v1/offices')
      .send({
        "type": "type",
        "name": "name",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET /offices', () => {
  it('fetch all offices records', (done) => {
    request(app)
      .get('/api/v1/offices')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET /offices/1', () => {
  it('fetch specific political office',(done) => {
    request(app)
      .get('/api/v1/offices/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});
