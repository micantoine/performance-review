/* eslint-disable consistent-return */
import checkCredentials from '@/utils/checkCredentials';
import Api from './Api';

export default {
  /**
   * Get list employee list
   */
  async list() {
    try {
      const response = await Api('employee', { method: 'GET' });
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },

  /**
   * Create new employee
   * @param {object} the request body data
   * @retunr {object} the response data
   */
  async create(body) {
    const credentialsStatus = checkCredentials(body.email, body.password);

    if (credentialsStatus.error) {
      return credentialsStatus;
    }

    try {
      const response = await Api('employee/create', { method: 'POST' }, body);
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },
};
