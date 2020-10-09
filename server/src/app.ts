import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

import config from './config/config';
import db from './models';
import appPassport from './passport';
import routes from './routes';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

passport.use(appPassport);
routes(app);

db.sequelize.sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server started at http://localhost:${config.port}`);
    });
  });
