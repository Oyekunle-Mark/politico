import express from 'express';

import bodyParser from 'body-parser';

import router from './routes/apiV1';

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  version 1 of the api
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
