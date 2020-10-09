import Api from './Api';

export default {
  register(credentials) {
    return Api('register', {
      method: 'POST',
    }, credentials);
  },
  login(credentials) {
    return Api('login', {
      method: 'POST',
    }, credentials);
  },
};
