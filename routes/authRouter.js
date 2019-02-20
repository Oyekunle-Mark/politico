import { Router } from 'express';
import trim from 'trim-request';

import authMiddleware from '../middlewares/authTokenMiddleware';

import authToken from '../model/authToken';

const authRouter = Router();

authRouter.get('/auth', trim.body, authMiddleware.auth, authToken.decryptToken);

export default authRouter;
