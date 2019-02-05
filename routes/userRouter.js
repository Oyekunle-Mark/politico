import express from 'express';
import trim from 'trim-request';

import userMiddleware from '../middlewares/userMIddleware';

import createUserQuery from '../model/userQueries/createUser';

const userRouter = express.Router();

userRouter.post('/auth/signup', trim.body, userMiddleware.createUserCheck, createUserQuery);

export default userRouter;
