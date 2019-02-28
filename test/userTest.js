import request from 'supertest';
import { expect } from 'chai';

import app from '../index';

const TOKEN = process.env.TEST_TOKEN;

describe('POST /auth/signup ', () => {
  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'kunle',
        lastname: 'mark',
        othername: 'oye',
        email: 'mail@mail.com',
        phoneNumber: '880900998',
        passportUrl: 'https:goal.com',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});

describe('POST /auth/login', () => {
  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});

describe('POST /votes/', () => {
  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/v1/votes/')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/v1/votes/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});

describe('POST /office/<office-id>/register ', () => {
  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/office/1/register')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/office/1/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});

describe('POST /office/<office-id>/result ', () => {
  it('respond with a 404 and error message', (done) => {
    request(app)
      .post('/api/v1/office/1/result')
      .set('Accept', 'application/json')
      .set('x-access-token', TOKEN)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});
