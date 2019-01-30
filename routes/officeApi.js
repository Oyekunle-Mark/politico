import express from 'express';

import OfficeController from '../controllers/v1/officeControllers';

const officeRouter = express.Router();

officeRouter.post('/offices', OfficeController.createOffice);
officeRouter.get('/offices', OfficeController.getAllOffices);
officeRouter.get('/offices/:id', OfficeController.getSpecificOffice);

export default officeRouter;
