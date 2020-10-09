import UserModel from '../src/models/User';

declare module 'express' {
  export interface Request {
    user: UserModel
  }
}
