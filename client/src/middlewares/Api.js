import router from '../router';
import store from '../store';
import Cookie from './Cookie';

/**
 * Api
 * @param {string} path  The endpoint path
 * @param {object} options Query options
 * @param {object} data The data to send
 * @return The fetch api response
 */
const Api = async (path, options, data) => {
  const response = await fetch(
    `${process.env.VUE_APP_API_ENDPOINT}/${path}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${Cookie.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
  const jsonReponse = await response.json();

  // Token expired or not existing
  if (!response.ok && response.status === 401) {
    Cookie.remove('token');
    store.dispatch('setUser', null);
    store.dispatch(
      'setFlashMessage',
      jsonReponse.messages.map(item => [...item.message])
    );
    router.push({
      name: 'login',
      query: { redirect: router.currentRoute.fullPath },
    });
  }

  // if (!response.ok && response.status === 403 && router.currentRoute.name !== 'login') {
  //   store.dispatch('setFlashMessage', jsonReponse.messages);
  // }

  return jsonReponse;
};

export default Api;
