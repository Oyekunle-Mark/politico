import express from 'express';
import trim from 'trim-request';

import officeMiddleware from '../middlewares/officeMiddleware';
import tokenAuth from '../middlewares/tokenAuth';

import createOfficeQuery from '../model/officeQueries/createOffice';
import getAllOfficeQuery from '../model/officeQueries/getAllOffice';
import getOfficeQuery from '../model/officeQueries/getOffice';

const officeRouter = express.Router();

officeRouter.post('/offices', trim.body, tokenAuth.tokenCheck, officeMiddleware.createOfficeCheck, createOfficeQuery);
officeRouter.get('/offices', tokenAuth.tokenCheck, getAllOfficeQuery);
officeRouter.get('/offices/:id', tokenAuth.tokenCheck, getOfficeQuery);

export default officeRouter;
