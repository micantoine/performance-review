import express from 'express';
import AuthenticationController from './controllers/AuthenticationController';
import AuthenticationControllerPolicy from './policies/AuthenticationControllerPolicy';
import EmployeeController from './controllers/EmployeeController';
import isAuthenticated from './policies/isAuthenticated';
import isAuthenticatedAdmin from './policies/isAuthenticatedAdmin';

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

  app.get('/employee', [
    isAuthenticatedAdmin,
    EmployeeController.index
  ]);
};

export default routes;
