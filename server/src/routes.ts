import express from 'express';
import AuthenticationController from './controllers/AuthenticationController';
import AuthenticationControllerPolicy from './policies/AuthenticationControllerPolicy';
import EmployeeController from './controllers/EmployeeController';
import EmployeeControllerPolicy from './policies/EmployeeControllerPolicy';
import ReviewController from './controllers/ReviewController';
import DepartmentController from './controllers/DepartmentController';
import isAuthenticated from './policies/isAuthenticated';
import isAdmin from './policies/isAdmin';

const routes = (app: express.Application): void => {
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
  app.post('/employee/create', [
    isAuthenticated,
    isAdmin,
    EmployeeControllerPolicy.create.bind(EmployeeControllerPolicy),
    EmployeeController.create
  ]);

  app.get('/reviews', [
    isAuthenticated,
    ReviewController.index.bind(ReviewController)
  ]);
  app.get('/reviews/list', [
    isAuthenticated,
    isAdmin,
    ReviewController.list.bind(ReviewController)
  ]);
  app.get('/reviews/employee/:revieweeId/', [
    isAuthenticated,
    ReviewController.view.bind(ReviewController)
  ]);

  app.get('/department', [
    DepartmentController.index
  ]);
};

export default routes;
