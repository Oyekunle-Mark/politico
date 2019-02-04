import request from 'supertest';
import { expect } from 'chai';

import app from '../index';

describe('GET /parties empty array', () => {
    it('respond with a 404 and error message', (done) => {
      request(app)
        .get('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          done(err);
      });
    });
  
    it('respond with a 404 and error message', (done) => {
      request(app)
        .get('/api/v1/parties/')
        .set('Accept', 'application/json')
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
          "name": "party",
          "hqAddress": "address",
          "logoUrl": "url",
        })
        .set('Accept', 'application/json')
        .expect(201, done)
    });
  
    it('response should have a party object with the name property and value party', (done) => {
      request(app)
        .post('/api/v1/parties')
        .send({
          "name": "party",
          "hqAddress": "address",
          "logoUrl": "url",
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('name');
          expect(res.body.data[0].name).to.equal('party');
          done(err);
        });
    });
  
    it('response should return with status 404 and an error message when a field is not filled', (done) => {
      request(app)
        .post('/api/v1/parties')
        .send({})
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Provide name, address and logo of the party');
          done(err);
        });
    });
  });
  
  describe('GET /parties/1',() => {
    it('respond with status code 200', (done) => {
      request(app)
        .get('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  
    it('respond with a party object with name and logoUrl property', (done) => {
      request(app)
        .get('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('name');
          expect(res.body.data[0].logoUrl).to.equal('url');
          done(err);
      });
    });
  
    it('respond with a status code 404 and error message when id exceed party numbers', (done) => {
      request(app)
        .get('/api/v1/parties/6')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body.error).to.equal("Id exceeds number of parties");
          done(err);
        });
    });
  });
  
  describe('GET /parties/',() => {
    it('respond with a status code 200', (done) => {
      request(app)
        .get('/api/v1/parties/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  
    it('respond with an array of party object', (done) => {
      request(app)
        .get('/api/v1/parties/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.data).to.be.a("Array");
          expect(res.body.data[0]).to.have.property('name');
          expect(res.body.data[0]).to.have.property('logoUrl');
          done(err);
        });
    });
  });
    
  describe('PATCH /parties/1/name', () => {
    it('respond with 202 and a json object', (done) => {
      request(app)
        .patch('/api/v1/parties/1/name')
        .send({
          "name": "name",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(202, done)
    });
  
    it('respond with party object of new name newName', (done) => {
      request(app)
        .patch('/api/v1/parties/1/name')
        .send({
          "name": "newName",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.data[0].name).to.equal('newName');
          expect(res.body.data[0].id).to.equal(1);
          done(err);
        });
    });
  
    it('respond with 404 when id sent exceeds party number', (done) => {
      request(app)
        .patch('/api/v1/parties/3/name')
        .send({
          "name": "name",
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('Id exceeds number of parties');
          done(err);
        })
    });
  });
  
  describe('DELETE /parties/1', () => {
    it('respond with a status 200 and a message', (done) => {
      request(app)
        .del('/api/v1/parties/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('message');
          expect(res.body.data[0].message).to.be.equal('Party deleted');
          done(err);
        });
    });
  
    it('respond with 404', (done) => {
      request(app)
        .del('/api/v1/parties/5')
        .expect(404, done)
    });
  });
