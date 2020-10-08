import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import User from '../models/User';
import config from '../config/config';

class AuthenticationController {
  public user: User;

  /**
   * Register Controller
   * @param req {Request}
   * @param res  {Response}
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      this.user = await db.User.create(req.body);

      res.send({
        user: {
          email: this.user.email,
          name: this.user.name,
          isAdmin: this.user.isAdmin
        },
        token: this.jwtSignUser()
      });
    } catch (err) {
      res.status(400).send({
        error: 'validation',
        message: ['This email account already exists.']
      });
    }
  }

  /**
   * Login Controller
   * @param req {Request} the Request
   * @param res {Response} the Response
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      this.user = await db.User.findOne({
        where: {
          email
        }
      });

      if (!this.user) {
        res.status(403).send({
          error: 'authentication',
          message: ['The login information was incorrect', 'user does not exist']
        });
      }

      const isPasswordValid = await bcrypt.compare(password, this.user.password);

      if (!isPasswordValid) {
        res.status(403).send({
          error: 'authentication',
          message: ['The login information was incorrect', 'password invalid']
        });
      }

      res.send({
        email,
        name: this.user.name,
        isAdmin: this.user.isAdmin,
        token: this.jwtSignUser()
      });
    } catch (err) {
      res.status(500).send({
        error: 'authentication',
        message: ['An error has occured trying to log in']
      });
    }
  }

  /**
   * Create Token
   * @return {string}
   */
  public jwtSignUser(): string {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(this.user.toJSON(), config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    });
  }
}

export default new AuthenticationController();
