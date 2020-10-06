import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
