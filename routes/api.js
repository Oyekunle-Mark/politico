import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();
const versionedEndPoint = '/api/v1';

router.post(`${versionedEndPoint}/parties`, controller.createParty);
router.get(`${versionedEndPoint}/parties/:id`, controller.getSpecificParty);
router.get(`${versionedEndPoint}/parties/`, controller.getAllParty);

export default router;
