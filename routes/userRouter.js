import express from 'express';
import trim from 'trim-request';

import userMiddleware from '../middlewares/userMIddleware';
import tokenAuth from '../middlewares/tokenAuth';
import imageParser from '../middlewares/imageMiddleware';

import createUserQuery from '../model/userQueries/createUser';
import loginUserQuery from '../model/userQueries/loginUser';
import candidateQuery from '../model/userQueries/createCandidate';
import voteQuery from '../model/userQueries/createVote';
import viewResultQuery from '../model/userQueries/viewResults';
import getAllUsers from '../model/userQueries/getAllUsers';
import getAllCandidates from '../model/userQueries/getAllCandidates';

const userRouter = express.Router();

userRouter.post('/auth/signup', trim.body, imageParser.single('passportUrl'), userMiddleware.createUserCheck, createUserQuery);
userRouter.post('/auth/login', trim.body, userMiddleware.loginUserCheck, loginUserQuery);
userRouter.post('/office/:id/register', trim.body, tokenAuth.tokenCheck, userMiddleware.candidateCheck, candidateQuery);
userRouter.post('/votes/', trim.body, tokenAuth.tokenCheck, userMiddleware.voteCheck, voteQuery);
userRouter.post('/office/:id/result', tokenAuth.tokenCheck, viewResultQuery);
userRouter.get('/auth/users', tokenAuth.tokenCheck, getAllUsers.getAllUsers);
userRouter.get('/candidates', tokenAuth.tokenCheck, getAllCandidates.getAllCandidates);

export default userRouter;
