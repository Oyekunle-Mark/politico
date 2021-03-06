import request from 'supertest';
import { expect } from 'chai';

import app from '../index';

const TOKEN = process.env.TEST_TOKEN;

describe('POST /auth', () => {
  it('respond with a 400 when a token is not sent', (done) => {
    request(app)
      .post('/api/v1/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });

  it('respond with user object', (done) => {
    request(app)
      .post('/api/v1/auth')
      .send({
        token: TOKEN
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });
});

describe('GET /auth/users', () => {
  it('respond with a 404', (done) => {
    request(app)
      .get('/api/v1/auth/users')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
});

describe('GET /candidates', () => {
  it('respond with a 404', (done) => {
    request(app)
      .get('/api/v1/candidates')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
});
