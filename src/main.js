import Vue from 'vue';
import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSlash, faStopwatch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import Ripple from 'vue-ripple-directive';
import { firebase } from './firebase-config';
import store from './store/store';
import router from './router';
import App from './App.vue';

console.log('firebase', firebase);

// Adding icons to project
library.add(
  // SOLID ICONS
  faSlash,
  faStopwatch,
  faUser,

  // REGULR ICONS
  faCalendarAlt,
  faClock,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.directive('ripple', Ripple);

Vue.config.productionTip = false;
let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
