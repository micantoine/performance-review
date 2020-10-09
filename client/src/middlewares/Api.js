/**
 * Api
 * @param {string} path  The endpoint path
 * @param {object} options Query options
 * @param {object} data The data to send
 * @return The fetch api response
 */
const Api = (path, options, data) => fetch(
  `${process.env.VUE_APP_API_ENDPOINT}/${path}`,
  {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
).then(response => response.json());

export default Api;
