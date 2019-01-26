import express from 'express';

import bodyParser from 'body-parser';

import router from './routes/api';

const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
