import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from './models';
import config from './config/config';

const passport = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authentication.jwtSecret
}, async (jwtPayload, done) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: jwtPayload.id
      }
    });
    if (!user) {
      return done(new Error(), false);
    }
    return done(null, user);
  } catch (err) {
    return done(new Error(), false);
  }
});

export default passport;
