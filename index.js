import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import officeRouter from './routes/officeApi';
import partyRouter from './routes/partyApi';

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

app.listen(port, () => {
  process.stdout.write(`Server started on port ${port}`);
});

export default app;
