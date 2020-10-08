import express from 'express';
import AuthenticationController from './controllers/AuthenticationController';

const routes = (app: express.Application): void => {
  app.get('/', (req, res) => {
    res.send('Hello world!!');
  });

  app.post('/register', [
    AuthenticationController.register.bind(AuthenticationController)
  ]);

  app.post('/login', [
    AuthenticationController.login.bind(AuthenticationController)
  ]);
};

export default routes;
