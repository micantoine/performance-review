import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Cookie from './middlewares/Cookie';

import Login from './views/Login.vue';
import Page404 from './views/Page404.vue';

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
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        Cookie.remove('token');
        store.dispatch('setUser', null);
        next({
          name: 'login',
        });
      },
    },
    {
      path: '/admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin/Layout.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      children: [
        {
          name: 'admin',
          path: '',
          component: () => import(/* webpackChunkName: "admin-home" */ './views/Admin/Home.vue'),
        },
        {
          name: 'admin-employee',
          path: 'employee/view/:employeeId',
          component: () => import(/* webpackChunkName: "admin-employee" */ './views/Admin/Employee.vue'),
        },
        {
          name: 'add-employee',
          path: 'employee/add',
          component: () => import(/* webpackChunkName: "add-employee" */ './views/Admin/AddEmployee.vue'),
        },
        {
          name: 'admin-reviews',
          path: 'reviews/:revieweeId',
          component: () => import(/* webpackChunkName: "admin-reviews" */ './views/Admin/Reviews.vue'),
        },
      ],
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import(/* webpackChunkName: "review" */ './views/Reviews.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '*',
      component: Page404,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Is user logged in ?
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

    // Restrict admin access
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (!store.getters.isAdmin) {
        next({
          name: 'reviews',
        });
        store.dispatch('setFlashMessage', [
          'You don\'t have permission',
        ]);
      }
    }
  }

  // Is user already logged in on login page ? redirect
  if (to.name === 'login' && store.getters.isUserLoggedIn) {
    next({
      name: store.getters.isAdmin ? 'admin' : 'reviews',
    });
  }
  next();
});

export default router;
