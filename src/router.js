import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import Home from './views/Home.vue';
import Account from './views/Account.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '*',
    //   redirect: '/sign-in',
    // },
    {
      path: '/',
      redirect: '/sign-in',
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// Setting up nav-guards
router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log('navGuard - currentUser', currentUser);
  console.log('navGuard - requiresAuth', requiresAuth);

  if (requiresAuth && !currentUser) {
    next('sign-in');
  } else if (currentUser && !requiresAuth) {
    next('home');
  } else {
    next();
  }
});

export default router;
