import express from 'express';
import trim from 'trim-request';

import officeMiddleware from '../middlewares/officeMiddleware';

import createOfficeQuery from '../model/officeQueries/createOffice';
import getAllOfficeQuery from '../model/officeQueries/getAllOffice';
import getOfficeQuery from '../model/officeQueries/getOffice';

const officeRouter = express.Router();

officeRouter.post('/offices', trim.body, officeMiddleware.createOfficeCheck, createOfficeQuery);
officeRouter.get('/offices', getAllOfficeQuery);
officeRouter.get('/offices/:id', getOfficeQuery);

export default officeRouter;
