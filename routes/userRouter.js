import express from 'express';
import trim from 'trim-request';

import userMiddleware from '../middlewares/userMIddleware';
import tokenAuth from '../middlewares/tokenAuth';
import adminCheck from '../middlewares/adminAuth';

import createUserQuery from '../model/userQueries/createUser';
import loginUserQuery from '../model/userQueries/loginUser';
import candidateQuery from '../model/userQueries/createCandidate';
import voteQuery from '../model/userQueries/createVote';
import viewResultQuery from '../model/userQueries/viewResults';

const userRouter = express.Router();

userRouter.post('/auth/signup', trim.body, userMiddleware.createUserCheck, createUserQuery);
userRouter.post('/auth/login', trim.body, userMiddleware.loginUserCheck, loginUserQuery);
userRouter.post('/office/:id/register', trim.body, tokenAuth.tokenCheck, adminCheck.adminCheck, userMiddleware.candidateCheck, candidateQuery);
userRouter.post('/votes/', trim.body, tokenAuth.tokenCheck, userMiddleware.voteCheck, voteQuery);
userRouter.post('/office/:id/result', tokenAuth.tokenCheck, viewResultQuery);

export default userRouter;
