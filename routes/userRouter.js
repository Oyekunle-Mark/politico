import express from 'express';
import trim from 'trim-request';

import userMiddleware from '../middlewares/userMIddleware';
import tokenAuth from '../middlewares/tokenAuth';

import createUserQuery from '../model/userQueries/createUser';
import loginUserQuery from '../model/userQueries/loginUser';
import candidateQuery from '../model/userQueries/createCandidate';
import voteQuery from '../model/userQueries/createVote';

const userRouter = express.Router();

userRouter.post('/auth/signup', trim.body, userMiddleware.createUserCheck, createUserQuery);
userRouter.post('/auth/login', trim.body, userMiddleware.loginUserCheck, loginUserQuery);
userRouter.post('/office/:id/register', trim.body, userMiddleware.candidateCheck, tokenAuth.tokenCheck, candidateQuery);
userRouter.post('/votes/', trim.body, userMiddleware.voteCheck, tokenAuth.tokenCheck, voteQuery);

export default userRouter;
