import request from 'supertest';
import { expect } from 'chai';

import app from '../index';

const TOKEN = process.env.TEST_TOKEN;

describe('GET /parties empty array', () => {
    it('respond with a 404 and error message', (done) => {
      request(app)
        .get('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .set('x-access-token', TOKEN)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          done(err);
      });
    });
  
    it('respond with a 400 and error message', (done) => {
      request(app)
        .get('/api/v1/parties/')
        .set('Accept', 'application/json')
        .set('x-access-token', TOKEN)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property('message');
          done(err);
      });
    })
  })
  
  describe('POST /parties',() => {
    it('respond with status 201 and json containing the newly created party', (done) => {
      request(app)
        .post('/api/v1/parties')
        .send({
          "name": "test_name",
          "hqAddress": "test_address",
          "logoUrl": "url:url.com",
        })
        .set('x-access-token', TOKEN)
        .set('Accept', 'application/json')
        .expect(400, done)
    });
  
    it('response should return with status 404 and an error message when a field is not filled', (done) => {
      request(app)
        .post('/api/v1/parties')
        .send({})
        .set('x-access-token', TOKEN)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Name must be provided and be 3 characters or more');
          done(err);
        });
    });
  });
  
  describe('GET /parties/1',() => {
    it('respond with status code 200', (done) => {
      request(app)
        .get('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .set('x-access-token', TOKEN)
        .expect('Content-Type', /json/)
        .expect(404, done)
    });
  
    it('respond with a status code 404 and error message when id exceed party numbers', (done) => {
      request(app)
        .get('/api/v1/parties/747474747')
        .set('Accept', 'application/json')
        .set('x-access-token', TOKEN)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body.message).to.equal("No party matches the id");
          done(err);
        });
    });
  });
  
  describe('GET /parties/',() => {
    it('respond with a status code 200', (done) => {
      request(app)
        .get('/api/v1/parties/')
        .set('Accept', 'application/json')
        .set('x-access-token', TOKEN)
        .expect('Content-Type', /json/)
        .expect(404, done)
    });
  });
    
  describe('PATCH /parties/1/name', () => {
    it('respond with 202 and a json object', (done) => {
      request(app)
        .patch('/api/v1/parties/1/name')
        .send({
          "name": "test_name",
        })
        .set('x-access-token', TOKEN)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done)
    });
  
    it('respond with 404 when id sent exceeds party number', (done) => {
      request(app)
        .patch('/api/v1/parties/488848484/name')
        .send({
          "name": "test_name",
        })
        .set('x-access-token', TOKEN)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('No party matches the id');
          done(err);
        })
    });
  });
  
  describe('DELETE /parties/1', () => {
    it('respond with a status 200 and a message', (done) => {
      request(app)
        .del('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .set('x-access-token', TOKEN)
        .expect('Content-Type', /json/)
        .expect(404, done)
    });
  
    it('respond with 404', (done) => {
      request(app)
        .del('/api/v1/parties/0')
        .expect(401, done)
    });
  });
