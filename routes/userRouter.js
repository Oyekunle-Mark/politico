import express from 'express';
import trim from 'trim-request';

import userMiddleware from '../middlewares/userMIddleware';

import createUserQuery from '../model/userQueries/createUser';
import loginUserQuery from '../model/userQueries/loginUser';

const userRouter = express.Router();

userRouter.post('/auth/signup', trim.body, userMiddleware.createUserCheck, createUserQuery);
userRouter.post('/auth/login', trim.body, userMiddleware.loginUserCheck, loginUserQuery);

export default userRouter;
