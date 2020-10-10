/**
 * checkCredentials
 * @param {string} email
 * @param {string} password
 * @return {error: string, messages: array}
 */

export default (email, password) => {
  let error;
  const messages = [];
  if (!email) {
    error = 'validation';
    messages.push({
      context: 'email',
      message: ['Email is empty'],
    });
  }

  if (!password) {
    error = 'validation';
    messages.push({
      context: 'password',
      message: ['Password is empty'],
    });
  }

  return {
    error,
    messages,
  };
};
