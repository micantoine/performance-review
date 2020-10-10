import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import(/* webpackChunkName: "review" */ './views/Reviews.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // Is user logged in ?
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isUserLoggedIn) {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      });
    }
    if (!store.getters.me) {
      const me = await store.dispatch('fetchIdentity');
      // token expired
      if (!me) {
        next({
          name: 'login',
          query: { redirect: to.fullPath },
        });
      }
    }
  }
  next();
});

export default router;
