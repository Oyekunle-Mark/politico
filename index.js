import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import officeRouter from './routes/officeRouter';
import partyRouter from './routes/partyRouter';

const port = process.env.PORT || 3000;

const app = express();

//  use the morgan logging  middleware
app.use(morgan('short'));

// use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// the routers
app.use('/api/v1', partyRouter);
app.use('/api/v1', officeRouter);

// respond to bad request
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Incorrect url',
  });
});

app.listen(port, () => {
  process.stdout.write(`Server started on port ${port}`);
});

export default app;
