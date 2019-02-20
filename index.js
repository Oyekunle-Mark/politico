import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import crossOrigin from './middlewares/allowCrossOrigin';

import officeRouter from './routes/officeRouter';
import partyRouter from './routes/partyRouter';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';

const port = process.env.PORT || 3000;

const app = express();

// use the cross origin middleware
app.use(crossOrigin);

//  use the morgan logging  middleware
app.use(morgan('short'));

// use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// the routers
app.use('/api/v1', partyRouter);
app.use('/api/v1', officeRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', authRouter);

// respond to bad request
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Incorrect url',
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
