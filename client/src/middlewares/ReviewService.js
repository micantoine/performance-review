import Api from './Api';

export default {
  /**
   * Identity
   */
  async list() {
    try {
      const response = await Api('reviews/list', { method: 'GET' });
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },
};
