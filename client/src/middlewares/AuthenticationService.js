/* eslint-disable consistent-return */
import checkCredentials from '@/utils/checkCredentials';
import Api from './Api';
import Cookie from './Cookie';

export default {
  /**
   * Login
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const credentialsStatus = checkCredentials(email, password);

    if (credentialsStatus.error) {
      return credentialsStatus;
    }

    try {
      const response = await Api('login', { method: 'POST' }, {
        email,
        password,
      });

      if (!response.success) {
        return response;
      }

      Cookie.set('token', response.data.token);
      return {
        ...response,
      };
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },

  /**
   * Register
   * @param {string} email
   * @param {string} password
   */
  async register(email, password) {
    const credentialsStatus = checkCredentials(email, password);

    if (!credentialsStatus.success) {
      return credentialsStatus;
    }

    try {
      const response = await Api('register', { method: 'POST' }, {
        email,
        password,
      });

      if (!response.success) {
        return response;
      }

      Cookie.set('token', response.data.token);
      return {
        ...response,
      };
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },

  /**
   * Identity
   */
  async identity() {
    try {
      const response = await Api('identity', { method: 'GET' });

      if (!response.success) {
        return response;
      }

      Cookie.set('token', response.data.token);
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },
};
