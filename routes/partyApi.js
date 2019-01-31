import express from 'express';

import PartyController from '../controllers/v1/partyControllers';

const partyRouter = express.Router();

partyRouter.post('/parties', PartyController.createParty);
partyRouter.get('/parties/:id', PartyController.getSpecificParty);
partyRouter.get('/parties/', PartyController.getAllParty);
partyRouter.patch('/parties/:id/name', PartyController.editSpecificParty);
partyRouter.delete('/parties/:id', PartyController.deleteSpecificParty);

export default partyRouter;
