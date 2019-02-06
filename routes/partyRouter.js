import express from 'express';
import trim from 'trim-request';

import partyMiddleware from '../middlewares/partyMiddleware';
import tokenAuth from '../middlewares/tokenAuth';

import createPartyQuery from '../model/partyQueries/createParty';
import getPartyQuery from '../model/partyQueries/getParty';
import getAllPartyQuery from '../model/partyQueries/getAllParty';
import editPartyQuery from '../model/partyQueries/editParty';
import deletePartyQuery from '../model/partyQueries/deleteParty';

const partyRouter = express.Router();

partyRouter.post('/parties', trim.body, partyMiddleware.createPartyCheck, tokenAuth.tokenCheck, createPartyQuery);
partyRouter.get('/parties/:id', tokenAuth.tokenCheck, getPartyQuery);
partyRouter.get('/parties/', tokenAuth.tokenCheck, getAllPartyQuery);
partyRouter.patch('/parties/:id/name', trim.body, partyMiddleware.editSpecificPartyCheck, tokenAuth.tokenCheck, editPartyQuery);

partyRouter.delete('/parties/:id', deletePartyQuery);

export default partyRouter;
