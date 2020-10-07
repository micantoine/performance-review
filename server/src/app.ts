import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config/config';
import routes from './routes';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
