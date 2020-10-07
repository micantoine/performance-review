import db from '../models';
// eslint-disable-next-line import/extensions
import users from './users.json';

db.sequelize.sync({ force: true })
  .then(async () => {
    await Promise.all(users.map((user) => db.User.create(user)));
  });
