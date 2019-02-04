import express from 'express';
import trim from 'trim-request';

import partyMiddleware from '../middlewares/partyMiddleware';

import createPartyQuery from '../model/partyQueries/createParty';
import getPartyQuery from '../model/partyQueries/getParty';
import getAllPartyQuery from '../model/partyQueries/getAllParty';
import editPartyQuery from '../model/partyQueries/editParty';
import deletePartyQuery from '../model/partyQueries/deleteParty';

const partyRouter = express.Router();

partyRouter.post('/parties', trim.body, partyMiddleware.createPartyCheck, createPartyQuery);
partyRouter.get('/parties/:id', getPartyQuery);
partyRouter.get('/parties/', getAllPartyQuery);
partyRouter.patch('/parties/:id/name', trim.body, partyMiddleware.editSpecificPartyCheck, editPartyQuery);

partyRouter.delete('/parties/:id', deletePartyQuery);

export default partyRouter;
