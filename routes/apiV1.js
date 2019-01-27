import express from 'express';

import PartyController from '../controllers/v1/partyControllers';
import OfficeController from '../controllers/v1/officeControllers';

const router = express.Router();

//  the party controller
router.post('/parties', PartyController.createParty);
router.get('/parties/:id', PartyController.getSpecificParty);
router.get('/parties/', PartyController.getAllParty);
router.patch('/parties/:id/name', PartyController.editSpecificParty);
router.delete('/parties/:id', PartyController.deleteSpecificParty);

//  the office controller
router.post('/offices', OfficeController.createOffice);

export default router;
