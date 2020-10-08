import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import User from '../models/User';
import config from '../config/config';

class AuthenticationController {
  user: User;

  public jwtSignUser(): string {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(this.user.toJSON(), config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    });
  }

  // eslint-disable-next-line consistent-return
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      this.user = await db.User.findOne({
        where: {
          email
        }
      });

      if (!this.user) {
        return res.status(403).send({
          error: 'authentication',
          message: ['The login information was incorrect', 'user does not exist']
        });
      }

      const isPasswordValid = await bcrypt.compare(password, this.user.password);

      if (!isPasswordValid) {
        return res.status(403).send({
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
}

export default new AuthenticationController();
