import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import cors from 'cors';

import officeRouter from './routes/officeRouter';
import partyRouter from './routes/partyRouter';
import userRouter from './routes/userRouter';

const port = process.env.PORT || 3000;

const app = express();

// enable cors
// app.use(cors());
// app.options('/parties/:id/name', cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

//  use the morgan logging  middleware
app.use(morgan('short'));

// use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// the routers
app.use('/api/v1', partyRouter);
app.use('/api/v1', officeRouter);
app.use('/api/v1', userRouter);

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
