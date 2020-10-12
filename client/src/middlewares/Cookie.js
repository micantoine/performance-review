import Cookies from 'js-cookie';

export default {
  get(name) {
    const token = Cookies.get(name);
    return token;
  },
  set(name, value) {
    Cookies.set(name, value, { expires: 7 });
  },
  remove(name) {
    Cookies.remove(name);
  },
};
