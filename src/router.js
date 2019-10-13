import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Profile from './views/Profile.vue';
import Settings from './views/Settings.vue';
import Overview from './views/Overview.vue';

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
    {
      path: '/about',
      name: 'about',
      component: About,
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
      path: '/profile',
      name: 'profile',
      component: Profile,
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
    {
      path: '/overview',
      name: 'overview',
      component: Overview,
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
  console.log('navGuard - to', to);

  if (requiresAuth && !currentUser) {
    next('sign-in');
  } else if (currentUser && (to.name === 'sign-in' || to.name === 'sign-up')) {
    next('home');
  } else {
    next();
  }

  store.commit('toggleMenu', { forceClose: true });
});

export default router;
