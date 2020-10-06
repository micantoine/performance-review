import express from 'express';

const routes = (app: express.Application): void => {
  app.get('/', (req, res) => {
    res.send('Hello world!!');
  });
};

export default routes;
