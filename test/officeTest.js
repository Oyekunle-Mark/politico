import request from 'supertest';
import { expect } from 'chai';

import app from '../index';

describe('POST /offices', () => {
  it('respond with status code 201', (done) => {
    request(app)
      .post('/api/v1/offices')
      .send({
        "type": "type",
        "name": "name",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done)
  });

  it('respond with office name and type', (done) => {
    request(app)
      .post('/api/v1/offices')
      .send({
        "type": "type",
        "name": "name",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('name');
        expect(res.body.data[0].name).to.equal('name');
        expect(res.body.data[0].type).to.equal('type');
        done(err);
      });
    });

    it('respond with a status code 404', (done) => {
      request(app)
      .post('/api/v1/offices')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Provide type and name of the office.');
        done(err);
      });
  });
});

describe('GET /offices', () => {
  it('respond with status 200', (done) => {
    request(app)
      .get('/api/v1/offices')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('respond with an array of object', (done) => {
    request(app)
    .get('/api/v1/offices')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .end((err, res) => {
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('Array');
      expect(res.body.data[0].name).to.equal('name');
      expect(res.body.data[0].type).to.equal('type');
      done(err);
    })
  })
});

describe('GET /offices/1', () => {
  it('respond with status code 200',(done) => {
    request(app)
      .get('/api/v1/offices/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('respond with a single object with data array', (done) => {
    request(app)
      .get('/api/v1/offices/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.data[0]).to.have.property('name');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0].name).to.equal('name');
        expect(res.body.data[0].type).to.equal('type');
        done(err);
      });
  });

  it('respond with status code 404 when id exceeds number of party', (done) => {
    request(app)
      .get('/api/v1/offices/6')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('No office matches the id');
        done(err);
      });
  });
});
