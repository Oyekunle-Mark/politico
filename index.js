import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import router from './routes/apiV1';

const port = process.env.PORT || 3000;

const app = express();

//  use the morgan logging  middleware
app.use(morgan('short'));

// use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  version 1 of the api
app.use('/api/v1', router);

app.listen(port, () => {
  process.stdout.write(`Server started on port ${port}`);
});

export default app;
