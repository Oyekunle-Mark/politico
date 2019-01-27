import express from 'express';
import partyController from '../controllers/apiControllers';

const router = express.Router();

router.post('/parties', partyController.createParty);
router.get('/parties/:id', partyController.getSpecificParty);
router.get('/parties/', partyController.getAllParty);
router.patch('/parties/:id/name', partyController.editSpecificParty);
router.delete('/parties/:id', partyController.deleteSpecificParty);

export default router;
