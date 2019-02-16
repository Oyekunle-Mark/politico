import express from 'express';
import trim from 'trim-request';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';

import partyMiddleware from '../middlewares/partyMiddleware';
import tokenAuth from '../middlewares/tokenAuth';

import createPartyQuery from '../model/partyQueries/createParty';
import getPartyQuery from '../model/partyQueries/getParty';
import getAllPartyQuery from '../model/partyQueries/getAllParty';
import editPartyQuery from '../model/partyQueries/editParty';
import deletePartyQuery from '../model/partyQueries/deleteParty';

const partyRouter = express.Router();

// the swagger api documentation
partyRouter.use('/', swaggerUi.serve);
partyRouter.get('/', swaggerUi.setup(swaggerDocument));

partyRouter.post('/parties', trim.body, tokenAuth.tokenCheck, partyMiddleware.createPartyCheck, createPartyQuery);
partyRouter.get('/parties/:id', tokenAuth.tokenCheck, getPartyQuery);
partyRouter.get('/parties/', tokenAuth.tokenCheck, getAllPartyQuery);
partyRouter.patch('/parties/:id/name', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
       next();}, trim.body, tokenAuth.tokenCheck, partyMiddleware.editSpecificPartyCheck, editPartyQuery);
partyRouter.delete('/parties/:id', tokenAuth.tokenCheck, deletePartyQuery);

export default partyRouter;
