import express from 'express';
import AuthenticationController from './controllers/AuthenticationController';
import AuthenticationControllerPolicy from './policies/AuthenticationControllerPolicy';
import EmployeeController from './controllers/EmployeeController';
import ReviewController from './controllers/ReviewController';
import isAuthenticated from './policies/isAuthenticated';
import isAdmin from './policies/isAdmin';

const routes = (app: express.Application): void => {
  app.get('/', (req, res) => {
    res.send('Hello world!!');
  });

  app.post('/register', [
    AuthenticationControllerPolicy.register.bind(AuthenticationControllerPolicy),
    AuthenticationController.register.bind(AuthenticationController)
  ]);

  app.post('/login', [
    AuthenticationController.login.bind(AuthenticationController)
  ]);

  app.get('/identity', [
    isAuthenticated,
    AuthenticationController.identity.bind(AuthenticationController)
  ]);

  app.get('/employee', [
    isAuthenticated,
    isAdmin,
    EmployeeController.index
  ]);

  app.get('/reviews', [
    isAuthenticated,
    ReviewController.index
  ]);
  app.get('/reviews/:revieweeId', [
    isAuthenticated,
    ReviewController.view
  ]);
};

export default routes;
